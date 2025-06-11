'use client'

import { PageHero } from '@/heros/PageHero'

import {
  Award,
  BadgeCheck,
  CheckIcon,
  CircleCheckBig,
  Dna,
  Ear,
  Goal,
  Handshake,
  MessageCircle,
  Timer,
  Users,
  XCircleIcon,
  XIcon,
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
import { FAQ } from '@/components/sections/FAQ'
import { TitleGrid } from '@/components/ThreeCol/TitleGridIconList'
import { ChecksAndXs } from '@/components/TwoCol/ChecksAndXs'
import { CTATitleArrow } from '@/components/CTA/CTATitleArrow'

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
        'This helps keep the discussion productive and centered on what matters most to the participants.',
      image: '/images/mediation/mediation-group-tictactoe.jpg',
      alt: 'Mediation',
    },
    {
      title: 'Ensure everyone has space to speak and be heard',
      description:
        'This structured approach guarantees no single voice dominates, fostering a fair and balanced exchange.',
      image: '/images/mediation/mediation-group-tictactoe.jpg',
      alt: 'Mediation',
    },
    {
      title: 'Support a respectful and productive process ',
      description:
        'By capturing these details, they help participants build a practical and customized agreement together.',
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
        color="blue"
        image={{
          src: '/images/mediation/coupleoncouch.jpeg',
          alt: 'Mediation',
        }}
        badge="Small Groups"
        buttons={{
          primary: {
            text: 'How it works',
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
        imgSrc="/images/mediation/community.jpg"
      />
      <FAQ heading="Types of mediation supported at MCRC" items={faqItems} />
      <TitleGrid
        title="Family Mediation helps to resolve disputes in households"
        items={titleGridItems}
      />
      <ChecksAndXs data={checksAndXsData} />
      <CTATitleArrow data={CTATitleArrowData} />
      <ServicePageFooter SectionTitle="Discover our other services" cards={footerCards} />
    </main>
  )
}

const checksAndXsData = {
  left: {
    titleIcon: <XIcon strokeWidth={1.5} className="size-12" />,
    title: 'What mediation is not',
    textColor: 'text-red-500',
    items: [
      {
        title: 'Mediation is not arbitration',
        icon: <XCircleIcon strokeWidth={1.5} className="size-6" />,
      },
      {
        title: 'Mediation is not a court proceeding',
        icon: <XCircleIcon strokeWidth={1.5} className="size-6" />,
      },
      {
        title: 'Mediation is not counseling or therapy',
        icon: <XCircleIcon strokeWidth={1.5} className="size-6" />,
      },
      {
        title: 'Mediators do not provide legal advice or counsel',
        icon: <XCircleIcon strokeWidth={1.5} className="size-6" />,
      },
      {
        title: 'Mediators do not decide who is right or wrong',
        icon: <XCircleIcon strokeWidth={1.5} className="size-6" />,
      },
      {
        title: 'Mediators do not enforce agreements',
        icon: <XCircleIcon strokeWidth={1.5} className="size-6" />,
      },
    ],
  },
  right: {
    title: 'When Should I Think About Mediation?',
    description:
      "We often hear from people who say, 'I wish we had tried this sooner'. Sometimes, folks wait until they're exhausted, angry, or on the brink of a major decision. You don't have to wait that long",
    textColor: 'text-green-500',
    items: [
      {
        title: 'Anytime you’re facing conflict and want support—that’s the right time.',
        icon: <CheckIcon strokeWidth={1.5} className="size-6" />,
      },
      {
        title: 'Mediation can be helpful at any stage of a disagreement:',
        icon: <CheckIcon strokeWidth={1.5} className="size-6" />,
      },
      {
        title: 'In the early days, when communication is breaking down',
        icon: <CheckIcon strokeWidth={1.5} className="size-6" />,
      },
      {
        title: 'In the middle, when tension is growing',
        icon: <CheckIcon strokeWidth={1.5} className="size-6" />,
      },
      {
        title: 'Even later, when things feel stuck or overwhelming',
        icon: <CheckIcon strokeWidth={1.5} className="size-6" />,
      },
    ],
  },
}

const faqItems = [
  {
    id: 'faq-1',
    question: 'Attendance mediation',
    answer:
      'A process that helps students, parents and school staff work together to identify challenges and develop a pathway forward.',
  },
  {
    id: 'faq-2',
    question: 'Business/contract mediation',
    answer:
      'Any dispute between clients and business owners or signatories on contracts can be mediated.',
  },
  {
    id: 'faq-3',
    question: 'Neighbor to neighbor',
    answer:
      'There are all types of problems that may arise between people who live in the same community. Some of the most common are noise, property boundaries, fences, trees, trash cans, lawn care maintenance, parking, pets, and smoke.',
  },
  {
    id: 'faq-4',
    question: 'Employment/EEO',
    answer:
      'Mediation provides a neutral space to discuss conflicts that arise in the workplace. Some common topics are communication, expectations, roles and responsibilities, and teamwork.',
  },
  {
    id: 'faq-5',
    question: 'Landlord/Tenant',
    answer:
      "Disputes between landlords and tenants can be stressful and time consuming. Mediation can be a cost effective pathway to resolve challenges without engaging with the sheriff's office and the courts. If you are facing issues related to rent payments, lease terms, maintenance concerns, accessibility or compliance issues as well as eviction matters, mediation can help find a solution that works for everyone.",
  },
  {
    id: 'faq-6',
    question: 'Medical',
    answer:
      'We can support the resolution of disputes that may arise in the healthcare setting. If you are facing disagreements such as:	Challenges with a care plan, Administration challenges that interrupt provider patient communication, Misunderstandings over medical records, Family disputes regarding patient care or medical decisions',
  },
  {
    id: 'faq-7',
    question: 'Roommate conflicts',
    answer:
      'Living with roommates is not always easy. If you find that sharing a living space is stressful and conflicts are becoming more difficult to resolve like disagreements over cleanliness or noise issues? Or perhaps there is a lack of clarity around guest policies or personal space concerns. Mediation can help identify the underlying reasons behind the conflict and brainstorm potential solutions that address everyone’s needs and concerns.',
  },
  {
    id: 'faq-8',
    question: 'School',
    answer:
      'School administrators and counselors of  ten refer cases to mediation. Parents, guardians and caregivers may also request mediation for school-based conflicts such as bullying, interpersonal conflict, community/neighbor conflicts spilling over into the school or vice versa, etc.',
  },
]

const CTATitleArrowData = {
  title: 'Consider volunteering?',
  description:
    'We depend on our volunteers because we believe in community-led solutions. Our mediators are everyday people—parents, teachers, neighbors—trained to support conversations that can lead to real change.',
  buttonText: 'Get Started Now',
  buttonSubtext: 'We would love to have you!',
  buttonLink: '/volunteer',
  bgColor: 'bg-yellow',
  titleTextColor: 'text-yellow-foreground',
  descriptionTextColor: 'text-yellow-foreground',
  buttonBgColor: 'bg-black',
  buttonTextColor: 'text-yellow',
}

const titleGridItems = [
  {
    title: 'interpersonal relationships',
    list: [
      'Two parents (married or not) and one or more children',
      'Married couple',
      'One parent and one or more children in their custody',
      'A household or group of people such as grandparents, aunts, uncles and cousins',
    ],
    icon: <CheckIcon strokeWidth={1.5} className="size-12" />,
  },
  {
    title: 'Elder Care Mediation',
    description:
      'As parents age, care planning can become a challenge for families and loved ones. Mediation offers a process to help guide and focus those discussions, ensuring all parties feel heard as plans evolve.',
  },
  {
    title: 'Parent/Child',
    description:
      'Do you find yourself having communication issues with your child, or having the same arguments over and over? Mediation can help you explore the underlying issues. Do you have a child who recently earned their driver’s license? Or a new curfew? Do you have an adult child moving back into your home or moving a parent into your home? Mediation can help you explore expectations, create guidelines/rules, etc.',
  },
  {
    title: 'Parenting Plan',
    description:
      'If you are separating, divorcing with children, or needing modifications to an existing plan, mediation can help you create a co-parenting plan. A way to move forward, apart, while keeping the values you wish to raise your children with at the forefront of your path moving forward. ',
  },
  {
    title: 'Separation Services',
    description:
      'If you need to support living arrangements and future plans regarding separation, mediation can be useful. Our goal is to help you navigate the separation process with dignity and clarity allowing you to move forward.  ',
  },
]
const footerCards = [
  {
    title: 'Facilitation',
    subtitle: 'Service',
    href: '/services/facilitation',
    color: 'darkbrown',
  },
  {
    title: 'Restorative Justice',
    subtitle: 'Service',
    href: '/services/restorative-justice',
    color: 'darkgreen',
  },
]
