import React, { ComponentType, Fragment } from 'react'

// Import all possible block types from your payload-types.ts
import type {
  Page,
  Event, // Add the Event type
} from '@/payload-types'

// Import all block components
import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
// Import your new block components
import { TextBlock } from '@/blocks/TextBlock'
import { ImageBlockComponent } from '@/blocks/ImageBlock'

// A map of block slugs to their corresponding React components
const blockComponents: Record<string, ComponentType<any>> = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  textBlock: TextBlock as unknown as ComponentType<any>,
  imageBlock: ImageBlockComponent,
}

type Block = Page['layout'][number] | NonNullable<Event['content']>[number]

export const RenderBlocks: React.FC<{
  blocks: Block[] | null | undefined
}> = (props) => {
  const { blocks } = props
  console.log(blocks)
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const BlockComponent = blockComponents[blockType as keyof typeof blockComponents]

            if (BlockComponent) {
              return (
                <div key={index}>
                  <BlockComponent {...block} />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
