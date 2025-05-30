// Example: Fetching data in a Next.js page component (App Router)
// app/about/page.tsx

import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ArrowUpRight } from 'lucide-react'
import { Badge } from 'lucide-react'
import Image from 'next/image'

type Args = {
  params: Promise<{
    slug: string
  }>
}

interface Hero1Props {
  badge?: string
  heading: string
  description: string
  buttons?: {
    primary?: {
      text: string
      url: string
    }
    secondary?: {
      text: string
      url: string
    }
  }
  image: {
    src: string
    alt: string
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await queryPageBySlug({
    slug: 'about',
  })

  if (!page) {
    return {}
  }

  return generateMeta({ doc: page })
}

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

export default async function AboutPage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = 'about' } = await paramsPromise
  const url = '/' + slug

  const hero1: Hero1Props = {
    badge: '✨ Your Website Builder',
    heading: 'Blocks Built With Shadcn & Tailwind',
    description:
      'Finely crafted components built with React, Tailwind and Shadcn UI. Developers can copy and paste these blocks directly into their project.',
    buttons: {
      primary: {
        text: 'Discover all components',
        url: 'https://www.shadcnblocks.com',
      },
      secondary: {
        text: 'View on GitHub',
        url: 'https://www.shadcnblocks.com',
      },
    },
    image: {
      src: 'https://www.shadcnblocks.com/images/block/placeholder-1.svg',
      alt: 'Hero section demo image showing interface components',
    },
  }

  const page = await queryPageBySlug({
    slug,
  })

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  // const { hero, layout } = page

  return (
    <article className="pt-16 pb-24">
      <PageClient />
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <section className="py-32">
        <div className="container">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              {hero1.badge && (
                <Badge>
                  {hero1.badge}
                  <ArrowUpRight className="ml-2 size-4" />
                </Badge>
              )}
              <h1 className="my-6 text-4xl font-bold text-pretty lg:text-6xl">{hero1.heading}</h1>
              <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl">{hero1.description}</p>
              <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
                {hero1.buttons?.primary && (
                  <Button asChild className="w-full sm:w-auto">
                    <a href={hero1.buttons.primary.url}>{hero1.buttons.primary.text}</a>
                  </Button>
                )}
                {hero1.buttons?.secondary && (
                  <Button asChild variant="outline" className="w-full sm:w-auto">
                    <a href={hero1.buttons.secondary.url}>
                      {hero1.buttons.secondary.text}
                      <ArrowRight className="size-4" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
            <Image
              src={hero1.image.src}
              alt={hero1.image.alt}
              className="max-h-96 w-full rounded-md object-cover"
              width={500}
              height={500}
            />
          </div>
        </div>
      </section>
    </article>
  )
}
