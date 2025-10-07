import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import {
  Ear,
  CircleCheckBig,
  Handshake,
  MessageCircle,
  GraduationCap,
  Users,
  Award,
  TrendingUp,
  Calendar,
} from 'lucide-react'
import { ThreeColTitleBoxes } from './ThreeColTitleBoxes'

// Mock data object, now with real icon components
const mediationPageData = {
  title: 'How can it help me?',
  description:
    'Most of us have what it takes to resolve conflict. Sometimes we just need space, support, and someone to guide the conversation.',
  cardData: [
    {
      title: 'Your voice matters.',
      description:
        'Mediators help make sure the conversation is fair and respectful, giving each person space to share their side and really listen to others.',
      icon: Ear,
      bgColor: 'bg-secondary',
    },
    {
      title: 'You stay in control.',
      description:
        'Community mediation is a powerful alternative to hiring a lawyer or going to court. It’s collaborative, confidential, and often more sustainable—because the people involved created the agreement themselves.',
      icon: CircleCheckBig,
      bgColor: 'bg-secondary',
    },
    {
      title: 'You create the solutions.',
      description:
        'There’s more than one way to resolve conflict. Mediation is a collaborative, confidential alternative to court that puts decision-making in your hands.',
      icon: Handshake,
      bgColor: 'bg-secondary',
    },
    {
      title: "You're not forced to decide.",
      description:
        'If you’re not ready to resolve certain parts of the conflict, that’s okay. Mediation honors your pace.',
      icon: MessageCircle,
      bgColor: 'bg-secondary',
    },
  ],
}

const meta: Meta<typeof ThreeColTitleBoxes> = {
  title: 'Components/Sections/ThreeColTitleBoxes',
  component: ThreeColTitleBoxes,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A responsive layout section with a title, description, and a variable number of cards (1 to 4). Each card has an icon and a background color.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    data: {
      control: 'object',
      description: 'Data object containing title, description, and card data array',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// This story now correctly uses the mock data with real icons
export const MediationPageExample: Story = {
  args: {
    data: mediationPageData,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Example from the mediation page showing how mediation can help users with four key benefits.',
      },
    },
  },
}

export const ThreeCards: Story = {
  args: {
    data: {
      title: 'Our Services',
      description: 'Comprehensive conflict resolution solutions for your needs',
      cardData: [
        {
          title: 'Mediation',
          description: 'Professional mediation services to help resolve disputes amicably.',
          icon: Handshake,
          bgColor: 'bg-blue-50',
        },
        {
          title: 'Training',
          description:
            'Learn conflict resolution skills through our comprehensive training programs.',
          icon: GraduationCap,
          bgColor: 'bg-green-50',
        },
        {
          title: 'Community',
          description:
            'Join our community of trained mediators and conflict resolution professionals.',
          icon: Users,
          bgColor: 'bg-purple-50',
        },
      ],
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Three-card layout showcasing different services with varied background colors.',
      },
    },
  },
}

export const TwoCards: Story = {
  args: {
    data: {
      title: 'Why Choose Us?',
      description: 'Experience the difference of professional mediation',
      cardData: [
        {
          title: 'Expert Mediators',
          description: 'Our certified mediators bring years of experience to every session.',
          icon: Award,
          bgColor: 'bg-secondary',
        },
        {
          title: 'Proven Results',
          description: 'High success rate in resolving conflicts and improving relationships.',
          icon: TrendingUp,
          bgColor: 'bg-secondary',
        },
      ],
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Two-card layout highlighting key advantages of choosing our services.',
      },
    },
  },
}

export const SingleCard: Story = {
  args: {
    data: {
      title: 'Get Started',
      description: 'Ready to resolve your conflict?',
      cardData: [
        {
          title: 'Schedule Your Session',
          description:
            'Contact us today to schedule your mediation session and take the first step toward resolution.',
          icon: Calendar,
          bgColor: 'bg-primary text-primary-foreground',
        },
      ],
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Single card layout for focused call-to-action messaging.',
      },
    },
  },
}
