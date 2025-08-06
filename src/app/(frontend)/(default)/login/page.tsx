// src/app/(frontend)/(cms)/layout.tsx

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
  const nextCookies = await cookies()
  const token = nextCookies.get('payload-token')?.value

  let user: User | null = null

  try {
    // 1. Fetch the currently logged-in user
    const userReq = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`, {
      headers: {
        Authorization: `JWT ${token}`,
      },
      // --- THE FIX ---
      // This tells Next.js to never cache the result of this fetch call.
      // It ensures we always get the real-time authentication status.
      cache: 'no-store',
    })

    if (userReq.ok) {
      user = await userReq.json()
    }
  } catch (error) {
    console.error('Error fetching user in CMS layout:', error)
  }

  // 2. Perform the security check
  // If no user is logged in, or if their role is not admin/coordinator, redirect to login
  if (!user || (user.role !== 'admin' && user.role !== 'coordinator')) {
    return redirect('/login')
  }

  // 3. If the check passes, render the requested page
  return <>{children}</>
}
