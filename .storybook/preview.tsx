import type { Preview } from '@storybook/react'
import { ThemeProvider } from 'next-themes'
import React from 'react'

// This is the critical change: use the path alias.
import '@/app/globals.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className="font-sans">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
}

export default preview
