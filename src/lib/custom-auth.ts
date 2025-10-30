import { cookies } from 'next/headers'
import { auth } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'
import type { User } from '@/types'

export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('firebase-token')?.value
    
    if (!token) return null

    // Verify the token with Firebase Admin
    // This would need to be implemented with Firebase Admin SDK
    // For now, return null if no token
    return null
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

export async function requireAuth(): Promise<User> {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error('Authentication required')
  }
  return user
}

export async function requireRole(requiredRole: 'admin' | 'coordinator'): Promise<User> {
  const user = await requireAuth()
  if (user.role !== requiredRole && user.role !== 'admin') {
    throw new Error(`Role ${requiredRole} required`)
  }
  return user
}
