export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'coordinator' | 'member'
  createdAt: string
  updatedAt: string
}

export interface UserInput {
  email: string
  name: string
  role: 'admin' | 'coordinator' | 'member'
  password?: string
}
