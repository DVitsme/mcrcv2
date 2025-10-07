'use client'

import { Sparkles } from 'lucide-react'
import { useState } from 'react'

import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Image from 'next/image'

interface Blog {
  title: string
  category: Exclude<(typeof categories)[number], 'All'>
  date: string
  author: string[]
  link: string
}

const categories = ['All', 'Mediation', 'Facilitation', 'Restorative Justice', 'Trainings'] as const

const blogs: Blog[] = [
  {
    title: 'From Conflict to Conversation: How Mediation Works Step-by-Step',
    category: 'Mediation',
    date: 'Dec 4, 2024',
    author: [
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp',
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp',
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp',
    ],
    link: '#',
  },
  {
    title: 'Mediation vs. Court: Cost, Time, and Outcomes Compared',
    category: 'Mediation',
    date: 'Dec 3, 2024',
    author: [
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp',
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp',
    ],
    link: '#',
  },
  {
    title: 'Preparing for Mediation: What Participants Should Know',
    category: 'Mediation',
    date: 'Dec 2, 2024',
    author: [
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp',
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp',
    ],
    link: '#',
  },
  {
    title: 'Confidentiality in Mediation: What Stays in the Room',
    category: 'Mediation',
    date: 'Dec 1, 2024',
    author: ['https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp'],
    link: '#',
  },
  {
    title: 'Community Mediation Success Stories: Real Results, Practical Agreements',
    category: 'Mediation',
    date: 'Nov 30, 2024',
    author: [
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp',
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp',
    ],
    link: '#',
  },

  {
    title: 'Facilitation Basics: Running Meetings That Lead to Decisions',
    category: 'Facilitation',
    date: 'Nov 29, 2024',
    author: [
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp',
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp',
    ],
    link: '#',
  },
  {
    title: 'Designing Effective Agendas: A Facilitator’s Toolkit',
    category: 'Facilitation',
    date: 'Nov 28, 2024',
    author: [
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp',
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp',
    ],
    link: '#',
  },
  {
    title: 'Managing Difficult Conversations in Groups',
    category: 'Facilitation',
    date: 'Nov 27, 2024',
    author: ['https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp'],
    link: '#',
  },
  {
    title: 'Hybrid Facilitation: Inclusive Techniques for In-Room and Remote Voices',
    category: 'Facilitation',
    date: 'Nov 26, 2024',
    author: [
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp',
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp',
    ],
    link: '#',
  },
  {
    title: 'Board & Team Retreats: Frameworks for Strategic Facilitation',
    category: 'Facilitation',
    date: 'Nov 25, 2024',
    author: [
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp',
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp',
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp',
    ],
    link: '#',
  },

  {
    title: 'Restorative Justice 101: Principles, Circles, and Dialogue',
    category: 'Restorative Justice',
    date: 'Nov 24, 2024',
    author: [
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp',
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp',
    ],
    link: '#',
  },
  {
    title: 'School-Based Restorative Practices: Reducing Harm, Building Community',
    category: 'Restorative Justice',
    date: 'Nov 23, 2024',
    author: ['https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp'],
    link: '#',
  },
  {
    title: 'From Harm to Healing: Facilitating Restorative Conversations',
    category: 'Restorative Justice',
    date: 'Nov 22, 2024',
    author: [
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp',
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp',
    ],
    link: '#',
  },
  {
    title: 'When Restorative Justice Is the Right Path',
    category: 'Restorative Justice',
    date: 'Nov 21, 2024',
    author: [
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp',
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp',
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp',
    ],
    link: '#',
  },
  {
    title: 'Safety, Consent, and Confidentiality in Restorative Processes',
    category: 'Restorative Justice',
    date: 'Nov 20, 2024',
    author: [
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp',
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp',
    ],
    link: '#',
  },

  {
    title: 'Upcoming Trainings: Mediation 101 and Advanced Skills',
    category: 'Trainings',
    date: 'Nov 19, 2024',
    author: ['https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp'],
    link: '#',
  },
  {
    title: 'Volunteer Mediator Training: Requirements and Timeline',
    category: 'Trainings',
    date: 'Nov 18, 2024',
    author: [
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp',
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp',
    ],
    link: '#',
  },
  {
    title: 'De-escalation Skills Workshop: Practical Tools for Everyday Use',
    category: 'Trainings',
    date: 'Nov 17, 2024',
    author: [
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp',
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp',
    ],
    link: '#',
  },
  {
    title: 'Facilitation Bootcamp: Agendas, Tools, and Practice',
    category: 'Trainings',
    date: 'Nov 16, 2024',
    author: ['https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp'],
    link: '#',
  },
  {
    title: 'Continuing Education: Building Your Conflict Resolution Toolkit',
    category: 'Trainings',
    date: 'Nov 15, 2024',
    author: [
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp',
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp',
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp',
    ],
    link: '#',
  },
]

