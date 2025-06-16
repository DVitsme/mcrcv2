import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import ButtonAnimated from '../ui/button-animated'

interface AboutPreviewProps {
  data: {
    header: string
    description: string
    subheader: string
    image: string
    imageAlt: string
    buttonText: string
    buttonLink?: string
    dataList: {
      title: string
      icon: React.ElementType
    }[]
  }
}

const AboutPreview = ({ data }: AboutPreviewProps) => {
  const { header, description, subheader, image, imageAlt, buttonText, buttonLink, dataList } = data
  return (
    <section className="relative py-32 bg-blue">
      <div className="pointer-events-none absolute inset-0 z-10 bg-[50%_0] bg-[url('/images/block/shadow-overlay.png')] bg-no-repeat"></div>
      <div className="container p-6 md:p-16">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="flex flex-col justify-between gap-8">
            <div>
              <h2 className="mb-9 text-3xl font-medium uppercase md:text-5xl text-secondary">
                {header}
                <br />
                <span className="text-primary-foreground capitalize font-regular">{subheader}</span>
              </h2>
              <p className="text-primary-foreground">{description}</p>
              <div className="my-4">
                <ButtonAnimated text={buttonText} link={buttonLink} />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              {dataList.map((item) => (
                <div key={item.title}>
                  <div className="flex items-center gap-2 text-primary-foreground">
                    <item.icon className="h-auto w-4" />
                    {item.title}
                  </div>
                  <Separator />
                </div>
              ))}
            </div>
          </div>
          <div className="flex aspect-square w-full items-center justify-center overflow-hidden  lg:col-span-2">
            <Image
              src={image}
              alt={imageAlt}
              className="w-full rounded-lg object-cover"
              width={1300}
              height={1300}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export { AboutPreview }
