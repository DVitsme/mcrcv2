import { PageHero } from '@/heros/PageHero'
import { ScrollInViewTitleAndDescription } from '@/components/sections/ScrollInViewTitleAndDescription'
import { ServicePageFooter } from '@/components/sections/ServicePageFooter'

export default function Facilitation() {
  return (
    <main>
      <PageHero
        heading="Facilitation"
        description="At MCRC, we believe that stronger communities are built through open, honest, and structured conversations. "
        image={{
          src: '/images/facilitation/facilitation-v2.jpg',
          alt: 'Facilitation',
        }}
        badge="Facilitation"
        color="darkbrown"
        buttons={{
          primary: {
            text: 'Get Started',
            url: '/services/facilitation',
          },
          secondary: {
            text: 'Learn More',
            url: '/services/facilitation',
          },
        }}
      />

      <ScrollInViewTitleAndDescription title="Facilitation" />
      <ServicePageFooter cards={footerCards} />
    </main>
  )
}
const footerCards = [
  {
    title: 'Mediation',
    subtitle: 'Service',
    href: '/services/mediation',
    color: 'blue',
  },
  {
    title: 'Restorative Justice',
    subtitle: 'Service',
    href: '/services/restorative-justice',
    color: 'darkgreen',
  },
]
