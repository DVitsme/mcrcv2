'use client'
import { AnimateInView } from '@/components/animations/AnimateInView'

// Data can be passed as props from a Payload fetch

interface ScrollInViewTitleAndDescriptionProps {
  title?: string
  subtitle?: string
  description?: string
}

export function ScrollInViewTitleAndDescription({
  title = 'Therapy & Coaching for a global workforce',
  subtitle = 'Professional therapy and coaching for your team',
  description = "Provide easy access to professional coaching and therapy for your team, ensuring privacy and quality, no matter where they're based.",
}: ScrollInViewTitleAndDescriptionProps) {
  return (
    <section id="coaching-therapy" className="container py-16 text-center lg:py-24">
      <div className="space-y-3 xl:space-y-6">
        <div className="space-y-4">
          <AnimateInView>
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">{title}</h2>
            <p className="text-lg text-muted-foreground md:text-xl">{subtitle}</p>
          </AnimateInView>
          <AnimateInView delay={0.1}>
            <div className="mx-auto max-w-[800px] text-lg text-muted-foreground lg:w-4/5">
              <p>{description}</p>
            </div>
          </AnimateInView>
        </div>
      </div>
    </section>
  )
}
