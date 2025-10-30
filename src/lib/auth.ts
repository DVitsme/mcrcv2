import { cookies } from 'next/headers'

export async function getFirebaseToken() {
  const cookieStore = await cookies()
  return cookieStore.get('firebase-token')?.value ?? ''
}

// How to use

// import { getFirebaseToken } from '@/lib/auth'
// const token = await getFirebaseToken()

export async function firebaseFetch(path: string, init: RequestInit = {}) {
  const cookieStore = await cookies()
  const token = cookieStore.get('firebase-token')?.value
  const headers = new Headers(init.headers)
  if (token) headers.set('Authorization', `Bearer ${token}`)
  return fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}${path}`, {
    ...init,
    headers,
    cache: 'no-store',
  })
}
