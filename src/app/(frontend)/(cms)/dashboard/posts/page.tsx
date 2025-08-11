import Link from 'next/link'
import { cookies } from 'next/headers'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const API = process.env.NEXT_PUBLIC_SERVER_URL!

async function fetchPosts() {
  const cookieStore = await cookies()
  const token = cookieStore.get('payload-token')?.value
  const res = await fetch(`${API}/api/posts?sort=-updatedAt&limit=20&depth=1`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  })
  if (!res.ok) return { docs: [] }
  return res.json()
}

export default async function PostsPage() {
  const { docs = [] } = await fetchPosts()

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Posts</h1>
        <Button asChild>
          <Link href="/dashboard/posts/new">New Post</Link>
        </Button>
      </div>

      <div className="grid gap-3">
        {docs.map((p: any) => (
          <div key={p.id} className="rounded-lg border p-3 flex items-center justify-between">
            <div>
              <div className="font-medium">{p.title ?? '(untitled)'}</div>
              <div className="text-sm text-muted-foreground">
                {p.slug ? `/${p.slug}` : ''} &middot; {_statusBadge(p._status)} &middot;{' '}
                {p.updatedAt?.slice(0, 10)}
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <Link href={`/dashboard/posts/${p.id}/edit`}>Edit</Link>
              </Button>
            </div>
          </div>
        ))}
        {docs.length === 0 && <div className="text-sm text-muted-foreground">No posts yet.</div>}
      </div>
    </div>
  )
}

function _statusBadge(s?: string) {
  return <Badge variant={s === 'published' ? 'default' : 'secondary'}>{s ?? 'draft'}</Badge>
}
