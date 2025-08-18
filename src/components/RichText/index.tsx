// src/components/RichText/index.tsx

import { MediaBlock } from '@/blocks/MediaBlock/Component'
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
  type DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'

import { CodeBlock, type CodeBlockProps } from '@/blocks/Code/Component'
import { BannerBlock } from '@/blocks/Banner/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { cn } from '@/utilities/ui'
import type { HTMLAttributes } from 'react'

// Keep CodeBlockProps strongly typed; loosen other block field types to `any`
// to avoid depending on names from `@/payload-types`.
type NodeTypes = DefaultNodeTypes | SerializedBlockNode<CodeBlockProps | any>

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object' || !value) return '#'
  const slug = (value as any).slug

  switch (relationTo) {
    case 'posts':
      return `/blog/${slug}`
    case 'events':
      return `/events/${slug}`
    case 'pages':
    default:
      return `/${slug}`
  }
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  blocks: {
    banner: ({ node }) => <BannerBlock className="col-start-2 mb-4" {...node.fields} />,
    mediaBlock: ({ node }) => (
      <MediaBlock
        className="col-start-1 col-span-3"
        imgClassName="m-0"
        {...node.fields}
        captionClassName="mx-auto max-w-[48rem]"
        enableGutter={false}
        disableInnerContainer={true}
      />
    ),
    code: ({ node }) => <CodeBlock className="col-start-2" {...node.fields} />,
    cta: ({ node }) => <CallToActionBlock {...node.fields} />,
  },
})

type Props = {
  /** Allow null/undefined because Payload may store empty content */
  data?: DefaultTypedEditorState | null
  enableGutter?: boolean
  enableProse?: boolean
} & HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const { data, className, enableProse = true, enableGutter = true, ...rest } = props

  if (!data) return null

  return (
    <ConvertRichText
      data={data}
      converters={jsxConverters}
      className={cn(
        'payload-richtext',
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto prose md:prose-md dark:prose-invert': enableProse,
        },
        className,
      )}
      {...rest}
    />
  )
}
