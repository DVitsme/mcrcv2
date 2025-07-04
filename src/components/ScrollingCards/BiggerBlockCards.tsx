'use client'

import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { Button } from '../ui/button'
import { ChevronRight } from 'lucide-react'

interface CardItem {
  icon: React.ReactNode
  title: string
  description?: string
  listDescription?: string
  listItems?: string[]
}

interface BiggerBlockCardsProps {
  title: string
  titleGray?: string
  description?: string
  buttonTitle?: string
  buttonText?: string
  buttonLink?: string
  cards: CardItem[]
  color?: string
}

const BiggerBlockCards = ({
  title,
  titleGray,
  description,
  buttonTitle = 'Are you ready to get started?',
  buttonText = 'Click here to get started',
  buttonLink = 'https://forms.gle/MkdSqa6UFrcCgQKq9',
  cards,
}: BiggerBlockCardsProps) => {
  return (
    <section className="py-32">
      <div className="container">
        <div className="grid gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Fixed Content */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="max-w-lg">
              <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl">
                {title}
                {titleGray && (
                  <span className="relative inline-block">
                    <span className="text-muted-foreground">{titleGray}</span>
                  </span>
                )}
              </h2>
              {description && <p className="mt-12 text-lg text-black">{description}</p>}
              {description && <Separator className="my-12" />}
              <p className="mt-12 text-lg text-black">
                {buttonTitle}
                <span className="mt-4 font-bold block text-xl">
                  <Link href={buttonLink} target="_blank">
                    <Button className="bg-primary text-white hover:bg-primary/80">
                      {buttonText}
                    </Button>
                  </Link>
                </span>
              </p>
            </div>
          </div>

          {/* Right Column - Scrollable Cards */}
          <div className="-mt-8 sm:-mt-12">
            {cards.map((card, index) => (
              <div
                key={index}
                className="relative my-12 overflow-hidden rounded-lg bg-secondary px-8 py-16 shadow-none sm:px-12 sm:py-24 lg:px-16 lg:py-32"
              >
                <div className="gap-4 sm:gap-6">
                  <div className="block shrink-0">{card.icon}</div>
                  <div className="absolute top-12 right-12 font-mono text-5xl">
                    {index > 9 ? index + 1 : `0${index + 1}`}
                  </div>
                  <div className="mt-6">
                    <h4 className="mb-2 text-3xl font-semibold text-secondary-foreground">
                      {card.title}
                    </h4>
                    {card.description && (
                      <p className="mt-6 text-lg text-secondary-foreground">{card.description}</p>
                    )}
                    {card.listItems && (
                      <div className="mt-6">
                        <p className="mt-6 text-lg text-secondary-foreground">
                          {card.listDescription}
                        </p>
                        <ul className="mt-6 space-y-2 text-lg text-secondary-foreground">
                          {card.listItems.map((item, i) => (
                            <li key={i} className="flex items-center">
                              <ChevronRight className="mr-2 h-6 w-6" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export { BiggerBlockCards }
