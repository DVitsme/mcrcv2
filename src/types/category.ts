export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  parent?: string // Parent category ID
  createdAt: string
  updatedAt: string
}

export interface CategoryInput {
  name: string
  slug?: string
  description?: string
  parent?: string
}
