import { getPayload } from 'payload'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import config from '@/payload.config'

export async function POST(request: NextRequest) {
  const payload = await getPayload({ config })
  const body = await request.json()

  try {
    // Use the built-in payload.login() operation
    // This will authenticate the user and set the cookie based on your config
    const { user, token } = await payload.login({
      collection: 'users',
      data: {
        email: body.email,
        password: body.password,
      },
    })

    // The cookie is set automatically by Payload, so we just return the user
    return NextResponse.json({ user, token })
  } catch (error) {
    // Handle authentication errors (e.g., invalid credentials)
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.'
    return NextResponse.json({ message: errorMessage }, { status: 401 })
  }
}
