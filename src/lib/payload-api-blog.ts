import type { Post, Category } from '@/payload-types'
// I am not sure if I want to this server side so for right now I am using the public server url
// import { getServerSideURL } from '@/utilities/getURL'

const BASE = process.env.NEXT_PUBLIC_SERVER_URL! // or getServerSideURL()

export async function fetchPosts(categorySlug?: string): Promise<Post[]> {
  try {
    let whereClause = `where[and][0][_status][equals]=published`

    if (categorySlug) {
      const categoryResponse = await fetch(
        `${BASE}/api/categories?where[slug][equals]=${encodeURIComponent(categorySlug)}&limit=1`,
      )
      if (categoryResponse.ok) {
        const categoryData = await categoryResponse.json()
        if (categoryData.docs?.length) {
          const categoryId = categoryData.docs[0].id
          whereClause += `&where[and][1][categories][in]=${categoryId}`
        } else {
          return []
        }
      }
    }

    const response = await fetch(`${BASE}/api/posts?${whereClause}&sort=-publishedAt&depth=2`, {
      next: { revalidate: 60 },
    })

    if (!response.ok) throw new Error(`Failed to fetch posts: ${response.statusText}`)
    const data = await response.json()
    return data.docs || []
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

export async function fetchFeaturedPost(): Promise<Post | null> {
  try {
    const response = await fetch(
      `${BASE}/api/posts?where[_status][equals]=published&sort=-publishedAt&limit=1&depth=2`,
      { next: { revalidate: 60 } },
    )
    if (!response.ok) throw new Error('Failed to fetch featured post.')
    const data = await response.json()
    return data.docs?.[0] || null
  } catch (error) {
    console.error('Error fetching featured post:', error)
    return null
  }
}

export async function fetchCategories(): Promise<Category[]> {
  try {
    const response = await fetch(`${BASE}/api/categories?limit=100`, {
      next: { revalidate: 3600 },
    })
    if (!response.ok) throw new Error('Failed to fetch categories.')
    const data = await response.json()
    return data.docs || []
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

export async function fetchPostBySlug(slug: string): Promise<Post | null> {
  try {
    const response = await fetch(
      `${BASE}/api/posts?where[and][0][slug][equals]=${encodeURIComponent(slug)}&where[and][1][_status][equals]=published&limit=1&depth=2`,
      { next: { revalidate: 60 } },
    )
    if (!response.ok) throw new Error(`Failed to fetch post with slug ${slug}`)
    const data = await response.json()
    return data.docs?.[0] || null
  } catch (error) {
    console.error('Error fetching post by slug:', error)
    return null
  }
}

export async function fetchRelatedPosts(
  currentPostId: number | string,
  categoryIds: (number | string)[],
): Promise<Post[]> {
  if (!categoryIds?.length) return []
  try {
    const response = await fetch(
      `${BASE}/api/posts?where[and][0][categories][in]=${categoryIds.join(',')}&where[and][1][id][not_equals]=${currentPostId}&where[and][2][_status][equals]=published&limit=3&depth=1`,
      { next: { revalidate: 3600 } },
    )
    if (!response.ok) throw new Error('Failed to fetch related posts.')
    const data = await response.json()
    return data.docs || []
  } catch (e) {
    console.error('Error fetching related posts:', e)
    return []
  }
}
