import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import { fetchEventBySlug } from '@/lib/payload-api-events'
import { EventPageClient } from '@/components/clients/EventPageClient'
import { getServerSideURL } from '@/utilities/getURL'

type PageProps = { params: Promise<{ slug: string }> }

// --- SEO ---
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params // 👈 await
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

export default async function EventPage({ params }: PageProps) {
  const { slug } = await params // 👈 await
  const event = await fetchEventBySlug(slug)
  if (!event) return notFound()
  return <EventPageClient event={event} />
}

export const revalidate = 60

export async function generateStaticParams() {
  const base = getServerSideURL()
  try {
    // Only select meta.slug (no top-level slug in your collection)
    const res = await fetch(`${base}/api/events?limit=1000&select=meta.slug`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) return []
    const data = await res.json()
    const slugs: string[] = Array.isArray(data?.docs)
      ? data.docs
          .map((d: any) => d?.meta?.slug)
          .filter((s: any) => typeof s === 'string' && s.length > 0)
      : []
    return slugs.map((slug) => ({ slug }))
  } catch {
    return []
  }
}
