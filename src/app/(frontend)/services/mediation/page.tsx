'use client'

import { PageHero } from '@/heros/PageHero'
import Image from 'next/image'
import { motion, type Variants } from 'framer-motion'
import { AnimateInView } from '@/components/animations/AnimateInView'
import { FeaturesGrid } from '@/components/sections/FeaturesGrid'
import { Award, Dna } from 'lucide-react'
import { Rocket } from 'lucide-react'
import { Wallet } from 'lucide-react'

const sectionData = {
  title: 'Therapy & Coaching for a global workforce',
  subtitle: 'Professional therapy and coaching for your team',
  description:
    "Provide easy access to professional coaching and therapy for your team, ensuring privacy and quality, no matter where they're based.",
  imageUrl:
    'https://unmind.cdn.prismic.io/unmind/ZsN2BUaF0TcGJEdg_therapists.svg?fit=fill&max-w=1920&w=1920&q=70',
  imageAlt: 'Practitioner profiles',
}

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
}

export default function Mediation() {
  const { title, subtitle, description, imageUrl, imageAlt } = sectionData

  return (
    <main>
      <PageHero
        heading="Mediation"
        description="Mediation is a process that helps people resolve conflicts and make decisions together. It is a way to resolve conflicts without going to court."
        image={{
          src: 'https://www.shadcnblocks.com/images/block/placeholder-1.svg',
          alt: 'Mediation',
        }}
        badge="Small Groups"
        buttons={{
          primary: {
            text: 'Get Started',
            url: '/services/mediation',
          },
          secondary: {
            text: 'Learn More',
            url: '/services/mediation',
          },
        }}
      />

      <section id="coaching-therapy" className="container py-16 text-center lg:py-24">
        <div className="space-y-3 xl:space-y-6">
          <div className="space-y-4">
            <AnimateInView>
              <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                {title}
              </h2>
              <p className="text-lg text-muted-foreground md:text-xl">{subtitle}</p>
            </AnimateInView>
            <AnimateInView delay={0.1}>
              <div className="mx-auto max-w-[800px] text-lg text-muted-foreground lg:w-4/5">
                <p>{description}</p>
              </div>
            </AnimateInView>
          </div>
        </div>
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
      </section>
    </main>
  )
}

const featuresData = [
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
]
