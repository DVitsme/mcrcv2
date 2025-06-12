import { Check } from 'lucide-react'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

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
}
// Rework this to use 1 component for both the left and right image positions and Image size

const TwoColTitleCheckListImage = ({ data, imagePosition = 'left' }: TwoColImageProps) => {
  if (imagePosition === 'right') {
    return (
      <section className="py-32">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-2">
            <Image
              src={data.imageUrl}
              alt={data.imageAlt}
              className="max-h-96 w-full rounded-xl object-cover"
              height={500}
              width={500}
            />
            <div className="flex flex-col lg:items-start lg:text-left">
              {data.icon && (
                <span
                  className={`flex size-12 items-center justify-center rounded-full ${
                    data.iconColor
                      ? `bg-${data.iconColor} text-${data.iconColor}-foreground`
                      : 'bg-accent text-primary'
                  }`}
                >
                  <div className="size-6">{data.icon}</div>
                </span>
              )}
              <h3 className="my-6 text-3xl font-bold text-pretty lg:text-4xl">{data.title}</h3>
              <p className="mb-8 max-w-xl text-muted-foreground lg:text-lg">{data.description}</p>
              {data.checkList && (
                <ul className="ml-4 space-y-4 text-left">
                  {data.checkList.map((item: string, index: number) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check className="size-5" />
                      <p className="text-muted-foreground">{item}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>
    )
  }
  return (
    <section className="py-32">
      <div className="container">
        <div className="flex-row-reverse lg:flex">
          <div className="lg:w-1/2">
            <div className="mb-6 md:mb-8 lg:mb-0">
              <Image
                src={data.imageUrl}
                alt={data.imageAlt}
                className="max-h-96 w-full rounded-xl object-cover"
                height={500}
                width={500}
              />
            </div>
          </div>
          <div className="lg:flex lg:w-1/2 lg:items-center lg:pr-24 2xl:pr-32">
            <div>
              {data.icon && (
                <span
                  className={`flex size-14 items-center justify-center rounded-full ${
                    data.iconColor ? `bg-${data.iconColor} text-${data.iconColor}` : 'text-primary'
                  }`}
                >
                  <div className="size-6">{data.icon}</div>
                </span>
              )}
              <h3 className="mb-3 text-xl font-semibold md:mb-4 md:text-4xl lg:mb-6">
                {data.title}
              </h3>
              <p className="text-muted-foreground lg:text-lg">{data.description}</p>
              {data.checkList && (
                <ul className="ml-4 space-y-4 text-left">
                  {data.checkList.map((item: string, index: number) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check className="size-5" />
                      <p className="text-muted-foreground">{item}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export { TwoColTitleCheckListImage }

const TwoColLargeImage = ({ imagePosition = 'right', data }: TwoColImageProps) => {
  if (imagePosition === 'left') {
    return (
      <section className="py-32">
        <div className="container">
          <div className="flex flex-col-reverse items-center justify-between gap-10 lg:flex-row">
            <div className="lg:max-w-md">
              <span className="flex size-14 items-center justify-center rounded-full bg-accent">
                <div className="size-6 text-primary">{data.icon}</div>
              </span>
              <h1 className="mt-12 mb-2 text-2xl font-bold text-pretty lg:text-4xl">
                {data.title}
              </h1>
              <p className="mb-5 text-muted-foreground">{data.description}</p>
              <Button>Start for free</Button>
              {data.checkList && (
                <>
                  <Separator className="my-7" />
                  <ul className="space-y-4">
                    {data.checkList?.map((item: string, index: number) => (
                      <li key={index} className="flex items-center gap-3">
                        {data.listIcon && (
                          <div className="size-5 text-primary">{data.listIcon}</div>
                        )}
                        <p className="font-bold">{item}</p>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
            <Image
              src={data.imageUrl}
              alt={data.imageAlt}
              className="max-h-96 w-full rounded-md object-cover lg:max-h-none lg:w-1/2"
              height={600}
              width={600}
            />
          </div>
        </div>
      </section>
    )
  }
  return (
    <section className="py-32">
      <div className="container">
        <div className="flex flex-col-reverse items-center justify-between gap-10 lg:flex-row">
          <Image
            src={data.imageUrl}
            alt={data.imageAlt}
            className="max-h-96 w-full rounded-md object-cover lg:max-h-none lg:w-1/2"
            height={500}
            width={500}
          />
          <div className="lg:max-w-md">
            <span className="flex size-14 items-center justify-center rounded-full bg-accent">
              <div className="size-6 text-primary">{data.icon}</div>
            </span>
            <h1 className="mt-8 mb-2 text-2xl font-bold text-pretty lg:text-4xl">{data.title}</h1>
            <p className="mb-5 text-muted-foreground">{data.description}</p>
            <Button>Start for free</Button>
            {data.checkList && (
              <>
                <Separator className="my-7" />
                <ul className="space-y-4">
                  {data.checkList?.map((item: string, index: number) => (
                    <li key={index} className="flex items-center gap-3">
                      {data.listIcon && <div className="size-5 text-primary">{data.listIcon}</div>}
                      <p className="font-bold">{item}</p>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export { TwoColLargeImage }
