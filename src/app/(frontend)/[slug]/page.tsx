import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { homeStatic } from '@/endpoints/seed/home-static'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'

/**
 * This function generates static paths for all pages at build time
 * It fetches all published pages from the CMS and creates routes for them
 * This enables static site generation (SSG) for better performance
 */
export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  // Filter out the home page and create route parameters for each page
  const params = pages.docs
    ?.filter((doc) => {
      return doc.slug !== 'home'
    })
    .map(({ slug }) => {
      return { slug }
    })

  return params
}

// Type definition for the page component props
type Args = {
  params: Promise<{
    slug?: string
  }>
}

/**
 * Main page component that renders dynamic pages based on the URL slug
 * This is a Server Component that handles data fetching and rendering
 */
export default async function Page({ params: paramsPromise }: Args) {
  // Check if we're in draft mode (for CMS preview)
  const { isEnabled: draft } = await draftMode()
  // Get the slug from the URL, defaulting to 'home' if not provided
  const { slug = 'home' } = await paramsPromise
  const url = '/' + slug

  // Fetch the page data from the CMS
  let page: RequiredDataFromCollectionSlug<'pages'> | null
  page = await queryPageBySlug({
    slug,
  })

  // Temporary fallback for home page if CMS data isn't available
  if (!page && slug === 'home') {
    page = homeStatic
  }

  // If no page is found, show the redirects component
  if (!page) {
    return <PayloadRedirects url={url} />
  }

  // Destructure the page content
  const { hero, layout } = page

  return (
    <article className="pt-16 pb-24">
      {/* Client-side component for interactive features */}
      <PageClient />
      {/* Handles redirects for valid pages */}
      <PayloadRedirects disableNotFound url={url} />

      {/* Shows live preview UI when in draft mode */}
      {draft && <LivePreviewListener />}

      {/* Render the hero section and page content blocks */}
      <RenderHero {...hero} />
      <RenderBlocks blocks={layout} />
    </article>
  )
}

/**
 * Generates metadata for the page (title, description, etc.)
 * This is used by Next.js for SEO and social sharing
 */
export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = 'home' } = await paramsPromise
  const page = await queryPageBySlug({
    slug,
  })

  return generateMeta({ doc: page })
}

/**
 * Cached function to fetch page data from the CMS
 * Uses React's cache to prevent duplicate requests
 * Handles both published and draft content based on mode
 */
const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})

/**
 * For me when I forget how this works
1) Page Structure and Purpose
** This is a dynamic page component in Next.js that handles rendering of CMS-powered pages. 
** It's located in the [slug] directory, which means it can handle any URL path and 
** render the appropriate content based on the slug.
2) Key Features:
- Static Site Generation (SSG) support
- CMS integration with Payload
- Draft mode for content preview
- SEO metadata generation
- Responsive layout with hero sections and content blocks
3) Main Components:
- generateStaticParams: Pre-generates all possible page routes at build time
- Page: The main component that renders the page content
- generateMetadata: Handles SEO metadata
- queryPageBySlug: Cached function for fetching page data
4) Data Flow:
- Apply to page.tsx
- Important Patterns Used:
- Server Components (async components)
- React's cache for data fetching
- TypeScript for type safety
- Conditional rendering based on draft mode
- Fallback content for the home page
5) Key Features Explained:
- Static Generation:
- Apply to page.tsx
This function runs at build time to create static pages for all your CMS content, improving performance.
- Draft Mode:
- Apply to page.tsx
Allows content editors to preview changes before publishing.
- Content Rendering:
- Apply to page.tsx
Modular approach to rendering different types of content.
Performance Optimizations:
- Cached data fetching with cache
- Static page generation
- Server-side rendering
- TypeScript for better development experience
- Error Handling:
- Fallback to static home page if CMS data isn't available
- Redirect handling for non-existent pages
- Type safety with TypeScript
 */
