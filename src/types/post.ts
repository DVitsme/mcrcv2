export interface Post {
  id: string
  title: string
  slug: string
  excerpt?: string
  contentHtml: string
  sections?: PostSection[]
  heroImage?: string
  metaImage?: string
  authors: string[] // User IDs
  categories: string[] // Category IDs
  _status: 'draft' | 'published'
  publishedAt?: string
  createdAt: string
  updatedAt: string
}

export interface PostSection {
  title: string
  contentHtml: string
  image?: string
  anchor: string
}

export interface PostInput {
  title: string
  slug?: string
  excerpt?: string
  contentHtml?: string
  sections?: PostSection[]
  heroImage?: string
  metaImage?: string
  authors: string[]
  categories: string[]
  _status: 'draft' | 'published'
  publishedAt?: string
}