const Resources = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredBlogs = blogs.filter(
    (blog) => selectedCategory === 'All' || blog.category === selectedCategory,
  )

  return (
    <section className="py-32">
      <div className="container">
        <h1 className="text-4xl font-medium sm:text-6xl md:text-7xl">Resources</h1>
        <p className="text-muted-foreground mt-4 text-lg">
          Access guides, tutorials, and best practices to assist you in your journey.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-12">
          <a
            href="#"
            className="border-border group relative isolate overflow-hidden rounded-2xl border transition-transform duration-300 hover:-translate-y-0.5 lg:col-span-7 lg:row-span-2"
          >
            <Image
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-ba454dc72896-unsplash.jpg"
              alt="placeholder"
              className="grayscale-100 group-hover:grayscale-50 size-full max-h-[550px] object-cover transition-all duration-300"
              width={500}
              height={500}
            />
            <div className="from-primary absolute inset-0 bg-gradient-to-t to-transparent" />
            <div className="absolute inset-0 z-10 flex flex-col justify-between p-8">
              <Badge className="">
                <Sparkles className="size-4" />
                Featured Article
              </Badge>
              <div className="flex flex-col gap-4">
                <h2 className="text-background text-xl font-medium">
                  Navigating Family Conflicts: How Mediation Can Help You Find Common Ground
                </h2>
                <div className="flex items-center gap-2">
                  <time className="text-background text-sm">April 1, 2025</time>
                  <div className="flex items-center -space-x-2">
                    <Avatar className="border-primary size-6 border">
                      <AvatarImage src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp" />
                    </Avatar>
                    <Avatar className="border-primary size-6 border">
                      <AvatarImage src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp" />
                    </Avatar>
                    <Avatar className="border-primary size-6 border">
                      <AvatarImage src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp" />
                    </Avatar>
                    <span className="border-primary bg-primary/90 text-background z-10 grid size-6 place-items-center rounded-full border text-xs backdrop-blur-sm">
                      +2
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </a>
          <div className="flex flex-col gap-4 lg:col-span-5 lg:row-span-2 lg:flex-col">
            <a
              href="#"
              className="border-border group relative isolate overflow-hidden rounded-2xl border transition-transform duration-300 hover:-translate-y-0.5"
            >
              <Image
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-duxeKbu9FDE-unsplash.jpg"
                alt="placeholder"
                className="grayscale-100 group-hover:grayscale-50 size-full max-h-[267px] object-cover transition-all duration-300"
                width={500}
                height={500}
              />
              <div className="from-primary absolute inset-0 bg-gradient-to-t to-transparent" />
              <div className="absolute inset-0 z-10 flex flex-col justify-between p-8">
                <Badge className="">Latest</Badge>
                <div className="flex flex-col gap-4">
                  <h2 className="text-background text-xl font-medium">
                    De-Escalation Skills Workshop: Practical Tools for Everyday Use
                  </h2>
                  <div className="flex items-center gap-2">
                    <time className="text-background text-sm">March 1, 2025</time>
                    <Avatar className="border-primary size-6 border">
                      <AvatarImage src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp" />
                    </Avatar>
                  </div>
                </div>
              </div>
            </a>
            <a
              href="#"
              className="border-border group relative isolate overflow-hidden rounded-2xl border transition-transform duration-300 hover:-translate-y-0.5"
            >
              <Image
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-zr8IvMz0OWk-unsplash.jpg"
                alt="placeholder"
                className="grayscale-100 group-hover:grayscale-50 size-full max-h-[267px] object-cover transition-all duration-300"
                width={500}
                height={500}
              />
              <div className="from-primary absolute inset-0 bg-gradient-to-t to-transparent" />
              <div className="absolute inset-0 z-10 flex flex-col justify-between p-8">
                <Badge className="">Latest</Badge>
                <div className="flex flex-col gap-4">
                  <h2 className="text-background text-xl font-medium">
                    Facilitation Bootcamp: Agendas, Tools, and Practice
                  </h2>
                  <div className="flex items-center gap-2">
                    <time className="text-background text-sm">February 1, 2025</time>
                    <Avatar className="border-primary size-6 border">
                      <AvatarImage src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp" />
                    </Avatar>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
        <div className="mt-24">
          <h2 className="mb-6 text-2xl font-medium md:text-3xl">Latest updates</h2>
          <Tabs
            defaultValue="All"
            className="border-border border-b"
            onValueChange={setSelectedCategory}
          >
            <TabsList className="bg-background flex h-auto gap-2 p-0">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="group relative py-2.5 uppercase data-[state=active]:shadow-none"
                >
                  {category}
                  <span className="group-data-[state=active]:bg-primary absolute -bottom-px group-data-[state=active]:h-px group-data-[state=active]:w-full" />
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <div className="mt-4">
            {filteredBlogs.map((blog, idx) => (
              <a
                key={idx}
                href={blog.link}
                className="border-border flex flex-col justify-between gap-4 border-b py-6 md:flex-row"
              >
                <h3 className="font-medium md:line-clamp-1">{blog.title}</h3>
                <div className="flex w-full shrink-0 grid-cols-3 justify-between gap-2 md:grid md:max-w-80">
                  <p className="text-muted-foreground text-sm">{blog.category}</p>
                  <time className="text-muted-foreground text-sm">{blog.date}</time>
                  <div className="hidden items-center justify-end -space-x-2 md:flex">
                    {blog.author.map((author, idx) => (
                      <Avatar key={idx} className="border-border size-6 border">
                        <AvatarImage src={author} />
                      </Avatar>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Resources
