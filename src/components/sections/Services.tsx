'use client'

import { Bolt, Cloud, MessagesSquare, Star } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import type { CarouselApi } from '@/components/ui/carousel'
import Image from 'next/image'

const features = [
  {
    id: 'feature-1',
    title: 'Mediation',
    description:
      'Nam vitae molestie arcu. Quisque eu libero orci. Aliquam imperdiet magna nec massa consectetur, id interdum ante congue.',
    icon: Cloud,
    image: '/images/mediation/1.jpg',
  },
  {
    id: 'feature-2',
    title: 'Restorative Practices',
    description:
      'Nam vitae molestie arcu. Quisque eu libero orci. Aliquam imperdiet magna nec massa consectetur, id interdum ante congue.',
    icon: Star,
    image: '/images/restorative-justice/5.jpg',
  },
  {
    id: 'feature-3',
    title: 'Facilitation',
    description:
      'Nam vitae molestie arcu. Quisque eu libero orci. Aliquam imperdiet magna nec massa consectetur, id interdum ante congue.',
    icon: Bolt,
    image: '/images/facilitation/3.jpg',
  },
  {
    id: 'feature-4',
    title: 'Training & Education',
    description:
      'Nam vitae molestie arcu. Quisque eu libero orci. Aliquam imperdiet magna nec massa consectetur, id interdum ante congue.',
    icon: MessagesSquare,
    image: '/images/training/community-education.jpg',
  },
]

const Services = () => {
  const [selection, setSelection] = useState(0)
  const [carouselApi, setCarouselApi] = useState<CarouselApi>()

  const handleSelection = (index: number) => {
    setSelection(index)
    const mobileCarousel = document.querySelector('.snap-x.snap-mandatory')
    if (mobileCarousel) {
      const slides = Array.from(mobileCarousel.children)
      if (slides[index]) {
        slides[index].scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        })
      }
    }
  }

  useEffect(() => {
    if (!carouselApi) {
      return
    }
    carouselApi.scrollTo(selection)
  }, [carouselApi, selection])

  useEffect(() => {
    if (!carouselApi) {
      return
    }
    const updateSelection = () => {
      setSelection(carouselApi.selectedScrollSnap())
    }
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
            Powerful Features
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
            {/* Mobile Image Carousel - Moved to top for mobile */}
            <div className="scrollbar-none flex snap-x snap-mandatory gap-3 overflow-x-auto [-ms-overflow-style:'none'] [scrollbar-width:none] md:hidden [&::-webkit-scrollbar]:hidden">
              {features.map((feature, i) => (
                <div
                  key={feature.id}
                  className="relative h-[min(30rem,65vh)] w-[min(100%,100vw)] shrink-0 cursor-pointer snap-center overflow-hidden rounded-xl border border-border"
                  onClick={() => handleSelection(i)}
                >
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    className="w-full object-cover object-center"
                    width={100}
                    height={100}
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-background/95 via-background/70 to-transparent px-4 py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-lg bg-primary p-2 text-primary-foreground">
                        <feature.icon className="size-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-sem ibold text-primary">{feature.title}</h3>
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
                          <h3
                            className={`mb-1 text-sm font-semibold transition-colors md:text-base lg:text-lg ${
                              isSelected ? 'text-foreground' : 'text-primary-foreground'
                            }`}
                          >
                            {feature.title}
                          </h3>
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

            {/* Desktop Image Carousel */}
            <div className="relative hidden md:block md:w-1/2 lg:w-3/5">
              <div className="overflow-hidden rounded-xl border border-border shadow-sm">
                <Carousel
                  setApi={setCarouselApi}
                  className="aspect-4/5 w-full md:aspect-3/4 lg:aspect-4/5 [&>div]:h-full"
                  opts={{
                    loop: true,
                  }}
                >
                  <CarouselContent className="mx-0 h-full w-full">
                    {features.map((feature) => (
                      <CarouselItem key={feature.id} className="px-0">
                        <div className="relative w-full overflow-hidden">
                          <Image
                            src={feature.image}
                            alt={feature.title}
                            className="h-full max-h-[500px] w-full object-cover object-center transition-transform duration-500"
                            width={500}
                            height={500}
                          />
                          <div className="absolute right-0 bottom-0 left-0 bg-background bg-linear-to-t from-background/80 via-background/40 to-transparent p-6">
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

              {/* Carousel indicators */}
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

export { Services }
