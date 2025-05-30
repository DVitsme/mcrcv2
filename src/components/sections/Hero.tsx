import Image from 'next/image'

interface HeroProps {
  image: string
  title: string
  description: string
}

export function Hero({ image, title, description }: HeroProps) {
  return (
    <section className="relative h-[80vh] w-full">
      {/* Hero Image */}
      <Image src={image} alt={title} fill className="object-cover" priority sizes="100vw" />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
        <div className="container">
          <div className="max-w-2xl rounded-lg bg-white/90 p-6 backdrop-blur-sm md:p-8">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
              {title}
            </h1>
            <p className="text-lg text-gray-700 md:text-xl">{description}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
