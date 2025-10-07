import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import { fetchEventBySlug } from '@/lib/payload-api-events'
import { EventPageClient } from '@/components/clients/EventPageClient'
import { getServerSideURL } from '@/utilities/getURL'

// --- SEO ---
export async function generateMetadata({ params }: any): Promise<Metadata> {
  // Next 15: params can be a Promise
  const p = typeof params?.then === 'function' ? await params : params
  const slug: string = p.slug

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

export default async function EventPage({ params }: any) {
  const p = typeof params?.then === 'function' ? await params : params
  const slug: string = p.slug

  const event = await fetchEventBySlug(slug)
  if (!event) return notFound()
  return <EventPageClient event={event} />
}

export const revalidate = 60

// --- Static params generation stays typed explicitly (no conflict)
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
