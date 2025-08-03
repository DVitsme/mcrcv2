'use client'

import { FileText } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useTransition } from 'react'

import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import type { Event, Media } from '@/payload-types'

interface EventsPageClientProps {
  events: Event[]
  badges: string[]
}

export function EventsPageClient({ events, badges }: EventsPageClientProps) {
  const [selectedBadge, setSelectedBadge] = useState<string>('all')
  const [isPending, startTransition] = useTransition()

  const filteredEvents =
    selectedBadge === 'all'
      ? events
      : events.filter((event) => event.meta?.eventType === selectedBadge)

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
      <div className="container mx-auto">
        <div className="relative mx-auto flex max-w-screen-xl flex-col gap-12 lg:flex-row lg:gap-20">
          {/* Left sidebar with filters */}
          <header className="top-24 flex h-fit flex-col items-center gap-5 text-center lg:sticky lg:max-w-xs lg:items-start lg:gap-8 lg:text-left">
            <FileText className="h-14 w-14" strokeWidth={1} />
            <h1 className="text-4xl font-extrabold lg:text-5xl">Our Events</h1>
            <p className="text-muted-foreground lg:text-lg">
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
                  className={`px-3 py-1 rounded-full transition-colors capitalize ${
                    selectedBadge === badge
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-primary'
                  }`}
                  onClick={() => startTransition(() => setSelectedBadge(badge))}
                  disabled={isPending}
                  aria-pressed={selectedBadge === badge}
                >
                  {badge.replace(/_/g, ' ')}
                </button>
              ))}
            </nav>
          </header>

          {/* Event grid */}
          <div className="w-full grid justify-items-stretch grid-cols-1 gap-6 md:grid-cols-2">
            {filteredEvents.length === 0 ? (
              <EmptyState />
            ) : (
              filteredEvents.map((event) => {
                const featuredImage = event.featuredImage as Media
                return (
                  <Link
                    href={`/events/${event.meta?.slug}`}
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
                        <Badge
                          variant={event.modality === 'online' ? 'secondary' : 'default'}
                          className="capitalize"
                        >
                          {event.modality?.replace('_', ' ')}
                        </Badge>
                      </div>
                      <div className="flex flex-col gap-2">
                        <h2 className="line-clamp-2 text-xl font-medium transition-colors duration-500 group-hover:text-background">
                          {event.name}
                        </h2>
                      </div>
                    </div>
                    {featuredImage?.url && (
                      <Image
                        src={featuredImage.url}
                        alt={featuredImage.alt || event.name}
                        fill
                        className="absolute inset-0 -z-10 size-full rounded-lg object-cover brightness-50 transition-all duration-500 ease-custom-bezier [clip-path:inset(0_0_100%_0)] group-hover:[clip-path:inset(0_0_0%_0)]"
                      />
                    )}
                  </Link>
                )
              })
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
