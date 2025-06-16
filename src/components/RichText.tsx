import type { Post } from '@/payload-types'

interface RichTextProps {
  content: Post['content']
}

export default function RichText({ content }: RichTextProps) {
  if (!content) return null

  return (
    <div className="rich-text" dangerouslySetInnerHTML={{ __html: content as unknown as string }} />
  )
}
