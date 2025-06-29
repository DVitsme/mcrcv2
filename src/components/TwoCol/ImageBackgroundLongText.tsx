import Image from 'next/image'
import type { CollectionConfig } from 'payload'
import { isAdmin, isCoordinatorOrAdmin } from '../access/roles'
import type { User } from '../payload-types'
import { RichText } from '@/components/RichText' // Assuming RichText is for rendering, not a Block

type ImageBackgroundLongTextProps = {
  imageUrl: string
  imageAlt: string
  color?: string
  listItems?:
    | {
        title?: string
        description?: string
        icon?: React.ElementType
      }[]
    | undefined
  imagePosition?: 'left' | 'right'
}

const ImageBackgroundLongText = ({
  imageUrl,
  imageAlt,
  listItems,
  imagePosition = 'left',
  color = 'accent',
}: ImageBackgroundLongTextProps) => {
  const imageOrder = imagePosition === 'right' ? 'order-2 md:order-2' : 'order-1 md:order-1'
  const textOrder = imagePosition === 'right' ? 'order-1 md:order-1' : 'order-2 md:order-2'

  return (
    <div
      className={`grid gap-x-20 rounded-lg border border-border bg-${color} p-6 md:grid-cols-2 md:p-8 lg:p-16`}
    >
      <div className={`mb-8 flex justify-center lg:justify-start xl:mb-0 ${imageOrder}`}>
        <Image
          src={imageUrl}
          alt={imageAlt}
          className="aspect-square h-full w-full rounded-md object-cover object-center"
          width={500}
          height={500}
        />
      </div>
      <ul className={`flex flex-col justify-center gap-y-8 ${textOrder}`}>
        {listItems?.map((item, index) => {
          const Icon = item.icon
          return (
            <li key={index} className="flex">
              {Icon && <Icon className="mr-3 size-5 shrink-0 lg:mr-6 lg:size-6" />}
              <div>
                {item.title && (
                  <div className="mb-3 h-5 text-sm font-semibold text-accent-foreground md:text-base">
                    {item.title}
                  </div>
                )}
                {item.description && (
                  <div className="text-sm font-medium text-muted-foreground md:text-base">
                    {item.description}
                  </div>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

// For the 'content' field, we'll need some simple blocks
const TextBlock = {
  slug: 'textBlock',
  fields: [{ name: 'text', type: 'richText' }],
}

const ImageBlock = {
  slug: 'imageBlock',
  fields: [{ name: 'image', type: 'upload', relationTo: 'media' }],
}

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'eventType', 'status', 'eventStartTime'],
  },
  access: {
    read: ({ req: { user } }) => {
      if (user && (user.role === 'admin' || user.role === 'coordinator')) {
        return true
      }
      return { status: { in: ['published', 'completed', 'cancelled'] } }
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
    // --- UPDATED: Grouping key info into a sidebar for better UI ---
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
        },
        {
          name: 'eventType',
          label: 'Event Type Badge',
          type: 'text',
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
                { name: 'url', type: 'url' },
                { name: 'details', type: 'text' },
              ],
            },
          ],
        },
        {
          label: 'Content',
          fields: [
            // --- NEW: Using a blocks field for flexible content ---
            {
              name: 'content',
              label: 'Event Content Sections',
              type: 'blocks',
              blocks: [TextBlock, ImageBlock], // Add more blocks here as needed
            },
            // --- NEW: Array field for speakers, replacing the old table ---
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
        // You can add more tabs for Pricing, Staffing, etc. as needed
      ],
    },
  ],
  timestamps: true,
}

export { ImageBackgroundLongText }
