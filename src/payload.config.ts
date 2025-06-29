// src/payload.config.ts

import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import { buildConfig, PayloadRequest } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import sharp from 'sharp'
import { resendAdapter } from '@payloadcms/email-resend'
import { s3Storage } from '@payloadcms/storage-s3'

// Import all your collections and globals
import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { Events } from './collections/Events'
import { Cases } from './collections/Cases'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'

// Correctly load .env file
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

dotenv.config({
  path: path.resolve(dirname, '../.env'),
})

// Determine which connection string to use
let connectionString: string | undefined
const isProduction = process.env.NODE_ENV === 'production'

// --- DEBUGGING ---
console.log(`--- [DEBUG] Payload Config Initialization ---`)
console.log(`NODE_ENV: ${process.env.NODE_ENV}`)
console.log(`Is Production?: ${isProduction}`)
// --- END DEBUGGING ---

if (isProduction) {
  connectionString = process.env.DATABASE_PROD_URL
  if (!connectionString) {
    throw new Error('DATABASE_PROD_URL environment variable is not set for production environment!')
  }
  console.log('Using PRODUCTION database.')
} else {
  connectionString = process.env.DATABASE_DEV_URL
  if (!connectionString) {
    throw new Error(
      'DATABASE_DEV_URL environment variable is not set for development/preview environment!',
    )
  }
  console.log('Using DEVELOPMENT database.')
}

// --- DEBUGGING ---
console.log(`Final Connection String: ${connectionString}`)
console.log(`-------------------------------------------`)
// --- END DEBUGGING ---

if (!process.env.RESEND_API) {
  throw new Error('RESEND_API environment variable is not set!')
}

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
  admin: {
    // ... your admin config
    user: Users.slug,
  },
  editor: defaultLexical,

  // --- DATABASE CONFIG WITH DEBUGGING ---
  db: postgresAdapter({
    pool: {
      connectionString,
      // Conditionally apply SSL settings ONLY in production.
      // For development, we spread an empty object, so the `ssl` key is omitted entirely.
      ...(isProduction
        ? {
            ssl: {
              rejectUnauthorized: false,
            },
          }
        : {}),
    },
  }),

  email: resendAdapter({
    apiKey: process.env.RESEND_API!,
    defaultFromAddress: 'noreply@mcrc.org',
    defaultFromName: 'MCRC',
  }),

  collections: [Pages, Posts, Media, Categories, Users, Events, Cases],
  globals: [Header, Footer],

  plugins: [
    ...plugins,
    formBuilderPlugin({
      redirectRelationships: ['pages'],
    }),
    s3Storage({
      collections: {
        media: {
          prefix: 'media-assets',
        },
      },
      bucket: process.env.S3_BUCKET!,
      config: {
        endpoint: process.env.S3_ENDPOINT!,
        region: process.env.S3_REGION!,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID!,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
        },
      },
    }),
  ],

  secret: process.env.PAYLOAD_SECRET!,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        if (req.user) return true
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${process.env.CRON_SECRET}`
      },
    },
    tasks: [],
  },
  graphQL: {
    schemaOutputFile: path.resolve(dirname, 'generated-schema.graphql'),
  },
})
