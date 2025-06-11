interface ChecksAndXsProps {
  titleIcon?: React.ReactNode
  title: string
  description?: string
  textColor?: string
  items: {
    title: string
    icon?: React.ReactNode
    description?: string
  }[]
}

const Left = ({ title, description, items, titleIcon, textColor }: ChecksAndXsProps) => {
  return (
    <div className="flex flex-col lg:text-left border-r-2 border-r-primary">
      {titleIcon && (
        <span className="flex size-8 items-center justify-center rounded-full bg-accent">
          {titleIcon}
        </span>
      )}
      <h1 className="my-6 text-3xl font-bold text-pretty lg:text-4xl">{title}</h1>
      <p className={`mb-8 max-w-xl text-muted-foreground lg:max-w-none lg:text-lg`}>
        {description}
      </p>
      <ul className={`space-y-4 text-left ${textColor}`}>
        {items.map((item) => (
          <li key={item.title} className="flex items-center gap-3">
            {item.icon}
            <p className="text-muted-foreground">{item.title}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

const Right = ({ title, description, items, titleIcon, textColor }: ChecksAndXsProps) => {
  return (
    <div className="flex flex-col lg:text-left">
      {titleIcon && (
        <span className="flex size-8 items-center justify-center rounded-full bg-accent">
          {titleIcon}
        </span>
      )}
      <h1 className="my-6 text-3xl font-bold text-pretty lg:text-4xl">{title}</h1>
      <p className="mb-8 max-w-xl text-muted-foreground lg:max-w-none lg:text-lg">{description}</p>
      <ul className={`space-y-4 text-left ${textColor}`}>
        {items.map((item) => (
          <li key={item.title} className="flex items-center gap-3 ">
            {item.icon}
            <p className="text-muted-foreground">{item.title}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

const ChecksAndXs = ({ data }: { data: { left: ChecksAndXsProps; right: ChecksAndXsProps } }) => {
  const { left, right } = data
  return (
    <section className="py-32">
      <div className="container mx-auto">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
          <Left
            title={left.title}
            description={left.description}
            items={left.items}
            titleIcon={left.titleIcon}
            textColor={left.textColor}
          />
          <Right
            title={right.title}
            description={right.description}
            items={right.items}
            titleIcon={right.titleIcon}
            textColor={right.textColor}
          />
        </div>
      </div>
    </section>
  )
}

export { ChecksAndXs }
