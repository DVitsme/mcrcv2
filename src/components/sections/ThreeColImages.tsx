import Image from 'next/image'

interface SectionData {
  title: string
  subtitle: string
  cards: {
    title: string
    description: string
    image: string
    alt: string
  }[]
}

const ThreeColImages = ({ data }: { data: SectionData }) => {
  return (
    <section className="py-16">
      <div className="container">
        <h2 className="mb-4 text-center text-3xl font-medium lg:text-5xl">{data.title}</h2>
        <p className="mb-4 text-center font-semibold text-primary lg:text-base">{data.subtitle}</p>
        <div className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-3">
          {data.cards.map((card, index) => (
            // 1. Make the card a flex container that fills the height of its grid cell
            <div className="flex h-full flex-col rounded-lg bg-card p-6" key={index}>
              {/* Top content area */}
              <div>
                <h3 className="mb-2 text-xl font-medium">{card.title}</h3>
                <p className="mb-4 leading-7 text-muted-foreground">{card.description}</p>
              </div>

              {/* 2. Push this image container to the bottom of the card */}
              <span className="mt-auto flex items-center justify-center rounded-2xl bg-secondary pt-4">
                <Image
                  src={card.image}
                  alt={card.alt}
                  className="h-36 w-36"
                  width={300}
                  height={300}
                />
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export { ThreeColImages }
