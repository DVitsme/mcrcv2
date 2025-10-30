'use client'

import { Check } from 'lucide-react'
import Link from 'next/link'

import TwoColorTitle from '@/components/ui/two-color-title'
import { GroupFacilitationInquiryForm } from '@/Forms/formDisplay/groupFacilitationInquiryForm'

const FacilitationRequest = () => {
  return (
    <section className="bg-muted/50 py-32">
      <div className="container">
        <span className="text-muted-foreground text-xs">GET STARTED /</span>
        <div className="mt-8 grid grid-cols-1 gap-8 md:gap-10 lg:grid-cols-2 lg:grid-rows-[min-content_1fr]">
          <TwoColorTitle title="Seeking Group Facilitation? " titleGray="Start Here" />
          <div className="order-2 md:order-none md:row-span-2">
            <div className="bg-background border-border rounded-lg border p-6">
              <GroupFacilitationInquiryForm />
            </div>
          </div>
          <div className="order-3 my-6 md:order-none">
            <p className="mb-16 md:mb-8">
              Thank you for contacting MCRC! We are excited to learn more about your group and
              explore how we can support your conversation. It is completely fine if you do not have
              all the details yet. We are here to help, and our facilitation services are offered on
              a sliding scale to make them accessible to community and small business groups.
            </p>

            <ul className="space-y-2 font-medium">
              <li className="flex items-center gap-2">
                <span className="bg-background flex size-6 shrink-0 items-center justify-center rounded-full">
                  <Check className="size-4" />
                </span>
                Everything you share here will be held in confidence.
              </li>
              <li className="flex items-center gap-2">
                <span className="bg-background flex size-6 shrink-0 items-center justify-center rounded-full">
                  <Check className="size-4" />
                </span>
                Sechdule your own call
              </li>
              <li className="flex items-center gap-2">
                <span className="bg-background flex size-6 shrink-0 items-center justify-center rounded-full">
                  <Check className="size-4" />
                </span>
                We will respond within 72 hours
              </li>
            </ul>
            <p className="my-6 font-bold">Serving Howard County for 26 years!</p>
          </div>
        </div>
        <div className="mt-16 grid gap-8 md:gap-12 lg:w-1/2 lg:grid-cols-2">
          <div>
            <h3 className="mb-1.5 font-bold">FAQ</h3>
            <p className="text-muted-foreground text-sm">
              Read About our <br />
              <Link
                href="/services/facilitation"
                className="text-primary underline hover:underline"
              >
                Group Facilitation Services
              </Link>
            </p>
          </div>
          <div>
            <h3 className="mb-1.5 font-bold">Resources</h3>
            <p className="text-muted-foreground text-sm">
              <Link href="/resources" className="text-primary underline hover:underline">
                Access our library of helpful guides and resources.
              </Link>{' '}
              It is filled with blogs, guides, and tips to help improve communication and conflict
              resolution.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FacilitationRequest
