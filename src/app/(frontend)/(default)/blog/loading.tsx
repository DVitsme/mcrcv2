import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardHeader, CardFooter } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export default function BlogLoading() {
  return (
    <div className="container mx-auto px-4 mt-32 py-12">
      {/* Featured Post Loading Skeleton */}
      <section className="mb-16">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="order-2 flex flex-col justify-center lg:order-1">
            <Skeleton className="mb-4 h-6 w-24" />
            <Skeleton className="mb-4 h-12 w-full" />
            <Skeleton className="mb-2 h-12 w-5/6" />
            <Skeleton className="mb-6 h-6 w-full" />
            <Skeleton className="mb-6 h-6 w-5/6" />

            <div className="mb-6 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-5 rounded-full" />
                <div>
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="mt-1 h-3 w-16" />
                </div>
              </div>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center gap-1">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-20" />
              </div>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center gap-1">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>

            <Skeleton className="h-10 w-36" />
          </div>
          <div className="order-1 lg:order-2">
            <Skeleton className="aspect-[16/10] w-full rounded-xl" />
          </div>
        </div>
      </section>

      {/* Category Tabs Loading Skeleton */}
      <section className="mb-12">
        <div className="mb-8 flex space-x-2 overflow-x-auto pb-2">
          {Array.from({ length: 7 }).map((_, i) => (
            <Skeleton key={i} className="h-9 w-28 rounded-full" />
          ))}
        </div>

        {/* Blog Post Cards Loading Skeleton */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <BlogPostCardSkeleton key={i} />
          ))}
        </div>
      </section>

      {/* Newsletter Section Loading Skeleton */}
      <section className="mt-16 rounded-2xl bg-muted p-8 md:p-12">
        <div className="mx-auto max-w-2xl text-center">
          <Skeleton className="mx-auto h-8 w-64" />
          <Skeleton className="mx-auto mt-4 h-5 w-full max-w-md" />
          <Skeleton className="mx-auto mt-2 h-5 w-full max-w-sm" />
          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-center">
            <Skeleton className="h-10 w-full sm:w-72" />
            <Skeleton className="h-10 w-full sm:w-28" />
          </div>
        </div>
      </section>
    </div>
  )
}

function BlogPostCardSkeleton() {
  return (
    <Card className="flex flex-col overflow-hidden border-0 shadow-none">
      <Skeleton className="aspect-[16/9] w-full rounded-xl" />
      <CardHeader className="px-0 pt-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="mt-2 h-6 w-full" />
        <Skeleton className="mt-1 h-6 w-5/6" />
        <Skeleton className="mt-2 h-4 w-full" />
        <Skeleton className="mt-1 h-4 w-5/6" />
      </CardHeader>
      <CardFooter className="mt-auto flex items-center justify-between px-0 pt-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="flex items-center gap-1">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-20" />
        </div>
      </CardFooter>
    </Card>
  )
} 