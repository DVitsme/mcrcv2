import { cookies } from 'next/headers'

export async function getPayloadToken() {
  const cookieStore = await cookies()
  return cookieStore.get('payload-token')?.value ?? ''
}

// How to use

// import { getPayloadToken } from '@/lib/auth'
// const token = await getPayloadToken()

export async function payloadFetch(path: string, init: RequestInit = {}) {
  const cookieStore = await cookies()
  const token = cookieStore.get('payload-token')?.value
  const headers = new Headers(init.headers)
  if (token) headers.set('Authorization', `Bearer ${token}`)
  return fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}${path}`, {
    ...init,
    headers,
    cache: 'no-store',
  })
}
