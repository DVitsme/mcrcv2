import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import { Card, CardHeader } from '@/components/ui/card'

export default function BlogPostLoading() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Back Button Skeleton */}
      <div className="mb-8">
        <Skeleton className="h-10 w-32" />
      </div>

      {/* Article Header Skeleton */}
      <div className="mb-8">
        <Skeleton className="mb-4 h-6 w-24" />
        <Skeleton className="mb-4 h-12 w-full" />
        <Skeleton className="mb-2 h-12 w-5/6" />

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <div>
              <Skeleton className="h-4 w-24" />
              <Skeleton className="mt-1 h-3 w-16" />
            </div>
          </div>
          <Separator orientation="vertical" className="hidden h-6 sm:block" />
          <div className="flex items-center gap-1">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Separator orientation="vertical" className="hidden h-6 sm:block" />
          <div className="flex items-center gap-1">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      </div>

      {/* Featured Image Skeleton */}
      <Skeleton className="mb-10 aspect-[21/9] w-full rounded-xl" />

      {/* Article Content Skeleton */}
      <div className="mx-auto max-w-3xl">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="mb-6">
            {i === 0 || i === 3 || i === 6 ? (
              <Skeleton className="mb-4 h-8 w-3/4" />
            ) : null}
            <Skeleton className="h-5 w-full" />
            <Skeleton className="mt-2 h-5 w-full" />
            <Skeleton className="mt-2 h-5 w-4/5" />
            {i === 2 || i === 5 ? (
              <div className="ml-6 mt-4 space-y-2">
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            ) : null}
          </div>
        ))}

        {/* Author Bio Skeleton */}
        <div className="mt-16 rounded-xl bg-muted p-6">
          <Skeleton className="mb-2 h-6 w-48" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="mt-2 h-4 w-5/6" />
        </div>

        {/* Tags Skeleton */}
        <div className="mt-10">
          <Skeleton className="h-6 w-24" />
        </div>

        {/* Share Links Skeleton */}
        <div className="mt-10">
          <Skeleton className="mb-4 h-4 w-32" />
          <div className="flex gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-10 rounded-md" />
            ))}
          </div>
        </div>
      </div>

      {/* Related Posts Skeleton */}
      <div className="mt-20">
        <Skeleton className="mb-8 h-8 w-48" />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="flex flex-col overflow-hidden border-0 shadow-none">
              <Skeleton className="aspect-[16/9] w-full rounded-xl" />
              <CardHeader className="px-0 pt-4">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="mt-2 h-6 w-full" />
                <Skeleton className="mt-1 h-6 w-4/5" />
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
} 