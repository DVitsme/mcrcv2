import type { Post, Category, User } from '@/payload-types'

/**
 * Fetches published posts from the Payload API. Can optionally filter by category.
 * @param categorySlug - The slug of the category to filter by.
 */
export async function fetchPosts(categorySlug?: string): Promise<Post[]> {
  try {
    let whereClause = `where[and][0][status][equals]=published`

    // If a category slug is provided, we need to find its ID first
    if (categorySlug) {
      const categoryResponse = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/categories?where[slug][equals]=${categorySlug}&limit=1`,
      )
      if (categoryResponse.ok) {
        const categoryData = await categoryResponse.json()
        if (categoryData.docs.length > 0) {
          const categoryId = categoryData.docs[0].id
          // Add the category filter to our where clause
          whereClause += `&where[and][1][categories][in]=${categoryId}`
        } else {
          // Category not found, so return no posts
          return []
        }
      }
    }

    // Fetch posts with the constructed where clause
    const response = await fetch(
      // We use depth=2 to populate the `categories` and `authors` relationship fields fully
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/posts?${whereClause}&sort=-publishedAt&depth=2`,
      {
        next: { revalidate: 60 }, // Revalidate every minute
      },
    )

    if (!response.ok) throw new Error(`Failed to fetch posts: ${response.statusText}`)

    const data = await response.json()
    return data.docs || []
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

/**
 * Fetches the most recent published post to be used as the "featured" post.
 */
export async function fetchFeaturedPost(): Promise<Post | null> {
  try {
    // For a more robust solution, consider adding a "featured" checkbox to your Posts collection
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/posts?where[status][equals]=published&sort=-publishedAt&limit=1&depth=2`,
      { next: { revalidate: 60 } },
    )
    if (!response.ok) throw new Error('Failed to fetch featured post.')

    const data = await response.json()
    return data.docs[0] || null
  } catch (error) {
    console.error('Error fetching featured post:', error)
    return null
  }
}

/**
 * Fetches all categories. This replaces your old `getAllTags`.
 */
export async function fetchCategories(): Promise<Category[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/categories?limit=100`,
      { next: { revalidate: 3600 } }, // Revalidate once per hour
    )
    if (!response.ok) throw new Error('Failed to fetch categories.')

    const data = await response.json()
    return data.docs || []
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

/**
 * Fetches a single post by its slug.
 * @param slug - The slug of the post to fetch.
 */
export async function fetchPostBySlug(slug: string): Promise<Post | null> {
  try {
    const response = await fetch(
      // We use depth=2 to populate authors and categories fully.
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/posts?where[slug][equals]=${slug}&limit=1&depth=2`,
      { next: { revalidate: 60 } },
    )
    if (!response.ok) throw new Error(`Failed to fetch post with slug ${slug}`)

    const data = await response.json()
    return data.docs[0] || null
  } catch (error) {
    console.error('Error fetching post by slug:', error)
    return null
  }
}

/**
 * Fetches related posts based on shared categories.
 * @param currentPostId - The ID of the current post, to exclude it from the results.
 * @param categoryIds - An array of category IDs to find related posts in.
 */
export async function fetchRelatedPosts(
  currentPostId: number,
  categoryIds: number[],
): Promise<Post[]> {
  if (!categoryIds || categoryIds.length === 0) return []

  try {
    const response = await fetch(
      // Find posts where categories has at least one of the IDs, AND the ID is not the current post's ID.
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/posts?where[and][0][categories][in]=${categoryIds.join(',')}&where[and][1][id][not_equals]=${currentPostId}&limit=3&depth=1`,
      { next: { revalidate: 3600 } }, // Cache for an hour
    )
    if (!response.ok) throw new Error('Failed to fetch related posts.')

    const data = await response.json()
    return data.docs || []
  } catch (error) {
    console.error('Error fetching related posts:', error)
    return []
  }
}
