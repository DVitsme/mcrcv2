import type { CollectionConfig } from 'payload'
import { isCoordinatorOrAdmin } from '@/access/roles'

// A hook to automatically generate a fullName for better readability in the admin UI
const generateFullName = ({ data }: { data: any }) => {
  const { firstName, lastName } = data?.submitter || {}
  if (firstName && lastName) {
    return `${firstName} ${lastName}`
  }
  if (firstName) {
    return firstName
  }
  return 'Untitled Request'
}

export const SelfReferralForm: CollectionConfig = {
  slug: 'selfReferralForm',
  admin: {
    useAsTitle: 'fullName', // Use the auto-generated fullName as the document title
    defaultColumns: ['fullName', 'serviceType', 'status', 'createdAt'],
    listSearchableFields: ['fullName', 'serviceType', 'submitter.email'],
  },
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (operation === 'create' || operation === 'update') {
          data.fullName = generateFullName({ data })
          return data
        }
      },
    ],
  },
  access: {
    read: isCoordinatorOrAdmin,
    create: () => true, // Public can create
    update: isCoordinatorOrAdmin,
    delete: isCoordinatorOrAdmin,
  },
  fields: [
    // --- Hoisted fields for Admin UI and Filtering ---
    {
      name: 'fullName',
      type: 'text',
      admin: {
        hidden: true, // Hide from the form, it's auto-generated
      },
    },
    {
      name: 'serviceType',
      label: 'Service Type',
      type: 'select',
      options: ['Mediation', 'Facilitation', 'Restorative Justice', 'Training'],
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      options: ['New', 'In Review', 'Contacted', 'Closed'],
      defaultValue: 'New',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    // --- Tabs for Organized Data Entry/Viewing ---
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Submitter Details',
          fields: [
            {
              name: 'submitter',
              type: 'group',
              fields: [
                { name: 'prefix', type: 'text' },
                { name: 'firstName', type: 'text', required: true },
                { name: 'lastName', type: 'text', required: true },
                { name: 'email', type: 'email', required: true },
                { name: 'phone', type: 'text', required: true },
                {
                  name: 'address',
                  type: 'group',
                  fields: [
                    { name: 'street', type: 'text', required: true },
                    { name: 'city', type: 'text', required: true },
                    { name: 'state', type: 'text', required: true },
                    { name: 'zipCode', type: 'text', required: true },
                  ],
                },
                {
                  name: 'contactPreferences',
                  type: 'group',
                  fields: [
                    {
                      name: 'preferredMethod',
                      type: 'select',
                      options: ['Email', 'Phone', 'Either is fine'],
                    },
                    { name: 'canLeaveVoicemail', type: 'checkbox' },
                    { name: 'canText', type: 'checkbox' },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Conflict & Case Details',
          fields: [
            { name: 'whatBringsYou', type: 'textarea', required: true },
            { name: 'isCourtOrdered', type: 'checkbox', defaultValue: false },
            {
              name: 'howDidYouHear',
              type: 'select',
              options: [
                'Website',
                'Community event or outreach',
                'Friend or family / Word of mouth',
                'Referred by Howard County Court',
                'Internet search',
                'Referred by an organization or agency',
                'I’ve used your services before',
                'Social Media',
              ],
            },
            { name: 'deadline', type: 'text', label: 'Specific Date or Deadline' },
          ],
        },
        {
          label: 'Other Parties',
          fields: [
            {
              name: 'otherParties',
              type: 'array',
              fields: [
                { name: 'firstName', type: 'text' },
                { name: 'lastName', type: 'text' },
                { name: 'phone', type: 'text' },
                { name: 'email', type: 'email' },
              ],
            },
          ],
        },
        {
          label: 'Additional Information',
          fields: [
            { name: 'accessibilityNeeds', type: 'textarea' },
            { name: 'anythingElse', type: 'textarea' },
          ],
        },
      ],
    },
  ],
  timestamps: true,
}
