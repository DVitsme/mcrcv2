import React from 'react'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

import type { User } from '@/payload-types'

/**
 * This is a Server Component that acts as a security gatekeeper for the entire CMS.
 * It fetches the current user on the server and checks their role.
 * If the user is not an admin or coordinator, they are redirected to the login page.
 */
export default async function CmsLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const token = cookieStore.get('payload-token')?.value

  if (!token) {
    console.log('[LAYOUT] Did not find "payload-token" cookie. Redirecting to /login.')
    return redirect('/login')
  }
  console.log('[LAYOUT] Found "payload-token" cookie.')

  let user: User | null = null

  try {
    // 1. Fetch the currently logged-in user
    console.log('[LAYOUT] Fetching user from /api/users/me...')
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      // --- THE FIX ---
      // This tells Next.js to never cache the result of this fetch call.
      // It ensures we always get the real-time authentication status.
      cache: 'no-store',
    })

    console.log(`[LAYOUT] User request status: ${res.status}`)
    if (res.ok) {
      const data = await res.json()
      // Payload often wraps as { user: {...} }. Fall back to raw if not wrapped.
      user = (data?.user ?? data) as User
      console.log(`[LAYOUT] Successfully fetched user: ${user?.email}`)
    } else {
      console.log(`[LAYOUT] Failed to fetch user. Status: ${res.status}`)
    }
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
