'use client'

import { FileText } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import type { Event } from '@/payload-types'
import { useState, useTransition } from 'react'

/**
 * EventsPageClient Component
 *
 * This is a Client Component that handles the interactive UI for the events page.
 * It receives pre-fetched data from the server component and manages:
 *
 * 1. Event filtering by type badges
 * 2. Client-side state for selected filters
 * 3. Interactive UI elements and transitions
 * 4. Responsive layout and styling
 *
 * The component uses React's useTransition for smooth filter changes
 * and maintains a consistent UI during data updates.
 */
export function EventsPageClient({ events, badges }: { events: Event[]; badges: string[] }) {
  // State for the currently selected event type filter
  const [selectedBadge, setSelectedBadge] = useState<string>('all')
  // Use transition for smooth filter changes
  const [isPending, startTransition] = useTransition()

  // Filter events based on selected badge
  const filteredEvents =
    selectedBadge === 'all' ? events : events.filter((event) => event.eventType === selectedBadge)

  /**
   * EmptyState Component
   *
   * Displays a message when no events match the current filter criteria
   */
  function EmptyState() {
    return (
      <div className="col-span-full flex flex-col items-center justify-center mt-32 py-12 text-center">
        <FileText className="mb-4 h-12 w-12 text-muted-foreground" strokeWidth={1} />
        <h3 className="text-xl font-semibold">No events found</h3>
        <p className="mt-2 text-muted-foreground">
          There are no events matching your current filter. Try selecting a different category.
        </p>
      </div>
    )
  }

  return (
    <section className="bg-muted/60 mt-32 py-16">
      <div className="center-container">
        <div className="relative mx-auto flex max-w-screen-xl flex-col gap-20 lg:flex-row">
          {/* Left sidebar with filters */}
          <header className="top-10 flex h-fit flex-col items-center gap-5 text-center lg:sticky lg:max-w-80 lg:items-start lg:gap-8 lg:text-left">
            <FileText className="h-full w-14" strokeWidth={1} />
            <h1 className="text-4xl font-extrabold lg:text-5xl">Our Events</h1>
            <p className="text-muted-foreground lg:text-xl">
              Join our in-person and online workshops to build mediation skills, strengthen
              connections, and turn conflict into community.
            </p>
            <Separator />
            {/* Filter buttons */}
            <nav
              className="flex flex-wrap items-center justify-center gap-2 lg:flex-col lg:items-start lg:gap-2 mt-2"
              aria-label="Event filters"
            >
              <button
                className={`font-medium px-3 py-1 rounded-full transition-colors ${
                  selectedBadge === 'all'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-primary'
                }`}
                onClick={() => setSelectedBadge('all')}
                disabled={isPending}
                aria-pressed={selectedBadge === 'all'}
              >
                All
              </button>
              {badges.map((badge) => (
                <button
                  key={badge}
                  className={`px-3 py-1 rounded-full transition-colors ${
                    selectedBadge === badge
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-primary'
                  }`}
                  onClick={() => startTransition(() => setSelectedBadge(badge))}
                  disabled={isPending}
                  aria-pressed={selectedBadge === badge}
                >
                  {badge}
                </button>
              ))}
            </nav>
          </header>
          {/* Event grid */}
          <div className="w-full grid justify-items-stretch grid-cols-1 gap-4 md:grid-cols-2">
            {filteredEvents.length === 0 ? (
              <EmptyState />
            ) : (
              filteredEvents.map((event) => (
                <Link
                  href={`/events/${event.slug}`}
                  key={event.id}
                  className="w-full group relative isolate h-80 rounded-lg bg-background"
                >
                  <div className="z-10 flex h-full flex-col justify-between p-6">
                    <div className="flex justify-between">
                      <time
                        dateTime={event.eventStartTime || ''}
                        className="text-muted-foreground transition-colors duration-500 group-hover:text-background"
                      >
                        {event.eventStartTime
                          ? new Date(event.eventStartTime).toLocaleDateString(undefined, {
                              dateStyle: 'medium',
                            })
                          : ''}
                      </time>
                      <Badge variant={event.modality === 'online' ? 'secondary' : 'default'}>
                        {event.modality?.replace('_', ' ')}
                      </Badge>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h2 className="line-clamp-2 text-xl font-medium transition-colors duration-500 group-hover:text-background">
                        {event.name}
                      </h2>
                    </div>
                  </div>
                  <Image
                    src={
                      typeof event.featuredImage === 'object' && event.featuredImage?.url
                        ? event.featuredImage.url
                        : '/images/event-placeholder.jpg'
                    }
                    alt={
                      typeof event.featuredImage === 'object' && event.featuredImage?.alt
                        ? event.featuredImage.alt
                        : event.name
                    }
                    loading="lazy"
                    className="absolute inset-0 -z-10 size-full rounded-lg object-cover brightness-50 transition-all duration-500 ease-custom-bezier [clip-path:inset(0_0_100%_0)] group-hover:[clip-path:inset(0_0_0%_0)]"
                    width={1000}
                    height={1000}
                  />
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
