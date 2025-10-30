/**
 * This file serves as the central library for all Firebase API calls.
 * It contains functions for fetching data related to various collections
 * like Posts, Categories, and Events.
 */

import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  query, 
  where, 
  orderBy, 
  limit 
} from 'firebase/firestore'
import { db } from './firebase'
import type { Post, Category, Event } from '@/types'

// ====================================================================
//                          BLOG API CALLS
// ====================================================================

/**
 * Fetches published posts from Firebase. Can optionally filter by category.
 * @param categorySlug - The slug of the category to filter by.
 */
export async function fetchPosts(categorySlug?: string): Promise<Post[]> {
  try {
    let postsQuery = query(
      collection(db, 'posts'),
      where('_status', '==', 'published'),
      orderBy('publishedAt', 'desc')
    )

    if (categorySlug) {
      // First get the category by slug
      const categoriesQuery = query(
        collection(db, 'categories'),
        where('slug', '==', categorySlug)
      )
      const categorySnapshot = await getDocs(categoriesQuery)
      
      if (categorySnapshot.empty) {
        return []
      }
      
      const categoryId = categorySnapshot.docs[0].id
      postsQuery = query(
        collection(db, 'posts'),
        where('_status', '==', 'published'),
        where('categories', 'array-contains', categoryId),
        orderBy('publishedAt', 'desc')
      )
    }

    const snapshot = await getDocs(postsQuery)
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Post))
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
    const postsQuery = query(
      collection(db, 'posts'),
      where('_status', '==', 'published'),
      orderBy('publishedAt', 'desc'),
      limit(1)
    )
    
    const snapshot = await getDocs(postsQuery)
    if (snapshot.empty) return null
    
    return {
      id: snapshot.docs[0].id,
      ...snapshot.docs[0].data()
    } as Post
  } catch (error) {
    console.error('Error fetching featured post:', error)
    return null
  }
}

/**
 * Fetches all categories.
 */
export async function fetchCategories(): Promise<Category[]> {
  try {
    const categoriesQuery = query(
      collection(db, 'categories'),
      orderBy('name', 'asc')
    )
    
    const snapshot = await getDocs(categoriesQuery)
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Category))
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

/**
 * Fetches a single post by its slug.
 */
export async function fetchPostBySlug(slug: string): Promise<Post | null> {
  try {
    const postsQuery = query(
      collection(db, 'posts'),
      where('slug', '==', slug),
      where('_status', '==', 'published')
    )
    
    const snapshot = await getDocs(postsQuery)
    if (snapshot.empty) return null
    
    return {
      id: snapshot.docs[0].id,
      ...snapshot.docs[0].data()
    } as Post
  } catch (error) {
    console.error('Error fetching post by slug:', error)
    return null
  }
}

/**
 * Fetches related posts based on shared categories.
 */
export async function fetchRelatedPosts(
  currentPostId: string,
  categoryIds: string[]
): Promise<Post[]> {
  if (!categoryIds || categoryIds.length === 0) return []

  try {
    const postsQuery = query(
      collection(db, 'posts'),
      where('_status', '==', 'published'),
      where('categories', 'array-contains-any', categoryIds),
      where('__name__', '!=', currentPostId),
      limit(3)
    )
    
    const snapshot = await getDocs(postsQuery)
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Post))
  } catch (error) {
    console.error('Error fetching related posts:', error)
    return []
  }
}
