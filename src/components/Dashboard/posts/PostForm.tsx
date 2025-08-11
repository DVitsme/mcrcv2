'use client'

import { useTransition, useState } from 'react'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  createPost,
  updatePost,
  deletePost,
  uploadMedia,
  type PostInput,
} from '@/app/(frontend)/(cms)/dashboard/posts/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'

const Schema = z.object({
  title: z.string().min(1),
  slug: z.string().optional(),
  excerpt: z.string().optional(),
  content: z.any().optional(), // swap for your RTE value
  categories: z.array(z.union([z.string(), z.number()])).optional(),
  _status: z.enum(['draft', 'published']).default('draft'),
})

export default function PostForm({
  mode,
  post,
  categories,
}: {
  mode: 'create' | 'edit'
  post?: any
  categories: any[]
}) {
  const router = useRouter()
  const [pending, start] = useTransition()
  const [heroId, setHeroId] = useState<number | string | null>(post?.heroImage ?? null)

  const form = useForm<z.infer<typeof Schema>>({
    resolver: zodResolver(Schema),
    defaultValues: {
      title: post?.title ?? '',
      slug: post?.slug ?? '',
      excerpt: post?.excerpt ?? '',
      content: post?.content ?? null,
      categories: Array.isArray(post?.categories) ? post.categories.map((c: any) => c.id) : [],
      _status: post?._status ?? 'draft',
    },
  })

  async function onSubmit(values: z.infer<typeof Schema>) {
    const payload: PostInput = {
      ...values,
      heroImage: heroId ?? null,
    }
    start(async () => {
      if (mode === 'create') {
        await createPost(payload)
      } else {
        await updatePost(post.id, payload)
      }
      router.push('/dashboard/posts')
      router.refresh()
    })
  }

  async function onUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const media = await uploadMedia(file)
    setHeroId(media.id)
  }

  return (
    <form className="p-4 space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="grid gap-2">
        <Label>Title</Label>
        <Input {...form.register('title')} />
      </div>

      <div className="grid gap-2">
        <Label>Slug</Label>
        <Input {...form.register('slug')} />
      </div>

      <div className="grid gap-2">
        <Label>Excerpt</Label>
        <Textarea rows={3} {...form.register('excerpt')} />
      </div>

      {/* Replace with your Lexical editor; keep value in form.setValue('content', ...) */}
      <div className="grid gap-2">
        <Label>Content (JSON)</Label>
        <Textarea
          rows={6}
          {...form.register('content' as any)}
          placeholder="Paste JSON or wire RTE"
        />
      </div>

      <div className="grid gap-2">
        <Label>Categories</Label>
        <div className="flex flex-wrap gap-3">
          {categories.map((c) => {
            const checked = form.watch('categories')?.includes(c.id)
            return (
              <label
                key={c.id}
                className="flex items-center gap-2 rounded-full bg-muted px-3 py-1.5"
              >
                <span>{c.title ?? c.slug}</span>
                <Checkbox
                  checked={!!checked}
                  onCheckedChange={(ck) => {
                    const curr = new Set(form.getValues('categories') ?? [])
                    if (ck) curr.add(c.id)
                    else curr.delete(c.id)
                    form.setValue('categories', Array.from(curr))
                  }}
                />
              </label>
            )
          })}
        </div>
      </div>

      <div className="grid gap-2">
        <Label>Hero image</Label>
        <Input type="file" accept="image/*" onChange={onUpload} />
        {heroId ? (
          <div className="text-sm text-muted-foreground">Uploaded media id: {String(heroId)}</div>
        ) : null}
      </div>

      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2">
          <Checkbox
            checked={form.watch('_status') === 'published'}
            onCheckedChange={(ck) => form.setValue('_status', ck ? 'published' : 'draft')}
          />
          <span>Published</span>
        </label>

        {mode === 'edit' && (
          <Button
            type="button"
            variant="destructive"
            onClick={() =>
              start(async () => {
                await deletePost(post.id)
                router.push('/dashboard/posts')
                router.refresh()
              })
            }
          >
            Delete
          </Button>
        )}

        <Button type="submit" disabled={pending}>
          {pending ? 'Saving…' : 'Save'}
        </Button>
      </div>
    </form>
  )
}
