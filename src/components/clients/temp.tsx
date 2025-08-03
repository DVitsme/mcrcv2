'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Calendar, MapPin, CircleDollarSign } from 'lucide-react'

import { cn } from '@/utilities/ui'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { RenderBlocks } from '@/blocks/RenderBlocks' // Use the block renderer
import type { Event, Media } from '@/payload-types'

interface EventPageClientProps {
  event: Event
}

export function EventPageClient({ event }: EventPageClientProps) {
  const [activeSection, setActiveSection] = useState<string | null>('overview')
  const sectionRefs = useRef<Record<string, HTMLElement>>({})

  useEffect(() => {
    const sections = Object.keys(sectionRefs.current)
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-30% 0px -70% 0px' },
    )

    sections.forEach((sectionId) => {
      const element = sectionRefs.current[sectionId]
      if (element) observer.observe(element)
    })

    return () => {
      sections.forEach((sectionId) => {
        const element = sectionRefs.current[sectionId]
        if (element) observer.unobserve(element)
      })
    }
  }, [event.id])

  const addSectionRef = (id: string) => (ref: HTMLElement | null) => {
    if (ref) sectionRefs.current[id] = ref
  }

  // --- CORRECTED: Access 'featuredImage' from the top level ---
  const featuredImage = event.featuredImage as Media

  const formatDate = (dateString?: string): string => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    })
  }

  return (
    <section className="py-16 md:py-24 mt-32">
      <div className="container mx-auto max-w-7xl">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-5 text-center">
          {event.meta?.eventType && <Badge variant="secondary">{event.meta.eventType}</Badge>}
          <h1 className="text-3xl font-bold text-pretty lg:text-5xl">{event.name}</h1>
          {event.summary && <p className="text-muted-foreground lg:text-lg">{event.summary}</p>}
        </div>

        {featuredImage?.url && (
          <div className="mx-auto mt-12 max-w-6xl rounded-lg border bg-card p-2">
            <Image
              src={featuredImage.url}
              alt={featuredImage.alt || event.name}
              className="aspect-video w-full rounded-lg object-cover"
              width={1200}
              height={675}
            />
          </div>
        )}

        <div className="relative mx-auto mt-12 grid max-w-6xl gap-8 lg:grid-cols-4">
          <aside className="sticky top-24 hidden h-fit lg:block">
            <span className="mb-6 text-lg font-semibold">On this page</span>
            <nav className="mt-4">
              <ul className="space-y-2">
                <li>
                  <a
                    href="#overview"
                    className={cn(
                      'block py-1',
                      activeSection === 'overview'
                        ? 'font-medium text-primary'
                        : 'text-muted-foreground hover:text-primary',
                    )}
                  >
                    Overview
                  </a>
                </li>
                {event.speakers && event.speakers.length > 0 && (
                  <li>
                    <a
                      href="#speakers"
                      className={cn(
                        'block py-1',
                        activeSection === 'speakers'
                          ? 'font-medium text-primary'
                          : 'text-muted-foreground hover:text-primary',
                      )}
                    >
                      Speakers
                    </a>
                  </li>
                )}
              </ul>
            </nav>
          </aside>

          <main className="lg:col-span-2">
            <section
              id="overview"
              ref={addSectionRef('overview')}
              className="prose dark:prose-invert max-w-none mb-12"
            >
              {/* --- CORRECTED: Use RenderBlocks for the 'content' field --- */}
              <RenderBlocks blocks={event.content} />
            </section>

            {event.speakers && event.speakers.length > 0 && (
              <section id="speakers" ref={addSectionRef('speakers')} className="mb-12">
                <h2 className="text-2xl font-bold mb-6 border-b pb-2">Meet the Speakers</h2>
                <div className="grid gap-8">
                  {event.speakers.map((speaker, index) => {
                    const speakerAvatar = speaker.speakerAvatar as Media
                    return (
                      <div key={index} className="flex items-start gap-4">
                        {speakerAvatar?.url && (
                          <Avatar className="h-16 w-16">
                            <AvatarImage
                              src={speakerAvatar.url}
                              alt={speaker.speakerName || 'Speaker'}
                            />
                          </Avatar>
                        )}
                        <div>
                          <h3 className="font-semibold">{speaker.speakerName}</h3>
                          <p className="text-sm text-muted-foreground">{speaker.speakerTitle}</p>
                          <p className="mt-2 text-sm">{speaker.speakerBio}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </section>
            )}
          </main>

          <aside className="sticky top-24 prose hidden h-fit rounded-lg border bg-card p-6 lg:block">
            <h3 className="text-xl font-semibold mt-0">Event Details</h3>
            <ul className="my-6 space-y-4 text-sm [&>li]:pl-0">
              <li className="flex items-start gap-3 border-t pt-4">
                <Calendar className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>{formatDate(event.eventStartTime)}</span>
              </li>
              {(event.location?.venueName || event.onlineMeeting?.url) && (
                <li className="flex items-start gap-3 border-t pt-4">
                  <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <span>
                    {event.modality === 'online' ? 'Online Event' : event.location?.venueName}
                    {event.modality !== 'online' && event.location?.address && (
                      <div className="text-xs text-muted-foreground">{event.location.address}</div>
                    )}
                  </span>
                </li>
              )}
              <li className="flex items-start gap-3 border-t pt-4">
                <CircleDollarSign className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>
                  {event.isFree
                    ? 'Free'
                    : `$${event.cost?.amount} ${event.cost?.description || ''}`}
                </span>
              </li>
            </ul>
            {event.isRegistrationRequired && event.externalRegistrationLink && (
              <Button asChild className="w-full">
                <a href={event.externalRegistrationLink} target="_blank" rel="noopener noreferrer">
                  Register Here
                </a>
              </Button>
            )}
          </aside>
        </div>
      </div>
    </section>
  )
}
