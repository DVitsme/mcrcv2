'use client'

import { motion, type Variants } from 'framer-motion'
import { Award, Dna, Rocket, Wallet } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

// Define the type for a single feature
interface Feature {
  icon: LucideIcon
  title: string
  description: string
}

// Container variants for the stagger effect
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15, // Delay between each child animation
    },
  },
}

// Item variants for the individual card animation
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

/**
 * Renders a single feature item. This is a simple presentational component.
 */
function FeatureItem({ icon: Icon, title, description }: Feature) {
  return (
    <div className="space-y-4 text-center lg:text-left">
      <div className="flex flex-col items-start justify-center gap-2 lg:flex-row lg:items-start lg:justify-start">
        <Icon className="h-6 w-6 text-primary" />
        <h3 className="text-xl font-semibold leading-tight">{title}</h3>
      </div>
      <div className="text-base text-muted-foreground">
        <p>{description}</p>
      </div>
    </div>
  )
}

/**
 * The main grid component that applies the stagger animation.
 * It's a client component because it uses Framer Motion.
 */
export function FeaturesGrid({
  featuresData = [
    {
      icon: Award,
      title: 'Diverse',
      description:
        'Give your people access to a high-quality network of licensed therapists and coaches, with over 20 modalities and 50 specialisms available.',
    },
    {
      icon: Dna,
      title: 'Scientific',
      description:
        'Outcome based measurements of care ensure each session provides a solid step towards achieving personal and professional goals.',
    },
    {
      icon: Rocket,
      title: 'AI enhanced',
      description:
        'Streamlining the search for the perfect practitioner, cutting through the clutter to find the right fit for individual needs.',
    },
    {
      icon: Wallet,
      title: 'Flexible',
      description:
        'Flexible Talk bundles allow for a tailored solution to ensure personalized, effective care for your employees and optimize value of investment.',
    },
  ],
}: {
  featuresData: Feature[]
}) {
  return (
    <motion.div
      className="grid w-full auto-rows-max grid-cols-1 gap-10 md:grid-cols-2 lg:w-1/2 lg:gap-12"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible" // Animate when the container is in view
      viewport={{ once: true, amount: 0.2 }} // Trigger once, when 20% is visible
    >
      {featuresData.map((feature) => (
        <motion.div key={feature.title} variants={itemVariants}>
          <FeatureItem
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        </motion.div>
      ))}
    </motion.div>
  )
}
