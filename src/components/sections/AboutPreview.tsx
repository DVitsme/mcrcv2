import { CheckCircle, Edit, List, MessagesSquare, Timer } from 'lucide-react'

import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import ButtonAnimated from '../ui/button-animated'

const AboutPreview = () => {
  return (
    <section className="relative py-32 bg-blue">
      <div className="pointer-events-none absolute inset-0 z-10 bg-[50%_0] bg-[url('/images/block/shadow-overlay.png')] bg-no-repeat"></div>
      <div className="container p-6 md:p-16">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="flex flex-col justify-between gap-8">
            <div>
              <h2 className="mb-9 text-3xl font-medium md:text-5xl text-secondary">
                ABOUT US
                <br />
                <span className="text-primary-foreground">And A Bit of Our History</span>
              </h2>
              <p className="text-primary-foreground">
                Originally connected to Howard Community College, we have since grown into an
                independent, community-rooted organization. Our work is grounded in the belief that
                people hold the wisdom and capacity to navigate their own challenges when given the
                right support. We walk alongside individuals, families, and groups to facilitate
                conversations that restore trust, mend relationships, and build stronger
                communities.
              </p>
              <div className="my-4">
                <ButtonAnimated text="Learn More" />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-primary-foreground">
                <MessagesSquare className="h-auto w-4" />
                Our Mission & Vision
              </div>
              <Separator />
              <div className="flex items-center gap-2 text-primary-foreground">
                <Edit className="h-auto w-4" />
                Our Core Values
              </div>
              <Separator />
              <div className="flex items-center gap-2 text-primary-foreground">
                <CheckCircle className="h-auto w-4" />
                Nine Hallmarks of Community Mediation
              </div>
              <Separator />
              <div className="flex items-center gap-2 text-primary-foreground">
                <List className="h-auto w-4" />
                Our Staff
              </div>
              <Separator />
              <div className="flex items-center gap-2 text-primary-foreground">
                <Timer className="h-auto w-4" />
                Our Partners
              </div>
              <Separator />
            </div>
          </div>
          <div className="flex aspect-square w-full items-center justify-center overflow-hidden  lg:col-span-2">
            <Image
              src="/images/facilitation/cheerful-woman-speaking-on-a-microphone.jpg"
              alt="placeholder"
              className="w-full rounded-lg object-cover"
              width={1300}
              height={1300}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export { AboutPreview }
