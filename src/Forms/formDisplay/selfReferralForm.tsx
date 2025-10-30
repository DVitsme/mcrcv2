'use client'

import * as React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { format } from 'date-fns'
import { CalendarIcon, Check, ChevronsUpDown } from 'lucide-react'

import { useFirestoreFormSubmit } from '@/hooks/useFirestoreFormSubmit'
import {
  mediationFormSchema,
  MediationFormValues,
} from '../schema/request-mediation-self-referral-form'

// --- shadcn/ui ---
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

// --- Data ---
const prefixes = ['Mr', 'Mrs', 'Ms/Miss', 'Dr', 'Rev', 'Other']
const yesNoOptions = ['Yes', 'No']
const contactMethods = ['Email', 'Phone', 'Either is fine']
const referralSources = [
  'Website',
  'Community event or outreach',
  'Friend or family / Word of mouth',
  'Referred by Howard County Court',
  'Internet search (e.g., Google, Bing)',
  'Referred by an organization or agency',
  'I have used your services before',
  'Social Media (e.g. Facebook or Instagram)',
  'Other',
]

// STEP DEFINITIONS
const STEP_TITLES = [
  'Section 1: Contact Information',
  'Section 2: Conflict Overview',
  'Section 3: Other Participants',
  'Section 4: Scheduling & Final Details',
] as const

// Which fields belong to each step (for step-scoped validation)
const STEP_FIELDS: Array<(keyof MediationFormValues)[]> = [
  [
    'prefix',
    'firstName',
    'lastName',
    'phone',
    'email',
    'preferredContactMethod',
    'allowVoicemail',
    'allowText',
    'streetAddress',
    'city',
    'state',
    'zipCode',
    'referralSource',
  ],
  ['conflictOverview', 'isCourtOrdered'],
  [
    'contactOneFirstName',
    'contactOneLastName',
    'contactOnePhone',
    'contactOneEmail',
    // optional: contactTwo*
    'contactTwoFirstName',
    'contactTwoLastName',
    'contactTwoPhone',
    'contactTwoEmail',
  ],
  ['deadline', 'accessibilityNeeds', 'additionalInfo'],
]

