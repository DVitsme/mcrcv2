// src/lib/payload-api-events.ts
import type { Event } from '@/payload-types'

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL
if (!SERVER_URL) console.error('FATAL: NEXT_PUBLIC_SERVER_URL is not set.')

// Published or completed:
export async function fetchPublishedEvents(): Promise<Event[]> {
  try {
    const res = await fetch(
      `${SERVER_URL}/api/events?where[_status][in]=published,completed&sort=-eventStartTime&depth=1`,
      { next: { revalidate: 60 } },
    )
    if (!res.ok) throw new Error(res.statusText)
    const data = await res.json()
    return data.docs || []
  } catch (e) {
    console.error('Error in fetchPublishedEvents:', e)
    return []
  }
}

export async function fetchEventTypeBadges(): Promise<string[]> {
  try {
    // Ask for both shapes; Payload will ignore unknown selects
    const res = await fetch(
      `${SERVER_URL}/api/events?limit=1000&select=eventType&select=meta.eventType`,
      { next: { revalidate: 3600 } },
    )
    if (!res.ok) throw new Error(res.statusText)

    // Be liberal in what we accept; narrow at the edge
    type MinimalEvent = {
      eventType?: string | null
      meta?: { eventType?: string | null } | null
    }

    const data = await res.json()
    const docs: MinimalEvent[] = data.docs || []

    const badges = docs
      .map((e) => e.eventType ?? e.meta?.eventType ?? null)
      .filter((v): v is string => Boolean(v))

    return [...new Set(badges)]
  } catch (e) {
    console.error('Error in fetchEventTypeBadges:', e)
    return []
  }
}

export async function fetchEventBySlug(slug: string): Promise<Event | null> {
  try {
    // Try both top-level and nested slug
    const res = await fetch(
      `${SERVER_URL}/api/events?where[or][0][slug][equals]=${slug}&where[or][1][meta.slug][equals]=${slug}&limit=1&depth=2`,
      { next: { revalidate: 60 } },
    )
    if (!res.ok) throw new Error(res.statusText)
    const data = await res.json()
    return data.docs?.[0] ?? null
  } catch (e) {
    console.error('Error fetching event by slug:', e)
    return null
  }
}
