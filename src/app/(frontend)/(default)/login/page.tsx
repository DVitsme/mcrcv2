'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(1, { message: 'Please enter your password.' }),
})

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log('--- [CLIENT] Login Page ---')
    console.log('[CLIENT] onSubmit triggered with values:', values)
    setError(null)
    try {
      console.log('[CLIENT] Sending POST request to /api/auth/login...')
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(values),
      })
      console.log(`[CLIENT] Received response with status: ${response.status}`)

      if (!response.ok) {
        const errorData = await response.json()
        console.error('[CLIENT] Login request failed:', errorData)
        throw new Error(errorData.message || 'Invalid email or password.')
      }

      const { user } = await response.json()
      console.log('[CLIENT] Login request successful. User:', user)

      if (user && (user.role === 'admin' || user.role === 'coordinator')) {
        toast.success('Login Successful')
        console.log('[CLIENT] User is authorized. Redirecting to /dashboard...')
        router.push('/dashboard')
        router.refresh()
      } else {
        throw new Error('You do not have permission to access this area.')
      }
    } catch (err: any) {
      console.error('[CLIENT] Error in onSubmit:', err)
      toast.error(err.message)
      setError(err.message)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40">
      <div className="w-full max-w-md space-y-6 rounded-lg border bg-card p-8 shadow-sm">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Staff Login</h1>
          <p className="text-muted-foreground">Enter your credentials to access the CMS.</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && <div className="text-sm font-medium text-destructive">{error}</div>}
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Logging in...' : 'Log In'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
