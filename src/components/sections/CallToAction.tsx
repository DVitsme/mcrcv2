'use client'

import Image from 'next/image'
import { useParallax } from '@/hooks/useParallax'
import ButtonAnimated from '../ui/button-animated'

interface CallToActionProps {
  backgroundImage: string
  title: string
  description: string
  buttonText: string
  buttonLink: string
}

export function CallToAction({}: CallToActionProps) {
  const { elementRef, style } = useParallax({
    speed: 0.7, // Adjust this value to control the parallax intensity
    threshold: 0,
    rootMargin: '-100px 0px',
  })

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Image with Parallax */}
      <div ref={elementRef} className="absolute inset-0" style={style}>
        <Image
          src="/images/mediation/happy-conversation.jpg"
          alt=""
          fill
          className="object-cover object-[50%_25%]"
          sizes="100vw"
          priority
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="container my-16 relative">
        <div className="mx-auto max-w-2xl text-center text-white">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Help us keep mediation free, mediation is not just a service it is a cause.
          </h2>
          <p className="mb-8 text-lg">Join the Giving Circle</p>
          <ButtonAnimated text="Donate Here" />
        </div>
      </div>
    </section>
  )
}
