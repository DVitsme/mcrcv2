import type { CollectionConfig, FieldHook } from 'payload'
import { isAdmin, isCoordinatorOrAdmin } from '@/access/roles'
import { populateAuthors } from '@/collections/Posts/hooks/populateAuthors'
import { revalidatePost, revalidateDelete } from '@/collections/Posts/hooks/revalidatePost'
import { slugField } from '@/fields/slug'

/**
 * Helpers
 */
const requireOnPublish =
  (label: string, isEmpty?: (v: any) => boolean) =>
  (value: any, { siblingData, data }: { siblingData?: any; data?: any }) => {
    const status = siblingData?._status ?? data?._status
    if (status === 'published') {
      const empty =
        typeof isEmpty === 'function'
          ? isEmpty(value)
          : value === null ||
            value === undefined ||
            (typeof value === 'string' && value.trim() === '')
      if (empty) return `${label} is required when publishing.`
    }
    return true
  }

// Generate a URL-friendly anchor from a string
const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 80)

// Treat HTML as "empty" if there’s no text content after stripping tags/nbsp
const isHtmlEmpty = (val: any) => {
  if (typeof val !== 'string') return true
  const stripped = val.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim()
  return stripped.length === 0
}

/**
 * Ensure anchors exist on sections; keep other fields intact.
 */
const beforeValidateSections: FieldHook = ({ value }) => {
  const sections = Array.isArray(value) ? value : []
  return sections.map((sec: any) => ({
    title: sec?.title ?? '',
    contentHtml: typeof sec?.contentHtml === 'string' ? sec.contentHtml : '', // keep HTML string
    image: sec?.image ?? null,
    anchor:
      sec?.anchor && typeof sec.anchor === 'string' && sec.anchor.trim().length > 0
        ? sec.anchor
        : slugify(sec?.title ?? ''),
  }))
}

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
  },

  /**
   * Drafts enable `_status` ("draft"/"published")
   */
  versions: {
    drafts: {
      autosave: true,
    },
    maxPerDoc: 10,
  },

  access: {
    read: () => true,
    create: isCoordinatorOrAdmin,
    update: isCoordinatorOrAdmin,
    delete: isAdmin,
  },

  hooks: {
    // Keep your existing featured-sync + ISR hooks
    afterChange: [
      async ({ req, doc, operation }) => {
        if (
          (operation === 'create' || operation === 'update') &&
          doc.featured &&
          !req.context?.skipFeaturedSync
        ) {
          const payload = req.payload
          const others = await payload.find({
            collection: 'posts',
            where: { and: [{ featured: { equals: true } }, { id: { not_equals: doc.id } }] },
            limit: 1000,
            depth: 0,
          })

          if (others?.docs?.length) {
            await Promise.all(
              others.docs.map((other) =>
                payload.update({
                  collection: 'posts',
                  id: other.id,
                  data: { featured: false },
                  overrideAccess: true,
                  context: { skipFeaturedSync: true },
                }),
              ),
            )
          }
        }
        return doc
      },
      revalidatePost,
    ],
    afterRead: [populateAuthors],
    afterDelete: [revalidateDelete],
  },

  fields: [
    // Basics
    {
      name: 'title',
      type: 'text',
      validate: requireOnPublish('Title'),
    },
    {
      name: 'excerpt',
      type: 'textarea',
      maxLength: 200,
      admin: {
        description: 'Short summary for cards and SEO.',
      },
    },

    // Hero image selected via your dashboard form
    {
      name: 'heroImage',
      label: 'Hero Image',
      type: 'upload',
      relationTo: 'media',
      validate: requireOnPublish('Hero image'),
    },

    /**
     * Main body coming from your TipTap editor as HTML
     */
    {
      name: 'contentHtml',
      label: 'Main Content (HTML)',
      type: 'textarea',
      admin: {
        description:
          'Filled by the dashboard editor; stored as HTML. If using the admin UI, you can paste HTML here.',
        rows: 16,
      },
      validate: requireOnPublish('Content', isHtmlEmpty),
    },

    // Categories
    {
      name: 'categories',
      label: 'Categories (Tags)',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      admin: { position: 'sidebar' },
    },

    /**
     * Sections for the left-hand navigation on the blog page.
     * Each section has: title, contentHtml (HTML from TipTap), optional image, and auto anchor.
     */
    {
      name: 'sections',
      label: 'Sections',
      type: 'array',
      labels: { singular: 'Section', plural: 'Sections' },
      admin: {
        description:
          'Optional table of contents. Type a section title; the anchor is generated automatically.',
      },
      hooks: { beforeValidate: [beforeValidateSections] },
      fields: [
        { name: 'title', type: 'text', required: true },
        {
          name: 'contentHtml',
          label: 'Section Content (HTML)',
          type: 'textarea',
          admin: { rows: 12 },
        },
        {
          name: 'image',
          label: 'Section Image (optional)',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'anchor',
          type: 'text',
          admin: { readOnly: true, description: 'Auto-generated from title.' },
        },
      ],
    },

    // Authors (same as before)
    {
      name: 'authors',
      type: 'relationship',
      relationTo: 'users',
      hasMany: true,
      admin: { position: 'sidebar' },
      filterOptions: () => ({ role: { in: ['admin', 'coordinator'] } }),
    },

    // Meta & display options
    {
      name: 'readTimeMinutes',
      label: 'Read Time (Minutes)',
      type: 'number',
      min: 1,
      admin: { position: 'sidebar', description: 'Estimated time to read the article.' },
    },
    {
      name: 'featured',
      label: 'Featured Post',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Show this post in the main hero on the blog page.',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Published Date',
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayAndTime' },
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },

    // Related posts
    {
      name: 'relatedPosts',
      type: 'relationship',
      relationTo: 'posts',
      hasMany: true,
      filterOptions: ({ id }) => ({ id: { not_equals: id } }),
    },

    // Denormalized author names (same as before)
    {
      name: 'populatedAuthors',
      type: 'array',
      admin: { disabled: true, readOnly: true, hidden: true },
      access: { create: () => false, read: () => true, update: () => false },
      fields: [
        { name: 'id', type: 'text' },
        { name: 'name', type: 'text' },
      ],
    },

    // Slug
    ...slugField(),
  ],

  timestamps: true,
}
