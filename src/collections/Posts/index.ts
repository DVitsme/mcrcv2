// src/collections/Posts/index.ts

import type { CollectionConfig } from 'payload'
import { isAdmin, isCoordinatorOrAdmin } from '@/access/roles'
import { populateAuthors } from '@/collections/Posts/hooks/populateAuthors'
import { revalidatePost, revalidateDelete } from '@/collections/Posts/hooks/revalidatePost'
import { slugField } from '@/fields/slug'
import { Banner } from '../../blocks/Banner/config'
import { BlocksFeature, lexicalEditor } from '@payloadcms/richtext-lexical'

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

// A very light check for Lexical rich text "emptiness"
const isRichTextEmpty = (val: any) => {
  if (!val) return true
  const nodes = val?.root?.children
  if (Array.isArray(nodes)) return nodes.length === 0
  return false
}

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
  },

  /**
   * Drafts enabled -> adds `_status`
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
    /**
     * Ensure only one post is `featured` at a time.
     * If this doc is featured, unset `featured` on all other posts.
     */
    afterChange: [
      async ({ req, doc, operation }) => {
        if (
          (operation === 'create' || operation === 'update') &&
          doc.featured &&
          !req.context?.skipFeaturedSync
        ) {
          const payload = req.payload
          // Find other featured posts
          const others = await payload.find({
            collection: 'posts',
            where: {
              and: [{ featured: { equals: true } }, { id: { not_equals: doc.id } }],
            },
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
                  // Prevent this hook from cascading infinitely
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
    {
      name: 'title',
      type: 'text',
      // Only required when publishing
      validate: requireOnPublish('Title'),
    },
    {
      name: 'excerpt',
      type: 'textarea',
      maxLength: 200,
      admin: {
        description: 'A short summary of the post for display on card views and for SEO.',
      },
    },
    {
      name: 'heroImage',
      label: 'Hero Image',
      type: 'upload',
      relationTo: 'media',
      // Only required when publishing
      validate: requireOnPublish('Hero image'),
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          BlocksFeature({
            blocks: [Banner],
          }),
        ],
      }),
      // Only required when publishing
      validate: requireOnPublish('Content', isRichTextEmpty),
    },
    {
      name: 'categories',
      label: 'Categories (Tags)',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'authors',
      type: 'relationship',
      relationTo: 'users',
      hasMany: true,
      admin: { position: 'sidebar' },
      // Use a function form for clarity/future-proofing
      filterOptions: () => ({
        role: { in: ['admin', 'coordinator'] },
      }),
    },
    {
      name: 'readTimeMinutes',
      label: 'Read Time (Minutes)',
      type: 'number',
      min: 1,
      admin: {
        position: 'sidebar',
        description: 'Estimated time to read the article in minutes.',
      },
    },
    {
      name: 'featured',
      label: 'Featured Post',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Check this to display this post in the main hero section of the blog page.',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Published Date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
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
    {
      name: 'relatedPosts',
      type: 'relationship',
      relationTo: 'posts',
      hasMany: true,
      filterOptions: ({ id }) => ({
        id: { not_equals: id },
      }),
    },
    {
      name: 'populatedAuthors',
      type: 'array',
      admin: {
        disabled: true,
        readOnly: true,
        hidden: true,
      },
      access: {
        create: () => false,
        read: () => true,
        update: () => false,
      },
      fields: [
        { name: 'id', type: 'text' },
        { name: 'name', type: 'text' },
      ],
    },
    ...slugField(),
  ],

  timestamps: true,
}
