'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'

type GettingStartedProps = {
  title: string
  image: string
  url: string
}

const services: GettingStartedProps[] = [
  {
    title: 'Mediation',
    image: '/images/mediation/twoguys.jpg',
    url: '/services/mediation',
  },
  {
    title: 'Facilitation',
    image: '/images/facilitation/facilitation-meeting.jpg',
    url: '/services/facilitation',
  },
  {
    title: 'Restorative Justice',
    image: '/images/restorative-justice/rp-with-mother-daughter.jpg',
    url: '/services/restorative-justice',
  },
  {
    title: 'Training & Education',
    image: '/images/training/trainning-in-office.jpg',
    url: '/services/training',
  },
]

const GettingStarted = () => {
  return (
    <section className="py-32">
      <div className="container grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-foreground mb-4 text-4xl font-medium md:text-6xl">
              Getting Started
            </h2>
            <p className="text-muted-foreground w-80 text-base tracking-tight">
              Hello and welcome to our getting started page. Here you will find a list of services
              that we offer.
            </p>
          </div>
          <Link href="/services/mediation/reentry">
            <Button variant="outline" className="mt-8 w-fit">
              Explore services <ArrowUpRight className="ml-2 h-4 w-4" />
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
                <img
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <CardContent className="absolute inset-0 flex flex-col justify-end p-4">
                  <div className="font-semibold text-white text-2xl">{service.title}</div>
                </CardContent>
                <ArrowUpRight className="absolute right-4 top-4 h-5 w-5 text-white transition-transform group-hover:scale-110" />
              </Card>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default GettingStarted
