'use client'
import { AnimateInView } from '@/components/animations/AnimateInView'

// Data can be passed as props from a Payload fetch

interface ScrollInViewTitleAndDescriptionProps {
  title?: string
  subtitle?: string
  description?: string
}

export function ScrollInViewTitleAndDescription({
  title,
  subtitle,
  description,
}: ScrollInViewTitleAndDescriptionProps) {
  return (
    <div className="container py-16 text-center lg:py-24">
      <div className="space-y-3 xl:space-y-6">
        <div className="space-y-4">
          <AnimateInView>
            <h2 className="text-3xl mb-4 font-medium tracking-tighter sm:text-4xl md:text-4xl/[3.1rem]">
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
    </div>
  )
}
