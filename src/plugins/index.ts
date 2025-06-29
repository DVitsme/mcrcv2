// src/plugins/index.ts

import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { searchPlugin } from '@payloadcms/plugin-search'
import { seoPlugin } from '@payloadcms/plugin-seo'
import type { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import type { Plugin } from 'payload'

import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { beforeSyncWithSearch } from '@/search/beforeSync'
import { searchFields } from '@/search/fieldOverrides'
import type { Page, Post } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'

const generateTitle: GenerateTitle<Post | Page> = ({ doc }) => {
  return doc?.title ? `${doc.title} | MCRC Howard` : 'MCRC Howard'
}

const generateURL: GenerateURL<Post | Page> = ({ doc }) => {
  const url = getServerSideURL()
  const slug = doc?.slug ?? ''

  // Handle homepage case where slug might be 'home' or '/'
  if (slug === 'home' || slug === '/') {
    return url
  }

  return doc?.slug ? `${url}/${doc.slug}` : url
}

const pluginsToUse: Plugin[] = [
  redirectsPlugin({
    collections: ['pages', 'posts'],
    // --- CORRECTED: 'hooks' must be placed inside the 'overrides' object ---
    overrides: {
      hooks: {
        afterChange: [revalidateRedirects],
      },
      // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'from') {
            return {
              ...field,
              admin: {
                description: 'You will need to rebuild the website when changing this field.',
              },
            }
          }
          return field
        })
      },
    },
  }),
  nestedDocsPlugin({
    collections: ['categories'],
    generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
  }),
  seoPlugin({
    generateTitle,
    generateURL,
    collections: ['pages', 'posts'], // Ensure SEO fields apply to both collections
  }),
  searchPlugin({
    collections: ['posts'],
    beforeSync: beforeSyncWithSearch,
    searchOverrides: {
      fields: ({ defaultFields }) => {
        return [...defaultFields, ...searchFields]
      },
    },
  }),
]

// Conditionally add the Payload Cloud plugin only in production
if (process.env.NODE_ENV === 'production') {
  pluginsToUse.push(payloadCloudPlugin())
}

export const plugins = pluginsToUse
