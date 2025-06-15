'use client'

import AutoScroll from 'embla-carousel-auto-scroll'
import {
  Ear,
  Globe,
  HeartHandshake,
  MessageCircleDashedIcon,
  PanelsTopLeft,
  PenTool,
  Users2,
  Zap,
} from 'lucide-react'

import { Avatar, AvatarImage } from '@/components/ui/avatar'
import ButtonAnimated from '@/components/ui/button-animated'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'

const features = [
  {
    title: 'Mediation 101',
    description: 'Fundamentals of mediation process',
    icon: <Users2 className="h-auto w-8 md:w-12" />,
  },
  {
    title: 'Conflict Resolution Strategies',
    description: 'Practical strategies for managing conflicts',
    icon: <MessageCircleDashedIcon className="h-auto w-8 md:w-12" />,
  },
  {
    title: 'Mediation in the Workplace',
    description: 'Effective strategies for workplace conflicts',
    icon: <PanelsTopLeft className="h-auto w-8 md:w-12" />,
  },
  {
    title: 'Restorative Circles Facilitator	',
    description: 'Leading community circles for healing',
    icon: <PenTool className="h-auto w-8 md:w-12" />,
  },
  {
    title: 'Effective Community Dialogue	',
    description: 'Techniques to foster constructive conversations	',
    icon: <Zap className="h-auto w-8 md:w-12" />,
  },
  {
    title: 'Active Listening Skills	',
    description: 'Train to listen empathetically and respond well.',
    icon: <Ear className="h-auto w-8 md:w-12" />,
  },
  {
    title: 'Cultural Competency	',
    description: 'Understanding and respecting diverse backgrounds',
    icon: <Globe className="h-auto w-8 md:w-12" />,
  },
  {
    title: 'Community Trauma-Informed Practice	',
    description: 'Support healing in communities after harm',
    icon: <HeartHandshake className="h-auto w-8 md:w-12" />,
  },
]

const EventsPreview = () => {
  return (
    <section className="py-32 mx-4">
      <div className="container">
        <div className="grid items-center gap-20 md:grid-cols-2">
          <div className="flex flex-col items-center gap-5 text-center md:items-start md:text-left">
            <span className="inline-flex items-center -space-x-4">
              <Avatar className="size-11 border lg:size-16">
                <AvatarImage
                  src="https://shadcnblocks.com/images/block/avatar-1.webp"
                  alt="placeholder"
                />
              </Avatar>
              <Avatar className="size-11 border lg:size-16">
                <AvatarImage
                  src="https://shadcnblocks.com/images/block/avatar-6.webp"
                  alt="placeholder"
                />
              </Avatar>
              <Avatar className="size-11 border lg:size-16">
                <AvatarImage
                  src="https://shadcnblocks.com/images/block/avatar-3.webp"
                  alt="placeholder"
                />
              </Avatar>
            </span>
            <h1 className="text-3xl font-semibold md:text-5xl">Join Us for Our Upcoming Events</h1>
            <p className="text-muted-foreground md:text-lg">
              We put together workshops and classes to teach the community successful mediation
              techniques.
            </p>
            <ButtonAnimated text="View Upcomming Events" color="primary" />
            <div className="grid grid-cols-2 justify-between gap-4 pt-10 text-left md:gap-20">
              <div className="flex flex-col gap-1">
                <h2 className="text-3xl font-semibold md:text-5xl">25+</h2>
                <p className="text-muted-foreground md:text-lg">Events So Far this Year</p>
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-3xl font-semibold md:text-5xl">100+</h2>
                <p className="text-muted-foreground md:text-lg">People trained last year</p>
              </div>
            </div>
          </div>
          <div className="grid gap-4 md:gap-7 lg:grid-cols-2">
            <Carousel
              opts={{
                loop: true,
                align: 'start',
              }}
              plugins={[
                AutoScroll({
                  speed: 0.7,
                }),
              ]}
              orientation="vertical"
              className="pointer-events-none relative lg:hidden"
            >
              <CarouselContent className="max-h-[600px]">
                {features.map((feature, index) => (
                  <CarouselItem key={index}>
                    <div className="flex flex-col rounded-xl border p-5 md:p-7 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                      <div className="transition-transform duration-300 hover:scale-110 hover:rotate-5">
                        {feature.icon}
                      </div>
                      <h3 className="mt-5 mb-2.5 font-semibold md:text-xl">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground md:text-base">
                        {feature.description}
                      </p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-background"></div>
            </Carousel>
            <Carousel
              opts={{
                loop: true,
                align: 'start',
              }}
              plugins={[
                AutoScroll({
                  speed: 0.7,
                }),
              ]}
              orientation="vertical"
              className="pointer-events-none relative hidden lg:block"
            >
              <CarouselContent className="max-h-[600px]">
                {features.slice(0, features.length / 2).map((feature, index) => (
                  <CarouselItem key={index}>
                    <div className="flex flex-col rounded-xl border p-4 md:p-7 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                      <div className="transition-transform duration-300 hover:scale-110 hover:rotate-5">
                        {feature.icon}
                      </div>
                      <h3 className="mt-5 mb-2.5 font-semibold md:text-xl">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground md:text-base">
                        {feature.description}
                      </p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-background"></div>
            </Carousel>
            <Carousel
              opts={{
                loop: true,
                align: 'start',
              }}
              plugins={[
                AutoScroll({
                  speed: 0.7,
                }),
              ]}
              orientation="vertical"
              className="pointer-events-none relative hidden lg:block"
            >
              <CarouselContent className="max-h-[600px]">
                {features.slice(features.length / 2).map((feature, index) => (
                  <CarouselItem key={index}>
                    <div className="flex flex-col rounded-xl border p-4 md:p-7 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                      <div className="transition-transform duration-300 hover:scale-110 hover:rotate-5">
                        {feature.icon}
                      </div>
                      <h3 className="mt-5 mb-2.5 font-semibold md:text-xl">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground md:text-base">
                        {feature.description}
                      </p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-background"></div>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  )
}

export { EventsPreview }
