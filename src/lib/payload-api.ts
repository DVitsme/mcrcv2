import type { Event } from '@/payload-types'

// Ensure we have a valid server URL
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

if (!SERVER_URL) {
  console.error('NEXT_PUBLIC_SERVER_URL is not set in environment variables')
}

/**
 * Fetches all published or completed events from the Payload API.
 * Sorts them by start time descending (newest first).
 */
export async function fetchPublishedEvents(): Promise<Event[]> {
  try {
    if (!SERVER_URL) {
      throw new Error('NEXT_PUBLIC_SERVER_URL is not set')
    }

    const response = await fetch(
      // We query for events that are 'published' OR 'completed' so past events show up.
      // We sort by '-eventStartTime' to put the most recent/upcoming events first.
      // 'depth=1' is crucial to populate the 'featuredImage' relationship field.
      `${SERVER_URL}/api/events?where[status][in]=published,completed&sort=-eventStartTime&depth=1`,
      {
        next: {
          // Revalidate data every 60 seconds to catch new events
          revalidate: 60,
        },
      },
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch events: ${response.statusText}`)
    }

    const data = await response.json()
    return data.docs || []
  } catch (error) {
    console.error('Error in fetchPublishedEvents:', error)
    return []
  }
}

interface EventTypeResponse {
  docs: Array<{
    eventType: string | null
  }>
}

/**
 * Fetches all unique 'eventType' badge values from the events collection.
 */
export async function fetchEventTypeBadges(): Promise<string[]> {
  try {
    if (!SERVER_URL) {
      throw new Error('NEXT_PUBLIC_SERVER_URL is not set')
    }

    // Fetch all events, but only select the 'eventType' field for efficiency.
    // A high limit ensures we get most/all events to find unique badges.
    const response = await fetch(`${SERVER_URL}/api/events?limit=1000&select=eventType`, {
      next: {
        revalidate: 3600, // Revalidate once per hour
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch event types: ${response.statusText}`)
    }

    const data = (await response.json()) as EventTypeResponse
    const events = data.docs || []

    // Use a Set to get only the unique badge values, and filter out any null/empty values.
    const uniqueBadges = [
      ...new Set(
        events.map((event) => event.eventType).filter((type): type is string => Boolean(type)),
      ),
    ]

    return uniqueBadges
  } catch (error) {
    console.error('Error in fetchEventTypeBadges:', error)
    return []
  }
}
