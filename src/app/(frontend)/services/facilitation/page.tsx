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
      <div className="container mx-auto max-w-7xl flex flex-col gap-28 md:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div className="flex flex-col gap-10 rounded-2xl bg-secondary p-10">
            <h2 className="text-2xl font-bold">Facilitation</h2>
          </div>
        </div>
      </div>
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
