// src/collections/Posts/index.ts

import type { CollectionConfig } from 'payload'
import { isAdmin, isCoordinatorOrAdmin } from '@/access/roles'
import { populateAuthors } from '@/collections/Posts/hooks/populateAuthors'
import { revalidatePost, revalidateDelete } from '@/collections/Posts/hooks/revalidatePost'
import { slugField } from '@/fields/slug'
import { Banner } from '../../blocks/Banner/config'
import type { Media } from '@/payload-types'
import { BlocksFeature, lexicalEditor } from '@payloadcms/richtext-lexical'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
  },
  hooks: {
    afterChange: [revalidatePost],
    afterRead: [populateAuthors],
    afterDelete: [revalidateDelete],
  },
  // By enabling versions, Payload automatically adds and manages the _status field.
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
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
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
      required: true,
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
    },
    {
      name: 'categories',
      label: 'Categories (Tags)',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'authors',
      type: 'relationship',
      relationTo: 'users',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
      filterOptions: {
        role: {
          in: ['admin', 'coordinator'],
        },
      },
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
      filterOptions: ({ id }) => {
        return {
          id: {
            not_equals: id,
          },
        }
      },
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
    {
      name: 'meta',
      label: 'SEO',
      type: 'group',
      fields: [
        {
          name: 'title',
          label: 'Meta Title',
          type: 'text',
        },
        {
          name: 'description',
          label: 'Meta Description',
          type: 'textarea',
        },
        {
          name: 'image',
          label: 'Meta Image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Recommended size: 1200x630px.',
          },
        },
      ],
    },
    // --- CORRECTED ---
    // The manual '_status' field has been removed.
    // The `versions` property above handles this automatically.
    // To make it queryable, we just need to ensure its 'index' property is set,
    // which Payload will do if we just add it by name to the fields array.
    // However, for maximum compatibility and to avoid regeneration issues,
    // we let Payload handle this implicitly for now. If you need to query by status and it fails,
    // we would add an index to the _posts_v table manually.
  ],
  timestamps: true,
}
