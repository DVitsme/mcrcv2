import Image from 'next/image'

interface SectionData {
  title: string
  subtitle?: string
  cards: {
    title: string
    description: string
    image: string
    alt: string
    label?: string
  }[]
}

const ThreeColImages = ({ data }: { data: SectionData }) => {
  return (
    <section className="relative py-16">
      <div className="container">
        <h2 className="mb-4 text-center text-3xl font-medium lg:text-5xl">{data.title}</h2>
        <p className="mb-4 text-center text-primary lg:text-lg">{data.subtitle}</p>

        <div className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-3">
          {data.cards.map((card, index) => (
            <div
              key={index}
              className="flex flex-col items-center rounded-xl bg-foreground text-background p-4"
            >
              {/* Image Container */}
              <div className="relative h-[240px] w-full overflow-hidden rounded-xl">
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 479px) 87vw, (max-width: 767px) 85vw, (max-width: 991px) 448px, 94vw"
                />
              </div>

              {/* Text Content */}
              <div className="flex w-full flex-col items-center gap-4 px-6 pb-6 pt-4 text-center">
                <span className="text-sm font-medium uppercase tracking-[0.7px] text-accent">
                  {card.label}
                </span>
                <h3 className="text-2xl font-medium">{card.title}</h3>
                <p className="">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export { ThreeColImages }
