'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { cn } from '@/utilities/ui'

type Section = { title: string; anchor: string }

export function PostSectionsNav({ sections }: { sections: Section[] }) {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    if (!sections?.length) return
    const ids = sections.map((s) => s.anchor)
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as Element[]
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.find((e) => e.isIntersecting)
        if (vis?.target?.id) setActiveId(vis.target.id)
      },
      { rootMargin: '0px 0px -30% 0px', threshold: 0.1 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [sections])

  if (!sections?.length) return null

  return (
    <nav className="flex flex-col gap-2 pl-2 pt-2">
      {sections.map((s, index) => (
        <Link
          key={index}
          href={`#${s.anchor}`}
          className={cn(
            'block text-sm font-medium leading-normal text-muted-foreground transition duration-300',
            activeId === s.anchor &&
              'lg:rounded-md lg:bg-muted lg:p-2 lg:font-bold lg:text-primary',
          )}
        >
          {s.title}
        </Link>
      ))}
    </nav>
  )
}
