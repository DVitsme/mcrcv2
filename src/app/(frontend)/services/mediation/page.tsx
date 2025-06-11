'use client'

import { PageHero } from '@/heros/PageHero'

import { Award, CircleCheckBig, Dna, Ear, Handshake, MessageCircle } from 'lucide-react'
import { Rocket } from 'lucide-react'
import { Wallet } from 'lucide-react'
import { ScrollInViewTitleAndDescription } from '@/components/sections/ScrollInViewTitleAndDescription'
import { ScrollInViewGrid } from '@/components/sections/ScrollInViewGrid'
import { TwoColTitleCheckListImage } from '@/components/sections/TwoColTitleCheckListImage'
import { ThreeColTitleBoxes } from '@/components/sections/ThreeColTitleBoxes'
import { CtaTitleFullWidth } from '@/components/sections/CtaTitleFullWidth'
import { AboutPreview } from '@/components/sections/AboutPreview'

const sectionData = {
  title:
    'Mediation is a safe, confidential space where people in conflict can talk things through—with support. If you’re having a tough time working something out with someone, or you know a hard conversation needs to happen but don’t know where to start, mediation can help.',
  subtitle:
    'Trained, neutral mediators guide the conversation—not to take sides or make decisions for you, but to help you:',
  imageUrl: '/images/mediation/mediation-group-tictactoe.jpg',
  imageAlt: 'Mediation',
  videoSrc: '/videos/mediation/mediation-office.mp4',
}

const featuresData = [
  {
    icon: Award,
    title: 'Share your perspective',
    description:
      'lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    icon: Dna,
    title: 'Clarify what matters most to you',
    description:
      'lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    icon: Rocket,
    title: 'Understand the other person’s point of view',
    description:
      'lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    icon: Wallet,
    title: 'Explore possible ways forward—together',
    description:
      'lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
]
const WhyMediate = {
  imageUrl: '/images/mediation/mediation-group-tictactoe.jpg',
  imageAlt: 'Mediation',
  title: 'Why Choose Mediation?',
  description:
    "You stay in control. You're the expert in your own situation. Mediators won’t tell you what to do—they’ll help you identify solutions that fit your unique needs.",
  checkList: [
    'It’s confidential. What’s said in mediation stays private, making it easier to be honest and explore real solutions.',
    'It can preserve important relationships. We often find ourselves in conflict with the people we live, work, or care for. Mediation supports respectful, collaborative dialogue so relationships can heal or move forward.',
    'It’s accessible. Mediation at MCRC is provided free of charge. It’s an excellent alternative to going to court.',
  ],
}

const ThreeColData = {
  title: 'How can it help me?',
  description:
    'Most people have the ability to resolve conflict—what we often need is the right support.',
  cardData: [
    {
      title: 'You’re heard.',
      description:
        'Mediators are trained to listen deeply and make sure everyone has a chance to speak and be understood.',
      icon: Ear,
      bgColor: 'bg-secondary',
    },
    {
      title: 'You stay in control.',
      description:
        'You’re the expert in your own situation. Mediators won’t tell you what to do—they’ll help you identify solutions that fit your unique needs.',
      icon: CircleCheckBig,
      bgColor: 'bg-secondary',
    },
    {
      title: 'You create the solutions.',
      description:
        'Together, you and the other person can identify solutions that meet your unique needs.',
      icon: Handshake,
      bgColor: 'bg-secondary',
    },
    {
      title: 'You’re not forced to decide.',
      description:
        'If you’re not ready to resolve certain parts of the conflict, that’s okay. Mediation honors your pace.',
      icon: MessageCircle,
      bgColor: 'bg-secondary',
    },
  ],
}

const AboutData = {
  image: '/images/mediation/mediation-group-tictactoe.jpg',
  imageAlt: 'Mediation',
  header: 'Who are the mediators?',
  subheader: 'At MCRC, we use a co-mediator model',
  description:
    'This means there are two mediators in each session. This ensures balance, collaboration, and greater support for everyone involved. Mediators are not decision-makers. They don’t give advice or make judgments. Instead, they create a space for collaborative problem-solving so you and the other person can come up with solutions that fit your unique situation. Each mediator is a specially trained volunteer from Howard County or a neighboring community. Mediators are here to:',
  buttonText: 'Learn More',
  buttonLink: '/services/mediation',
  dataList: [
    {
      title: 'Guide the conversation',
      icon: Handshake,
    },
    {
      title: 'Ensure everyone has space to speak and be heard',
      icon: Handshake,
    },
    {
      title:
        'Support a respectful and productive process that includes tracking key concerns, values and ideas for resolution.',
      icon: Handshake,
    },
  ],
}
export default function Mediation() {
  const { title, imageUrl, imageAlt, videoSrc } = sectionData

  return (
    <main>
      <PageHero
        heading="Mediation"
        description="Mediation is a process that helps people resolve conflicts and make decisions together. It is a way to resolve conflicts without going to court."
        image={{
          src: 'https://www.shadcnblocks.com/images/block/placeholder-1.svg',
          alt: 'Mediation',
        }}
        badge="Small Groups"
        buttons={{
          primary: {
            text: 'Get Started',
            url: '/services/mediation',
          },
          secondary: {
            text: 'Learn More',
            url: '/services/mediation',
          },
        }}
      />

      <ScrollInViewTitleAndDescription title={title} />
      <ScrollInViewGrid
        imageUrl={imageUrl}
        imageAlt={imageAlt}
        featuresData={featuresData}
        videoSrc={videoSrc}
      />
      <TwoColTitleCheckListImage data={WhyMediate} />
      <ThreeColTitleBoxes data={ThreeColData} />
      <CtaTitleFullWidth heading="Community mediation is a powerful alternative to hiring a lawyer or going to court. It’s collaborative, confidential, and often more sustainable—because the people involved created the agreement themselves." />
      <AboutPreview data={AboutData} />
    </main>
  )
}
