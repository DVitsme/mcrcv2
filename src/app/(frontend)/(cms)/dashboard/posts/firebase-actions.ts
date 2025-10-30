'use server'

import { revalidatePath, revalidateTag } from 'next/cache'
import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDoc,
  serverTimestamp 
} from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db, storage } from '@/lib/firebase'
import { requireAuth } from '@/lib/custom-auth'
import type { Post, PostInput, PostSection } from '@/types'

/* -------------------------------------------------------------------------- */
/* Utils & Auth                                                               */
/* -------------------------------------------------------------------------- */

type FileDebug = { name?: string; type?: string; size?: number } | null
function fileDebug(file: File | null): FileDebug {
  if (!file) return null
  return { name: file.name, type: file.type, size: file.size }
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

/* -------------------------------------------------------------------------- */
/* Media upload                                                               */
/* -------------------------------------------------------------------------- */

type UploadedMedia = { id: string; url: string }

export async function uploadMedia(file: File, alt?: string): Promise<UploadedMedia> {
  const trimmedAlt = (alt ?? defaultAltFromFile(file)).toString().trim() || 'Uploaded image'

  console.log('[uploadMedia] INIT', { file: fileDebug(file), alt: trimmedAlt })

  try {
    // Upload to Firebase Storage
    const fileName = `${Date.now()}-${file.name}`
    const storageRef = ref(storage, `media/${fileName}`)
    const snapshot = await uploadBytes(storageRef, file)
    const downloadURL = await getDownloadURL(snapshot.ref)

    console.log('[uploadMedia] OK (Firebase):', { url: downloadURL })
    return { id: fileName, url: downloadURL }
  } catch (error) {
    console.error('[uploadMedia] FAILED:', error)
    throw new Error('There was a problem while uploading the file.')
  }
}

/* -------------------------------------------------------------------------- */
/* Post CRUD                                                                  */
/* -------------------------------------------------------------------------- */

export async function createPost(data: PostInput) {
  console.log('[createPost] START', { title: data?.title })
  
  try {
    await requireAuth() // Ensure user is authenticated
    
    const postData = {
      ...data,
      slug: data.slug || slugify(data.title),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }

    const docRef = await addDoc(collection(db, 'posts'), postData)
    console.log('[createPost] OK', { id: docRef.id })
    
    revalidatePath('/dashboard/posts')
    revalidateTag('posts')
    return { id: docRef.id }
  } catch (error) {
    console.error('[createPost] FAILED:', error)
    throw new Error(`Create failed: ${error}`)
  }
}

export async function updatePost(id: string, data: PostInput) {
  console.log('[updatePost] START', { id })
  
  try {
    await requireAuth() // Ensure user is authenticated
    
    const postRef = doc(db, 'posts', id)
    const updateData = {
      ...data,
      updatedAt: serverTimestamp(),
    }

    await updateDoc(postRef, updateData)
    console.log('[updatePost] OK')
    
    revalidatePath('/dashboard/posts')
    revalidateTag('posts')
    return { id }
  } catch (error) {
    console.error('[updatePost] FAILED:', error)
    throw new Error(`Update failed: ${error}`)
  }
}

export async function deletePost(id: string) {
  console.log('[deletePost] START', { id })
  
  if (!id) throw new Error('Missing post id')

  try {
    await requireAuth() // Ensure user is authenticated
    
    await deleteDoc(doc(db, 'posts', id))
    console.log('[deletePost] OK', { id })
    
    revalidatePath('/dashboard/posts')
    revalidateTag('posts')
  } catch (error) {
    console.error('[deletePost] FAILED:', error)
    throw new Error(`Failed to delete post ${id}: ${error}`)
  }
}

/* -------------------------------------------------------------------------- */
/* Form-based create / update                                                 */
/* -------------------------------------------------------------------------- */

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
  image?: string | null
  anchor: string
}

