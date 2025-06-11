'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/utilities/ui'

interface ServicePageFooterDataProps {
  SectionTitle?: string
  cards: {
    title: string
    subtitle: string
    href: string
    bgColor: string
    textColor: string
    iconColor: string
  }[]
}

interface CardProps {
  title: string
  subtitle: string
  href: string
  bgColor: string
  textColor: string
  iconColor: string
}

const Card = ({ title, subtitle, href, bgColor, textColor, iconColor }: CardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div
        className={cn(
          'flex h-full w-full flex-col justify-between rounded-3xl p-[30px] max-md:aspect-[645/500] max-md:h-auto md:min-h-[384px]',
          bgColor,
        )}
      >
        <div className={cn('text-lg font-bold', textColor)}>{subtitle}</div>
        <Link href={href} className="group flex flex-row items-center justify-between">
          <h3
            className={cn(
              'text-4xl font-semibold w-3/4 group-hover:text-white transition-colors duration-300',
              textColor,
            )}
          >
            {title}
          </h3>
          <div
            className={cn(
              'flex h-[52px] w-[52px] items-center justify-center rounded-3xl group-hover:bg-white transition-colors duration-300',
              iconColor,
            )}
          >
            <ArrowRight className="h-6 w-6 text-black group-hover:text-foreground transition-colors duration-300" />
          </div>
        </Link>
      </div>
    </motion.div>
  )
}

const ServicePageFooter = ({ SectionTitle, cards }: ServicePageFooterDataProps) => {
  return (
    <section
      id="products"
      data-slice-type="cards"
      data-slice-variation="twoColumns"
      className="container py-16 lg:py-32"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="heading-1 mb-5 text-center">{SectionTitle}</h2>
      </motion.div>
      <div className="mt-10 grid grid-cols-1 gap-[30px] md:grid-cols-2 lg:mt-15">
        {cards.map((card: CardProps, index: number) => (
          <Card key={index} {...card} />
        ))}
      </div>
    </section>
  )
}

export { ServicePageFooter }
