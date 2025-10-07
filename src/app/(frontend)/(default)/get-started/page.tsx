'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'

import Image from 'next/image'

type GetStartedProps = {
  title: string
  image: string
  url: string
}

const services: GetStartedProps[] = [
  {
    title: 'Mediation',
    image: '/images/mediation/twoguys.jpg',
    url: '/services/mediation/request',
  },
  {
    title: 'Facilitation',
    image: '/images/facilitation/facilitation-meeting.jpg',
    url: '/services/facilitation/request',
  },
  {
    title: 'Restorative Justice',
    image: '/images/restorative-justice/rp-with-mother-daughter.jpg',
    url: '/services/restorative-justice/request',
  },
  {
    title: 'Training & Education',
    image: '/images/training/teaching-class.jpg',
    url: '/services/training/request',
  },
]

const GetStarted = () => {
  return (
    <div className="py-32">
      <section className="container grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-foreground mb-4 text-4xl font-medium md:text-6xl">Get Started</h2>
            <p className="text-muted-foreground w-80 text-xl tracking-tight">
              To request one of our services, please started by selecting the one that most aligns
              with you.
            </p>
          </div>
          <Link href="/services/mediation/reentry">
            <Button variant="outline" className="mt-8 w-fit">
              Re-entry Assistance <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {services.map((service, idx) => (
            <motion.a
              key={idx}
              href={service.url}
              whileHover={{ opacity: 0.8 }}
              className="group block overflow-hidden rounded-lg"
            >
              <Card className="relative aspect-square overflow-hidden p-0">
                <Image
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 h-full w-full object-cover"
                  width={500}
                  height={500}
                />
                <CardContent className="absolute inset-0 flex flex-col justify-end p-4">
                  <div className="font-semibold text-white text-2xl">{service.title}</div>
                </CardContent>
                <ArrowUpRight className="absolute right-4 top-4 h-5 w-5 text-white transition-transform group-hover:scale-110" />
              </Card>
            </motion.a>
          ))}
        </div>
      </section>

      <section className="container rounded-xl mt-32 bg-secondary dark:bg-indigo-950">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8">
          <div>
            <h2 className="max-w-2xl text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
              Would you like to Volunteer with us?
            </h2>
            <br />
            <p className="max-w-xl text-muted-foreground text-xl tracking-tight">
              Whether you are a mediator, facilitator, or restorative justice practitioner, your
              work can make a real change in the lives of those around you.
            </p>
          </div>
          <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:shrink-0">
            <Link
              href="/volunteer"
              className="text-lg font-semibold text-gray-900 dark:text-gray-100 hover:text-purple transition-colors hover:border-b-2 hover:border-purple"
            >
              Learn more
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default GetStarted
