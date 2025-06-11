import { Check } from 'lucide-react'
import Image from 'next/image'

interface TwoColTitleCheckListImageProps {
  data: {
    imageUrl: string
    imageAlt: string
    title: string
    description: string
    checkList?: string[]
  }
}

const TwoColTitleCheckListImage = ({ data }: TwoColTitleCheckListImageProps) => {
  return (
    <section className="py-32">
      <div className="container">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <Image
            src={data.imageUrl}
            alt={data.imageAlt}
            className="max-h-96 w-full rounded-md object-cover"
            height={500}
            width={500}
          />
          <div className="flex flex-col lg:items-start lg:text-left">
            <h1 className="my-6 text-3xl font-bold text-pretty lg:text-4xl">{data.title}</h1>
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

export { TwoColTitleCheckListImage }
