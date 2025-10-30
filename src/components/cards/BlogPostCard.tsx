import Image from 'next/image'
import Link from 'next/link'
import { CalendarDays, Clock, User as UserIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import type { Post, Category } from '@/types'

// Helper functions
function formatDate(dateString?: string): string {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function getAuthorName(authors: Post['authors']): string {
  if (!authors || authors.length === 0) return 'MCRC Staff'
  const firstAuthor = authors[0]
  return typeof firstAuthor === 'object' ? firstAuthor.name : 'MCRC Staff'
}

export function BlogPostCard({ post }: { post: Post }) {
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
                alt={post.heroImage.alt || post.title || ''}
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
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>5 min read</span>
          </div>
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
