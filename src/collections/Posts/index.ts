// src/collections/Posts/index.ts

import type { CollectionConfig } from 'payload'
import { isAdmin, isCoordinatorOrAdmin } from '@/access/roles'
import { populateAuthors } from '@/collections/Posts/hooks/populateAuthors'
import { revalidatePost, revalidateDelete } from '@/collections/Posts/hooks/revalidatePost'
import { slugField } from '@/fields/slug'
import { Banner } from '../../blocks/Banner/config'
import type { Media } from '@/payload-types' // Import Media type for meta image
import { BlocksFeature } from '@payloadcms/richtext-lexical'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

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
    // --- NEW: Added relatedPosts field ---
    {
      name: 'relatedPosts',
      type: 'relationship',
      relationTo: 'posts',
      hasMany: true,
      // This filter prevents a post from being related to itself
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
        // --- NEW: Added meta image field ---
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
    {
      name: 'banner',
      type: 'richText', // Or 'blocks' if you are using a blocks field
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          BlocksFeature({
            blocks: [
              Banner,
              // Code, // Add any other blocks you have here
              // MediaBlock,
            ],
          }),
        ],
      }),
    },
  ],
  timestamps: true,
}
