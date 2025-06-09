'use client'

import { motion, useInView, type Variants } from 'framer-motion'
import { useRef } from 'react'

interface AnimateInViewProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

/**
 * A reusable component that animates its children when they scroll into view.
 * It uses the Intersection Observer API via Framer Motion's `useInView` hook
 * for optimal performance.
 */
export function AnimateInView({ children, className, delay = 0 }: AnimateInViewProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: true, // Animation triggers only once
    amount: 0.3, // Triggers when 30% of the element is in view
  })

  const variants: Variants = {
    hidden: { opacity: 0, y: 20 }, // Start hidden and slightly down
    visible: { opacity: 1, y: 0 }, // Animate to visible and original position
  }

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ type: 'spring', duration: 0.8, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
