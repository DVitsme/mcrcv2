import type { CollectionConfig } from 'payload'
import { isCoordinatorOrAdmin, isAdmin } from '../access/roles'
import type { User, Event, Media } from '../payload-types'

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'eventType', 'status', 'eventStartTime'],
  },
  access: {
    read: ({ req: { user } }: { req: { user: User | null } }) => {
      if (user && (user.role === 'admin' || user.role === 'coordinator')) {
        return true
      }
      return {
        status: {
          in: ['published', 'completed', 'cancelled'],
        },
      }
    },
    create: isCoordinatorOrAdmin,
    delete: isAdmin,
    update: isCoordinatorOrAdmin,
  },
  fields: [
    {
      name: 'name',
      label: 'Event Name',
      type: 'text',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'status',
          type: 'select',
          options: [
            { label: 'Draft', value: 'draft' },
            { label: 'Published', value: 'published' },
            { label: 'Completed', value: 'completed' },
            { label: 'Cancelled', value: 'cancelled' },
            { label: 'Archived', value: 'archived' },
          ],
          defaultValue: 'draft',
          required: true,
        },
        {
          name: 'eventType',
          label: 'Event Type Badge',
          type: 'text',
          admin: {
            description: 'A short label, e.g., "Workshop", "Networking", "Training".',
          },
        },
      ],
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Event Details',
          fields: [
            {
              name: 'eventStartTime',
              label: 'Start Time',
              type: 'date',
              required: true,
              admin: {
                date: { pickerAppearance: 'dayAndTime' },
              },
            },
            {
              name: 'eventEndTime',
              label: 'End Time',
              type: 'date',
              admin: {
                date: { pickerAppearance: 'dayAndTime' },
              },
              validate: (
                value: Date | null | undefined,
                { siblingData }: { siblingData: Partial<Event> },
              ) => {
                if (
                  value &&
                  siblingData.eventStartTime &&
                  new Date(value) <= new Date(siblingData.eventStartTime)
                ) {
                  return 'End time must be after start time'
                }
                return true
              },
            },
            {
              name: 'modality',
              type: 'radio',
              options: [
                { label: 'In-Person', value: 'in_person' },
                { label: 'Online', value: 'online' },
                { label: 'Hybrid', value: 'hybrid' },
              ],
              defaultValue: 'in_person',
            },
            {
              name: 'location',
              label: 'Location / Venue',
              type: 'group',
              admin: {
                condition: (_: unknown, siblingData: Partial<Event>) =>
                  siblingData.modality === 'in_person' || siblingData.modality === 'hybrid',
              },
              fields: [
                {
                  name: 'venueName',
                  label: 'Venue Name',
                  type: 'text',
                },
                {
                  name: 'address',
                  label: 'Address',
                  type: 'text',
                },
              ],
            },
            {
              name: 'onlineMeeting',
              label: 'Online Meeting',
              type: 'group',
              admin: {
                condition: (_: unknown, siblingData: Partial<Event>) =>
                  siblingData.modality === 'online' || siblingData.modality === 'hybrid',
              },
              fields: [
                {
                  name: 'url',
                  label: 'Meeting URL',
                  type: 'text',
                },
                {
                  name: 'details',
                  label: 'Meeting Details (e.g., ID, Passcode)',
                  type: 'text',
                },
              ],
            },
          ],
        },
        {
          label: 'Content & Media',
          fields: [
            {
              name: 'summary',
              type: 'textarea',
              maxLength: 250,
              admin: {
                description: 'A short summary for event cards and SEO.',
              },
            },
            {
              name: 'description',
              label: 'Full Description',
              type: 'richText',
            },
            {
              name: 'featuredImage',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'supportingImage',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
        {
          label: 'Pricing & Registration',
          fields: [
            {
              name: 'isFree',
              type: 'checkbox',
              label: 'This event is free',
              defaultValue: true,
            },
            {
              name: 'cost',
              label: 'Cost Details',
              type: 'group',
              admin: {
                condition: (_: unknown, siblingData: Partial<Event>) => !siblingData.isFree,
              },
              fields: [
                {
                  name: 'amount',
                  type: 'number',
                },
                {
                  name: 'currency',
                  type: 'text',
                  defaultValue: 'USD',
                },
                {
                  name: 'description',
                  type: 'text',
                  label: 'Cost Description (e.g., "Per ticket")',
                },
              ],
            },
            {
              name: 'isRegistrationRequired',
              type: 'checkbox',
              label: 'Registration is required',
              defaultValue: true,
            },
            {
              name: 'externalRegistrationLink',
              type: 'text',
            },
            {
              name: 'registrationDeadline',
              type: 'date',
              admin: {
                date: { pickerAppearance: 'dayAndTime' },
              },
            },
          ],
        },
        {
          label: 'Staffing & Notes',
          fields: [
            {
              name: 'contact',
              label: 'Event Contact',
              type: 'group',
              fields: [
                { name: 'name', type: 'text' },
                { name: 'email', type: 'email' },
                { name: 'phone', type: 'text' },
              ],
            },
            {
              name: 'createdBy',
              type: 'relationship',
              relationTo: 'users',
              admin: {
                readOnly: true,
                position: 'sidebar',
              },
              defaultValue: ({ user }: { user: User }) => user.id,
            },
            {
              name: 'additionalNotes',
              type: 'array',
              fields: [{ name: 'item', type: 'text' }],
            },
          ],
        },
      ],
    },
    {
      name: 'slug',
      type: 'text',
      index: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}
