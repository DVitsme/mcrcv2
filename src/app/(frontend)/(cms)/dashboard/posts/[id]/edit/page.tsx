// src/app/(frontend)/(cms)/dashboard/posts/[id]/edit/page.tsx
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import PostForm from '@/components/Dashboard/posts/PostForm'

const API = process.env.NEXT_PUBLIC_SERVER_URL!

async function fetchPost(id: string, token?: string) {
  const res = await fetch(`${API}/api/posts/${id}?depth=2`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    cache: 'no-store',
  })
  if (res.status === 401) redirect('/admin')
  if (!res.ok) return null
  return res.json()
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

// Accept either the old or the new Next typing for params (sometimes a Promise)
export default async function EditPostPage(
  props: { params: { id: string } } | { params: Promise<{ id: string }> } | any,
) {
  const awaitedParams =
    typeof props?.params?.then === 'function' ? await props.params : props.params
  const id = String(awaitedParams?.id ?? '')

  const cookieStore = await cookies()
  const token = cookieStore.get('payload-token')?.value
  if (!token) redirect('/admin')

  const [post, categories] = await Promise.all([fetchPost(id, token), fetchCategories(token)])

  if (!post) return <div className="p-4">Post not found</div>
  return <PostForm mode="edit" post={post} categories={categories} />
}
