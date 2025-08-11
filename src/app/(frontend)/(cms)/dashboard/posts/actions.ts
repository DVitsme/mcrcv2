'use server'

import { cookies } from 'next/headers'

const API = process.env.NEXT_PUBLIC_SERVER_URL!

async function authHeaders() {
  // get token from cookies
  const cookieStore = await cookies()
  const token = cookieStore.get('payload-token')?.value
  if (!token) throw new Error('Missing auth token')
  return { Authorization: `Bearer ${token}` }
}

export type PostInput = {
  title: string
  slug?: string
  excerpt?: string
  content?: any // your lexical JSON
  categories?: (number | string)[]
  authors?: (number | string)[]
  _status?: 'draft' | 'published'
  publishedAt?: string | null
  heroImage?: number | string | null // media id
  metaImage?: number | string | null // media id
}

export async function createPost(data: PostInput) {
  const res = await fetch(`${API}/api/posts`, {
    method: 'POST',
    headers: {
      ...(await authHeaders()),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(mapInputToPayload(data)),
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`Create failed: ${res.status} ${res.statusText}`)
  return res.json()
}

export async function updatePost(id: number | string, data: PostInput) {
  const res = await fetch(`${API}/api/posts/${id}`, {
    method: 'PATCH',
    headers: {
      ...(await authHeaders()),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(mapInputToPayload(data)),
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`Update failed: ${res.status} ${res.statusText}`)
  return res.json()
}

export async function deletePost(id: number | string) {
  const res = await fetch(`${API}/api/posts/${id}`, {
    method: 'DELETE',
    headers: await authHeaders(),
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`Delete failed: ${res.status} ${res.statusText}`)
  return res.json()
}

export async function uploadMedia(file: File) {
  const form = new FormData()
  form.append('file', file)
  const res = await fetch(`${API}/api/media`, {
    method: 'POST',
    headers: await authHeaders(),
    body: form,
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`Upload failed: ${res.status} ${res.statusText}`)
  return res.json() // returns media doc (with id)
}

// Map our UI shape to Payload fields
function mapInputToPayload(input: PostInput) {
  const {
    title,
    slug,
    excerpt,
    content,
    categories,
    authors,
    _status,
    publishedAt,
    heroImage,
    metaImage,
  } = input

  return {
    title,
    slug,
    excerpt,
    content, // your RichText JSON
    categories, // array of category IDs (Payload handles posts_rels)
    authors, // array of user IDs (Payload handles posts_rels)
    _status,
    publishedAt,
    heroImage, // media id (-> posts.hero_image_id)
    meta: { image: metaImage ?? null },
  }
}
