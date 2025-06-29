/**
 * This file serves as the central library for all Payload API calls.
 * It contains functions for fetching data related to various collections
 * like Posts, Categories, and Events.
 */

import type { Post, Category, Event } from '@/payload-types'

// --- General Setup ---
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

if (!SERVER_URL) {
  // This error will be logged on the server during build time or server-side rendering
  console.error('FATAL: NEXT_PUBLIC_SERVER_URL is not set in environment variables.')
}

// ====================================================================
//                          BLOG API CALLS
// ====================================================================

/**
 * Fetches published posts from the Payload API. Can optionally filter by category.
 * @param categorySlug - The slug of the category to filter by.
 */
export async function fetchPosts(categorySlug?: string): Promise<Post[]> {
  try {
    if (!SERVER_URL) throw new Error('Server URL is not configured.')

    let whereClause = `where[and][0][_status][equals]=published`

    if (categorySlug) {
      const categoryResponse = await fetch(
        `${SERVER_URL}/api/categories?where[slug][equals]=${categorySlug}&limit=1`,
      )
      if (categoryResponse.ok) {
        const categoryData = await categoryResponse.json()
        if (categoryData.docs.length > 0) {
          const categoryId = categoryData.docs[0].id
          whereClause += `&where[and][1][categories][in]=${categoryId}`
        } else {
          return []
        }
      }
    }

    const response = await fetch(
      `${SERVER_URL}/api/posts?${whereClause}&sort=-publishedAt&depth=2`,
      { next: { revalidate: 60 } },
    )

    if (!response.ok) throw new Error(`Failed to fetch posts: ${response.statusText}`)

    const data = await response.json()
    return data.docs || []
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

/**
 * Fetches the most recent published post to be used as the "featured" post.
 */
export async function fetchFeaturedPost(): Promise<Post | null> {
  try {
    if (!SERVER_URL) throw new Error('Server URL is not configured.')

    const response = await fetch(
      `${SERVER_URL}/api/posts?where[_status][equals]=published&sort=-publishedAt&limit=1&depth=2`,
      { next: { revalidate: 60 } },
    )
    if (!response.ok) throw new Error('Failed to fetch featured post.')

    const data = await response.json()
    return data.docs[0] || null
  } catch (error) {
    console.error('Error fetching featured post:', error)
    return null
  }
}

/**
 * Fetches all categories (formerly tags).
 */
export async function fetchCategories(): Promise<Category[]> {
  try {
    if (!SERVER_URL) throw new Error('Server URL is not configured.')

    const response = await fetch(`${SERVER_URL}/api/categories?limit=100`, {
      next: { revalidate: 3600 },
    })
    if (!response.ok) throw new Error('Failed to fetch categories.')

    const data = await response.json()
    return data.docs || []
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

/**
 * Fetches a single post by its slug.
 */
export async function fetchPostBySlug(slug: string): Promise<Post | null> {
  try {
    if (!SERVER_URL) throw new Error('Server URL is not configured.')

    const response = await fetch(
      `${SERVER_URL}/api/posts?where[slug][equals]=${slug}&limit=1&depth=2`,
      { next: { revalidate: 60 } },
    )
    if (!response.ok) throw new Error(`Failed to fetch post with slug ${slug}`)

    const data = await response.json()
    return data.docs[0] || null
  } catch (error) {
    console.error('Error fetching post by slug:', error)
    return null
  }
}

/**
 * Fetches related posts based on shared categories.
 */
export async function fetchRelatedPosts(
  currentPostId: number | string,
  categoryIds: (number | string)[],
): Promise<Post[]> {
  if (!categoryIds || categoryIds.length === 0) return []

  try {
    if (!SERVER_URL) throw new Error('Server URL is not configured.')

    const response = await fetch(
      `${SERVER_URL}/api/posts?where[and][0][categories][in]=${categoryIds.join(
        ',',
      )}&where[and][1][id][not_equals]=${currentPostId}&limit=3&depth=1`,
      { next: { revalidate: 3600 } },
    )
    if (!response.ok) throw new Error('Failed to fetch related posts.')

    const data = await response.json()
    return data.docs || []
  } catch (error) {
    console.error('Error fetching related posts:', error)
    return []
  }
}

// ====================================================================
//                          EVENTS API CALLS
// ====================================================================

interface EventTypeResponse {
  docs: Array<{
    eventType: string | null
  }>
}

/**
 * Fetches all published or completed events from the Payload API.
 */
export async function fetchPublishedEvents(): Promise<Event[]> {
  try {
    if (!SERVER_URL) throw new Error('Server URL is not configured.')

    const response = await fetch(
      `${SERVER_URL}/api/events?where[status][in]=published,completed&sort=-eventStartTime&depth=1`,
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

/**
 * Fetches all unique 'eventType' badge values from the events collection.
 */
export async function fetchEventTypeBadges(): Promise<string[]> {
  try {
    if (!SERVER_URL) throw new Error('Server URL is not configured.')

    const response = await fetch(`${SERVER_URL}/api/events?limit=1000&select=eventType`, {
      next: { revalidate: 3600 },
    })

    if (!response.ok) throw new Error(`Failed to fetch event types: ${response.statusText}`)

    const data = (await response.json()) as EventTypeResponse
    const events = data.docs || []

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
