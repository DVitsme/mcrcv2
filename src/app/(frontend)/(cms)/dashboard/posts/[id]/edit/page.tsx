// [id]/edit/page.tsx
import { cookies } from 'next/headers'
import PostForm from '@/components/Dashboard/posts/PostForm'

const API = process.env.NEXT_PUBLIC_SERVER_URL!

type PageProps = { params: Promise<{ id: string }> }

async function fetchPost(id: string) {
  const cookieStore = await cookies()
  const token = cookieStore.get('payload-token')?.value
  const res = await fetch(`${API}/api/posts/${id}?depth=2`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  })
  if (!res.ok) return null
  return res.json()
}
async function fetchCategories() {
  const cookieStore = await cookies()
  const token = cookieStore.get('payload-token')?.value
  const res = await fetch(`${API}/api/categories?limit=200`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  })
  const data = await res.json()
  return data.docs ?? []
}

export default async function EditPostPage({ params }: PageProps) {
  const { id } = await params
  const [post, categories] = await Promise.all([fetchPost(id), fetchCategories()])
  if (!post) return <div className="p-4">Post not found</div>
  return <PostForm mode="edit" post={post} categories={categories} />
}
