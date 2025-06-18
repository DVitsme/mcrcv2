'use client'

import { PageHero } from '@/heros/PageHero'

import { StickyTitleScrollingCards } from '@/components/ScrollingCards/StickyTitleScrollingCards'
import { TwoColRightImage } from '@/components/sections/TwoColRightImage'
import { FAQ } from '@/components/sections/FAQ'
import { GridImageCards } from '@/components/sections/GridImageCards'

const AboutPage = () => {
  return (
    <div>
      <PageHero
        heading="About Us"
        description="Conflict is part of life—it shapes our relationships, our communities, and our growth. At the Mediation and Conflict Resolution Center, we believe that conflict, when approached with care and intention, can be a pathway to healing, understanding, and transformation."
        badge="Our History"
        color="yellow"
        buttons={{
          primary: {
            text: 'Our Services',
            url: '/services',
          },
          secondary: {
            text: 'Get Started',
            url: '/',
          },
        }}
      />
      <section className="py-32">
        <div className="container mx-auto max-w-7xl flex flex-col gap-28 md:px-10">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col justify-between gap-10 rounded-2xl bg-secondary p-10 size-full max-h-96">
              <p className="text-sm text-black font-bold">OUR MISSION</p>
              <p className="text-lg font-medium">
                Provide widely accessible and affordable conflict resolution services and education
                that help all community members manage conflict and have difficult conversations in
                a meaningful, proactive way.
              </p>
            </div>
            <div className="flex flex-col bg-yellow text-black font-bold justify-between gap-10 rounded-2xl p-10">
              <p className="text-sm text-muted-foreground">OUR VISION</p>
              <p className="text-2xl ">
                MCRC envisions a strong, vibrant, peaceful community where all members have the
                strategies, skills, and support to resolve conflict.
              </p>
            </div>
          </div>
          <TwoColRightImage
            subheader="26 Years of Service"
            title="Our History"
            description="Originally connected to Howard Community College, we have since grown into an independent, community-rooted organization. Our work is grounded in the belief that people hold the wisdom and capacity to navigate their own challenges when given the right support. We walk alongside individuals, families, and groups to facilitate conversations that restore trust, mend relationships, and build stronger communities."
            image="https://shadcnblocks.com/images/block/photos/pawel-czerwinski-O4fAgtXLRwI-unsplash.jpg"
          />
          <StickyTitleScrollingCards
            title="Our Core Values"
            description="MCRC is committed to building an inclusive and equitable community. We use Alternative Dispute Resolution (ADR) to resolve conflicts in a way that values equity, diversity, and collaboration. By prioritizing fair access, amplifying diverse voices, removing barriers to participation, and fostering shared investment, these values guide our principles, shaping how we serve and engage with individuals and groups in Howard County."
            cards={CoreValues}
          />
          <FAQ
            heading="MCRC Commitment to the The Nine Hallmarks of Community Mediation"
            items={faqItems}
          />
          <GridImageCards CardData={CardData} />
        </div>
      </section>
    </div>
  )
}

export default AboutPage

const CoreValues = [
  {
    title: 'Equity',
    description:
      'We believe that everyone deserves fair access to conflict resolution and restorative practices, regardless of their circumstances, background, or resources.',
  },
  {
    title: 'Collaboration',
    description:
      "We believe that meaningful change happens when people work together toward shared goals, honoring each other's perspectives and strengths.",
  },
  {
    title: 'Gift Economy',
    description:
      'We value generosity as the foundation of a gift economy, where services are offered to the community without expecting with no expectation of transaction or profit. This ethos inspires a culture of mutual support, where the collective contributions of time, skills, and resources - especially from volunteers - reflect our shared commitment to equity, inclusion, and community well-being.',
  },
  {
    title: 'Radical Inclusion',
    description:
      "We honor and uplift the voices of all individuals in our services, recognizing each person's inherent wisdom the inherent wisdom each person brings. We center self-determination, supporting individuals in reclaiming agency over their lives and decisions. By addressing and transforming power dynamics, we create spaces where those historically excluded or marginalized can access tools and resources to shape solutions that align with their unique needs and aspirations.",
  },
]

