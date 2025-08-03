import type { CollectionConfig } from 'payload'
import { isAdmin, isCoordinatorOrAdmin } from '../access/roles'
import { TextBlock } from '../blocks/TextBlock'
import { ImageBlock } from '../blocks/ImageBlock'

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'meta.eventType', 'meta.status', 'eventStartTime'],
  },
  access: {
    read: ({ req: { user } }) => {
      if (user && (user.role === 'admin' || user.role === 'coordinator')) {
        return true
      }
      // Query the nested status field
      return { 'meta.status': { in: ['published', 'completed', 'cancelled'] } }
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
      type: 'group',
      name: 'meta',
      label: 'Event Info & Status',
      admin: {
        position: 'sidebar',
      },
      fields: [
        {
          name: 'status',
          type: 'select',
          options: ['draft', 'published', 'completed', 'cancelled', 'archived'],
          defaultValue: 'draft',
          required: true,
          index: true, // <-- THIS IS THE FIX FOR THE API ERROR
        },
        {
          name: 'eventType',
          label: 'Event Type Badge',
          type: 'text',
          index: true, // Also make this queryable for filtering
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
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Details',
          fields: [
            { name: 'summary', type: 'textarea', maxLength: 300 },
            {
              name: 'eventStartTime',
              type: 'date',
              required: true,
              admin: { date: { pickerAppearance: 'dayAndTime' } },
            },
            {
              name: 'eventEndTime',
              type: 'date',
              admin: { date: { pickerAppearance: 'dayAndTime' } },
            },
            {
              name: 'modality',
              type: 'radio',
              options: ['in_person', 'online', 'hybrid'],
              defaultValue: 'in_person',
            },
            {
              name: 'location',
              type: 'group',
              admin: { condition: (_, siblingData) => siblingData.modality !== 'online' },
              fields: [
                { name: 'venueName', type: 'text' },
                { name: 'address', type: 'text' },
              ],
            },
            {
              name: 'onlineMeeting',
              type: 'group',
              admin: { condition: (_, siblingData) => siblingData.modality !== 'in_person' },
              fields: [
                { name: 'url', type: 'text' },
                { name: 'details', type: 'text' },
              ],
            },
          ],
        },
        {
          label: 'Content & Media',
          fields: [
            { name: 'featuredImage', type: 'upload', relationTo: 'media' },
            {
              name: 'content',
              label: 'Event Content Sections',
              type: 'blocks',
              blocks: [TextBlock, ImageBlock],
            },
            {
              name: 'speakers',
              type: 'array',
              fields: [
                { name: 'speakerName', type: 'text', required: true },
                { name: 'speakerTitle', type: 'text' },
                { name: 'speakerBio', type: 'textarea' },
                { name: 'speakerAvatar', type: 'upload', relationTo: 'media' },
              ],
            },
          ],
        },
        {
          label: 'Pricing & Registration',
          fields: [
            { name: 'isFree', type: 'checkbox', label: 'This event is free', defaultValue: true },
            {
              name: 'cost',
              label: 'Cost Details',
              type: 'group',
              admin: { condition: (_, siblingData) => !siblingData.isFree },
              fields: [
                { name: 'amount', type: 'number' },
                { name: 'currency', type: 'text', defaultValue: 'USD' },
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
            { name: 'externalRegistrationLink', type: 'text' },
            {
              name: 'registrationDeadline',
              type: 'date',
              admin: { date: { pickerAppearance: 'dayAndTime' } },
            },
          ],
        },
      ],
    },
  ],
  timestamps: true,
}
