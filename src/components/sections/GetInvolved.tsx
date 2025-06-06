import { Button } from '@payloadcms/ui'
import Image from 'next/image'
import Link from 'next/link'
import ButtonAnimated from '@/components/ui/button-animated'

const GetInvolved = () => {
  return (
    <section className="py-32">
      <div className="container flex flex-col items-center">
        <div className="text-center">
          <h3 className="text-4xl font-semibold text-pretty md:mb-4 lg:mb-6 lg:max-w-3xl lg:text-5xl">
            Get Involved
          </h3>
        </div>
      </div>
      <div className="container mt-16">
        <div className="relative">
          <div className="grid border md:grid-cols-2 md:divide-x">
            <Link
              href="#"
              className="group relative flex flex-col items-center border-border pt-8 pb-8 text-center transition-all duration-200 md:border-t md:px-8 md:pt-12 md:pb-12 lg:px-12 lg:pt-16 lg:pb-20"
            >
              <div className="absolute top-0 h-px w-full bg-border md:hidden" />
              <div className="mb-8 flex aspect-1/1 w-16 items-center justify-center md:w-[6.25rem] lg:mb-[3.25rem]">
                <Image
                  src="https://shadcnblocks.com/images/block/block-2.svg"
                  alt="Real-time Analytics"
                  className="h-full w-full object-contain object-center"
                  width={100}
                  height={100}
                />
              </div>
              <h2 className="mb-4 text-2xl font-semibold md:mb-5">Request Mediation</h2>
              <p className="mb-auto text-muted-foreground">
                Track your performance with instant insights. Our powerful analytics engine
                processes data in real-time, providing actionable metrics and customizable
                dashboards for informed decision-making.
              </p>
              <div className="my-6">
                <ButtonAnimated text="Request Mediation" />
              </div>
            </Link>
            <Link
              href="#"
              className="group relative flex flex-col items-center border-border pt-8 pb-8 text-center transition-all duration-200 md:border-t md:px-8 md:pt-12 md:pb-12 lg:px-12 lg:pt-16 lg:pb-20"
            >
              <div className="absolute top-0 h-px w-full bg-border md:hidden" />
              <div className="mb-8 flex aspect-1/1 w-16 items-center justify-center md:w-[6.25rem] lg:mb-[3.25rem]">
                <Image
                  src="https://shadcnblocks.com/images/block/block-3.svg"
                  alt="AI-Powered Automation"
                  className="h-full w-full object-contain object-center"
                  width={100}
                  height={100}
                />
              </div>
              <h2 className="mb-4 text-2xl font-semibold md:mb-5">Become a Volunteer </h2>
              <p className="mb-auto text-muted-foreground">
                Streamline your workflow with intelligent automation. Our AI system learns from your
                patterns to automate repetitive tasks and suggest optimizations for improved
                efficiency.
              </p>
              <div className="my-6">
                <ButtonAnimated text="Become a Volunteer" />
              </div>
            </Link>
          </div>
          <div className="absolute -top-[5px] -left-[5px]">
            <div className="size-[12px] rounded-full bg-primary"></div>
          </div>
          <div className="absolute -top-[5px] -right-[5px]">
            <div className="size-[12px] rounded-full bg-primary"></div>
          </div>
          <div className="absolute -bottom-[5px] -left-[5px]">
            <div className="size-[12px] rounded-full bg-primary"></div>
          </div>
          <div className="absolute -right-[5px] -bottom-[5px]">
            <div className="size-[12px] rounded-full bg-primary"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export { GetInvolved }
