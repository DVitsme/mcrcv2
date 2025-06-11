'use client'

import Image from 'next/image'
import { useParallax } from '@/hooks/useParallax'
import ButtonAnimated from '../ui/button-animated'

interface CallToActionProps {
  imgSrc?: string
  title: string
  description?: string
  buttonText?: string
  buttonLink?: string
}

export function CallToAction({
  title,
  description,
  buttonText,
  buttonLink,
  imgSrc,
}: CallToActionProps) {
  const { elementRef, style } = useParallax({
    speed: 0.7, // Adjust this value to control the parallax intensity
    threshold: 0,
    rootMargin: '-100px 0px',
  })

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Image with Parallax */}
      {imgSrc && (
        <div ref={elementRef} className="absolute inset-0" style={style}>
          <Image
            src={imgSrc}
            alt=""
            fill
            className="object-cover object-[50%_25%]"
            sizes="100vw"
            priority
          />
        </div>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="container my-16 relative">
        <div className="mx-auto max-w-2xl text-center text-white">
          <h2 className="mb-4 text-5xl font-bold tracking-tight sm:text-4xl">{title}</h2>
          <p className="mb-8 text-xl font-bold">{description}</p>
          {buttonText && buttonLink && <ButtonAnimated text={buttonText} />}
        </div>
      </div>
    </section>
  )
}
