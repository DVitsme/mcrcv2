import { AnimateInView } from '@/components/animations/AnimateInView'
import { BiggerBlockCards } from '@/components/ScrollingCards/BiggerBlockCards'
import { CtaTitleFullWidth } from '@/components/sections/CtaTitleFullWidth'
import { ScrollInViewTitleAndDescription } from '@/components/sections/ScrollInViewTitleAndDescription'
import { ServicePageFooter } from '@/components/sections/ServicePageFooter'
import { ThreeColImages } from '@/components/sections/ThreeColImages'
import { TwoColTitleCheckListImage } from '@/components/sections/TwoColTitleCheckListImage'
import { PageHero } from '@/heros/PageHero'
import { CalendarCheck, MessageCircleQuestionIcon, User, UserCheck2 } from 'lucide-react'

const title =
  'Rooted in practices that have existed for generations—long before formal legal systems—we create spaces for deep listening, honest reflection, and meaningful repair. Whether the conflict involves friends, family, classmates, or neighbors, our approach is grounded in relationships—not just behavior or rules. Restorative practices give voice to those most impacted and create a way forward that reflects shared values, not imposed solutions.'

const whatToExpect = {
  imageUrl: '/images/restorative-justice/restorative-justice.jpg',
  imageAlt: 'restorative-justice',
  title: 'What Are Restorative Practices?',
  description:
    'Restorative Practices are a relationship-centered approach to resolving conflict and harm. Instead of asking “What rule was broken and what punishment is deserved?” our questions are centered around:',
  checkList: ['What happened?', 'Who was impacted?', 'What needs to be done to make things right?'],
  bottomDescription:
    'This approach supports our young people in taking respon­si­bil­i­ty for their actions, which helps them man­age con­flict, build empa­thy and mature into emo­tion­al­ly healthy adults',
  showSeparator: false,
}
const whyChoose = {
  imageUrl: '/images/restorative-justice/restorative-justice-with-parent.jpg',
  imageAlt: 'restorative-justice on couch',
  icon: <MessageCircleQuestionIcon />,
  iconColor: 'secondary',
  title: 'Why Choose Restorative Practices?',
  description:
    'The world often tells us that harm can only be met with punishment. At MCRC our work is about transformation, not retribution. We hold space for accountability that restores, rather than punishes. We make room for voices that are too often ignored. And we believe that healing—real healing—is possible when we return to the wisdom of collective care.',
}
export default function RestorativeJustice() {
  return (
    <main>
      <PageHero
        heading="Restorative Justice"
        description="Our youth-centered restorative program supports healing after harm by creating space for accountability, reflection, and meaningful conversation. We work with families, schools, and community partners to help young people repair trust and move forward."
        image={{
          src: '/images/restorative-justice/two-people-conversation.jpg',
          alt: 'Restorative Justice',
        }}
        badge="Restorative Justice"
        color="darkgreen"
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
      <ScrollInViewTitleAndDescription title={title} />
      <AnimateInView delay={0.1}>
        <TwoColTitleCheckListImage data={whatToExpect} />
      </AnimateInView>
      <AnimateInView delay={0.2}>
        <TwoColTitleCheckListImage data={whyChoose} imagePosition="right" />
      </AnimateInView>
      <CtaTitleFullWidth
        heading="We know it’s tough. Our Restorative Justice Program offers your child a safe, caring space to reflect, repair, and grow. When you’re ready, click below to refer your youth—and let’s rebuild trust side by side."
        color="darkgreen"
        button={{
          text: 'Get Started',
          url: '/services/restorative-justice',
        }}
      />
      <BiggerBlockCards
        title="Our Process for: "
        titleGray="Restorative Reflection"
        description="Restorative Reflections offer young people a space to pause, think deeply, and be heard. Here’s how the process works, step by step:"
        cards={stickyCards}
        color="darkgreen"
      />
      <ThreeColImages data={ThreeColImagesData} />

      <ServicePageFooter SectionTitle="Discover our other services" cards={footerCards} />
    </main>
  )
}

const ThreeColImagesData = {
  title: 'Our Types of Restorative Practices',
  subtitle:
    'We offer three restorative pathways -  Reflections, Dialogues, and Circles - that are aimed at creating a space for young people t3hat allows them to reflect, repair, and grow, through healing conversations and community connection.',
  cards: [
    {
      title: 'Restorative Reflections',
      description:
        'Using a six-question model, we guide young people through a thoughtful process—whether they’ve experienced harm or been part of a situation where harm occurred. Reflections support emotional insight, help make sense of what happened, and explore how to move forward with care and responsibility.',
      image: '/images/restorative-justice/restorative-reflections.jpg',
      alt: 'Restorative Reflections',
    },
    {
      title: 'Restorative Dialogues',
      description:
        'When harm has occurred, accountability begins with conversation—not isolation. We bring together the person who was harmed and the person who caused harm for a guided, voluntary dialogue. The focus is on listening, understanding impact, and exploring what repair looks like—centered on the needs of the person affected.',
      image: '/images/restorative-justice/restorative-dialogues.jpg',
      alt: 'Restorative Dialogues',
    },
    {
      title: 'Restorative Circles',
      description:
        'Circles are intentional spaces where people come together to listen, share stories, and strengthen connection. Whether the goal is to heal from harm, build trust, or prevent future conflict, our circles create space for honest conversation, understanding, and shared problem-solving. At MCRC, we use circles in schools and communities to support youth, families, and educators in working through challenges and building stronger relationships.',
      image: '/images/restorative-justice/restorative-circles.jpg',
      alt: 'Restorative Circles',
    },
  ],
}

const stickyCards = [
  {
    icon: <User />,
    title: 'Step 1: A One-on-One Conversation (Pre-Reflection)',
    listDescription:
      'We begin with a private conversation with the youth and their caregiver to see if Restorative Reflection is the right fit. This is a chance for you to ask questions and learn more before deciding whether to continue. During this time, we:',
    listItems: [
      'Talk about what happened and who may have been affected',
      'Listen with care and without judgment',
      'Share what restorative practices are all about',
      'Help the young person prepare to reflect and tell their story well',
    ],
  },
  {
    icon: <CalendarCheck />,
    title: 'Step 2: Scheduling and Consent',
    listDescription:
      'Restorative Reflections are typically scheduled in two-hour time blocks so there’s space for real conversation, without rushing. Confidentiality & Trust is extremely important to us. That’s why we want you to know: This is a private and confidential process. MCRC is a community-based organization. We do not work for the courts, schools, or the justice system. Our role is to support young people and families—not to judge or report back to anyone. If everyone feels ready to move forward, we’ll: ',
    listItems: [
      'Schedule a time for the Restorative Reflection',
      'Send a short Consent to Participate form',
      'Ensure the young person feels supported and prepared',
    ],
  },
  {
    icon: <UserCheck2 />,
    title: 'Step 3: The Restorative Reflection Session',
    listDescription:
      'This is a guided process led by a trained facilitator. This isn’t about blame—it’s about growth, responsibility, and clarity. Some young people leave feeling lighter, more confident, or more connected to what matters to them. We’ll walk the youth through a six-question reflection that helps them:',
    listItems: [
      'Understand the situation from all angles',
      'Acknowledge the impact of what happened',
      'Think about what repair and healing might look like',
      'Consider what they might need to move forward',
    ],
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
    title: 'Mediation',
    subtitle: 'Service',
    href: '/services/mediation',
    color: 'blue',
  },
]
