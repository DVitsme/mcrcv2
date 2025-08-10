import { cookies } from 'next/headers'

export async function getPayloadToken() {
  const cookieStore = await cookies()
  return cookieStore.get('payload-token')?.value ?? ''
}

// How to use

// import { getPayloadToken } from '@/lib/auth'
// const token = await getPayloadToken()
