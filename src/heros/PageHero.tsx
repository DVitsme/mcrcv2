import { ArrowRight, Users } from 'lucide-react'
import Image from 'next/image'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui' // Make sure you import a utility for combining class names

interface Hero1Props {
  badge?: string
  heading: string
  description: string
  // Use a specific type for colors for better autocompletion and safety
  color?: 'blue' | 'darkbrown' | 'darkgreen' | 'yellow' | 'darkyellow'
  buttons?: {
    primary?: { text: string; url: string }
    secondary?: { text: string; url: string }
  }
  image?: {
    src: string
    alt: string
  }
}

const PageHero = ({
  badge = '✨ Your Website Builder',
  heading = 'Blocks Built With Shadcn & Tailwind',
  description = 'Finely crafted components built with React, Tailwind and Shadcn UI. Developers can copy and paste these blocks directly into their project.',
  color = 'blue',
  buttons,
  image,
}: Hero1Props) => {
  // --- Map the color prop to full, static Tailwind classes ---
  const colorClasses = {
    blue: 'bg-blue text-blue-foreground',
    darkbrown: 'bg-darkbrown text-darkbrown-foreground',
    darkgreen: 'bg-darkgreen text-darkgreen-foreground',
    yellow: 'bg-yellow text-yellow-foreground',
    darkyellow: 'bg-darkyellow text-darkyellow-foreground',
  }

  // Determine button colors based on the section color for better contrast
  const primaryButtonClasses = {
    blue: 'bg-blue-foreground text-blue',
    darkbrown: 'bg-darkbrown-foreground text-darkbrown',
    darkgreen: 'bg-darkgreen-foreground text-darkgreen',
    yellow: 'bg-yellow-foreground text-yellow',
    darkyellow: 'bg-darkyellow-foreground text-darkyellow',
  }

  return (
    // I was having issues with the colorClasses not being applied, so I added this colorClasses[color] temp fix that may end up being permanent
    <section className={cn('py-32', colorClasses[color])}>
      <div className="container">
        <div className={cn('grid items-center gap-8', image ? 'lg:grid-cols-2' : '')}>
          <div
            className={cn(
              'flex flex-col items-center text-center',
              image
                ? 'lg:items-start lg:text-left min-w-0'
                : 'lg:items-center lg:text-center min-w-full',
            )}
          >
            {badge && (
              <Badge variant="outline" className="border-current text-current">
                <Users className="ml-1 mr-2 size-4" />
                <span className="mr-2">{badge}</span>
              </Badge>
            )}
            <h1 className="my-6 pb-6 pt-4 text-6xl font-bold uppercase text-pretty lg:text-8xl">
              {heading}
            </h1>
            <p className="mb-8 max-w-xl lg:text-xl">{description}</p>
            <div
              className={cn(
                'flex w-full flex-col justify-center gap-2 sm:flex-row',
                image ? 'lg:justify-start' : 'lg:justify-center',
              )}
            >
              {buttons?.primary && (
                <Button asChild className={cn('w-full sm:w-auto', primaryButtonClasses[color])}>
                  <a href={buttons.primary.url}>{buttons.primary.text}</a>
                </Button>
              )}
              {buttons?.secondary && (
                <Button
                  asChild
                  variant="outline"
                  className="w-full sm:w-auto border-current text-black"
                >
                  <a href={buttons.secondary.url}>
                    {buttons.secondary.text}
                    <ArrowRight className="size-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>
          {image && (
            <Image
              src={image.src}
              alt={image.alt}
              className="max-h-96 ml-0 w-full rounded-md object-cover lg:ml-10"
              width={1000}
              height={1000}
            />
          )}
        </div>
      </div>
    </section>
  )
}

export { PageHero }
