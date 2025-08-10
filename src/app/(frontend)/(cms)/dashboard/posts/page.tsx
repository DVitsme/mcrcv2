import Link from 'next/link'
import React from 'react'

const CMSPostsPage = () => {
  return (
    <div>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Posts</h1>
        <div className="flex flex-col gap-4">
          <Link href="/posts/create">Create Post</Link>
          <h2 className="text-xl font-bold">Recent Posts</h2>
        </div>
      </div>
    </div>
  )
}

export default CMSPostsPage
