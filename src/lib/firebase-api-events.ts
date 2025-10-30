/**
 * Firebase API calls for Events
 */

import { 
  collection, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit 
} from 'firebase/firestore'
import { db } from './firebase'
import type { Event } from '@/types'

interface EventTypeResponse {
  docs: Array<{
    eventType: string | null
  }>
}

/**
 * Fetches all published or completed events from Firebase.
 */
export async function fetchPublishedEvents(): Promise<Event[]> {
  try {
    const eventsQuery = query(
      collection(db, 'events'),
      where('meta.status', 'in', ['published', 'completed']),
      orderBy('eventStartTime', 'desc')
    )
    
    const snapshot = await getDocs(eventsQuery)
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Event))
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
    const eventsQuery = query(
      collection(db, 'events'),
      limit(1000)
    )
    
    const snapshot = await getDocs(eventsQuery)
    const events = snapshot.docs.map(doc => doc.data() as Event)

    const uniqueBadges = [
      ...new Set(
        events.map((event) => event.meta?.eventType).filter((type): type is string => Boolean(type)),
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
 */
export async function fetchEventBySlug(slug: string): Promise<Event | null> {
  try {
    const eventsQuery = query(
      collection(db, 'events'),
      where('slug', '==', slug),
      where('meta.status', 'in', ['published', 'completed'])
    )
    
    const snapshot = await getDocs(eventsQuery)
    if (snapshot.empty) return null
    
    return {
      id: snapshot.docs[0].id,
      ...snapshot.docs[0].data()
    } as Event
  } catch (error) {
    console.error('Error fetching event by slug:', error)
    return null
  }
}
