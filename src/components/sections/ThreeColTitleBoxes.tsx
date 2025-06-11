interface ThreeColTitleBoxesProps {
  data: {
    title: string
    description: string
    cardData: {
      title: string
      description: string
      icon: React.ElementType
      bgColor: string
    }[]
  }
}

export function ThreeColTitleBoxes({ data }: ThreeColTitleBoxesProps) {
  const { title, description, cardData } = data
  return (
    <div className="py-32">
      <div className="container">
        <p className="mb-4 text-sm text-muted-foreground lg:text-base">{title}</p>
        <h2 className="text-3xl font-medium lg:text-4xl">{description}</h2>
        <div className={`mt-14 grid gap-6 lg:mt-20 lg:grid-cols-${cardData.length}`}>
          {cardData.map((card, index) => (
            <div key={index} className={`rounded-lg p-5 ${card.bgColor}`}>
              <span className="mb-8 flex size-12 items-center justify-center rounded-full bg-background">
                <card.icon />
              </span>
              <h3 className="mb-2 text-xl font-medium">{card.title}</h3>
              <p className="leading-7 text-muted-foreground">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
