import type { Meta, StoryObj } from '@storybook/react'
import { Logo } from './Logo'

const meta: Meta<typeof Logo> = {
  title: 'Components/Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A responsive logo component with customizable loading behavior and priority settings.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply to the logo',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    loading: {
      control: 'select',
      options: ['lazy', 'eager'],
      description: 'Loading behavior for the image',
      table: {
        type: { summary: "'lazy' | 'eager'" },
        defaultValue: { summary: "'lazy'" },
      },
    },
    priority: {
      control: 'select',
      options: ['auto', 'high', 'low'],
      description: 'Fetch priority for the image',
      table: {
        type: { summary: "'auto' | 'high' | 'low'" },
        defaultValue: { summary: "'low'" },
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const EagerLoading: Story = {
  args: {
    loading: 'eager',
    priority: 'high',
  },
  parameters: {
    docs: {
      description: {
        story: 'Logo with eager loading and high priority for above-the-fold content.',
      },
    },
  },
}

export const WithCustomStyling: Story = {
  args: {
    className: 'border-2 border-blue-500 rounded-lg p-4 bg-gray-100',
  },
  parameters: {
    docs: {
      description: {
        story: 'Logo with custom styling applied via className prop.',
      },
    },
  },
}

export const HighPriority: Story = {
  args: {
    priority: 'high',
    loading: 'eager',
  },
  parameters: {
    docs: {
      description: {
        story: 'Logo optimized for critical rendering path with high priority and eager loading.',
      },
    },
  },
}

export const LazyLoading: Story = {
  args: {
    loading: 'lazy',
    priority: 'low',
  },
  parameters: {
    docs: {
      description: {
        story: 'Logo with lazy loading for below-the-fold content to improve page performance.',
      },
    },
  },
}

export const Responsive: Story = {
  args: {
    className: 'w-32 h-auto sm:w-48 md:w-64 lg:w-80',
  },
  parameters: {
    docs: {
      description: {
        story: 'Responsive logo that scales with different screen sizes.',
      },
    },
  },
}
