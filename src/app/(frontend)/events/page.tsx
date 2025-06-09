import type { Metadata } from 'next'
import { fetchPublishedEvents, fetchEventTypeBadges } from '@/lib/payload-api'
import { EventsPageClient } from '@/components/clients/EventsPageClient'

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
  // Fetch both events and event type badges concurrently using the new functions
  const [events, badges] = await Promise.all([fetchPublishedEvents(), fetchEventTypeBadges()])

  // Pass the fetched data to the client component
  return <EventsPageClient events={events} badges={badges} />
}
