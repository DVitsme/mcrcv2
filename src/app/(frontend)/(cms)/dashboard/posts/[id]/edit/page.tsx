// src/app/(frontend)/(cms)/dashboard/posts/[id]/edit/page.tsx
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import PostForm from '@/components/Dashboard/posts/PostForm'

const API = process.env.NEXT_PUBLIC_SERVER_URL!

type PageProps = { params: { id: string } }

async function fetchPost(id: string, token?: string) {
  const res = await fetch(`${API}/api/posts/${id}?depth=2`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    cache: 'no-store',
  })
  if (res.status === 401) redirect('/admin') // adjust path if needed
  if (!res.ok) return null
  return res.json() // Payload returns the doc directly
}

async function fetchCategories(token?: string) {
  const res = await fetch(`${API}/api/categories?limit=200`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    cache: 'no-store',
  })
  if (res.status === 401) redirect('/admin')
  if (!res.ok) return []
  const data = await res.json()
  return data.docs ?? []
}

export default async function EditPostPage({ params }: PageProps) {
  // 🔧 In your Next version, cookies() is async
  const cookieStore = await cookies()
  const token = cookieStore.get('payload-token')?.value
  if (!token) redirect('/admin') // or '/admin/login'

  const [post, categories] = await Promise.all([
    fetchPost(params.id, token),
    fetchCategories(token),
  ])

  if (!post) return <div className="p-4">Post not found</div>
  return <PostForm mode="edit" post={post} categories={categories} />
}
