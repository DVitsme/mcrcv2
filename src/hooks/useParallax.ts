'use client'
import { useEffect, useRef, useState } from 'react'

interface UseParallaxOptions {
  speed?: number
  threshold?: number
  rootMargin?: string
}

export function useParallax({
  speed = 0.7,
  threshold = 0,
  rootMargin = '0px',
}: UseParallaxOptions = {}) {
  const elementRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [translateY, setTranslateY] = useState(0)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // Create Intersection Observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry?.isIntersecting ?? false)
      },
      {
        threshold,
        rootMargin,
      },
    )

    observer.observe(element)

    // Handle scroll with RAF for performance
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (isVisible && element) {
            const rect = element.getBoundingClientRect()
            const scrollY = window.scrollY
            const elementTop = rect.top + scrollY
            const viewportHeight = window.innerHeight
            const elementHeight = rect.height

            // Calculate parallax effect
            const scrolled = scrollY - elementTop
            const maxScroll = viewportHeight + elementHeight
            const progress = Math.min(Math.max(scrolled / maxScroll, 0), 1)

            // Apply spring-like easing
            const eased = 1 - Math.pow(1 - progress, 3)
            const newTranslateY = eased * speed * 100

            setTranslateY(newTranslateY)
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial calculation

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isVisible, speed, threshold, rootMargin])

  return {
    elementRef,
    style: {
      transform: `translate3d(0, ${translateY}px, 0)`,
      willChange: 'transform',
    },
  }
}
