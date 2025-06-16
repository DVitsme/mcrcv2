import type { Post, ArchiveBlock } from '@/payload-types'
import { cn } from '@/utilities/ui'

interface RichTextProps {
  content: Post['content'] | ArchiveBlock['introContent']
  className?: string
  enableGutter?: boolean
}

export default function RichText({ content, className, enableGutter }: RichTextProps) {
  if (!content) return null

  return (
    <div
      className={cn('rich-text', className)}
      dangerouslySetInnerHTML={{ __html: content as unknown as string }}
    />
  )
}
