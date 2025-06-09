import { PageHero } from '@/heros/PageHero'
import { TherapyAndCoachingSection } from '@/components/sections/ScrollInViewTitleAndDescription'

export default function Facilitation() {
  return (
    <main>
      <PageHero
        heading="Facilitation"
        description="Facilitation is a process that helps people resolve conflicts and make decisions together. It is a way to resolve conflicts without going to court."
        image={{
          src: 'https://www.shadcnblocks.com/images/block/placeholder-1.svg',
          alt: 'Facilitation',
        }}
        badge="Facilitation"
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
      <TherapyAndCoachingSection />
    </main>
  )
}
