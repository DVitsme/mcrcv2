// src/blocks/Banner/Component.tsx
import React from 'react'
import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'

// Keep this local so we don't depend on `@/payload-types`
type BannerStyle = 'info' | 'error' | 'success' | 'warning' | null | undefined

export type BannerBlockProps = {
  content?: any // TipTap / Lexical editor state
  style?: BannerStyle
}

type Props = {
  className?: string
} & BannerBlockProps

export const BannerBlock: React.FC<Props> = ({ className, content, style }) => {
  return (
    <div className={cn('mx-auto my-8 w-full', className)}>
      <div
        className={cn('border py-3 px-6 flex items-center rounded', {
          'border-border bg-card': style === 'info' || !style,
          'border-error bg-error/30': style === 'error',
          'border-success bg-success/30': style === 'success',
          'border-warning bg-warning/30': style === 'warning',
        })}
      >
        <RichText data={content} enableGutter={false} enableProse={false} />
      </div>
    </div>
  )
}

export default BannerBlock
