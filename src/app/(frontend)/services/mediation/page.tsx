'use client'

import { PageHero } from '@/heros/PageHero'

import {
  Award,
  BadgeCheck,
  CircleCheckBig,
  Cloud,
  Dna,
  Ear,
  Goal,
  Handshake,
  MessageCircle,
  Timer,
  Users,
  XCircle,
} from 'lucide-react'
import { Rocket } from 'lucide-react'
import { Wallet } from 'lucide-react'
import { ScrollInViewTitleAndDescription } from '@/components/sections/ScrollInViewTitleAndDescription'
import { ScrollInViewGrid } from '@/components/sections/ScrollInViewGrid'
import { TwoColTitleCheckListImage } from '@/components/sections/TwoColTitleCheckListImage'
import { ThreeColTitleBoxes } from '@/components/sections/ThreeColTitleBoxes'
import { CtaTitleFullWidth } from '@/components/sections/CtaTitleFullWidth'
import { ServicePageFooter } from '@/components/sections/ServicePageFooter'
import { ThreeColImages } from '@/components/sections/ThreeColImages'
import { BiggerBlockCards } from '@/components/ScrollingCards/BiggerBlockCards'
import { CallToAction } from '@/components/sections/CallToAction'

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

const ThreeColImagesData = {
  title: 'Who are the mediators?',
  subtitle:
    'Mediators are not decision-makers. They don’t give advice or make judgments. Instead, they create a space for collaborative problem-solving so you and the other person can come up with solutions that fit your unique situation. At MCRC, we use a co-mediator model, which means there are two mediators in each session. This ensures balance, collaboration, and greater support for everyone involved. Each mediator is a specially trained volunteer from Howard County or a neighboring community. Mediators are here to:',
  cards: [
    {
      title: 'Guide the conversation',
      description:
        'Mediators are trained to listen deeply and make sure everyone has a chance to speak and be understood.',
      image: '/images/mediation/mediation-group-tictactoe.jpg',
      alt: 'Mediation',
    },
    {
      title: 'Ensure everyone has space to speak and be heard',
      description:
        'Mediators are trained to listen deeply and make sure everyone has a chance to speak and be understood.',
      image: '/images/mediation/mediation-group-tictactoe.jpg',
      alt: 'Mediation',
    },
    {
      title: 'Support a respectful and productive process ',
      description:
        'Mediators are trained to listen deeply and make sure everyone has a chance to speak and be understood.',
      image: '/images/mediation/mediation-group-tictactoe.jpg',
      alt: 'Mediation',
    },
  ],
}

const stickyCards = [
  {
    icon: <Ear strokeWidth={1.5} className="size-12" />,
    title: 'Step 1: We Listen First',
    description:
      'Before anything else, we meet individually with each person involved. This is your chance to tell your story, ask questions, and learn more about how mediation works. We explain what to expect and talk through whether this process feels like a good fit for you.',
  },
  {
    icon: <Timer strokeWidth={1.5} className="size-12" />,
    title: 'Step 2: We Find a Time That Works',
    description:
      'If everyone agrees to move forward, we work together to schedule your session. We coordinate with two of our trained volunteer mediators to find a time and place that works for all involved—often in your neighborhood or online.',
  },
  {
    icon: <Handshake strokeWidth={1.5} className="size-12" />,
    title: 'Step 3: We Ask for Your Consent',
    description:
      'Before the session begins, all participants sign a simple agreement that outlines the voluntary and confidential nature of mediation. This ensures that everyone is entering the space willingly and with shared expectations.',
  },
  {
    icon: <MessageCircle strokeWidth={1.5} className="size-12" />,
    title: 'Step 4: Everyone Gets to Speak',
    description:
      'We start by inviting each person to share their perspective. Each participant has uninterrupted time to speak about what’s been happening and what matters to them. There’s no need to debate or convince—this is about being heard.',
  },
  {
    icon: <Goal strokeWidth={1.5} className="size-12" />,
    title: 'Step 5: We Look for Shared Ground',
    description:
      'With the support of mediators, you’ll begin to notice shared concerns or goals. In many conflicts, even if people disagree on the details, they often care about some of the same things—like feeling respected, keeping a neighborhood safe, or protecting a relationship.',
  },
  {
    icon: <Users strokeWidth={1.5} className="size-12" />,
    title: 'Step 6: We Explore Possibilities',
    description:
      'Once common ground is established, the group begins to explore ways forward. Mediators help guide the conversation as participants suggest ideas and alternatives that could address shared concerns. All ideas are welcomed—this is a space for creativity and collaboration.',
  },
  {
    icon: <BadgeCheck strokeWidth={1.5} className="size-12" />,
    title: 'Step 7: You Choose What Works',
    description:
      'Together, you’ll reflect on each possible solution—what might work, what needs adjusting, and whether it feels fair. Sometimes an agreement is reached, and sometimes the process leads to a better understanding, even if full agreement isn’t yet possible.',
  },
  {
    icon: <Users strokeWidth={1.5} className="size-12" />,
    title: 'Step 8: We Reflect',
    description:
      'At the end of the process, we invite participants to share how it felt, what they learned, and what next steps—if any—they’d like to take. This final reflection helps us improve, and it gives you a chance to close the conversation with clarity and care.',
  },
]

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
      <ThreeColImages data={ThreeColImagesData} />
      <BiggerBlockCards
        title="What to Expect: "
        titleGray="The Mediation Process"
        description="Every mediation is different, but here’s what the journey typically looks like at MCRC. We move at the pace of trust, with respect for everyone’s story and voice."
        cards={stickyCards}
      />
      <CallToAction
        title="A Note from Us"
        description="We believe conflict is a part of being in community—and that navigating it with care, clarity, and connection is possible. Mediation isn’t about winners and losers. It’s about creating space for change, for dignity, and for forward movement."
        imgSrc="/images/mediation/happy-conversation.jpg"
      />
      <ServicePageFooter SectionTitle="Discover other services" cards={footerCards} />
    </main>
  )
}

const footerCards = [
  {
    title: 'Facilitation',
    subtitle: 'Service',
    href: '/services/facilitation',
    bgColor: 'bg-darkgreen',
    textColor: 'text-darkgreen-foreground',
    iconColor: 'bg-darkgreen-foreground',
  },
  {
    title: 'Restorative Justice',
    subtitle: 'Service',
    href: '/services/restorative-justice',
    bgColor: 'bg-blue',
    textColor: 'text-blue-foreground',
    iconColor: 'bg-blue-foreground',
  },
]
