import { Separator } from '@/components/ui/separator'

interface TitleGridProps {
  title: string
  description?: string
  items: {
    title: string
    description?: string
    icon?: React.ReactNode
    list?: string[]
  }[]
}

const TitleGrid = ({ title, description, items }: TitleGridProps) => {
  return (
    <section className="py-16 lg:py-24">
      <div className="container">
        {/* Main grid container with 3 columns on large screens */}
        <div className="grid gap-12 lg:grid-cols-3 lg:gap-8">
          {/* Column 1: Title and Description */}
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-semibold lg:text-5xl">{title}</h2>
            {description && (
              <>
                <Separator className="my-6" />
                <p className="text-lg text-muted-foreground">{description}</p>
              </>
            )}
          </div>

          {/* Columns 2 & 3: Container for the looped items */}
          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-2">
            {items.map((item) => (
              // Each card is now a grid item within the nested grid
              // Using flex and h-full to make all cards in a row the same height
              <div className="flex h-full flex-col" key={item.title}>
                <div className="mb-4 flex items-center gap-4">
                  <h3 className="text-xl capitalize font-medium">{item.title}</h3>
                </div>

                {item.description ? (
                  <p className="text-muted-foreground">{item.description}</p>
                ) : (
                  <ul className="flex flex-1 flex-col space-y-2 text-muted-foreground">
                    {item.list?.map((listItem) => (
                      <li key={listItem} className="flex items-start">
                        {/* A default check icon if no icon is provided */}
                        <span>{listItem}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export { TitleGrid }
