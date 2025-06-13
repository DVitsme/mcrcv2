import Image from 'next/image'
import { cn } from '@/utilities/ui'

import { CheckList } from './CheckList'

interface TwoColImageProps {
  imagePosition?: 'left' | 'right'
  data: {
    icon?: React.ReactNode
    iconColor?: string
    imageUrl: string
    imageAlt: string
    title: string
    description: string
    checkList?: string[]
    listIcon?: React.ReactNode
  }
  imageSize?: {
    width?: number
    height?: number
    maxHeight?: string
  }
  className?: string
}

const TwoColTitleCheckListImage = ({
  data,
  imagePosition = 'left',
  imageSize = {
    width: 500,
    height: 500,
    maxHeight: '24rem',
  },
  className = '',
}: TwoColImageProps) => {
  const {
    icon,
    iconColor = 'primary',
    imageUrl,
    imageAlt,
    title,
    description,
    checkList,
    listIcon,
  } = data

  const contentSection = (
    <div className="flex flex-col lg:items-start lg:text-left">
      {icon && (
        <span
          className={cn(
            'flex size-12 items-center justify-center rounded-full',
            `bg-${iconColor} text-${iconColor}-foreground`,
          )}
        >
          <div className="size-6">{icon}</div>
        </span>
      )}
      <h3 className="my-6 text-3xl font-bold text-pretty lg:text-4xl">{title}</h3>
      <p className="mb-8 max-w-xl text-muted-foreground lg:text-lg">{description}</p>
      {checkList && <CheckList items={checkList} customIcon={listIcon} />}
    </div>
  )

  const imageSection = (
    <div className="relative w-full">
      <Image
        src={imageUrl}
        alt={imageAlt}
        className={cn('w-full rounded-xl object-cover', `max-h-[${imageSize.maxHeight}]`)}
        height={imageSize.height}
        width={imageSize.width}
        priority
      />
    </div>
  )

  return (
    <section className={cn('py-32', className)}>
      <div className="container">
        <div className="grid gap-8 lg:grid-cols-2">
          {imagePosition === 'left' ? (
            <>
              {imageSection}
              {contentSection}
            </>
          ) : (
            <>
              {contentSection}
              {imageSection}
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export { TwoColTitleCheckListImage }
