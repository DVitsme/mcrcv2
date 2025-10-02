import type { Preview } from '@storybook/react'
import { ThemeProvider } from 'next-themes'
import React from 'react'

// The most important line: import your global CSS file.
import '../src/app/globals.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  // Add a global decorator to wrap all stories
  decorators: [
    // This is the Story component itself
    (Story) => (
      // Wrap every story with the ThemeProvider
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {/* This div ensures that global styles and fonts 
          (like the `font-sans` class on your body tag) are applied.
        */}
        <div className="font-sans">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
}

export default preview
