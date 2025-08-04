import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { fetchEventBySlug } from '@/lib/payload-api-events'
import { EventPageClient } from '@/components/clients/EventPageClient' // Corrected import path

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const event = await fetchEventBySlug(slug)
  if (!event) return { title: 'Event Not Found' }

  return {
    title: event.name,
    description: event.summary,
  }
}

export default async function EventPage({ params }: Props) {
  const { slug } = await params
  const event = await fetchEventBySlug(slug)
  if (!event) return notFound()

  return <EventPageClient event={event} />
}
