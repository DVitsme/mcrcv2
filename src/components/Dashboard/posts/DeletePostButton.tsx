'use client'

import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { useFormStatus } from 'react-dom'

type Props = {
  action: (formData: FormData) => Promise<void> // server action bound with the id
  title?: string
}

export default function DeletePostButton({ action, title = 'this post' }: Props) {
  const { pending } = useFormStatus()

  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!window.confirm(`Are you sure you want to delete “${title}”? This cannot be undone.`)) {
          e.preventDefault()
        }
      }}
    >
      <Button variant="destructive" size="sm" type="submit" disabled={pending} aria-disabled={pending}>
        <Trash2 className="mr-2 h-4 w-4" />
        {pending ? 'Deleting…' : 'Delete'}
      </Button>
    </form>
  )
}
