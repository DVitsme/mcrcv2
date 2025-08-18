'use server'

import { cookies } from 'next/headers'
import { revalidatePath, revalidateTag } from 'next/cache'

import { getPayload } from 'payload'
const payload = await getPayload({ config: (await import('@/payload.config')).default })

import type { File as PayloadUploadFile } from 'payload'

const API = process.env.NEXT_PUBLIC_SERVER_URL!

/* -------------------------------------------------------------------------- */
/* Utils & Auth                                                               */
/* -------------------------------------------------------------------------- */

type FileDebug = { name?: string; type?: string; size?: number } | null
function fileDebug(file: File | null): FileDebug {
  if (!file) return null
  return { name: file.name, type: file.type, size: file.size }
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
  const base = (file.name || 'image').replace(/\.[^.]+$/, '')
  const cleaned = base.replace(/[-_]+/g, ' ').trim()
  return cleaned || 'Uploaded image'
}

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

async function readMaybeJSON(res: Response): Promise<unknown> {
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

type UploadedMedia = { id: number | string; url?: string }

export async function uploadMedia(file: File, alt?: string): Promise<UploadedMedia> {
  const trimmedAlt = (alt ?? defaultAltFromFile(file)).toString().trim() || 'Uploaded image'

  console.log('[uploadMedia] INIT', { file: fileDebug(file), alt: trimmedAlt })

  const form = new FormData()
  form.append('file', file, file.name || 'upload')
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

  const json = (await res.json()) as { doc?: UploadedMedia } | UploadedMedia
  const doc: UploadedMedia = 'doc' in json && json.doc ? json.doc : (json as UploadedMedia)
  console.log('[uploadMedia] OK (REST):', { id: doc?.id, url: doc?.url })
  return doc
}

async function uploadMediaLocal(file: File, alt: string): Promise<UploadedMedia> {
  console.log('[uploadMediaLocal] INIT', { name: file.name, type: file.type, size: file.size })

  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  const nodeFile: PayloadUploadFile = {
    data: buffer,
    name: file.name || 'upload',
    mimetype: file.type || 'application/octet-stream',
    size: buffer.length,
  }

  try {
    const doc = (await payload.create({
      collection: 'media',
      data: { alt },
      file: nodeFile,
    })) as unknown as UploadedMedia

    console.log('[uploadMediaLocal] OK (LOCAL):', { id: doc?.id, url: doc?.url })
    return doc
  } catch (err: unknown) {
    const msg =
      typeof err === 'object' && err && 'message' in err
        ? String((err as { message: unknown }).message)
        : err
    console.error('[uploadMediaLocal] FAILED:', msg)
    throw new Error('There was a problem while uploading the file (local API).')
  }
}

/* -------------------------------------------------------------------------- */
/* Public CRUD                                                                */
/* -------------------------------------------------------------------------- */

export type PostInput = {
  title: string
  slug?: string
  excerpt?: string
  content?: unknown
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
  const json = (await res.json().catch(() => ({}))) as unknown
  console.log('[createPost] OK')
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
  const json = (await res.json().catch(() => ({}))) as unknown
  console.log('[updatePost] OK')
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

type TinySection = { title?: string; content?: string }
type SectionsPayload = {
  sections?: TinySection[]
  section1?: TinySection
  section2?: TinySection
  section3?: TinySection
  conclusion?: string
}

function buildCombinedHTMLFromSections(data: SectionsPayload): string {
  const parts: string[] = []
  const pushSection = (sec?: TinySection) => {
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

type SectionOut = {
  title: string
  contentHtml: string
  image?: number | string | null
  anchor: string
}

export async function createPostFromForm(fd: FormData) {
  console.log('[createPostFromForm] START')

  const headers = await authHeaders()

  const raw = fd.get('data')
  if (!raw || typeof raw !== 'string') throw new Error('Missing form data payload')
  const data = JSON.parse(raw) as SectionsPayload & {
    title?: string
    excerpt?: string
    categoryIds?: Array<number | string>
  }
  console.log('[createPostFromForm] Parsed data keys:', Object.keys(data))

  // HERO IMAGE
  const hero = fd.get('heroImage') as File | null
  console.log('[createPostFromForm] Hero file present:', Boolean(hero))
  let heroId: number | string | null = null
  if (hero && typeof hero === 'object') {
    console.log('[createPostFromForm] Uploading hero (REST)…', fileDebug(hero))
    const up = await uploadMedia(hero, data.title || hero.name)
    heroId = up.id ?? null
  }

  // SECTION IMAGES
  const sectionsInput: TinySection[] = Array.isArray(data.sections) ? data.sections : []
  const sectionImageDocs: Array<UploadedMedia | null> = []

  for (let i = 0; i < 3; i++) {
    const f = fd.get(`sectionImage-${i}`) as File | null
    console.log(`[createPostFromForm] Section ${i + 1} file present:`, Boolean(f))
    if (f && typeof f === 'object') {
      const alt = sectionsInput[i]?.title || `Section ${i + 1} image`
      console.log(`[createPostFromForm] Uploading section ${i + 1} (REST)…`, fileDebug(f))
      const up = await uploadMedia(f, alt)
      sectionImageDocs[i] = up
    } else {
      sectionImageDocs[i] = null
    }
  }

  // COMBINED HTML
  const combinedHTML = buildCombinedHTMLFromSections(data)
  console.log('[createPostFromForm] combinedHTML length:', combinedHTML.length)

  const sections: SectionOut[] = sectionsInput.map((s, i) => {
    const title = coerceTitle(s?.title, s?.content, i)
    return {
      title,
      contentHtml: s?.content ?? '',
      image: sectionImageDocs[i]?.id ?? null,
      anchor: slugify(title),
    }
  })

  const body: {
    title?: string
    excerpt?: string
    categories: Array<number | string>
    contentHtml: string
    sections: SectionOut[]
    heroImage: number | string | null
    _status: 'published'
  } = {
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

  const json = (await res.json().catch(() => ({}))) as unknown
  console.log('[createPostFromForm] OK')
  revalidatePath('/dashboard/posts')
  revalidateTag('posts')
  return json
}

export async function updatePostFromForm(id: string, fd: FormData) {
  console.log('[updatePostFromForm] START', { id })

  const headers = await authHeaders()

  const raw = fd.get('data')
  if (!raw || typeof raw !== 'string') throw new Error('Missing form data payload')
  const data = JSON.parse(raw) as SectionsPayload & {
    title?: string
    excerpt?: string
    categoryIds?: Array<number | string>
  }
  console.log('[updatePostFromForm] Parsed data keys:', Object.keys(data))

  // Optional hero update
  const hero = fd.get('heroImage') as File | null
  let heroId: number | string | undefined
  console.log('[updatePostFromForm] Hero file present:', Boolean(hero))
  if (hero && typeof hero === 'object') {
    console.log('[updatePostFromForm] Uploading hero (REST)…', fileDebug(hero))
    const up = await uploadMedia(hero, data.title || hero.name)
    heroId = up.id
  }

  // Optional section images
  const sectionsInput: TinySection[] = Array.isArray(data.sections) ? data.sections : []
  const sectionImageDocs: Array<UploadedMedia | null> = []

  for (let i = 0; i < 3; i++) {
    const f = fd.get(`sectionImage-${i}`) as File | null
    console.log(`[updatePostFromForm] Section ${i + 1} file present:`, Boolean(f))
    if (f && typeof f === 'object') {
      const alt = sectionsInput[i]?.title || `Section ${i + 1} image`
      console.log(`[updatePostFromForm] Uploading section ${i + 1} (REST)…`, fileDebug(f))
      const up = await uploadMedia(f, alt)
      sectionImageDocs[i] = up
    } else {
      sectionImageDocs[i] = null
    }
  }

  const combinedHTML = buildCombinedHTMLFromSections(data)
  console.log('[updatePostFromForm] combinedHTML length:', combinedHTML.length)

  const sections: SectionOut[] = sectionsInput.map((s, i) => {
    const title = coerceTitle(s?.title, s?.content, i)
    return {
      title,
      contentHtml: s?.content ?? '',
      image: sectionImageDocs[i]?.id ?? null,
      anchor: slugify(title),
    }
  })

  const body: {
    title?: string
    excerpt?: string
    categories: Array<number | string>
    sections: SectionOut[]
    _status: 'published'
    contentHtml?: string
    heroImage?: number | string | null
  } = {
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

  const json = (await res.json().catch(() => ({}))) as unknown
  console.log('[updatePostFromForm] OK')
  revalidatePath('/dashboard/posts')
  revalidateTag('posts')
  return json
}
