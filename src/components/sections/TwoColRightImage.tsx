import Image from 'next/image'

const TwoColRightImage = ({
  title,
  description,
  subheader,
  image = 'https://shadcnblocks.com/images/block/photos/pawel-czerwinski-O4fAgtXLRwI-unsplash.jpg',
}: {
  title: string
  description: string
  subheader?: string
  image: string
}) => {
  return (
    <section className="">
      <div className="container mx-auto max-w-7xl">
        <div className="mx-auto flex max-w-screen-xl flex-col justify-between gap-20 overflow-hidden rounded-2xl border bg-[radial-gradient(ellipse_30%_60%_at_100%_80%,var(--color-gray-200),transparent)] pt-20 sm:pl-16 lg:flex-row lg:bg-[radial-gradient(ellipse_50%_80%_at_40%_120%,var(--color-gray-200),transparent)] lg:pl-20">
          <div className="lg:texlf mx-auto max-w-md px-4 text-center md:px-0 lg:mx-0 lg:pb-20 lg:text-left">
            {subheader && <p className="mb-6 font-medium"> {subheader} </p>}
            <h2 className="mb-6 text-4xl font-bold md:text-5xl">{title}</h2>
            <p className="text-lg text-muted-foreground">{description}</p>
          </div>
          <div className="relative w-full pl-4 sm:pl-0">
            <div className="absolute -bottom-8 -left-8 -z-10 h-4/5 w-4/5 rounded-tl-2xl rounded-br-2xl bg-stone-900/20 blur-2xl"></div>
            <Image
              src={image}
              alt="placeholder"
              className="relative z-10 h-full max-h-[400px] w-full rounded-tl-2xl rounded-br-2xl object-cover"
              width={1000}
              height={1000}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export { TwoColRightImage }
