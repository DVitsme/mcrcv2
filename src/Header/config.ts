/**
 * Header Global Configuration for Payload CMS
 * Defines the structure and behavior of the header in the CMS
 */

import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  // Unique identifier for this global configuration
  slug: 'header',

  // Access control - allow public read access
  access: {
    read: () => true,
  },

  // Define the fields that make up the header
  fields: [
    {
      // Navigation items array field
      name: 'navItems',
      type: 'array',
      fields: [
        // Each navigation item is a link
        link({
          appearances: false, // Disable appearance options for links
        }),
      ],
      maxRows: 6, // Limit to 6 navigation items
      admin: {
        initCollapsed: true, // Start with items collapsed in admin UI
        components: {
          // Use custom RowLabel component for better admin UI experience
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
  ],

  // Hooks for handling changes
  hooks: {
    // Revalidate the header when changes are made
    afterChange: [revalidateHeader],
  },
}