const faqItems = [
  {
    id: 'faq-1',
    question: 'Community-Based',
    answer:
      'A private non-profit or public agency or program thereof, with mediators, staff and governing/advisory board representative of the diversity of the community served.',
  },
  {
    id: 'faq-2',
    question: 'Open',
    answer:
      'The use of trained community volunteers as providers of mediation services; the practice of mediation is open to all persons.',
  },
  {
    id: 'faq-3',
    question: 'Accessible',
    answer:
      'Providing direct access to the public through self­-referral and striving to reduce barriers to service including physical, linguistic, cultural, programmatic and economic.',
  },
  {
    id: 'faq-4',
    question: 'Low-Cost',
    answer: 'Providing service to clients regardless of their ability to pay.',
  },
  {
    id: 'faq-5',
    question: 'Inclusive',
    answer:
      'Providing service and hiring without discrimination on the basis of race, color, religion, gender, age, disabilities, national origin, marital status, personal appearance, gender identity, sexual orientation, family responsibilities, matriculation, political affiliation, source of income.',
  },
  {
    id: 'faq-6',
    question: 'Timely',
    answer: 'Providing a forum for dispute resolution at the earliest stage of conflict.',
  },
  {
    id: 'faq-7',
    question: 'Innovative ',
    answer: 'Providing an alternative to the judicial system at any stage of a conflict.',
  },
  {
    id: 'faq-8',
    question: 'Outcome-Oriented',
    answer:
      'Initiating, facilitating and educating for collaborative community relationships to effect positive systemic change.',
  },
  {
    id: 'faq-9',
    question: 'Newsworthy',
    answer:
      'Engaging in public awareness and educational activities about the values and practices of mediation.',
  },
]

const CardData = [
  {
    id: 'person-1',
    name: "Tammatha O'Brien",
    role: 'Vice President',
    description:
      'Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur. Explicabo.',
    avatar: 'https://shadcnblocks.com/images/block/avatar-1.webp',
  },
  {
    id: 'person-2',
    name: 'Derek Robertson',
    role: 'Vice President',
    description: 'Elig doloremque mollitia fugiat omnis!',
    avatar: 'https://shadcnblocks.com/images/block/avatar-2.webp',
  },
  {
    id: 'person-3',
    name: 'Alec Taylor',
    role: 'Treasure',
    description:
      'Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur. Explicabo.',
    avatar: 'https://shadcnblocks.com/images/block/avatar-3.webp',
  },
  {
    id: 'person-4',
    name: 'Susan Bottomley',
    role: 'Secretary',
    description: 'Elig doloremque mollitia fugiat omnis!',
    avatar: 'https://shadcnblocks.com/images/block/avatar-4.webp',
  },
  {
    id: 'person-5',
    name: 'Robert Duru',
    role: 'Board Member',
    description:
      'Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur. Explicabo.',
    avatar: 'https://shadcnblocks.com/images/block/avatar-5.webp',
  },
  {
    id: 'person-6',
    name: 'Jazmyn Padmore',
    role: 'Board Member',
    description:
      'Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur. Explicabo.',
    avatar: 'https://shadcnblocks.com/images/block/avatar-6.webp',
  },
  {
    id: 'person-7',
    name: 'Jane Porter',
    role: 'Board Member',
    description:
      'Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur. Explicabo.',
    avatar: 'https://shadcnblocks.com/images/block/avatar-7.webp',
  },
  {
    id: 'person-8',
    name: 'Tamara Saunders',
    role: 'Board Member',
    description:
      'Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur. Explicabo.',
    avatar: 'https://shadcnblocks.com/images/block/avatar-8.webp',
  },
  {
    id: 'person-9',
    name: 'Kimberly Pfeifer',
    role: 'Board Member',
    description:
      'Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur. Explicabo.',
    avatar: 'https://shadcnblocks.com/images/block/avatar-8.webp',
  },
  {
    id: 'person-10',
    name: 'Roxie Tossie',
    role: 'Board Member',
    description:
      'Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur. Explicabo.',
    avatar: 'https://shadcnblocks.com/images/block/avatar-8.webp',
  },
  {
    id: 'person-11',
    name: 'Roger Meade',
    role: 'Board Member',
    description:
      'Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur. Explicabo.',
    avatar: 'https://shadcnblocks.com/images/block/avatar-8.webp',
  },
]
