import type { CollectionConfig, Where } from 'payload'
import { isCoordinatorOrAdmin, isAdmin } from '../access/roles'
import type { Event } from '../payload-types'

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'startDate', 'endDate'],
  },
  access: {
    // --- CHANGE 2: Updated 'read' access logic ---
    read: ({ req: { user } }) => {
      // Admins and Coordinators can see everything.
      if (user && (user.role === 'admin' || user.role === 'coordinator')) {
        return true
      }

      // Build the 'or' array explicitly to help TypeScript's type inference.
      const orConditions: Where[] = [
        {
          status: {
            equals: 'published',
          },
        },
      ]

      if (user) {
        orConditions.push({
          participants: {
            contains: user.id,
          },
        })
        orConditions.push({
          mediators: {
            contains: user.id,
          },
        })
      }

      return {
        or: orConditions,
      }
    },
    create: isCoordinatorOrAdmin,
    delete: isAdmin,
    update: isCoordinatorOrAdmin,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'The title of the event',
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      defaultValue: 'draft',
      required: true,
      admin: {
        description: 'Event visibility status',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Detailed description of the event',
      },
    },
    {
      name: 'startDate',
      type: 'date',
      required: true,
      admin: {
        description: 'When the event starts',
        date: {
          pickerAppearance: 'dayAndTime',
          displayFormat: 'MMM d, yyyy h:mm a',
        },
      },
    },
    {
      name: 'endDate',
      type: 'date',
      required: true,
      admin: {
        description: 'When the event ends',
        date: {
          pickerAppearance: 'dayAndTime',
          displayFormat: 'MMM d, yyyy h:mm a',
        },
      },
      validate: (
        value: Date | null | undefined,
        { siblingData }: { siblingData: Partial<Event> },
      ) => {
        if (value && siblingData.startDate && new Date(value) <= new Date(siblingData.startDate)) {
          return 'End date must be after start date'
        }
        return true
      },
    },
    {
      name: 'location',
      type: 'text',
      required: true,
      admin: {
        description: 'Where the event will take place',
      },
    },
    {
      name: 'maxParticipants',
      type: 'number',
      min: 1,
      admin: {
        description: 'Maximum number of participants allowed',
      },
      validate: (
        value: number | null | undefined,
        { siblingData }: { siblingData: Partial<Event> },
      ) => {
        if (
          value &&
          siblingData.participants &&
          Array.isArray(siblingData.participants) &&
          siblingData.participants.length > value
        ) {
          return `The number of participants (${siblingData.participants.length}) exceeds the maximum allowed (${value}).`
        }
        return true
      },
    },
    {
      name: 'participants',
      type: 'relationship',
      relationTo: 'users',
      hasMany: true,
      filterOptions: {
        role: { equals: 'participant' },
      },
      admin: {
        description: 'Participants registered for this event',
      },
    },
    {
      name: 'mediators',
      type: 'relationship',
      relationTo: 'users',
      hasMany: true,
      filterOptions: {
        role: { equals: 'mediator' },
      },
      admin: {
        description: 'Mediators assigned to this event',
      },
    },
  ],
  timestamps: true,
}
