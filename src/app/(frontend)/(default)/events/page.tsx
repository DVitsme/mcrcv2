import { Suspense } from 'react'
import type { Metadata } from 'next'
import { fetchPublishedEvents, fetchEventTypeBadges } from '@/lib/payload-api-events'
import { EventsPageClient } from '@/components/clients/EventsPageClient'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const runtime = 'nodejs'

export const metadata: Metadata = {
  title: 'Events | Mediation and Conflict Resolution Center',
  description:
    'Join our in-person and online workshops to build mediation skills, strengthen connections, and turn conflict into community.',
  openGraph: {
    title: 'Events | Mediation and Conflict Resolution Center',
    description:
      'Join our in-person and online workshops to build mediation skills, strengthen connections, and turn conflict into community.',
    type: 'website',
  },
}

export default async function EventsPage() {
  const [events, badges] = await Promise.all([fetchPublishedEvents(), fetchEventTypeBadges()])

  return (
    <Suspense fallback={<div className="container mx-auto py-16">Loading events…</div>}>
      <EventsPageClient events={events} badges={badges} />
    </Suspense>
  )
}
