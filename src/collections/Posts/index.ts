// src/collections/Posts/index.ts

import type { CollectionConfig } from 'payload'
// --- CORRECTED: Importing the correct access control functions ---
import { isAdmin, isCoordinatorOrAdmin } from '@/access/roles'
import { populateAuthors } from './hooks/populateAuthors'
import { revalidatePost, revalidateDelete } from './hooks/revalidatePost'
import { slugField } from '@/fields/slug'

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
      autosave: true, // Autosave is a great feature for content editors
    },
    maxPerDoc: 10,
  },
  access: {
    // Anyone can read published posts
    read: () => true,
    // --- CORRECTED: Use 'isCoordinatorOrAdmin' as requested ---
    // Admins and Coordinators can create posts
    create: isCoordinatorOrAdmin,
    // Admins and Coordinators can update posts
    update: isCoordinatorOrAdmin,
    // Only Admins can delete posts
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
      // Optional: Filter the author list to only show users who can write posts
      filterOptions: {
        role: {
          in: ['admin', 'coordinator'], // Or whatever roles you designate as authors
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
            // If the post is being published and has no publishedAt date, set it to now
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    // The populatedAuthors field from the template is a great pattern for exposing author names
    // without exposing their full user object. Let's keep it.
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
        {
          name: 'id',
          type: 'text',
        },
        {
          name: 'name',
          type: 'text',
        },
      ],
    },
    // --- CORRECTED: Use the spread operator for the slug field ---
    ...slugField(), // This correctly adds the fields from the function to the array
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
      ],
    },
  ],
  timestamps: true, // Explicitly add timestamps
}
