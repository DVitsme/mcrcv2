import React from 'react'

const StickyTitleScrollingCards = ({
  title,
  description,
  cards,
}: {
  title: string
  description: string
  cards: { title: string; description: string }[] | undefined
}) => {
  return (
    <section className="py-16">
      <div className="container mx-auto max-w-7xl grid gap-y-12 md:grid-cols-12 md:gap-x-6 md:gap-y-0">
        <div className="md:col-span-6 lg:col-span-5 md:sticky md:top-32 md:self-start">
          <h2 className="mb-3 text-xl font-semibold md:mb-4 md:text-4xl lg:mb-6">{title}</h2>
          <p className="mb-8 text-muted-foreground lg:text-lg">{description}</p>
        </div>
        <div className="grid gap-y-5 md:col-span-6 md:gap-y-[1.875rem] lg:col-start-7">
          {cards &&
            cards.map((card, index) => (
              <div
                key={index}
                className="group flex flex-col justify-center overflow-clip rounded-2xl bg-accent px-6 py-8 md:px-8 md:py-10 lg:px-10 lg:py-12"
              >
                <p className="mb-3 text-xs font-medium tracking-wider uppercase">{card.title}</p>
                <p className="mb-4 font-semibold text-muted-foreground lg:text-xl">
                  {card.description}
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}

export { StickyTitleScrollingCards }
