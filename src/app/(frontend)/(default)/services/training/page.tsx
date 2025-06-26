'use client'

import { PageHero } from '@/heros/PageHero'
import { ScrollInViewTitleAndDescription } from '@/components/sections/ScrollInViewTitleAndDescription'
import { ServicePageFooter } from '@/components/sections/ServicePageFooter'
import { TwoColTitleCheckListImage } from '@/components/sections/TwoColTitleCheckListImage'
import { TwoBoxes } from '@/components/TwoCol/TwoBoxes'
import { FAQ } from '@/components/sections/FAQ'
import { CtaTitleFullWidth } from '@/components/sections/CtaTitleFullWidth'
import { BiggerBlockCards } from '@/components/ScrollingCards/BiggerBlockCards'
import { BadgeCheck } from 'lucide-react'
import { Users } from 'lucide-react'
import { ThreeColTitleBoxes } from '@/components/sections/ThreeColTitleBoxes'
import { CTAChecks } from '@/components/CTA/CTAChecks'

export default function Training() {
  return (
    <main>
      <PageHero
        heading="Training & Education"
        description="Whether you're looking for a one-time training, an ongoing workshop series, or a custom class designed for your team, we’re here to help you grow your capacity to work through challenges—together."
        image={{
          src: '/images/training/solo-teaching-board.jpg',
          alt: 'Training',
        }}
        badge="Training & Education"
        color="darkyellow"
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

      <ScrollInViewTitleAndDescription title="At MCRC, we believe conflict is not a failure. It is an opportunity. Rooted in community care, our trainings and workshops support individuals and groups in deepening their ability to communicate, listen, and move through tension with compassion and clarity." />
      <TwoColTitleCheckListImage
        data={WhoWeWorkWith}
        imagePosition="left"
        imageSize={{ maxHeight: '300px', height: 300, width: 500 }}
      />
      <CtaTitleFullWidth
        heading="Interested in a Training or Custom Workshop?"
        color="darkyellow"
        button={{
          text: 'Fill out our request form.',
          url: 'https://docs.google.com/document/d/1t-3PiTqKhlgMwrVNmrvYgPQ0momHdx5pkiOpHWjkT8o/edit?usp=sharing',
        }}
      />
      <TwoColTitleCheckListImage
        data={HowOurFacilitationServicesCanHelp}
        imagePosition="right"
        imageSize={{ maxHeight: '300px', height: 300, width: 500 }}
      />
      <BiggerBlockCards
        title="Workshops & Trainings: "
        titleGray="We Offer"
        color="darkyellow"
        description="Here are a few of the training we regularly offer. We can deliver these sessions virtually or in person, and most can be adapted for different group sizes or settings. We’ll work with you to design a session that meets your group’s specific needs—whether that’s navigating internal conflict, supporting your staff, or building skills for collaborative leadership."
        cards={stickyCards}
        buttonTitle="Let’s figure out your needs together."
        buttonText="Click here to get started"
        buttonLink="https://forms.gle/MkdSqa6UFrcCgQKq9"
      />
      <TwoColTitleCheckListImage
        data={ourApproachToLearning}
        imagePosition="right"
        imageSize={{ maxHeight: '300px', height: 300, width: 500 }}
      />
      <CTAChecks
        title="Who We Work With: "
        description="MCRC offers training and workshops for individuals, groups, and organizations across Howard County. Our programs are designed with accessibility, flexibility, and care in mind. If you're not sure whether our offerings are a fit, reach out. We’re happy to talk through your needs and co-create something that works for your group."
        color="darkyellow"
        buttonText="Click here to get started"
        buttonUrl="https://forms.gle/MkdSqa6UFrcCgQKq9"
        items={[
          'Community-based organizations and nonprofits',
          'Schools and education professionals',
          'Small businesses',
          'Faith communities and mutual aid groups',
        ]}
      />

      <ServicePageFooter cards={footerCards} />
    </main>
  )
}

const WhoWeWorkWith = {
  imageUrl: '/images/mediation/mediation-group-tictactoe.jpg',
  imageAlt: 'teaching group',
  videoSrc: '/videos/training/teaching-group.mp4',
  title: 'We see conflict skills as essential community tools.',
  description:
    'Whether you’re part of a grassroots organization, a local business, a school, or simply someone looking to navigate hard conversations more effectively, we’re here to build capacity with you.',
  bottomDescription:
    'From one-time workshops to custom-designed series, our learning spaces are interactive, accessible, and grounded in the wisdom we all carry. Together, we practice approaches that support trust, equity, and shared leadership.',
}
const ourApproachToLearning = {
  imageUrl: '/images/training/teaching-group.jpg',
  imageAlt: 'Teaching Group',
  title: 'Our Approach to Learning',
  description:
    'We know that many traditional models of conflict resolution are shaped by dominant cultural norms and values. At MCRC, we are working to unlearn those patterns. Our programs honor lived experience, support different ways of knowing, and make space for people to come as they are.',
  bottomDescription:
    'We believe that learning is a shared process. You bring wisdom. We bring tools. Together, we create something stronger.',
}
const HowOurFacilitationServicesCanHelp = {
  imageUrl: '/images/mediation/mediation-group-tictactoe.jpg',
  imageAlt: 'Mediation',
  videoSrc: '/videos/training/Accessible-Learning-for-all.mp4',
  title: 'Accessible Learning for all',
  description:
    'As a nonprofit, MCRC is committed to making learning available to everyone. Our trainings are offered on a sliding scale, and no group is turned away because of limited funds. We center access and equity in all that we do and are happy to work with you to find a plan that fits.',
}
const stickyCards = [
  {
    icon: <Users strokeWidth={1.5} className="size-12" />,
    title: 'Mediation 101 for Businesses',
    description:
      'Learn the basics of mediation and how to integrate mediation-informed practices into your organization’s communication culture.',
  },
  {
    icon: <BadgeCheck strokeWidth={1.5} className="size-12" />,
    title: 'Conflict Management in the Workplace',
    description:
      'Explore practical tools for recognizing, addressing, and de-escalating conflict on teams. Great for managers, team leads, and HR professionals.',
  },
  {
    icon: <BadgeCheck strokeWidth={1.5} className="size-12" />,
    title: 'Conflict Styles & Self-Awareness',
    description:
      'Explore your personal approach to conflict, learn about different conflict styles, and practice responding with intention during difficult conversations.',
  },
  {
    icon: <BadgeCheck strokeWidth={1.5} className="size-12" />,
    title: 'Consensus-Based Decision Making',
    description:
      'Build the skills to make group decisions that are inclusive and transparent. This is especially helpful for communities or teams working toward trust and shared accountability.',
  },
  {
    icon: <BadgeCheck strokeWidth={1.5} className="size-12" />,
    title: 'Anger Management',
    description:
      'Join a supportive space for individuals who want to understand and manage strong emotions. This group explores anger, self-awareness, and healthier ways to respond.',
  },
  {
    icon: <BadgeCheck strokeWidth={1.5} className="size-12" />,
    title: 'Custom Trainings for Howard County Organizations',
    description:
      'We know that each organization is different. That’s why we offer tailor-made workshops for nonprofits, community-based organizations, schools, and businesses that serve Howard County.',
  },
]

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