export function MediationSelfReferralForm() {
  const TOTAL_STEPS = STEP_TITLES.length
  const [currentStep, setCurrentStep] = React.useState(0)

  const { isSubmitting, error, success, submitData } = useFirestoreFormSubmit(
    'forms/mediationSelfReferral/submissions',
  )

  const form = useForm<MediationFormValues>({
    resolver: zodResolver(mediationFormSchema),
    defaultValues: {
      // Section 1
      prefix: '',
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      preferredContactMethod: undefined,
      allowVoicemail: undefined,
      allowText: undefined,
      streetAddress: '',
      city: '',
      state: '',
      zipCode: '',
      referralSource: '',

      // Section 2
      conflictOverview: '',
      isCourtOrdered: undefined,

      // Section 3
      contactOneFirstName: '',
      contactOneLastName: '',
      contactOnePhone: '',
      contactOneEmail: '',
      contactTwoFirstName: '',
      contactTwoLastName: '',
      contactTwoPhone: '',
      contactTwoEmail: '',

      // Section 4
      deadline: undefined,
      accessibilityNeeds: 'None',
      additionalInfo: 'None',
    },
    mode: 'onTouched',
  })

  const goBack = () => setCurrentStep((s) => Math.max(0, s - 1))

  const goNext = async () => {
    const fields = STEP_FIELDS[currentStep]
    const isStepValid = await form.trigger(fields as any, { shouldFocus: true })
    if (isStepValid) setCurrentStep((s) => Math.min(TOTAL_STEPS - 1, s + 1))
  }

  async function onSubmit(data: MediationFormValues) {
    // Optional: final guard to ensure last step is valid
    const okay = await form.trigger(STEP_FIELDS[currentStep] as any, { shouldFocus: true })
    if (!okay) return

    await submitData(data)

    // Allow the success UI to render, then reset
    setTimeout(() => {
      if (form.formState.isSubmitSuccessful && !error) {
        setCurrentStep(0)
        form.reset()
      }
    }, 0)
  }

  const progressPct = ((currentStep + 1) / TOTAL_STEPS) * 100

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Step header + progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {TOTAL_STEPS}
            </p>
            <p className="text-sm font-medium">{STEP_TITLES[currentStep]}</p>
          </div>
          <Progress value={progressPct} className="h-2" />
        </div>

        {/* STEP 1 */}
        {currentStep === 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Section 1: Contact Information</CardTitle>
              <CardDescription>Please provide your contact details.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="prefix"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prefix *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a prefix" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {prefixes.map((p) => (
                          <SelectItem key={p} value={p}>
                            {p}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div />
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Jane" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number *</FormLabel>
                    <FormControl>
                      <Input placeholder="(123) 456-7890" {...field} />
                    </FormControl>
                    <FormDescription>
                      We will generally follow up by email unless phone is preferred.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address *</FormLabel>
                    <FormControl>
                      <Input placeholder="jane.doe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="preferredContactMethod"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Preferred Contact Method *</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        {contactMethods.map((method) => (
                          <FormItem key={method} className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value={method} />
                            </FormControl>
                            <FormLabel className="font-normal">{method}</FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div />
              <FormField
                control={form.control}
                name="allowVoicemail"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Can we leave a voicemail? *</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex space-x-4"
                      >
                        {yesNoOptions.map((option) => (
                          <FormItem key={option} className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value={option} />
                            </FormControl>
                            <FormLabel className="font-normal">{option}</FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="allowText"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Can we text you? *</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex space-x-4"
                      >
                        {yesNoOptions.map((option) => (
                          <FormItem key={option} className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value={option} />
                            </FormControl>
                            <FormLabel className="font-normal">{option}</FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="streetAddress"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Street Address *</FormLabel>
                    <FormControl>
                      <Input placeholder="1234 Main St" {...field} />
                    </FormControl>
                    <FormDescription>
                      Our mediation process is free for people who live or work in Howard County.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City *</FormLabel>
                    <FormControl>
                      <Input placeholder="Columbia" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State *</FormLabel>
                    <FormControl>
                      <Input placeholder="MD" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zip Code *</FormLabel>
                    <FormControl>
                      <Input placeholder="21044" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="referralSource"
                render={({ field }) => (
                  <FormItem className="flex flex-col md:col-span-2">
                    <FormLabel>How did you hear about us? *</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              'justify-between',
                              !field.value && 'text-muted-foreground',
                            )}
                          >
                            {field.value
                              ? referralSources.find((source) => source === field.value)
                              : 'Select a source'}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0">
                        <Command>
                          <CommandInput placeholder="Search source..." />
                          <CommandEmpty>No source found.</CommandEmpty>
                          <CommandGroup>
                            <CommandList>
                              {referralSources.map((source) => (
                                <CommandItem
                                  value={source}
                                  key={source}
                                  onSelect={() => {
                                    form.setValue('referralSource', source, {
                                      shouldValidate: true,
                                    })
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      'mr-2 h-4 w-4',
                                      source === field.value ? 'opacity-100' : 'opacity-0',
                                    )}
                                  />
                                  {source}
                                </CommandItem>
                              ))}
                            </CommandList>
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        )}

        {/* STEP 2 */}
        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Section 2: Conflict Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="conflictOverview"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What brings you to seek mediation right now? *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Briefly share what's happening, who's involved, and your goals."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isCourtOrdered"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Is this part of a court order or legal process? *</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex space-x-4"
                      >
                        {yesNoOptions.map((option) => (
                          <FormItem key={option} className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value={option} />
                            </FormControl>
                            <FormLabel className="font-normal">{option}</FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        )}

        {/* STEP 3 */}
        {currentStep === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Section 3: Other Participants</CardTitle>
              <CardDescription>
                Please share the names of the other person or people involved.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <h3 className="md:col-span-2 font-semibold">Contact One (Required)</h3>
                <FormField
                  control={form.control}
                  name="contactOneFirstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contactOneLastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Smith" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contactOnePhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone *</FormLabel>
                      <FormControl>
                        <Input placeholder="(123) 456-7890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contactOneEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input placeholder="john.smith@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
                <h3 className="md:col-span-2 font-semibold">Contact Two (Optional)</h3>
                <FormField
                  control={form.control}
                  name="contactTwoFirstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contactTwoLastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contactTwoPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contactTwoEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* STEP 4 */}
        {currentStep === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Section 4: Scheduling & Final Details</CardTitle>
              <CardDescription>
                After you submit, you'll get a link to schedule a follow-up call.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="deadline"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>
                      If court order what is the specific date or deadline you are working with?
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              'w-[240px] pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground',
                            )}
                          >
                            {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>If not applicable, please pick today's date.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="accessibilityNeeds"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Do you have any accessibility needs or language preferences? *
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., ASL interpreter, Spanish-speaking mediator, wheelchair accessibility..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      We'll do our best to accommodate you. (Enter 'None' if not applicable)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="additionalInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Is there anything else you'd like us to know? *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any additional context or notes for our team."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>(Enter 'None' if not applicable)</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        )}

        {/* Footer: errors/success + nav buttons */}
        <div className="flex flex-col gap-3">
          {success && (
            <p className="text-green-600">
              Form submitted successfully! We will contact you within 2 business days.
            </p>
          )}
          {error && <p className="text-red-600">Error: {error}</p>}

          <div className="flex items-center justify-between gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={goBack}
              disabled={currentStep === 0 || isSubmitting}
            >
              Back
            </Button>

            {currentStep < TOTAL_STEPS - 1 ? (
              <Button type="button" onClick={goNext} disabled={isSubmitting}>
                Next
              </Button>
            ) : (
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting…' : 'Submit Referral Form'}
              </Button>
            )}
          </div>
        </div>
      </form>
    </Form>
  )
}
