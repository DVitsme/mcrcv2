import { ScrollInViewTitleAndDescription } from '@/components/sections/ScrollInViewTitleAndDescription'
import { ServicePageFooter } from '@/components/sections/ServicePageFooter'
import { PageHero } from '@/heros/PageHero'

const title =
  'Rooted in practices that have existed for generations—long before formal legal systems—we create spaces for deep listening, honest reflection, and meaningful repair. Whether the conflict involves friends, family, classmates, or neighbors, our approach is grounded in relationships—not just behavior or rules. Restorative practices give voice to those most impacted and create a way forward that reflects shared values, not imposed solutions.'

export default function RestorativeJustice() {
  return (
    <main>
      <PageHero
        heading="Restorative Justice"
        description="Our youth-centered restorative program supports healing after harm by creating space for accountability, reflection, and meaningful conversation. We work with families, schools, and community partners to help young people repair trust and move forward."
        image={{
          src: '/images/restorative-justice/two-people-conversation.jpg',
          alt: 'Restorative Justice',
        }}
        badge="Restorative Justice"
        color="darkgreen"
        buttons={{
          primary: {
            text: 'Get Started',
            url: '/services/restorative-justice',
          },
          secondary: {
            text: 'Learn More',
            url: '/services/restorative-justice',
          },
        }}
      />
      <ScrollInViewTitleAndDescription title={title} />
      <ServicePageFooter SectionTitle="Discover our other services" cards={footerCards} />
    </main>
  )
}

const footerCards = [
  {
    title: 'Facilitation',
    subtitle: 'Service',
    href: '/services/facilitation',
    color: 'darkbrown',
  },
  {
    title: 'Mediation',
    subtitle: 'Service',
    href: '/services/mediation',
    color: 'blue',
  },
]
