import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Linkedin, Twitter } from 'lucide-react'

import { fetchPostBySlug } from '@/lib/payload-api-blog'
import type { Category as CategoryType } from '@/payload-types'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import RichText from '@/components/RichText'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { formatDateTime } from '@/utilities/formatDateTime'
import { getServerSideURL } from '@/utilities/getURL'

type Params = { params: { slug: string } }

// --- SEO ---
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = await fetchPostBySlug(params.slug)
  if (!post) {
    return {
      title: 'Post not found',
      robots: { index: false },
    }
  }

  const siteURL = getServerSideURL()
  const canonical = `${siteURL}/blog/${encodeURIComponent(params.slug)}`
  const title = post.title ?? 'Blog post'
  const description = post.excerpt ?? 'Read the latest update from our blog.'
  const hero =
    typeof post.heroImage === 'object' && post.heroImage
      ? getMediaUrl(post.heroImage.url ?? '')
      : undefined

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'article',
      images: hero ? [{ url: hero, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: hero ? [hero] : undefined,
    },
  }
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = params
  const post = await fetchPostBySlug(slug)
  if (!post) return notFound()

  // Meta bits
  const published = post.publishedAt ? formatDateTime(post.publishedAt) : null
  const readTime = post.readTimeMinutes ? `${post.readTimeMinutes} min read` : null
  const hero =
    typeof post.heroImage === 'object' && post.heroImage
      ? getMediaUrl(post.heroImage.url ?? '')
      : undefined

  // Share links
  const siteURL = getServerSideURL()
  const canonical = `${siteURL}/blog/${encodeURIComponent(slug)}`
  const twitterShare = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    canonical,
  )}&text=${encodeURIComponent(post.title ?? '')}`
  const linkedinShare = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    canonical,
  )}`

  // Categories
  const categories =
    (Array.isArray(post.categories) ? (post.categories as CategoryType[]) : []) || []

  // Authors: prefer populatedAuthors (hook), fallback to authors relation names
  const populated = Array.isArray((post as any).populatedAuthors)
    ? (post as any).populatedAuthors
    : []
  const authors =
    populated.length > 0
      ? populated.map((a: any) => a.name).filter(Boolean)
      : Array.isArray(post.authors)
        ? (post.authors as any[]).map((a) => a?.name).filter(Boolean)
        : []

  return (
    <section className="pb-32">
      {/* Hero / Header */}
      <div className="bg-muted bg-[url('https://deifkwefumgah.cloudfront.net/shadcnblocks/block/patterns/dot-pattern-2.svg')] bg-[length:3.125rem_3.125rem] bg-repeat py-20">
        <div className="container flex flex-col items-start justify-start gap-10 py-10">
          {/* Breadcrumb */}
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{post.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Title + Meta */}
          <div className="flex w-full flex-col items-center gap-5 text-center">
            <div className="flex flex-wrap items-center justify-center gap-2.5 text-sm text-muted-foreground">
              {readTime ? <div>{readTime}</div> : null}
              {readTime && published ? <div>|</div> : null}
              {published ? <div>{published}</div> : null}
            </div>

            <h1 className="max-w-3xl text-balance text-[2.5rem] font-semibold leading-[1.2] md:text-5xl lg:text-6xl">
              {post.title}
            </h1>

            {post.excerpt ? (
              <p className="max-w-3xl text-foreground text-xl font-semibold leading-[1.4]">
                {post.excerpt}
              </p>
            ) : null}

            {/* Categories */}
            {categories.length > 0 ? (
              <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
                {categories.map((c) => (
                  <Badge key={String(c.id)} variant="secondary" className="rounded-full">
                    {c.title ?? c.slug ?? 'Category'}
                  </Badge>
                ))}
              </div>
            ) : null}

            {/* Share buttons */}
            <div className="mt-3 flex items-center justify-center gap-2.5">
              <Button asChild size="icon" variant="outline" aria-label="Share on Twitter">
                <a href={twitterShare} target="_blank" rel="noopener noreferrer">
                  <Twitter />
                </a>
              </Button>
              <Button asChild size="icon" variant="outline" aria-label="Share on LinkedIn">
                <a href={linkedinShare} target="_blank" rel="noopener noreferrer">
                  <Linkedin />
                </a>
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          {hero ? (
            <div className="mx-auto w-full max-w-5xl overflow-hidden rounded-xl">
              <Image
                src={hero}
                alt={post.title ?? ''}
                width={1600}
                height={900}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          ) : null}
        </div>
      </div>

      {/* Body */}
      <div className="container pt-16">
        <div className="mx-auto w-full max-w-5xl">
          {/* Author strip */}
          {authors.length > 0 ? (
            <div className="mb-8 flex flex-wrap items-center gap-4">
              {authors.map((name: string) => (
                <Author
                  key={name}
                  author={{ name, job: '', image: undefined, description: '', socials: [] }}
                />
              ))}
            </div>
          ) : null}

          {/* Rich content */}
          <article className="prose max-w-none dark:prose-invert">
            <RichText data={post.content as any} className="prose dark:prose-invert" />
          </article>

          {/* Footer author card (optional) */}
          {authors.length > 0 ? (
            <div className="mt-10 rounded-lg bg-muted p-5">
              <div className="flex flex-wrap items-center gap-4">
                {authors.map((name: string) => (
                  <Author
                    key={`${name}-footer`}
                    author={{ name, job: '', image: undefined, description: '', socials: [] }}
                  />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}

/** Lightweight author chip */
function Author({
  author,
}: {
  author: {
    image?: string
    name: string
    job?: string
    description?: string
    socials?: { url: string }[]
  }
}) {
  const initials =
    author.name
      ?.trim()
      ?.split(/\s+/)
      ?.map((s) => s[0]?.toUpperCase())
      .slice(0, 2)
      .join('') || 'A'
  return (
    <div className="flex items-center gap-2.5">
      <Avatar className="size-12 border">
        {author.image ? <AvatarImage src={author.image} alt={author.name} /> : null}
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div>
        <div className="text-sm font-normal leading-normal">{author.name}</div>
        {author.job ? (
          <div className="text-muted-foreground text-sm font-normal leading-normal">
            {author.job}
          </div>
        ) : null}
      </div>
    </div>
  )
}
