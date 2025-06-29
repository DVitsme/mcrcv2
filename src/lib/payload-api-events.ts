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
    if (!SERVER_URL) {
      throw new Error('Server URL is not configured. Cannot fetch events.')
    }

    const response = await fetch(
      // We query for events that are 'published' OR 'completed' so past events show up.
      // We sort by '-eventStartTime' to put the most recent/upcoming events first.
      // 'depth=1' is crucial to populate the 'featuredImage' relationship field.
      `${SERVER_URL}/api/events?where[status][in]=published,completed&sort=-eventStartTime&depth=1`,
      {
        next: {
          // Revalidate data every 60 seconds to catch new or updated events
          revalidate: 60,
        },
      },
    )

    if (!response.ok) {
      // Log the response body for more context on the error
      const errorBody = await response.text()
      console.error(`API Error: ${response.status} ${response.statusText}`, errorBody)
      throw new Error(`Failed to fetch events: ${response.statusText}`)
    }

    const data = await response.json()
    // The actual documents are in the 'docs' property of the response
    return data.docs || []
  } catch (error) {
    console.error('Error in fetchPublishedEvents:', error)
    // Return an empty array to prevent the page from crashing
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
    if (!SERVER_URL) {
      throw new Error('Server URL is not configured. Cannot fetch event types.')
    }

    // Fetch all events, but only select the 'eventType' field for efficiency.
    // A high limit ensures we get most/all events to find unique badges.
    const response = await fetch(`${SERVER_URL}/api/events?limit=1000&select=eventType`, {
      next: {
        revalidate: 3600, // Revalidate once per hour, as these values change infrequently
      },
    })

    if (!response.ok) {
      const errorBody = await response.text()
      console.error(`API Error: ${response.status} ${response.statusText}`, errorBody)
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

/**
 * Fetches a single event by its slug.
 * @param slug - The slug of the event to fetch.
 */
export async function fetchEventBySlug(slug: string): Promise<Event | null> {
  try {
    const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL
    if (!SERVER_URL) throw new Error('Server URL is not configured.')

    const response = await fetch(
      // We use depth=2 to populate any relationships, like 'featuredImage' or 'speakers'
      `${SERVER_URL}/api/events?where[slug][equals]=${slug}&limit=1&depth=2`,
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
