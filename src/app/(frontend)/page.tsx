import { Metadata } from 'next'
import { Hero } from '@/components/sections/Hero'
import { Services } from '@/components/sections/Services'
import { AboutSnippet } from '@/components/sections/AboutSnippet'
import { CallToAction } from '@/components/sections/CallToAction'
import { FeatureSection } from '@/components/sections/FeatureSection'
import { Stats } from '@/components/sections/Stats'
import { Volunteer } from '@/components/sections/Volunteer'
import { TypeWriter } from '@/components/ui/TypeWriter'

export const metadata: Metadata = {
  title: 'Home | Your Organization Name',
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
  about: {
    text: 'Our organization has been serving the community for over 20 years, making a lasting impact through various initiatives and programs.',
    image: '/images/mediation/coupleoncouch.jpeg',
  },
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
  stats: [
    { number: '1000+', label: 'Volunteers' },
    { number: '50+', label: 'Programs' },
    { number: '20+', label: 'Years' },
    { number: '10000+', label: 'Lives Impacted' },
  ],
  volunteer: {
    image: '/images/volunteer.jpg',
  },
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <TypeWriter />
      <Services />

      <AboutSnippet text={mockData.about.text} image={mockData.about.image} />

      <CallToAction
        backgroundImage={mockData.cta.backgroundImage}
        title={mockData.cta.title}
        description={mockData.cta.description}
        buttonText={mockData.cta.buttonText}
        buttonLink={mockData.cta.buttonLink}
      />

      <FeatureSection text={mockData.features.text} image={mockData.features.image} />

      <Stats stats={mockData.stats} />

      <Volunteer image={mockData.volunteer.image} />
    </main>
  )
}
