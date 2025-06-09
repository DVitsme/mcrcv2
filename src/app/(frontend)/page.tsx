import { Metadata } from 'next'
import { Hero } from '@/components/sections/Hero'
import { Services } from '@/components/sections/Services'
import { AboutPreview } from '@/components/sections/AboutPreview'
import { EventsPreview } from '@/components/sections/EventPreview'
import { CallToAction } from '@/components/sections/CallToAction'
import { GetInvolved } from '@/components/sections/GetInvolved'
import { Stats } from '@/components/sections/Stats'
import { Volunteer } from '@/components/sections/Volunteer'
import { TypeWriter } from '@/components/ui/TypeWriter'
import { BlogPreview } from '@/components/sections/BlogPreview'

export const metadata: Metadata = {
  title: 'Home | Mediation and Conflict Resolution Center',
  description:
    'Welcome to our organization. We are dedicated to making a difference in our community.',
}

// Temporary mock data - will be replaced with Payload data
const mockData = {
  hero: {
    video: '/videos/mediation/mediationvideo.mp4',
    topRightTitle: 'Welcome to Our Organization',
    topRightList: [
      'Making a difference in our community through dedicated service and volunteer work.',
      'We are dedicated to making a difference in our community.',
      'We are dedicated to making a difference in our community.',
      'We are dedicated to making a difference in our community.',
      'We are dedicated to making a difference in our community.',
      'We are dedicated to making a difference in our community.',
      'We are dedicated to making a difference in our community.',
      'We are dedicated to making a difference in our community.',
    ],
    title: 'Welcome to Our Organization',
    description:
      'Making a difference in our community through dedicated service and volunteer work.',
  },
  services: [
    {
      title: 'Community Service',
      description: 'Join our community service initiatives and make a direct impact.',
      icon: 'arrow-right',
    },
    {
      title: 'Education Programs',
      description: 'Access our educational resources and learning opportunities.',
      icon: 'arrow-right',
    },
    {
      title: 'Volunteer Network',
      description: 'Connect with other volunteers and expand your network.',
      icon: 'arrow-right',
    },
  ],
  cta: {
    backgroundImage: '/images/cta-bg.jpg',
    title: 'Join Our Mission',
    description: 'Be part of something bigger. Make a difference today.',
    buttonText: 'Get Involved',
    buttonLink: '/volunteer',
  },
  features: {
    text: 'Our innovative approach combines traditional methods with modern solutions to create lasting change.',
    image: '/images/features.jpg',
  },
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <TypeWriter />
      <section className="mx-4">
        <div className="relative mx-auto mt-24 aspect-video w-full max-w-6xl overflow-hidden rounded-2xl shadow-lg">
          <iframe
            className="absolute inset-0 h-full w-full"
            src="https://www.youtube.com/embed/6ZggpBuuWHg?si=_D2R17FUmDaNkdp4"
            title="Organization introduction video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </section>
      <Services />
      <EventsPreview />
      <AboutPreview />

      <CallToAction
        backgroundImage={mockData.cta.backgroundImage}
        title={mockData.cta.title}
        description={mockData.cta.description}
        buttonText={mockData.cta.buttonText}
        buttonLink={mockData.cta.buttonLink}
      />

      <GetInvolved />

      <Stats />

      <BlogPreview />
      <Volunteer />
    </main>
  )
}
