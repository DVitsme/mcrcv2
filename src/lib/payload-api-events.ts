import type { Event } from '@/payload-types'

// Ensure we have a valid server URL
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

if (!SERVER_URL) {
  // This error will be logged on the server during build time or server-side rendering
  console.error('FATAL: NEXT_PUBLIC_SERVER_URL is not set in environment variables.')
}

/**
 * Fetches all published or completed events from the Payload API.
 * Sorts them by start time descending (newest first).
 * @returns {Promise<Event[]>} A promise that resolves to an array of events.
 */
export async function fetchPublishedEvents(): Promise<Event[]> {
  try {
    if (!SERVER_URL) throw new Error('Server URL is not configured.')

    const response = await fetch(
      // --- CORRECTED: Query path is now `meta.status` ---
      `${SERVER_URL}/api/events?where[meta.status][in]=published,completed&sort=-eventStartTime&depth=1`,
      { next: { revalidate: 60 } },
    )

    if (!response.ok) throw new Error(`Failed to fetch events: ${response.statusText}`)

    const data = await response.json()
    return data.docs || []
  } catch (error) {
    console.error('Error in fetchPublishedEvents:', error)
    return []
  }
}

// Interface for the specific shape of the event type response
interface EventTypeResponse {
  docs: Array<{
    eventType: string | null
  }>
}

/**
 * Fetches all unique 'eventType' badge values from the events collection.
 * This is useful for building filter UIs.
 * @returns {Promise<string[]>} A promise that resolves to an array of unique event type strings.
 */
export async function fetchEventTypeBadges(): Promise<string[]> {
  try {
    if (!SERVER_URL) throw new Error('Server URL is not configured.')

    // --- CORRECTED: Select path is now `meta.eventType` ---
    const response = await fetch(`${SERVER_URL}/api/events?limit=1000&select=meta.eventType`, {
      next: { revalidate: 3600 },
    })

    if (!response.ok) throw new Error(`Failed to fetch event types: ${response.statusText}`)

    const data = await response.json()
    const events = data.docs || []

    const uniqueBadges = [
      ...new Set(events.map((event: Event) => event.meta?.eventType).filter(Boolean)),
    ] as string[]

    return uniqueBadges
  } catch (error) {
    console.error('Error in fetchEventTypeBadges:', error)
    return []
  }
}

/**
 * Fetches a single event by its slug.
 * @param slug - The slug of the event to fetch.
 */
export async function fetchEventBySlug(slug: string): Promise<Event | null> {
  try {
    const response = await fetch(
      // Use the nested `meta.slug` for the query
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/events?where[meta.slug][equals]=${slug}&limit=1&depth=2`,
      { next: { revalidate: 60 } },
    )
    if (!response.ok) throw new Error(`Failed to fetch event with slug ${slug}`)

    const data = await response.json()
    return data.docs[0] || null
  } catch (error) {
    console.error('Error fetching event by slug:', error)
    return null
  }
}
