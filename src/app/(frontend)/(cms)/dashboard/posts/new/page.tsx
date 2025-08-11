// // new/page.tsx
// import { cookies } from 'next/headers'
// import PostForm from '@/components/Dashboard/posts/PostForm'

// const API = process.env.NEXT_PUBLIC_SERVER_URL!

// async function fetchCategories() {
//   const token = cookies().get('payload-token')?.value
//   const res = await fetch(`${API}/api/categories?limit=200`, {
//     headers: { Authorization: `Bearer ${token}` },
//     cache: 'no-store',
//   })
//   const data = await res.json()
//   return data.docs ?? []
// }

// export default async function NewPostPage() {
//   const categories = await fetchCategories()
//   return <PostForm mode="create" categories={categories} />
// }
