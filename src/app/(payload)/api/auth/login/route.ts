import { getPayload } from 'payload'
import { NextRequest, NextResponse } from 'next/server'
import config from '@/payload.config'

export async function POST(request: NextRequest) {
  console.log('\n--- [API] /api/auth/login ---')
  const payload = await getPayload({ config })
  const body = await request.json()
  console.log(`[API] Received login attempt for: ${body.email}`)

  try {
    // payload.login() returns the user and the JWT token
    const { user, token } = await payload.login({
      collection: 'users',
      data: {
        email: body.email,
        password: body.password,
      },
    })

    // Block non-active users
    if (user.userStatus !== 'active') {
      return NextResponse.json(
        { message: 'Your account is not active. Please contact a coordinator.' },
        { status: 403 },
      )
    }

    console.log('[API] Payload login successful. User found:', user.email)

    // --- THE FIX ---
    // Manually create the response and set the cookie.
    const response = NextResponse.json({ user })

    response.cookies.set({
      name: 'payload-token',
      value: token || '',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    console.log('[API] Manually set "payload-token" cookie in the response.')
    return response
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.'
    console.error('[API] Payload login failed:', errorMessage)
    return NextResponse.json({ message: errorMessage }, { status: 401 })
  }
}
