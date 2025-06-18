// src/collections/Media.ts

import type { CollectionConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true, // It's a best practice for accessibility to require alt text.
    },
    {
      name: 'caption',
      type: 'richText',
      // The richText editor config is not needed here as it will inherit from your payload.config.ts `editor` property
    },
  ],
  upload: {
    // This path is used as a fallback if the S3 adapter is disabled, but won't be used in production.
    staticDir: path.resolve(dirname, '../../media'),

    // --- RECOMMENDED FIX ---
    // This is CRITICAL for cloud storage. It prevents Payload from saving a local copy
    // of the file on the server, which is essential for ephemeral filesystems like Vercel.
    disableLocalStorage: true,

    adminThumbnail: 'thumbnail',
    focalPoint: true,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'square',
        width: 500,
        height: 500,
        position: 'centre',
      },
      {
        name: 'small',
        width: 600,
      },
      {
        name: 'medium',
        width: 900,
      },
      {
        name: 'large',
        width: 1400,
      },
      {
        name: 'xlarge',
        width: 1920,
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        position: 'centre', // Changed from 'crop' to a valid Payload option
      },
    ],
  },
}
