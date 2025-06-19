import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

// Load environment variables from .env file
const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({
  path: path.resolve(__dirname, '../.env'),
})

import { postgresAdapter } from '@payloadcms/db-postgres'
import sharp from 'sharp' // sharp-import
import { buildConfig, PayloadRequest } from 'payload'
import { resendAdapter } from '@payloadcms/email-resend'
import { s3Storage } from '@payloadcms/storage-s3'

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

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

let connectionString: string | undefined

if (process.env.NODE_ENV === 'production') {
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

if (!process.env.RESEND_API) {
  throw new Error('RESEND_API environment variable is not set!')
}

const s3Bucket = process.env.S3_BUCKET
const s3Endpoint = process.env.S3_ENDPOINT
const s3Region = process.env.S3_REGION
const s3AccessKeyId = process.env.S3_ACCESS_KEY_ID
const s3SecretAccessKey = process.env.S3_SECRET_ACCESS_KEY

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
  admin: {
    components: {
      beforeLogin: ['@/components/BeforeLogin'],
      beforeDashboard: ['@/components/BeforeDashboard'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 375, height: 667 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
  },
  editor: defaultLexical,
  db: postgresAdapter({
    pool: {
      connectionString,
      ssl: { rejectUnauthorized: false }, // Important for cloud DBs
    },
  }),
  email: resendAdapter({
    apiKey: process.env.RESEND_API!,
    defaultFromAddress: 'noreply@mcrc.org',
    defaultFromName: 'MCRC',
  }),
  collections: [Pages, Posts, Media, Categories, Users, Events, Cases],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer],
  plugins: [
    ...plugins, // Your other custom plugins from './plugins'
    s3Storage({
      collections: {
        media: {
          prefix: 'media-assets',
        },
      },
      // Use the variables we defined above for debugging
      bucket: s3Bucket!,
      config: {
        endpoint: s3Endpoint!,
        region: s3Region!,
        credentials: {
          accessKeyId: s3AccessKeyId!,
          secretAccessKey: s3SecretAccessKey!,
        },
      },
    }),
  ],
  secret: process.env.PAYLOAD_SECRET,
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
