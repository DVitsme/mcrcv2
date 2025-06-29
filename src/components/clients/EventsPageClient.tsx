'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, MapPin, CircleDollarSign } from 'lucide-react'

import { cn } from '@/utilities/ui'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Event, Media } from '@/payload-types'

interface EventsPageClientProps {
  events: Event[]
  badges: string[]
}

export function EventsPageClient({ events, badges }: EventsPageClientProps) {
  const [selectedBadge, setSelectedBadge] = useState<string | null>(null)

  const filteredEvents = selectedBadge
    ? events.filter((event) => event.meta.eventType === selectedBadge)
    : events

  const formatDate = (dateString?: string): string => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    })
  }

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto max-w-7xl">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-5 text-center">
          <h1 className="text-3xl font-bold text-pretty lg:text-5xl">Upcoming Events</h1>
          <p className="text-muted-foreground lg:text-lg">
            Join our in-person and online workshops to build mediation skills, strengthen
            connections, and turn conflict into community.
          </p>
        </div>

        {/* Filter badges */}
        {badges.length > 0 && (
          <div className="mx-auto mt-12 flex max-w-4xl flex-wrap justify-center gap-2">
            <Button
              variant={selectedBadge === null ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedBadge(null)}
            >
              All Events
            </Button>
            {badges.map((badge) => (
              <Button
                key={badge}
                variant={selectedBadge === badge ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedBadge(badge)}
              >
                {badge}
              </Button>
            ))}
          </div>
        )}

        {/* Events grid */}
        <div className="mx-auto mt-12 grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => {
            const featuredImage = event.featuredImage as Media
            return (
              <article
                key={event.id}
                className="group rounded-lg border bg-card transition-all hover:shadow-lg"
              >
                {featuredImage?.url && (
                  <div className="aspect-video overflow-hidden rounded-t-lg">
                    <Image
                      src={featuredImage.url}
                      alt={featuredImage.alt || event.name}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      width={400}
                      height={225}
                    />
                  </div>
                )}

                <div className="p-6">
                  {event.meta.eventType && (
                    <Badge variant="secondary" className="mb-3">
                      {event.meta.eventType}
                    </Badge>
                  )}

                  <h3 className="mb-2 text-xl font-semibold line-clamp-2">
                    <Link
                      href={`/events/${event.meta.slug || event.id}`}
                      className="hover:text-primary"
                    >
                      {event.name}
                    </Link>
                  </h3>

                  {event.summary && (
                    <p className="mb-4 text-sm text-muted-foreground line-clamp-3">
                      {event.summary}
                    </p>
                  )}

                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(event.eventStartTime)}</span>
                    </div>

                    {(event.location?.venueName || event.onlineMeeting?.url) && (
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>
                          {event.modality === 'online' ? 'Online Event' : event.location?.venueName}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <CircleDollarSign className="h-4 w-4" />
                      <span>
                        {event.isFree
                          ? 'Free'
                          : `$${event.cost?.amount} ${event.cost?.description || ''}`}
                      </span>
                    </div>
                  </div>

                  <Button asChild className="mt-4 w-full">
                    <Link href={`/events/${event.meta.slug || event.id}`}>Learn More</Link>
                  </Button>
                </div>
              </article>
            )
          })}
        </div>

        {filteredEvents.length === 0 && (
          <div className="mx-auto mt-12 text-center">
            <p className="text-muted-foreground">No events found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  )
}
