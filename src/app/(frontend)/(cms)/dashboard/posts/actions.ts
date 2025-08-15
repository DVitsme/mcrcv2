// src/app/(frontend)/(cms)/dashboard/posts/actions.ts
'use server'

import { cookies } from 'next/headers'
import { revalidatePath, revalidateTag } from 'next/cache'
import { getPayloadHMR } from '@payloadcms/next/utilities'

// IMPORTANT: your payload.config.ts default export
// (the path here matches your repo structure)
import { getPayload } from 'payload'
const payload = await getPayload({ config: (await import('@/payload.config')).default })

import type { File as PayloadUploadFile } from 'payload'

const API = process.env.NEXT_PUBLIC_SERVER_URL!

/* -------------------------------------------------------------------------- */
/* Utils & Auth                                                               */
/* -------------------------------------------------------------------------- */

function fileDebug(file: File | null) {
  if (!file) return null
  const f: any = file
  return { name: f?.name, type: f?.type, size: f?.size }
}

async function authHeaders() {
  const cookieStore = await cookies()
  const token = cookieStore.get('payload-token')?.value
  const ok = Boolean(token)
  console.log('[authHeaders] token present:', ok)
  if (!token) throw new Error('Missing auth token')
  return { Authorization: `Bearer ${token}` }
}

function defaultAltFromFile(file: File) {
  const base = ((file as any)?.name || 'image').replace(/\.[^.]+$/, '')
  const cleaned = base.replace(/[-_]+/g, ' ').trim()
  return cleaned || 'Uploaded image'
}

// auto-fill a title when missing (derive it from the section HTML or fall back to “Section N”)
function textFromHtml(html?: string): string {
  if (typeof html !== 'string') return ''
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function coerceTitle(title: string | undefined, html: string | undefined, idx: number): string {
  const t = (title ?? '').trim()
  if (t) return t
  const fromBody = textFromHtml(html).slice(0, 80)
  return fromBody || `Section ${idx + 1}`
}

async function readMaybeJSON(res: Response) {
  const text = await res.text().catch(() => '')
  try {
    return JSON.parse(text)
  } catch {
    return text || ''
  }
}

/* -------------------------------------------------------------------------- */
/* Media upload: REST first, then Local API fallback                          */
/* -------------------------------------------------------------------------- */
export async function uploadMedia(file: File, alt?: string) {
  const trimmedAlt = (alt ?? defaultAltFromFile(file)).toString().trim() || 'Uploaded image'

  console.log('[uploadMedia] INIT', { file: fileDebug(file), alt: trimmedAlt })

  const form = new FormData()
  // Let undici set multipart boundary automatically
  form.append('file', file, (file as any)?.name ?? 'upload')
  // Payload usually expects JSON under "data" …
  form.append('data', JSON.stringify({ alt: trimmedAlt }))

  const res = await fetch(`${API}/api/media`, {
    method: 'POST',
    headers: await authHeaders(),
    body: form,
    cache: 'no-store',
  })

  if (!res.ok) {
    const body = await readMaybeJSON(res)
    console.error('[uploadMedia] FAILED:', res.status, res.statusText, body)
    console.log('[uploadMedia] Falling back to local API…')
    return await uploadMediaLocal(file, trimmedAlt)
  }

  const json: any = await res.json().catch(() => ({}))
  console.log('[uploadMedia] OK (REST):', { id: json?.doc?.id, url: json?.doc?.url })
  return json?.doc ?? json
}

async function uploadMediaLocal(file: File, alt: string) {
  console.log('[uploadMediaLocal] INIT', {
    name: (file as any)?.name,
    type: (file as any)?.type,
    size: (file as any)?.size,
  })

  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  const name = (file as any)?.name ?? 'upload'
  const type = (file as any)?.type ?? 'application/octet-stream'

  // Build the exact shape Payload expects on the server
  const nodeFile: PayloadUploadFile = {
    data: buffer,
    name: name,
    mimetype: type, // NOTE: lower-case "mimetype"
    size: buffer.length,
  }

  const doc = await payload
    .create({
      collection: 'media',
      data: { alt },
      file: nodeFile,
    })
    .catch((err: any) => {
      console.error('[uploadMediaLocal] FAILED:', {
        type: err?.type,
        message: err?.message,
        status: err?.status,
        data: err?.data,
        stack: err?.stack,
      })
      throw new Error('There was a problem while uploading the file (local API).')
    })

  console.log('[uploadMediaLocal] OK (LOCAL):', { id: (doc as any)?.id, url: (doc as any)?.url })
  return doc
}

/* -------------------------------------------------------------------------- */
/* Public CRUD                                                                */
/* -------------------------------------------------------------------------- */

export type PostInput = {
  title: string
  slug?: string
  excerpt?: string
  content?: any
  categories?: (number | string)[]
  authors?: (number | string)[]
  _status?: 'draft' | 'published'
  publishedAt?: string | null
  heroImage?: number | string | null
  metaImage?: number | string | null
}

function mapInputToPayload(input: PostInput) {
  const {
    title,
    slug,
    excerpt,
    content,
    categories,
    authors,
    _status,
    publishedAt,
    heroImage,
    metaImage,
  } = input

  return {
    title,
    slug,
    excerpt,
    content,
    categories,
    authors,
    _status,
    publishedAt,
    heroImage,
    meta: { image: metaImage ?? null },
  }
}

export async function createPost(data: PostInput) {
  console.log('[createPost] START', { title: data?.title })
  const res = await fetch(`${API}/api/posts`, {
    method: 'POST',
    headers: { ...(await authHeaders()), 'Content-Type': 'application/json' },
    body: JSON.stringify(mapInputToPayload(data)),
    cache: 'no-store',
  })
  if (!res.ok) {
    const body = await readMaybeJSON(res)
    console.error('[createPost] FAILED:', res.status, res.statusText, body)
    throw new Error(`Create failed: ${res.status} ${res.statusText}`)
  }
  const json = await res.json().catch(() => ({}))
  console.log('[createPost] OK', { id: json?.id })
  revalidatePath('/dashboard/posts')
  revalidateTag('posts')
  return json
}

export async function updatePost(id: number | string, data: PostInput) {
  console.log('[updatePost] START', { id })
  const res = await fetch(`${API}/api/posts/${id}`, {
    method: 'PATCH',
    headers: { ...(await authHeaders()), 'Content-Type': 'application/json' },
    body: JSON.stringify(mapInputToPayload(data)),
    cache: 'no-store',
  })
  if (!res.ok) {
    const body = await readMaybeJSON(res)
    console.error('[updatePost] FAILED:', res.status, res.statusText, body)
    throw new Error(`Update failed: ${res.status} ${res.statusText}`)
  }
  const json = await res.json().catch(() => ({}))
  console.log('[updatePost] OK', { id: json?.id })
  revalidatePath('/dashboard/posts')
  revalidateTag('posts')
  return json
}

export async function deletePost(id: string) {
  console.log('[deletePost] START', { id })
  if (!id) throw new Error('Missing post id')

  const res = await fetch(`${API}/api/posts/${id}`, {
    method: 'DELETE',
    headers: await authHeaders(),
    cache: 'no-store',
  })
  if (!res.ok) {
    const body = await readMaybeJSON(res)
    console.error('[deletePost] FAILED:', res.status, res.statusText, body)
    throw new Error(`Failed to delete post ${id}: ${res.status} ${res.statusText}`)
  }
  console.log('[deletePost] OK', { id })
  revalidatePath('/dashboard/posts')
  revalidateTag('posts')
}

/* -------------------------------------------------------------------------- */
/* FormData-based create / update (dashboard flow)                            */
/* - Combines guided sections into `contentHtml`                              */
/* - Uploads hero + up to 3 section images                                    */
/* -------------------------------------------------------------------------- */

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 80)
}

