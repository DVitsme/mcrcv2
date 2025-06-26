import { Check } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

interface CheckListProps {
  items: string[]
  customIcon?: React.ReactNode
  className?: string
  showSeparator?: boolean
}

export const CheckList = ({
  items,
  customIcon,
  className = '',
  showSeparator = true,
}: CheckListProps) => {
  if (!items.length) return null

  return (
    <>
      {showSeparator && <Separator className="my-7" />}
      <ul className={`ml-4 space-y-4 text-left ${className}`}>
        {items.map((item: string, index: number) => (
          <li key={index} className="flex items-center gap-3">
            {customIcon || <Check className="size-5" />}
            <p className="text-muted-foreground">{item}</p>
          </li>
        ))}
      </ul>
    </>
  )
}
