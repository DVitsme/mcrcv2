'use client'

import React from 'react'
import { FeaturesGrid } from './FeaturesGrid'
import { motion, type Variants } from 'framer-motion'
import Image from 'next/image'
import { LucideIcon } from 'lucide-react'

interface Feature {
  icon: LucideIcon
  title: string
  description: string
}

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
}

interface ScrollInViewGridProps {
  imageUrl: string
  imageAlt: string
  featuresData: Feature[]
}

const ScrollInViewGrid = ({ imageUrl, imageAlt, featuresData }: ScrollInViewGridProps) => {
  return (
    <div className="mb-12 mt-10 flex flex-col items-center gap-10 lg:mt-24 lg:flex-row-reverse">
      <div className="flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-800/20 lg:w-1/2">
        {/* Animate the image with a subtle scale-up effect */}
        <motion.div
          variants={imageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: 'spring', duration: 1 }}
        >
          <Image
            alt={imageAlt}
            src={imageUrl}
            width={620}
            height={465}
            className="object-contain"
          />
        </motion.div>
      </div>

      {/* Render the client component responsible for the grid and its animations */}
      <FeaturesGrid featuresData={featuresData} />
    </div>
  )
}

export default ScrollInViewGrid
