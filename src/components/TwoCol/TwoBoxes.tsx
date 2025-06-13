import Image from 'next/image'
import { AnimateInView } from '@/components/animations/AnimateInView' // Assuming this component exists

interface TwoBoxesProps {
  data: {
    header: string
    subHeader?: string
    image1: string
    image2: string
    title1: string
    description1: string
    image1Alt: string
    image2Alt: string
    title2: string
    description2: string
    color1?: string
    color2?: string
  }
}

// --- Reusable Card Component ---
const InfoCard = ({
  image,
  alt,
  title,
  description,
  color,
}: {
  image: string
  alt: string
  title: string
  description: string
  color: string
}) => {
  return (
    // The card itself: h-full makes it stretch to the height of the grid row
    <div
      className={`flex h-full flex-col space-y-4 rounded-xl bg-${color} text-${color}-foreground p-6 shadow-sm`}
    >
      {/* 1. Image container with a fixed height for consistency across cards */}
      <div className="w-full overflow-hidden rounded-lg h-48 md:h-96">
        <Image src={image} alt={alt} className="w-full object-cover" width={600} height={400} />
      </div>

      {/* Text content */}
      <div className="flex flex-col text-left">
        {/* 2. Title with a minimum height to accommodate 2 lines of text */}
        {/* 'leading-tight' helps control line height. Adjust min-h if your font is larger. */}
        <h4 className="mb-2 text-lg font-semibold leading-tight md:text-xl min-h-[2.5em]">
          {title}
        </h4>

        {/* 3. Description will now align because the elements above it have consistent height */}
        <p className="">{description}</p>
      </div>
    </div>
  )
}

export function TwoBoxes({ data }: TwoBoxesProps) {
  const {
    header,
    subHeader,
    image1,
    image2,
    image1Alt,
    image2Alt,
    title1,
    description1,
    title2,
    description2,
    color1,
    color2,
  } = data

  return (
    <section className="py-16 md:py-24">
      <div className="container flex flex-col items-center gap-12 lg:gap-16">
        <AnimateInView className="text-center">
          <h3 className="mb-3 text-3xl font-semibold text-pretty md:mb-4 md:text-4xl lg:max-w-3xl lg:text-5xl">
            {header}
          </h3>
          {subHeader && (
            <p className="mx-auto text-muted-foreground lg:max-w-3xl lg:text-lg">{subHeader}</p>
          )}
        </AnimateInView>

        {/* Use `items-stretch` to make grid items fill the height of the row */}
        <div className="grid w-full items-stretch gap-6 lg:grid-cols-7">
          <AnimateInView className="lg:col-span-4">
            <InfoCard
              image={image1}
              alt={image1Alt}
              title={title1}
              description={description1}
              color={color1 || 'card'}
            />
          </AnimateInView>

          <AnimateInView className="lg:col-span-3">
            <InfoCard
              image={image2}
              alt={image2Alt}
              title={title2}
              description={description2}
              color={color2 || 'card'}
            />
          </AnimateInView>
        </div>
      </div>
    </section>
  )
}
