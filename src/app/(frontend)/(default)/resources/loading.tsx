import { Skeleton } from '@/components/ui/skeleton'

const ResourcesLoading = () => {
  return (
    <section className="py-32">
      <div className="container">
        {/* Header skeleton */}
        <Skeleton className="h-16 w-48 mb-4" />
        <Skeleton className="h-6 w-96" />
        
        {/* Featured section skeleton */}
        <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-12">
          {/* Large featured card skeleton */}
          <div className="lg:col-span-7 lg:row-span-2">
            <Skeleton className="h-[550px] w-full rounded-2xl" />
          </div>
          
          {/* Side cards skeleton */}
          <div className="flex flex-col gap-4 lg:col-span-5 lg:row-span-2">
            <Skeleton className="h-[267px] w-full rounded-2xl" />
            <Skeleton className="h-[267px] w-full rounded-2xl" />
          </div>
        </div>
        
        {/* Latest updates section skeleton */}
        <div className="mt-24">
          <Skeleton className="h-8 w-48 mb-6" />
          
          {/* Tabs skeleton */}
          <div className="border-border border-b">
            <div className="flex gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-24" />
              ))}
            </div>
          </div>
          
          {/* Blog list skeleton */}
          <div className="mt-4">
            {Array.from({ length: 8 }).map((_, idx) => (
              <div
                key={idx}
                className="border-border flex flex-col justify-between gap-4 border-b py-6 md:flex-row"
              >
                <Skeleton className="h-6 w-full md:w-2/3" />
                <div className="flex w-full shrink-0 grid-cols-3 justify-between gap-2 md:grid md:max-w-80">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-20" />
                  <div className="hidden items-center justify-end gap-1 md:flex">
                    <Skeleton className="h-6 w-6 rounded-full" />
                    <Skeleton className="h-6 w-6 rounded-full" />
                    <Skeleton className="h-6 w-6 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ResourcesLoading
