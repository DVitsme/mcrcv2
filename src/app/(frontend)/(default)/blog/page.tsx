import { Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CalendarDays, Clock, User as UserIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { fetchPosts, fetchFeaturedPost, fetchCategories } from '@/lib/payload-api-blog'
import type { Post, Category, User } from '@/payload-types'

// Helper function to format dates
function formatDate(dateString?: string): string {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// Helper to get the author's name
function getAuthorName(authors: Post['authors']): string {
  if (!authors || authors.length === 0) return 'MCRC Staff'
  const firstAuthor = authors[0]
  return typeof firstAuthor === 'object' ? firstAuthor.name : 'MCRC Staff'
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string | undefined }>
}) {
  const categorySlug = (await searchParams).tag

  // Fetch data in parallel using the new functions
  const [featuredPost, allPosts, categories] = await Promise.all([
    fetchFeaturedPost(),
    fetchPosts(categorySlug), // Pass the category slug to filter posts
    fetchCategories(),
  ])

  return (
    <div className="container mx-auto px-4 mt-32 py-12">
      {/* Hero Section with Featured Post */}
      {featuredPost &&
        !categorySlug && ( // Only show hero on the main "All" page
          <section className="mb-16">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              <div className="order-2 flex flex-col justify-center lg:order-1">
                {featuredPost.categories &&
                  Array.isArray(featuredPost.categories) &&
                  featuredPost.categories.length > 0 && (
                    <Badge className={`mb-4 inline-flex w-fit`}>
                      {(featuredPost.categories[0] as Category).title}
                    </Badge>
                  )}
                <h1 className="mb-4 text-3xl font-bold lg:text-4xl xl:text-5xl">
                  {featuredPost.title}
                </h1>
                <p className="mb-6 text-lg text-muted-foreground">
                  {featuredPost.meta?.description}
                </p>
                <div className="mb-6 flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2">
                    <UserIcon className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{getAuthorName(featuredPost.authors)}</p>
                    </div>
                  </div>
                  <Separator orientation="vertical" className="h-6" />
                  <div className="flex items-center gap-1">
                    <CalendarDays className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {formatDate(featuredPost.publishedAt || featuredPost.createdAt)}
                    </span>
                  </div>
                </div>
                <Button asChild className="w-fit">
                  <Link href={`/blog/${featuredPost.slug}`}>
                    Read Full Article
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="order-1 lg:order-2">
                <div className="overflow-hidden rounded-xl">
                  <Link href={`/blog/${featuredPost.slug}`}>
                    {typeof featuredPost.heroImage === 'object' && featuredPost.heroImage?.url && (
                      <Image
                        src={featuredPost.heroImage.url}
                        alt={featuredPost.heroImage.alt || featuredPost.title}
                        width={800}
                        height={500}
                        className="aspect-[16/10] h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    )}
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

      {/* Category Filter */}
      <section className="mb-12">
        <div className="overflow-x-auto pb-2">
          <Tabs defaultValue={categorySlug || 'all'} className="w-full">
            <TabsList className="mb-8 flex w-full justify-start space-x-2 bg-transparent p-0">
              <TabsTrigger
                value="all"
                className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                asChild
              >
                <Link href="/blog">All</Link>
              </TabsTrigger>
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.slug!}
                  className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  asChild
                >
                  <Link href={`/blog?tag=${category.slug}`}>{category.title}</Link>
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={categorySlug || 'all'} className="mt-0">
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <Suspense fallback={<p>Loading blog posts...</p>}>
                  {allPosts.map((post) => (
                    <BlogPostCard key={post.id} post={post} />
                  ))}
                </Suspense>
              </div>
              {allPosts.length === 0 && (
                <div className="py-12 text-center">
                  <p className="text-muted-foreground">
                    No posts in this category yet. Check back soon!
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="mt-16 rounded-2xl bg-muted p-8 md:p-12">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold md:text-3xl">Subscribe to Our Newsletter</h2>
          <p className="mt-4 text-muted-foreground">
            Stay updated with the latest insights, tips, and news about mediation and conflict
            resolution.
          </p>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="rounded-md border px-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:w-72"
            />
            <Button>Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  )
}

function BlogPostCard({ post }: { post: Post }) {
  const primaryCategory =
    post.categories && Array.isArray(post.categories) && post.categories.length > 0
      ? (post.categories[0] as Category)
      : null

  return (
    <Card className="flex flex-col overflow-hidden border-0 shadow-none">
      <div className="overflow-hidden rounded-xl">
        <Link href={`/blog/${post.slug}`} className="block">
          <div className="aspect-[16/9] w-full overflow-hidden">
            {typeof post.heroImage === 'object' && post.heroImage?.url && (
              <Image
                src={post.heroImage.url}
                alt={post.heroImage.alt || post.title}
                width={600}
                height={340}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            )}
          </div>
        </Link>
      </div>
      <CardHeader className="px-0 pt-4">
        <div className="flex items-center gap-2">
          {primaryCategory && <Badge className={`font-medium`}>{primaryCategory.title}</Badge>}
        </div>
        <CardTitle className="mt-2 line-clamp-2">
          <Link href={`/blog/${post.slug}`} className="hover:text-primary">
            {post.title}
          </Link>
        </CardTitle>
        <CardDescription className="line-clamp-2 mt-2 text-base">
          {post.meta?.description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto flex items-center justify-between px-0 pt-4">
        <div className="flex items-center gap-2">
          <UserIcon className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{getAuthorName(post.authors)}</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <CalendarDays className="h-4 w-4" />
          <span>{formatDate(post.publishedAt || post.createdAt)}</span>
        </div>
      </CardFooter>
    </Card>
  )
}
