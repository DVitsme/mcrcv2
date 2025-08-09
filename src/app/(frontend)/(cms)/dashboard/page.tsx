// src/app/(frontend)/(cms)/dashboard/page.tsx

import { cookies } from 'next/headers'
import Link from 'next/link'
import { BookOpen, Calendar, Edit } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { Event, Post, User } from '@/payload-types'

// Stability on Vercel
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// --- Data Fetching Functions ---

async function getCurrentUser(token: string): Promise<User | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    })
    if (res.ok) {
      const data = await res.json()
      return (data?.user ?? data) as User
    }
  } catch (error) {
    console.error('Error fetching current user:', error)
  }
  return null
}

async function getRecentPosts(token: string): Promise<Post[]> {
  try {
    const postsReq = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/posts?sort=-updatedAt&limit=3&depth=0`,
      {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store',
      },
    )
    if (postsReq.ok) {
      const data = await postsReq.json()
      return data.docs || []
    }
  } catch (error) {
    console.error('Error fetching recent posts:', error)
  }
  return []
}

async function getUpcomingEvents(token: string): Promise<Event[]> {
  try {
    const now = new Date().toISOString()
    // --- CORRECTED: The query now uses the top-level `eventStartTime` field ---
    const eventsReq = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/events?where[eventStartTime][greater_than]=${now}&sort=eventStartTime&limit=3&depth=0`,
      {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store',
      },
    )
    if (eventsReq.ok) {
      const data = await eventsReq.json()
      return data.docs || []
    }
  } catch (error) {
    console.error('Error fetching upcoming events:', error)
  }
  return []
}

// --- Main Dashboard Page Component ---
export default async function Dashboard() {
  const cookieStore = await cookies()
  const token = cookieStore.get('payload-token')?.value || ''

  const [user, recentPosts, upcomingEvents] = await Promise.all([
    getCurrentUser(token),
    getRecentPosts(token),
    getUpcomingEvents(token),
  ])

  const formatDate = (dateString?: string) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back, {user?.name?.split(' ')[0] || 'Admin'}!
          </h1>
          <p className="text-muted-foreground">Here&apos;s a quick overview of your site.</p>
        </div>
      </div>

      {/* Quick Action Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Manage Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">View, edit, and manage all events.</p>
            <Button asChild size="sm" className="mt-4 w-full">
              <Link href="/events">Go to Events</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Manage Blog Posts</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">View, edit, and manage all posts.</p>
            <Button asChild size="sm" className="mt-4 w-full">
              <Link href="/posts">Go to Posts</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Section */}
      <div className="grid gap-8 md:grid-cols-2">
        {/* Recent Posts */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Blog Posts</CardTitle>
            <CardDescription>The last 3 posts that were created or updated.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPosts.length > 0 ? (
                recentPosts.map((post) => (
                  <div key={post.id} className="flex items-center">
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">{post.title}</p>
                      <p className="text-xs text-muted-foreground">
                        Last updated: {formatDate(post.updatedAt)}
                      </p>
                    </div>
                    <Badge
                      className={
                        post._status === 'published'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }
                    >
                      {post._status}
                    </Badge>
                    <Button asChild variant="ghost" size="icon" className="ml-2">
                      <Link href={`/posts/${post.id}`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No posts found.</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>The next 3 events on the calendar.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-center">
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">{event.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Starts: {formatDate(event.eventStartTime)}
                      </p>
                    </div>
                    <Badge
                      className={
                        event.meta.status === 'published'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }
                    >
                      {event.meta.status}
                    </Badge>
                    <Button asChild variant="ghost" size="icon" className="ml-2">
                      <Link href={`/events/${event.id}`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No upcoming events found.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
