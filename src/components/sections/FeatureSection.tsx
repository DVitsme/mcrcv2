import Image from 'next/image'

interface FeatureSectionProps {
  text: string
  image: string
}

export function FeatureSection({ text, image }: FeatureSectionProps) {
  return (
    <section className="py-24">
      <div className="container">
        <div className="grid gap-12 md:grid-cols-2">
          {/* Image Column */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image
              src={image}
              alt="Our features"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>

          {/* Text Column */}
          <div className="flex flex-col justify-center">
            <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">Our Approach</h2>
            <div className="prose prose-lg max-w-none">
              <p>{text}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
