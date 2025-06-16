import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CalendarDays, Clock, User as UserIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { BlogPostCard } from '@/components/cards/BlogPostCard'
import RichText from '@/components/RichText'

import { fetchPostBySlug, fetchRelatedPosts } from '@/lib/payload-api-blog'
import type { Post, Category, User } from '@/payload-types'
import { Metadata } from 'next'

// --- CORRECTED: Define the full props type for a Next.js page ---
type Props = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

// --- CORRECTED: Use PageProps for generateMetadata ---
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = await fetchPostBySlug(params.slug)
  if (!post) {
    return { title: 'Post Not Found' }
  }
  return {
    title: post.meta?.title || post.title,
    description: post.meta?.description || '',
    openGraph: {
      title: post.meta?.title || post.title,
      description: post.meta?.description || '',
      images:
        post.meta?.image && typeof post.meta.image === 'object'
          ? [{ url: post.meta.image.url! }]
          : [],
      type: 'article',
      publishedTime: post.publishedAt || post.createdAt,
      authors: (post.authors || [])
        .map((a) => (typeof a === 'object' ? a.name : null))
        .filter(Boolean) as string[],
    },
  }
}

// --- CORRECTED: Use PageProps for the main component ---
export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await fetchPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  // --- Get category IDs for related posts lookup ---
  const categoryIds = ((post.categories || []) as Category[]).map((c) => c.id)
  const relatedPosts = await fetchRelatedPosts(post.id, categoryIds)

  // --- Helper functions ---
  const getAuthorName = (authors: Post['authors']): string => {
    if (!authors || authors.length === 0) return 'MCRC Staff'
    const firstAuthor = authors[0] as User
    return firstAuthor.name || 'MCRC Staff'
  }

  const formatDate = (dateString?: string): string => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Link href="/blog" className="text-sm text-primary hover:underline">
          &larr; Back to Blog
        </Link>
      </div>

      <article className="mx-auto max-w-4xl">
        <header className="mb-8">
          {post.categories && (post.categories as Category[]).length > 0 && (
            <Badge className="mb-4 inline-flex w-fit">
              {(post.categories[0] as Category).title}
            </Badge>
          )}
          <h1 className="mb-6 text-3xl font-bold lg:text-4xl xl:text-5xl">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <UserIcon className="h-5 w-5" />
              <span>{getAuthorName(post.authors)}</span>
            </div>
            <Separator orientation="vertical" className="hidden h-6 sm:block" />
            <div className="flex items-center gap-1">
              <CalendarDays className="h-4 w-4" />
              <span>{formatDate(post.publishedAt || post.createdAt)}</span>
            </div>
            <Separator orientation="vertical" className="hidden h-6 sm:block" />
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>5 min read</span>
            </div>
          </div>
        </header>

        {typeof post.heroImage === 'object' && post.heroImage?.url && (
          <div className="mb-10 overflow-hidden rounded-xl">
            <Image
              src={post.heroImage.url}
              alt={post.heroImage.alt || post.title}
              width={1200}
              height={600}
              className="aspect-[21/9] w-full object-cover"
            />
          </div>
        )}

        <div className="prose prose-lg max-w-none dark:prose-invert">
          <RichText content={post.content} />
        </div>

        {post.authors && (post.authors as User[]).length > 0 && (
          <div className="mt-16 rounded-xl bg-muted p-6">
            <h3 className="mb-2 text-lg font-semibold">About the Author</h3>
            <p className="text-muted-foreground">
              {(post.authors[0] as User).name} is a vital part of the MCRC team.
            </p>
          </div>
        )}
      </article>

      {relatedPosts.length > 0 && (
        <aside className="mt-20">
          <h2 className="mb-8 text-2xl font-bold">Related Articles</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((relatedPost: Post) => (
              <BlogPostCard key={relatedPost.id} post={relatedPost} />
            ))}
          </div>
        </aside>
      )}
    </div>
  )
}
