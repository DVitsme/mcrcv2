import type { Metadata } from 'next'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import PageClient from './page.client'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const runtime = 'nodejs'

type Args = {
  params: {
    pageNumber: string
  }
}

export default async function Page({ params }: Args) {
  const pageNumber = Number(params.pageNumber)
  if (!Number.isInteger(pageNumber)) notFound()

  let posts
  try {
    const payload = await getPayload({ config: configPromise })
    posts = await payload.find({
      collection: 'posts',
      depth: 1,
      limit: 12,
      page: pageNumber,
      overrideAccess: false,
    })
  } catch (e) {
    console.error('Posts fetch failed:', e)
    return (
      <div className="pt-24 pb-24">
        <PageClient />
        <div className="container mb-16">
          <div className="prose dark:prose-invert max-w-none">
            <h1>Posts</h1>
            <p className="text-muted-foreground">No posts yet.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Posts</h1>
        </div>
      </div>

      <div className="container mb-8">
        <PageRange
          collection="posts"
          currentPage={posts.page}
          limit={12}
          totalDocs={posts.totalDocs}
        />
      </div>

      <CollectionArchive posts={posts.docs} />

      <div className="container">
        {posts?.page && posts?.totalPages > 1 && (
          <Pagination page={posts.page} totalPages={posts.totalPages} />
        )}
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  return { title: `Payload Website Template Posts Page ${params.pageNumber || ''}` }
}

// Optional: delete this to avoid any DB access during build
export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config: configPromise })
    const { totalDocs } = await payload.count({ collection: 'posts', overrideAccess: false })
    const totalPages = Math.ceil(totalDocs / 12)
    return Array.from({ length: totalPages }, (_, i) => ({ pageNumber: String(i + 1) }))
  } catch (err) {
    console.error('generateStaticParams failed, skipping SSG:', err)
    return []
  }
}
