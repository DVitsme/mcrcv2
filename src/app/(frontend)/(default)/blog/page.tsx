// src/app/(frontend)/(default)/blog/page.tsx
import { fetchFeaturedPost, fetchPosts, fetchCategories } from '@/lib/payload-api-blog'
import type { Post as PayloadPost, Category as PayloadCategory } from '@/payload-types'
import { default as BlogPageClient } from '@/components/clients/BlogPageClient'

// Use the same shape your client UI expects
export type CardPost = {
  category: string
  title: string
  summary: string
  link: string
  cta: string
  thumbnail: string
}

type UIHelperCategory = { label: string; value: string }
type UIBreadcrumbItem = { label: string; link: string }

const FALLBACK_THUMB = 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg'

// Turn a Payload Post into your card shape
function toCardPost(p: PayloadPost): CardPost | null {
  // Prefer the first related category's *title* for pretty display
  const firstCat = (
    Array.isArray(p.categories) && p.categories[0] && typeof p.categories[0] === 'object'
      ? (p.categories[0] as any)
      : null
  ) as PayloadCategory | null

  const categoryLabel = firstCat?.title || firstCat?.slug || 'Uncategorized'

  const slug = p.slug
  if (!slug) return null

  // Try to read a usable image URL from heroImage (Media relationship)
  // If your Media has `url`, this will work. Otherwise we fall back.
  const hero = p.heroImage as any
  const thumbnail =
    hero && typeof hero === 'object' && (hero.url || hero.filename)
      ? hero.url || hero.filename
      : FALLBACK_THUMB

  return {
    category: categoryLabel, // IMPORTANT: we pass a *label*, and filter will lower-case it
    title: p.title || 'Untitled',
    summary: p.excerpt || '',
    link: `/blog/${slug}`,
    cta: 'Read article',
    thumbnail,
  }
}

function toUICategories(docs: PayloadCategory[]): UIHelperCategory[] {
  const cats = docs.map((c) => ({
    label: c.title || c.slug || 'Uncategorized',
    value: (c.title || c.slug || 'uncategorized').toLowerCase(), // client filter uses lower-cased values
  }))
  // Ensure "All" at the front
  return [{ label: 'All', value: 'all' }, ...cats]
}

export default async function BlogPage() {
  // Fetch everything on the server
  const [featured, posts, categories] = await Promise.all([
    fetchFeaturedPost(),
    fetchPosts(), // all published posts
    fetchCategories(),
  ])

  // Build the card lists
  const featuredCard = featured ? toCardPost(featured) : null
  const postCards = (posts || []).map(toCardPost).filter(Boolean) as CardPost[]

  // If there’s no explicit featured card, use the first post as a fallback for the hero
  const primaryCard = featuredCard ?? postCards[0] ?? null
  const restCards = featuredCard ? postCards : postCards.slice(1)

  const uiCategories = toUICategories(categories || [])

  const breadcrumb: UIBreadcrumbItem[] = [
    { label: 'Home', link: '/' },
    { label: 'Blog', link: '/blog' },
  ]

  return (
    <BlogPageClient
      featured={primaryCard}
      posts={restCards}
      categories={uiCategories}
      breadcrumb={breadcrumb}
    />
  )
}
