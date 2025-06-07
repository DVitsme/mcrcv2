'use client'

import { PageHero } from '@/Header/PageHero'

import { StickyTitleScrollingBlocks } from '@/components/sections/StickyTitleScrollingBlocks'
import { TwoColRightImage } from '@/components/sections/TwoColRightImage'
import { FAQ } from '@/components/sections/FAQ'
import { GridImageCards } from '@/components/sections/GridImageCards'

const AboutPage = () => {
  return (
    <div>
      <PageHero
        heading="About Us"
        description="We are a team of developers who are passionate about building great products."
        image={{
          src: 'https://www.shadcnblocks.com/images/block/placeholder-1.svg',
          alt: 'About Us',
        }}
      />
      <section className="py-32">
        <div className="container mx-auto max-w-7xl flex flex-col gap-28 md:px-10">
          <div className="flex flex-col gap-7">
            <h1 className="text-4xl font-semibold lg:text-7xl">About Us</h1>
            <p className="max-w-xl text-lg">
              Conflict is part of life—it shapes our relationships, our communities, and our growth.
              At the Mediation and Conflict Resolution Center, we believe that conflict, when
              approached with care and intention, can be a pathway to healing, understanding, and
              transformation.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col justify-between gap-10 rounded-2xl bg-muted p-10 size-full max-h-96">
              <p className="text-sm text-muted-foreground pb-14">OUR MISSION</p>
              <p className="text-lg font-medium">
                Provide widely accessible and affordable conflict resolution services and education
                that help all community members manage conflict and have difficult conversations in
                a meaningful, proactive way.
              </p>
            </div>
            <div className="flex flex-col justify-between gap-10 rounded-2xl bg-muted p-10">
              <p className="text-sm text-muted-foreground">OUR VISION</p>
              <p className="text-lg font-medium">
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
          <StickyTitleScrollingBlocks
            title="Our Core Values"
            description="MCRC is committed to building an inclusive and equitable community. We use Alternative Dispute Resolution (ADR) to resolve conflicts in a way that values equity, diversity, and collaboration. By prioritizing fair access, amplifying diverse voices, removing barriers to participation, and fostering shared investment, these values guide our principles, shaping how we serve and engage with individuals and groups in Howard County."
            Values={CoreValues}
          />
          <FAQ heading="MCRC Commitment to the The Nine Hallmarks of Community Mediation" />
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
