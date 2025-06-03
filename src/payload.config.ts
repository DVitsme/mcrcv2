// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
// import { supabase } from './utilities/supabase'

// Add these imports back:
import { parse } from 'pg-connection-string'
import type { PoolConfig } from 'pg' // pg is a peer/sub-dependency of @payloadcms/db-postgres

import sharp from 'sharp' // sharp-import
import path from 'path'
// If PayloadRequest was from 'payload/config', keep as is. If it causes type errors,
// it's often from 'payload/types': import type { PayloadRequest } from 'payload/types';
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const connectionString = process.env.DATABASE_URL
if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is not set!')
}

// Re-introduce parsing and manual poolConfig construction
const dbConfig = parse(connectionString)
const port = dbConfig.port ? parseInt(dbConfig.port, 10) : 5432 // Default to 5432 if not present

let sslConfig: PoolConfig['ssl'] = undefined
if (
  dbConfig.ssl === 'true' ||
  dbConfig.ssl === true ||
  typeof dbConfig.ssl === 'object' ||
  dbConfig.ssl === 'require' ||
  dbConfig.ssl === 'allow' ||
  dbConfig.ssl === 'prefer'
) {
  sslConfig = { rejectUnauthorized: false } // For Supabase/cloud DBs
} else if (dbConfig.ssl === 'no-verify') {
  // Common way to specify rejectUnauthorized: false in connection strings
  sslConfig = { rejectUnauthorized: false }
}

const poolConfig: PoolConfig = {
  host: dbConfig.host!,
  port: port,
  user: dbConfig.user!,
  password: dbConfig.password!,
  database: dbConfig.database!,
  ssl: sslConfig,
  // @ts-ignore - The 'family' property is a valid Node.js net.connect option passed through by pg
  family: 4, // Attempt to force IPv4
}

export default buildConfig({
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
    pool: poolConfig, // Use the manually constructed poolConfig
  }),
  collections: [Pages, Posts, Media, Categories, Users],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer],
  plugins: [
    ...plugins,
    // storage-adapter-placeholder
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
})
