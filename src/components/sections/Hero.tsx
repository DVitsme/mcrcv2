import { ArrowDown } from 'lucide-react'
import { Fragment } from 'react'

import { Button } from '@/components/ui/button'

const Hero = () => {
  return (
    <Fragment>
      <section className="dark font-dm_sans relative h-svh max-h-[80vh] min-h-[600px] w-full overflow-hidden rounded-2xl">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            className="absolute inset-0 h-full w-full object-cover"
            loop
            muted
            playsInline
          >
            <source src="/videos/mediation/mediation1.mp4" type="video/mp4" />
          </video>{' '}
          {/* Fallback Image */}
          <div className="absolute inset-0 bg-[url(/images/block/full-width-backgrounds/andrew-kliatskyi-MaVm_A0xhKk-unsplash.jpg)] bg-cover bg-center bg-no-repeat" />
          {/* Overlay */}
          <div className="absolute inset-0 bg-zinc-950/50" />
        </div>

        <div className="relative z-10 mx-auto flex size-full max-w-[125rem] px-4 py-9">
          <div className="flex w-full flex-col justify-between gap-10">
            <div className="mx-auto flex max-w-[31.25rem] flex-1 flex-col items-center justify-center gap-7 sm:max-w-[37.5rem] md:max-w-[50rem]">
              <h1 className="text-center text-4xl leading-tight font-medium text-foreground sm:text-5xl md:text-6xl">
                Transform Your Vision Into Digital Reality
              </h1>
              <p className="text-center text-lg text-balance text-foreground md:text-2xl">
                We craft exceptional digital solutions that help brands stand out and make a lasting
                impact in the digital landscape.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Button
                  asChild
                  className="block h-fit w-fit rounded-sm px-6 py-3.5 text-sm font-semibold tracking-wider text-nowrap uppercase"
                >
                  <a href="#">Explore Projects</a>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between gap-4 rounded-lg bg-black/20 px-6 py-4 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="h-8 w-1 bg-primary"></div>
                <div className="text-sm font-medium text-muted-foreground">
                  <p className="text-primary">Global Headquarters</p>
                  <p>San Francisco, California</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="flex size-10 rounded-full border-2 border-primary transition-colors hover:bg-primary/20"
              >
                <ArrowDown className="m-auto size-5! stroke-primary" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  )
}

export { Hero }
