import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import { fetchEventBySlug } from '@/lib/payload-api-events'
import { EventPageClient } from '@/components/clients/EventPageClient'
import { getServerSideURL } from '@/utilities/getURL'

type Params = { slug: string }

// Narrower, safe check for the params shape
function isParams(x: unknown): x is Params {
  return (
    typeof x === 'object' &&
    x !== null &&
    'slug' in x &&
    typeof (x as Record<string, unknown>).slug === 'string'
  )
}

async function resolveParams(input: unknown): Promise<Params> {
  const maybe = (input as { params?: unknown })?.params
  // If it's a Promise, await it
  if (maybe && typeof (maybe as Promise<unknown>).then === 'function') {
    const awaited = await (maybe as Promise<unknown>)
    if (isParams(awaited)) return awaited
  }
  if (isParams(maybe)) return maybe
  throw new Error('Invalid route params')
}

// --- SEO ---
export async function generateMetadata(props: { params: unknown }): Promise<Metadata> {
  const { slug } = await resolveParams(props)

  const event = await fetchEventBySlug(slug)
  if (!event) return { title: 'Event Not Found', robots: { index: false } }

  const title = event.name || 'Event'
  const description = event.summary || 'Event details'
  const image =
    typeof event.featuredImage === 'object' && event.featuredImage?.url
      ? event.featuredImage.url
      : undefined
  const canonical = `${getServerSideURL()}/events/${encodeURIComponent(slug)}`

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'article',
      images: image ? [{ url: image, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : undefined,
    },
  }
}

export default async function EventPage(props: { params: unknown }) {
  const { slug } = await resolveParams(props)

  const event = await fetchEventBySlug(slug)
  if (!event) return notFound()

  return <EventPageClient event={event} />
}

export const revalidate = 60

// --- Static params generation stays typed explicitly ---
type SlugDoc = { meta?: { slug?: string | null } }

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const base = getServerSideURL()
  try {
    const res = await fetch(`${base}/api/events?limit=1000&select=meta.slug`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) return []

    const data = await res.json()
    const slugs: string[] = Array.isArray(data?.docs)
      ? data.docs
          .map((d: SlugDoc) => d?.meta?.slug)
          .filter((s: string | undefined): s is string => typeof s === 'string' && s.length > 0)
      : []

    return slugs.map((slug) => ({ slug }))
  } catch {
    return []
  }
}
