'use client'

import { Bolt, Cloud, MessagesSquare, Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import Link from 'next/link' // Import the Link component

import { Badge } from '@/components/ui/badge'
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel'
import { OptimizedVideoPlayer } from '../Media/VideoMedia/OptimizedVideoPlayer'

// --- UPDATED: Added a 'url' property to each feature ---
const features = [
  {
    id: 'feature-1',
    title: 'Mediation',
    url: '/services/mediation',
    description:
      'Our trained mediators provide a neutral, safe space for parties to communicate, understand each other, and find mutually agreeable solutions.',
    icon: Cloud,
    poster: '/images/mediation/1.jpg',
    resource: '/videos/mediation/mediation-720-38.mp4',
  },
  {
    id: 'feature-2',
    title: 'Restorative Practices',
    url: '/services/restorative-justice',
    description:
      'We facilitate restorative circles and conferences to repair harm, rebuild relationships, and foster a sense of community accountability.',
    icon: Star,
    poster: '/images/restorative-justice/5.jpg',
    resource: '/videos/restorative-justice/Rj-720-38.mp4',
  },
  {
    id: 'feature-3',
    title: 'Facilitation',
    url: '/services/facilitation',
    description:
      'Our expert facilitators guide groups through productive discussions and decision-making processes, ensuring all voices are heard.',
    icon: Bolt,
    poster: '/images/facilitation/3.jpg',
    resource: '/videos/facilitation/faciliation-720-38.mp4',
  },
  {
    id: 'feature-4',
    title: 'Training & Education',
    url: '/services/training',
    description:
      'We offer workshops and comprehensive training programs in mediation, conflict resolution, and restorative practices for individuals and organizations.',
    icon: MessagesSquare,
    poster: '/images/training/community-education.jpg',
    resource: '/videos/training/training-720-40.mp4',
  },
]

export function Services() {
  const [selection, setSelection] = useState(0)
  const [carouselApi, setCarouselApi] = useState<CarouselApi>()

  const handleSelection = (index: number) => {
    setSelection(index)
    carouselApi?.scrollTo(index)
  }

  useEffect(() => {
    if (!carouselApi) return
    const updateSelection = () => setSelection(carouselApi.selectedScrollSnap())

    carouselApi.on('select', updateSelection)
    return () => {
      carouselApi.off('select', updateSelection)
    }
  }, [carouselApi])

  return (
    <section className="mt-[-10rem] md:py-24 lg:py-32 bg-darkgreen">
      <div className="container pt-16 mx-auto px-4">
        <div className="my-8 text-center md:mb-12">
          <Badge variant="outline" className="mb-3 text-primary-foreground">
            Our Services
          </Badge>
          <h2 className="text-3xl leading-tight font-bold md:text-4xl lg:text-5xl text-primary-foreground">
            Discover What Makes Us Different
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-primary-foreground md:mt-4 md:text-base">
            Our platform combines powerful features with elegant design to help you accomplish more.
          </p>
        </div>

        <div className="overflow-visible">
          <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:gap-8 lg:gap-16">
            {/* Mobile Image Carousel */}
            <div className="scrollbar-none flex snap-x snap-mandatory gap-3 overflow-x-auto [-ms-overflow-style:'none'] [scrollbar-width:none] md:hidden [&::-webkit-scrollbar]:hidden">
              {features.map((feature, i) => (
                <div
                  key={feature.id}
                  className="relative h-[min(30rem,65vh)] w-[min(100%,100vw)] shrink-0 snap-center overflow-hidden rounded-xl border border-border"
                >
                  <OptimizedVideoPlayer resource={feature.resource} poster={feature.poster} />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/95 via-background/70 to-transparent px-4 py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-lg bg-primary p-2 text-primary-foreground">
                        <feature.icon className="size-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-primary-foreground">
                          {feature.title}
                        </h3>
                        <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Indicators */}
            <div className="mb-4 flex justify-center gap-2 md:hidden">
              {features.map((_, i) => (
                <button
                  key={i}
                  className={`size-2 rounded-full transition-all ${
                    selection === i ? 'w-6 bg-primary' : 'bg-muted hover:bg-muted-foreground/50'
                  }`}
                  onClick={() => handleSelection(i)}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            {/* Feature List */}
            <div className="md:w-1/2 lg:w-2/5">
              <ul className="grid grid-cols-1 gap-3 md:flex md:flex-col md:gap-2">
                {features.map((feature, i) => {
                  const isSelected = selection === i
                  return (
                    <li
                      key={feature.id}
                      className={`group relative flex cursor-pointer rounded-xl border px-4 py-3 transition-all duration-300 md:px-5 md:py-4 ${
                        isSelected
                          ? 'border-border bg-accent shadow-sm'
                          : 'border-transparent hover:border-border hover:bg-accent/30'
                      }`}
                      data-open={isSelected ? 'true' : undefined}
                      onClick={() => handleSelection(i)}
                    >
                      <div className="flex w-full items-start gap-3 md:gap-4">
                        <div
                          className={`flex aspect-square w-9 shrink-0 items-center justify-center rounded-lg transition-colors md:w-10 ${
                            isSelected
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          <feature.icon className="size-4 md:size-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          {/* --- UPDATED: Title is now a clickable Link --- */}
                          <Link
                            href={feature.url}
                            className="group/link"
                            onClick={(e) => e.stopPropagation()} // Prevents the li's onClick from firing
                          >
                            <h3
                              className={`mb-1 text-sm font-semibold transition-colors md:text-base lg:text-lg group-hover/link:underline ${
                                isSelected ? 'text-foreground' : 'text-primary-foreground'
                              }`}
                            >
                              {feature.title}
                            </h3>
                          </Link>
                          <p
                            className={`line-clamp-2 text-xs transition-all md:text-sm md:group-data-open:opacity-100 lg:text-sm ${
                              isSelected ? 'text-black' : 'text-primary-foreground'
                            }`}
                          >
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* Desktop Video Carousel */}
            <div className="relative hidden md:block md:w-1/2 lg:w-3/5">
              <div className="overflow-hidden rounded-xl border border-border shadow-sm">
                <Carousel
                  setApi={setCarouselApi}
                  className="aspect-4/5 w-full md:aspect-3/4 lg:aspect-4/5 [&>div]:h-full"
                  opts={{ loop: true }}
                >
                  <CarouselContent className="mx-0 h-full w-full">
                    {features.map((feature) => (
                      <CarouselItem key={feature.id} className="px-0">
                        <div className="relative h-full w-full overflow-hidden">
                          <OptimizedVideoPlayer
                            resource={feature.resource}
                            poster={feature.poster}
                            className="h-full"
                          />
                          <div className="pointer-events-none absolute right-0 bottom-0 left-0 bg-gradient-to-t from-background/80 via-background/40 to-transparent p-6">
                            <div className="flex items-center gap-3">
                              <div className="flex aspect-square w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                <feature.icon className="size-5" />
                              </div>
                              <h3 className="text-xl font-semibold text-foreground">
                                {feature.title}
                              </h3>
                            </div>
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </div>

              {/* Desktop Indicators */}
              <div className="mt-4 flex justify-center gap-2">
                {features.map((_, i) => (
                  <button
                    key={i}
                    className={`size-2 rounded-full transition-all ${
                      selection === i ? 'w-6 bg-primary' : 'bg-muted hover:bg-muted-foreground/50'
                    }`}
                    onClick={() => handleSelection(i)}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
