import { PageHero } from '@/heros/PageHero'

export default function RestorativeJustice() {
  return (
    <main>
      <PageHero
        heading="Restorative Justice"
        description="Restorative justice is a process that helps people resolve conflicts and make decisions together. It is a way to resolve conflicts without going to court."
        image={{
          src: 'https://www.shadcnblocks.com/images/block/placeholder-1.svg',
          alt: 'Restorative Justice',
        }}
        badge="Restorative Justice"
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
    </main>
  )
}