export async function createPostFromForm(fd: FormData) {
  console.log('[createPostFromForm] START')

  try {
    await requireAuth() // Ensure user is authenticated

    const raw = fd.get('data')
    if (!raw || typeof raw !== 'string') throw new Error('Missing form data payload')
    const data = JSON.parse(raw) as SectionsPayload & {
      title?: string
      excerpt?: string
      categoryIds?: Array<string>
    }
    console.log('[createPostFromForm] Parsed data keys:', Object.keys(data))

    // HERO IMAGE
    const hero = fd.get('heroImage') as File | null
    console.log('[createPostFromForm] Hero file present:', Boolean(hero))
    let heroUrl: string | null = null
    if (hero && typeof hero === 'object') {
      console.log('[createPostFromForm] Uploading hero (Firebase)…', fileDebug(hero))
      const uploaded = await uploadMedia(hero, data.title || hero.name)
      heroUrl = uploaded.url
    }

    // SECTION IMAGES
    const sectionsInput: TinySection[] = Array.isArray(data.sections) ? data.sections : []
    const sectionImageUrls: Array<string | null> = []

    for (let i = 0; i < 3; i++) {
      const f = fd.get(`sectionImage-${i}`) as File | null
      console.log(`[createPostFromForm] Section ${i + 1} file present:`, Boolean(f))
      if (f && typeof f === 'object') {
        const alt = sectionsInput[i]?.title || `Section ${i + 1} image`
        console.log(`[createPostFromForm] Uploading section ${i + 1} (Firebase)…`, fileDebug(f))
        const uploaded = await uploadMedia(f, alt)
        sectionImageUrls[i] = uploaded.url
      } else {
        sectionImageUrls[i] = null
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
        image: sectionImageUrls[i] ?? null,
        anchor: slugify(title),
      }
    })

    const postData: PostInput = {
      title: data.title || '',
      excerpt: data.excerpt,
      categories: data.categoryIds ?? [],
      contentHtml: combinedHTML || '',
      sections,
      heroImage: heroUrl,
      _status: 'published',
      slug: data.title ? slugify(data.title) : undefined,
    }

    console.log('[createPostFromForm] Creating post with data keys:', Object.keys(postData))

    const result = await createPost(postData)
    console.log('[createPostFromForm] OK')
    return result
  } catch (error) {
    console.error('[createPostFromForm] FAILED:', error)
    throw error
  }
}

export async function updatePostFromForm(id: string, fd: FormData) {
  console.log('[updatePostFromForm] START', { id })

  try {
    await requireAuth() // Ensure user is authenticated

    const raw = fd.get('data')
    if (!raw || typeof raw !== 'string') throw new Error('Missing form data payload')
    const data = JSON.parse(raw) as SectionsPayload & {
      title?: string
      excerpt?: string
      categoryIds?: Array<string>
    }
    console.log('[updatePostFromForm] Parsed data keys:', Object.keys(data))

    // Optional hero update
    const hero = fd.get('heroImage') as File | null
    let heroUrl: string | undefined
    console.log('[updatePostFromForm] Hero file present:', Boolean(hero))
    if (hero && typeof hero === 'object') {
      console.log('[updatePostFromForm] Uploading hero (Firebase)…', fileDebug(hero))
      const uploaded = await uploadMedia(hero, data.title || hero.name)
      heroUrl = uploaded.url
    }

    // Optional section images
    const sectionsInput: TinySection[] = Array.isArray(data.sections) ? data.sections : []
    const sectionImageUrls: Array<string | null> = []

    for (let i = 0; i < 3; i++) {
      const f = fd.get(`sectionImage-${i}`) as File | null
      console.log(`[updatePostFromForm] Section ${i + 1} file present:`, Boolean(f))
      if (f && typeof f === 'object') {
        const alt = sectionsInput[i]?.title || `Section ${i + 1} image`
        console.log(`[updatePostFromForm] Uploading section ${i + 1} (Firebase)…`, fileDebug(f))
        const uploaded = await uploadMedia(f, alt)
        sectionImageUrls[i] = uploaded.url
      } else {
        sectionImageUrls[i] = null
      }
    }

    const combinedHTML = buildCombinedHTMLFromSections(data)
    console.log('[updatePostFromForm] combinedHTML length:', combinedHTML.length)

    const sections: SectionOut[] = sectionsInput.map((s, i) => {
      const title = coerceTitle(s?.title, s?.content, i)
      return {
        title,
        contentHtml: s?.content ?? '',
        image: sectionImageUrls[i] ?? null,
        anchor: slugify(title),
      }
    })

    const updateData: Partial<PostInput> = {
      title: data.title,
      excerpt: data.excerpt,
      categories: data.categoryIds ?? [],
      sections,
      _status: 'published',
    }

    if (combinedHTML) updateData.contentHtml = combinedHTML
    if (typeof heroUrl !== 'undefined') updateData.heroImage = heroUrl

    console.log('[updatePostFromForm] Updating post with data keys:', Object.keys(updateData))

    const result = await updatePost(id, updateData as PostInput)
    console.log('[updatePostFromForm] OK')
    return result
  } catch (error) {
    console.error('[updatePostFromForm] FAILED:', error)
    throw error
  }
}
