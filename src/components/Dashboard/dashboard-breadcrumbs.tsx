'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

type Crumb = { href: string; label: string; isCurrent: boolean }

const STATIC_LABELS: Record<string, string> = {
  dashboard: 'Dashboard',
  posts: 'Posts',
  events: 'Events',
  new: 'New',
  edit: 'Edit',
  settings: 'Settings',
  tags: 'Tags',
  categories: 'Categories',
  trash: 'Trash',
}

function pretty(seg: string) {
  return seg.replace(/[-_]/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase())
}

function isDynamicPiece(seg: string) {
  return !STATIC_LABELS[seg] && seg.length > 2 && !/^\d{1,2}$/.test(seg)
}

// type guard so TS narrows correctly
function isKnownCollection(x: string | undefined): x is 'posts' | 'events' {
  return x === 'posts' || x === 'events'
}

const labelCache = new Map<string, string>()

async function fetchLabelFor(parent: 'posts' | 'events', idOrSlug: string) {
  const cacheKey = `${parent}:${idOrSlug}`
  if (labelCache.has(cacheKey)) return labelCache.get(cacheKey)!

  try {
    const byId = await fetch(`/api/${parent}/${encodeURIComponent(idOrSlug)}?depth=0`, {
      cache: 'no-store',
    })
    if (byId.ok) {
      const doc = await byId.json()
      const label = parent === 'posts' ? (doc?.title ?? null) : (doc?.name ?? null)
      if (label) labelCache.set(cacheKey, label)
      return label
    }

    const bySlug = await fetch(
      `/api/${parent}?where[slug][equals]=${encodeURIComponent(idOrSlug)}&limit=1&depth=0`,
      { cache: 'no-store' },
    )
    if (bySlug.ok) {
      const data = await bySlug.json()
      const doc = data?.docs?.[0]
      const label = parent === 'posts' ? (doc?.title ?? null) : (doc?.name ?? null)
      if (label) labelCache.set(cacheKey, label)
      return label
    }
  } catch {
    // ignore; we'll just fall back to pretty(seg)
  }
  return null
}

export default function DashboardBreadcrumbs() {
  const pathname = usePathname() || '/'
  const segments = useMemo(() => pathname.split('/').filter(Boolean), [pathname])
  const start = segments.indexOf('dashboard')

  const [dynamicLabels, setDynamicLabels] = useState<Record<string, string>>({})
  const loadingRef = useRef<Record<string, boolean>>({})

  useEffect(() => {
    if (start === -1) return

    for (let i = start + 1; i < segments.length; i++) {
      const parentSeg: string | undefined = segments[i - 1]
      const seg: string | undefined = segments[i]

      if (!seg) continue
      if (!isDynamicPiece(seg)) continue
      if (!isKnownCollection(parentSeg)) continue
      if (dynamicLabels[seg] || loadingRef.current[seg]) continue

      loadingRef.current[seg] = true
      fetchLabelFor(parentSeg, seg)
        .then((label) => {
          if (label) {
            setDynamicLabels((m) => ({ ...m, [seg]: label }))
          }
        })
        .finally(() => {
          loadingRef.current[seg] = false
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [segments.join('/'), start])

  const crumbs: Crumb[] = useMemo(() => {
    if (start === -1) return []

    const out: Crumb[] = []
    const built: string[] = []

    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i]
      if (i < start || !seg) continue // ignore anything before "dashboard" or undefined segments

      built.push(seg)
      const href: string = '/' + built.join('/')

      const label: string = STATIC_LABELS[seg] ?? dynamicLabels[seg] ?? pretty(seg)

      out.push({
        href,
        label,
        isCurrent: i === segments.length - 1,
      })
    }

    // force first crumb to be /dashboard with a nice label
    if (out.length > 0 && out[0]) {
      out[0] = { ...out[0], href: '/dashboard', label: 'Dashboard', isCurrent: out[0].isCurrent }
    }

    return out
  }, [segments, start, dynamicLabels])

  if (!crumbs.length) return null

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {crumbs.map((c, idx) => {
          const isLast = idx === crumbs.length - 1

          // figure out dynamic label state (unchanged)
          const seg = segments[start + idx]
          const parentSeg = segments[start + idx - 1]
          const isPendingDynamic =
            !!seg && isDynamicPiece(seg) && isKnownCollection(parentSeg) && !dynamicLabels[seg]

          const labelNode = isPendingDynamic ? (
            <span className="opacity-60 italic">Loading…</span>
          ) : (
            c.label
          )

          return (
            <Fragment key={c.href}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{labelNode}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={c.href}>{labelNode}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
