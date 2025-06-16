import type { Post, ArchiveBlock } from '@/payload-types'
import { cn } from '@/utilities/ui'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

interface RichTextProps {
  data: Post['content'] | ArchiveBlock['introContent'] | SerializedEditorState
  className?: string
  enableGutter?: boolean
  enableProse?: boolean
}

export default function RichText({ data, className, enableGutter, enableProse }: RichTextProps) {
  if (!data) return null

  return (
    <div
      className={cn('rich-text', className, {
        prose: enableProse,
      })}
      dangerouslySetInnerHTML={{ __html: data as unknown as string }}
    />
  )
}
