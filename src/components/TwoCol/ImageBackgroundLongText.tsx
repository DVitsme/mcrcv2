import Image from 'next/image'

type ImageBackgroundLongTextProps = {
  imageUrl: string
  imageAlt: string
  color?: string
  listItems?:
    | {
        title?: string
        description?: string
        icon?: React.ElementType
      }[]
    | undefined
  imagePosition?: 'left' | 'right'
}

const ImageBackgroundLongText = ({
  imageUrl,
  imageAlt,
  listItems,
  imagePosition = 'left',
  color = 'accent',
}: ImageBackgroundLongTextProps) => {
  const imageOrder = imagePosition === 'right' ? 'order-2 md:order-2' : 'order-1 md:order-1'
  const textOrder = imagePosition === 'right' ? 'order-1 md:order-1' : 'order-2 md:order-2'

  return (
    <div
      className={`grid gap-x-20 rounded-lg border border-border bg-${color} p-6 md:grid-cols-2 md:p-8 lg:p-16`}
    >
      <div className={`mb-8 flex justify-center lg:justify-start xl:mb-0 ${imageOrder}`}>
        <Image
          src={imageUrl}
          alt={imageAlt}
          className="aspect-square h-full w-full rounded-md object-cover object-center"
          width={500}
          height={500}
        />
      </div>
      <ul className={`flex flex-col justify-center gap-y-8 ${textOrder}`}>
        {listItems?.map((item, index) => {
          const Icon = item.icon
          return (
            <li key={index} className="flex">
              {Icon && <Icon className="mr-3 size-5 shrink-0 lg:mr-6 lg:size-6" />}
              <div>
                {item.title && (
                  <div className="mb-3 h-5 text-sm font-semibold text-accent-foreground md:text-base">
                    {item.title}
                  </div>
                )}
                {item.description && (
                  <div className="text-sm font-medium text-muted-foreground md:text-base">
                    {item.description}
                  </div>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export { ImageBackgroundLongText }
