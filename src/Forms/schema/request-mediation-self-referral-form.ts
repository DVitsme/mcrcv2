import { z } from 'zod'

// Zod schema for form validation
export const mediationFormSchema = z.object({
  // Section 1: Contact Information
  prefix: z.string().min(1, 'Prefix is required.'),
  firstName: z.string().min(1, 'First name is required.'),
  lastName: z.string().min(1, 'Last name is required.'),
  phone: z.string().min(1, 'Phone number is required.'),
  email: z.string().email('Invalid email address.'),
  preferredContactMethod: z.enum(['Email', 'Phone', 'Either is fine'], {
    required_error: 'Please select a preferred contact method.',
  }),
  allowVoicemail: z.enum(['No', 'Yes'], {
    required_error: 'Please select an option.',
  }),
  allowText: z.enum(['No', 'Yes'], {
    required_error: 'Please select an option.',
  }),
  streetAddress: z.string().min(1, 'Street address is required.'),
  city: z.string().min(1, 'City is required.'),
  state: z.string().min(1, 'State is required.'),
  zipCode: z.string().min(1, 'Zip code is required.'),
  referralSource: z.string().min(1, 'Please select a referral source.'),

  // Section 2: Conflict Overview
  conflictOverview: z
    .string()
    .min(1, 'This field is required.')
    .max(1000, 'Please limit your response to 1000 characters.'),
  isCourtOrdered: z.enum(['No', 'Yes'], {
    required_error: 'Please select an option.',
  }),

  // Section 3: Other Participants
  contactOneFirstName: z.string().min(1, 'First name is required.'),
  contactOneLastName: z.string().min(1, 'Last name is required.'),
  contactOnePhone: z.string().min(1, 'Phone number is required.'),
  contactOneEmail: z.string().email('Invalid email address.'),

  contactTwoFirstName: z.string().optional(),
  contactTwoLastName: z.string().optional(),
  contactTwoPhone: z.string().optional(),
  contactTwoEmail: z.string().email('Invalid email address.').optional().or(z.literal('')), // Allow empty string or valid email

  // Section 4: Scheduling
  deadline: z.date().optional(),
  accessibilityNeeds: z
    .string()
    .min(1, "Please enter 'None' if not applicable.")
    .max(500, 'Please limit your response to 500 characters.'),
  additionalInfo: z
    .string()
    .min(1, "Please enter 'None' if not applicable.")
    .max(500, 'Please limit your response to 500 characters.'),
})

// Infer the TypeScript type from the schema
export type MediationFormValues = z.infer<typeof mediationFormSchema>
