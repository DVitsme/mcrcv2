import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface CallToActionProps {
  backgroundImage: string
  title: string
  description: string
  buttonText: string
  buttonLink: string
}

export function CallToAction({
  backgroundImage,
  title,
  description,
  buttonText,
  buttonLink,
}: CallToActionProps) {
  return (
    <section className="relative py-24">
      {/* Background Image */}
      <Image src={backgroundImage} alt="" fill className="object-cover" sizes="100vw" />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="container relative">
        <div className="mx-auto max-w-2xl text-center text-white">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
          <p className="mb-8 text-lg">{description}</p>
          <Button asChild size="lg">
            <Link href={buttonLink}>{buttonText}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
