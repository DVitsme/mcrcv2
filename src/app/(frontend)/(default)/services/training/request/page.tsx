'use client'

import { Check } from 'lucide-react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import TwoColorTitle from '@/components/ui/two-color-title'

const TrainingRequest = () => {
  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      companySize: '',
      message: '',
      referrer: '',
    },
  })

  const onSubmit = (data: {
    firstName: string
    lastName: string
    email: string
    companySize: string
    message: string
    referrer: string
  }) => {
    console.log(data)
    // Add your form submission logic here
  }

  return (
    <section className="bg-muted/50 py-32">
      <div className="container">
        <span className="text-muted-foreground text-xs">GET STARTED /</span>
        <div className="mt-8 grid grid-cols-1 gap-8 md:gap-10 lg:grid-cols-2 lg:grid-rows-[min-content_1fr]">
          <TwoColorTitle title="Seeking Mediation?" titleGray="Start Here" />
          <div className="order-2 md:order-none md:row-span-2">
            <div className="bg-background border-border rounded-lg border p-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Alex" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Smith" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="alex.smith@example.com" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="companySize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Contact Method</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Email or Phone" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="5k-15k">Email</SelectItem>
                              <SelectItem value="15k-30k">Phone</SelectItem>
                              <SelectItem value="30k-50k">Either is fine</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem className="sm:col-span-2">
                        <FormLabel>Brief Description</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="What brings you to seek mediation right now?"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="referrer"
                    render={({ field }) => (
                      <FormItem className="sm:col-span-2">
                        <FormLabel>How did you find us?</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Google / Referral" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="sm:col-span-2">
                    Submit
                  </Button>
                  <p className="text-muted-foreground text-xs sm:col-span-2">
                    You acknowledge that you've reviewed and agreed to our{' '}
                    <a href="#" className="text-primary hover:underline">
                      Privacy Policy
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-primary hover:underline">
                      Terms of Service
                    </a>
                  </p>
                </form>
              </Form>
            </div>
          </div>
          <div className="order-3 my-6 md:order-none">
            <p className="mb-16 md:mb-8">
              This form is a space to share whatever feels important for us to know. At the end, you
              will have the chance to choose a time to connect and talk through what support or next
              steps might feel right for you.
            </p>

            <ul className="space-y-2 font-medium">
              <li className="flex items-center gap-2">
                <span className="bg-background flex size-6 shrink-0 items-center justify-center rounded-full">
                  <Check className="size-4" />
                </span>
                Everything you share here will be held in confidence.
              </li>
              <li className="flex items-center gap-2">
                <span className="bg-background flex size-6 shrink-0 items-center justify-center rounded-full">
                  <Check className="size-4" />
                </span>
                Sechdule your own call
              </li>
              <li className="flex items-center gap-2">
                <span className="bg-background flex size-6 shrink-0 items-center justify-center rounded-full">
                  <Check className="size-4" />
                </span>
                We will respond within 72 hours
              </li>
            </ul>
            <p className="my-6 font-bold">Serving Howard County for 26 years!</p>
          </div>
        </div>
        <div className="mt-16 grid gap-8 md:gap-12 lg:w-1/2 lg:grid-cols-2">
          <div>
            <h3 className="mb-1.5 font-bold">FAQ</h3>
            <p className="text-muted-foreground text-sm">
              Browse our collection of{' '}
              <Link
                href="/services/mediation#faq"
                className="text-primary underline hover:underline"
              >
                Frequently Asked Questions
              </Link>{' '}
              about our process and project delivery.
            </p>
          </div>
          <div>
            <h3 className="mb-1.5 font-bold">Resources</h3>
            <p className="text-muted-foreground text-sm">
              Access our library and connect with designers in our{' '}
              <Link href="/resources" className="text-primary underline hover:underline">
                resource center
              </Link>{' '}
              filled with whitepapers and tutorials.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TrainingRequest
