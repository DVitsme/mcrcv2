import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { CtaTitleFullWidth } from './CtaTitleFullWidth'

const meta: Meta<typeof CtaTitleFullWidth> = {
  title: 'Components/Sections/CtaTitleFullWidth',
  component: CtaTitleFullWidth,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A full-width call-to-action section with customizable heading, color theme, and optional button.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    heading: {
      control: 'text',
      description: 'The main heading text for the CTA section',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    color: {
      control: 'select',
      options: ['blue', 'green', 'red', 'yellow', 'purple', 'gray'],
      description: 'Color theme for the CTA section background and text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'blue'" },
      },
    },
    button: {
      control: 'object',
      description: 'Optional button configuration with text and URL',
      table: {
        type: { summary: '{ text: string; url: string } | undefined' },
        defaultValue: { summary: 'undefined' },
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    heading: 'Community mediation is a powerful alternative to hiring a lawyer or going to court.',
  },
}

export const WithButton: Story = {
  args: {
    heading: 'Ready to get started with mediation?',
    color: 'green',
    button: {
      text: 'Schedule a Consultation',
      url: '/contact',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'CTA section with a call-to-action button included.',
      },
    },
  },
}

export const RedTheme: Story = {
  args: {
    heading: "Urgent: Don't wait to resolve your conflict",
    color: 'red',
    button: {
      text: 'Get Help Now',
      url: '/emergency',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'CTA section with red theme for urgent messaging.',
      },
    },
  },
}

export const PurpleTheme: Story = {
  args: {
    heading: 'Join our community of trained mediators',
    color: 'purple',
    button: {
      text: 'Become a Mediator',
      url: '/training',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'CTA section with purple theme for community engagement.',
      },
    },
  },
}

export const NoButton: Story = {
  args: {
    heading: 'Mediation services are available throughout Howard County',
    color: 'gray',
  },
  parameters: {
    docs: {
      description: {
        story: 'CTA section without a button for informational purposes.',
      },
    },
  },
}
