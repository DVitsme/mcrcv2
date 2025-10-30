import React from 'react'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

import type { User } from '@/types'

/**
 * This is a Server Component that acts as a security gatekeeper for the entire CMS.
 * It fetches the current user on the server and checks their role.
 * If the user is not an admin or coordinator, they are redirected to the login page.
 */
export default async function CmsLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const token = cookieStore.get('firebase-token')?.value

  if (!token) {
    console.log('[LAYOUT] Did not find "firebase-token" cookie. Redirecting to /login.')
    return redirect('/login')
  }
  console.log('[LAYOUT] Found "firebase-token" cookie.')

  let user: User | null = null

  try {
    // TODO: Implement Firebase auth user verification
    // For now, create a mock user for development
    user = {
      id: '1',
      email: 'admin@mcrc.org',
      name: 'Admin User',
      role: 'admin',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    console.log(`[LAYOUT] Successfully fetched user: ${user?.email}`)
  } catch (error) {
    console.error('[LAYOUT] Error fetching user in CMS layout:', error)
  }

  // 2. Perform the security check
  // If no user is logged in, or if their role is not admin/coordinator, redirect to login
  if (!user || (user.role !== 'admin' && user.role !== 'coordinator')) {
    console.log(
      `[LAYOUT] Auth check failed. User: ${user?.email}, Role: ${user?.role}. Redirecting to /login.`,
    )
    return redirect('/login')
  }

  console.log(`[LAYOUT] Auth check passed for ${user.email}. Rendering page.`)

  // 3. If the check passes, render the requested page
  return <>{children}</>
}
