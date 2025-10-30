import type { Block } from 'payload'

import React from 'react'
import Image from 'next/image'
import type { Media } from '@/types'

interface ImageBlockType {
  image: Media
  caption?: string
}

export const ImageBlock: Block = {
  slug: 'imageBlock',
  labels: {
    singular: 'Image Block',
    plural: 'Image Blocks',
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
    },
  ],
}

export const ImageBlockComponent: React.FC<ImageBlockType> = ({ image, caption }) => {
  const imageData = image as Media
  if (!imageData?.url) return null

  return (
    <figure className="my-8">
      <Image
        src={imageData.url}
        alt={imageData.alt || 'Event Image'}
        width={imageData.width || 1200}
        height={imageData.height || 675}
        className="rounded-lg"
      />
      {caption && <figcaption className="text-center text-sm mt-2">{caption}</figcaption>}
    </figure>
  )
}
