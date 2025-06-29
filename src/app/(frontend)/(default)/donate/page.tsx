'use client'

import { useEffect } from 'react'
import Image from 'next/image'

// Shadcn UI components (assume these are globally available in your project)
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const PAYPAL_BUTTON_ID = 'VYZPQWXXQKHRJ'

const DonatePage = () => {
  useEffect(() => {
    // Only run on client
    const script = document.createElement('script')
    script.src = 'https://www.paypalobjects.com/donate/sdk/donate-sdk.js'
    script.charset = 'UTF-8'
    script.onload = () => {
      // @ts-ignore
      if (window.PayPal && window.PayPal.Donation) {
        // @ts-ignore
        window.PayPal.Donation.Button({
          env: 'production',
          hosted_button_id: PAYPAL_BUTTON_ID,
          image: {
            src: 'https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif',
            alt: 'Donate with PayPal button',
            title: 'PayPal - The safer, easier way to pay online!',
          },
        }).render('#donate-button')
      }
    }
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-muted py-12 px-4">
      <Card className="w-full max-w-xl shadow-lg">
        <CardHeader className="flex flex-col items-center gap-2">
          <Image
            src="/images/donate-placeholder.jpg"
            alt="Donate"
            width={96}
            height={96}
            className="rounded-full border border-border shadow-md mb-2"
          />
          <CardTitle className="text-3xl font-bold text-center">Support Our Mission</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6">
          <p className="text-center text-muted-foreground text-lg max-w-md">
            Your donation helps us continue our work and make a positive impact. Every contribution,
            big or small, brings us closer to our goals. Thank you for your generosity!
          </p>
          <div className="w-full flex flex-col items-center gap-4">
            {/* PayPal Donate Button */}
            <div id="donate-button-container" className="flex flex-col items-center">
              <div id="donate-button"></div>
            </div>
            <span className="text-xs text-muted-foreground mt-2">Secure payment via PayPal</span>
            <Button asChild variant="outline" className="mt-2">
              <a
                href="https://www.paypal.com/donate/?hosted_button_id=VYZPQWXXQKHRJ"
                target="_blank"
                rel="noopener noreferrer"
              >
                Donate via PayPal
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}

export default DonatePage
