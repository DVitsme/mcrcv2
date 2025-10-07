import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { fetchPostById, fetchCategories } from '@/lib/payload-api-blog'
import type { Post as PayloadPost, Category as PayloadCategory } from '@/payload-types'
import PostForm from './PostForm'

type RouteParams = Promise<{ id: string }>

type CategoryLike = { id: string | number; title?: string | null; slug?: string | null }
type PostSectionLike = { title?: string | null; contentHtml?: string | null }
type MediaLike = { url?: string | null } | string | number | null

type PostLike = {
  id?: string | number
  title?: string | null
  excerpt?: string | null
  categories?: Array<string | number | CategoryLike> | null
  sections?: PostSectionLike[]
  contentHtml?: string | null
  heroImage?: MediaLike
}

export default async function EditPostPage({ params }: { params: RouteParams }) {
  const { id } = await params

  // Fetch post and categories data
  let post: PayloadPost | null = null
  let categories: PayloadCategory[] = []

  try {
    ;[post, categories] = await Promise.all([fetchPostById(id), fetchCategories()])
  } catch (error) {
    console.error('Error fetching post data:', error)
  }

  if (!post) {
    notFound()
  }

  // Convert Payload types to form-compatible types
  const postLike: PostLike = {
    id: post.id,
    title: post.title,
    excerpt: post.excerpt,
    categories: post.categories,
    sections: post.sections || undefined,
    contentHtml: post.contentHtml,
    heroImage: post.heroImage,
  }

  const categoryLikes: CategoryLike[] = categories.map((cat) => ({
    id: cat.id,
    title: cat.title,
    slug: cat.slug,
  }))

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PostForm mode="edit" post={postLike} categories={categoryLikes} />
    </Suspense>
  )
}