function escapeHtml(s: string) {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function buildCombinedHTMLFromSections(data: any): string {
  const parts: string[] = []
  const pushSection = (sec?: { title?: string; content?: string }) => {
    if (!sec) return
    const t = (sec.title || '').trim()
    const c = (sec.content || '').trim()
    if (!t && !c) return
    if (t) parts.push(`<h2>${escapeHtml(t)}</h2>`)
    if (c) parts.push(c)
  }

  if (Array.isArray(data.sections) && data.sections.length > 0) {
    for (const s of data.sections) pushSection(s)
  } else {
    pushSection(data.section1)
    pushSection(data.section2)
    pushSection(data.section3)
  }

  if (data.conclusion) {
    parts.push(`<h2>Conclusion</h2>`)
    parts.push(String(data.conclusion))
  }

  return parts.join('\n\n').trim()
}

export async function createPostFromForm(fd: FormData) {
  console.log('[createPostFromForm] START')

  const headers = await authHeaders()

  const raw = fd.get('data')
  if (!raw || typeof raw !== 'string') throw new Error('Missing form data payload')
  const data = JSON.parse(raw)
  console.log('[createPostFromForm] Parsed data keys:', Object.keys(data))

  // HERO IMAGE
  const hero = fd.get('heroImage') as File | null
  console.log('[createPostFromForm] Hero file present:', Boolean(hero))
  let heroId: number | string | null = null
  if (hero && typeof hero === 'object') {
    console.log('[createPostFromForm] Uploading hero (REST)…', fileDebug(hero))
    const up = await uploadMedia(hero, data.title || (hero as any)?.name)
    heroId = (up as any)?.id ?? null
  }

  // SECTION IMAGES
  const sectionsInput: Array<{ title?: string; content?: string }> = Array.isArray(data.sections)
    ? data.sections
    : []
  const sectionImageDocs: Array<{ id: number | string } | null> = []

  for (let i = 0; i < 3; i++) {
    const f = fd.get(`sectionImage-${i}`) as File | null
    console.log(`[createPostFromForm] Section ${i + 1} file present:`, Boolean(f))
    if (f && typeof f === 'object') {
      const alt = sectionsInput[i]?.title || `Section ${i + 1} image`
      console.log(`[createPostFromForm] Uploading section ${i + 1} (REST)…`, fileDebug(f))
      const up = await uploadMedia(f, alt)
      sectionImageDocs[i] = up as any
    } else {
      sectionImageDocs[i] = null
    }
  }

  // COMBINED HTML
  const combinedHTML = buildCombinedHTMLFromSections(data)
  console.log('[createPostFromForm] combinedHTML length:', combinedHTML.length)

  const sections = sectionsInput.map((s, i) => {
    const title = coerceTitle(s?.title, s?.content, i)
    return {
      title,
      contentHtml: s?.content ?? '',
      image: sectionImageDocs[i]?.id,
      anchor: slugify(title),
    }
  })

  const body = {
    title: data.title,
    excerpt: data.excerpt,
    categories: data.categoryIds ?? [],
    contentHtml: combinedHTML || '',
    sections,
    heroImage: heroId ?? null,
    _status: 'published',
  }

  console.log('[createPostFromForm] POST /api/posts body keys:', Object.keys(body))

  const res = await fetch(`${API}/api/posts`, {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    cache: 'no-store',
  })

  if (!res.ok) {
    const bodyText = await readMaybeJSON(res)
    console.error('[createPostFromForm] FAILED:', res.status, res.statusText, bodyText)
    throw new Error(`Create failed: ${res.status} ${res.statusText}`)
  }

  const json = await res.json().catch(() => ({}))
  console.log('[createPostFromForm] OK', { id: json?.id })
  revalidatePath('/dashboard/posts')
  revalidateTag('posts')
  return json
}

export async function updatePostFromForm(id: string, fd: FormData) {
  console.log('[updatePostFromForm] START', { id })

  const headers = await authHeaders()

  const raw = fd.get('data')
  if (!raw || typeof raw !== 'string') throw new Error('Missing form data payload')
  const data = JSON.parse(raw)
  console.log('[updatePostFromForm] Parsed data keys:', Object.keys(data))

  // Optional hero update
  const hero = fd.get('heroImage') as File | null
  let heroId: number | string | undefined
  console.log('[updatePostFromForm] Hero file present:', Boolean(hero))
  if (hero && typeof hero === 'object') {
    console.log('[updatePostFromForm] Uploading hero (REST)…', fileDebug(hero))
    const up = await uploadMedia(hero, data.title || (hero as any)?.name)
    heroId = (up as any)?.id
  }

  // Optional section images
  const sectionsInput: Array<{ title?: string; content?: string }> = Array.isArray(data.sections)
    ? data.sections
    : []
  const sectionImageDocs: Array<{ id: number | string } | null> = []

  for (let i = 0; i < 3; i++) {
    const f = fd.get(`sectionImage-${i}`) as File | null
    console.log(`[updatePostFromForm] Section ${i + 1} file present:`, Boolean(f))
    if (f && typeof f === 'object') {
      const alt = sectionsInput[i]?.title || `Section ${i + 1} image`
      console.log(`[updatePostFromForm] Uploading section ${i + 1} (REST)…`, fileDebug(f))
      const up = await uploadMedia(f, alt)
      sectionImageDocs[i] = up as any
    } else {
      sectionImageDocs[i] = null
    }
  }

  const combinedHTML = buildCombinedHTMLFromSections(data)
  console.log('[updatePostFromForm] combinedHTML length:', combinedHTML.length)

  const sections = sectionsInput.map((s, i) => {
    const title = coerceTitle(s?.title, s?.content, i)
    return {
      title,
      contentHtml: s?.content ?? '',
      image: sectionImageDocs[i]?.id,
      anchor: slugify(title),
    }
  })

  const body: any = {
    title: data.title,
    excerpt: data.excerpt,
    categories: data.categoryIds ?? [],
    sections,
    _status: 'published',
  }

  if (combinedHTML) body.contentHtml = combinedHTML
  if (typeof heroId !== 'undefined') body.heroImage = heroId ?? null

  console.log('[updatePostFromForm] PATCH /api/posts body keys:', Object.keys(body))

  const res = await fetch(`${API}/api/posts/${id}`, {
    method: 'PATCH',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    cache: 'no-store',
  })

  if (!res.ok) {
    const bodyText = await readMaybeJSON(res)
    console.error('[updatePostFromForm] FAILED:', res.status, res.statusText, bodyText)
    throw new Error(`Update failed: ${res.status} ${res.statusText}`)
  }

  const json = await res.json().catch(() => ({}))
  console.log('[updatePostFromForm] OK', { id: json?.id })
  revalidatePath('/dashboard/posts')
  revalidateTag('posts')
  return json
}
