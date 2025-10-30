import type { Event } from '@/types'
import { getServerSideURL } from '@/utilities/getURL'

const BASE = getServerSideURL()

export async function fetchPublishedEvents(): Promise<Event[]> {
  const url = `${BASE}/api/events?sort=-eventStartTime&depth=2&limit=1000`
  try {
    const res = await fetch(url, { next: { revalidate: 60 } })
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
    const res = await fetch(`${BASE}/api/events?limit=1000&select=meta.eventType`, {
      next: { revalidate: 3600 },
    })
    if (!res.ok) throw new Error(res.statusText)
    const data = await res.json()
    const docs: Array<{ meta?: { eventType?: string | null } }> = data.docs || []
    const badges = docs.map((e) => e.meta?.eventType ?? null).filter((v): v is string => !!v)
    return [...new Set(badges)]
  } catch (e) {
    console.error('Error in fetchEventTypeBadges:', e)
    return []
  }
}

export async function fetchEventBySlug(slug: string): Promise<Event | null> {
  try {
    const res = await fetch(
      `${BASE}/api/events?where[meta.slug][equals]=${encodeURIComponent(slug)}&limit=1&depth=2`,
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
