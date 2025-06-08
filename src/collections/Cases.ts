// src/collections/Cases.ts

import type { CollectionConfig, Where, FieldAccess } from 'payload'
import { isCoordinatorOrAdmin, isAdmin, isCoordinatorFieldLevel } from '../access/roles'
import type { User } from '../payload-types'

// This function now correctly handles all TypeScript errors.
const isAssignedMediatorOrAdmin: FieldAccess = ({ req, data, doc }) => {
  const { user } = req
  if (!user) return false
  if (isCoordinatorFieldLevel({ req })) return true

  // Check both data and doc for mediators
  const mediators = data?.mediators || doc?.mediators
  if (!mediators) return false

  const assignedMediatorIds = mediators.map((mediator: string | number | User) =>
    typeof mediator === 'object' ? mediator.id : mediator,
  )

  return assignedMediatorIds.includes(user.id)
}

// // Field-level access control that returns boolean
// const isCoordinatorField: FieldAccess = ({ req: { user } }) => {
//   return Boolean(user?.role === 'coordinator' || user?.role === 'admin')
// }

export const Cases: CollectionConfig = {
  slug: 'cases',
  admin: {
    useAsTitle: 'caseReferenceId',
    defaultColumns: ['caseReferenceId', 'title', 'status', 'createdAt'],
  },
  access: {
    read: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'admin' || user.role === 'coordinator') {
        return true
      }

      const orConditions: Where[] = [
        {
          mediators: {
            contains: user.id,
          },
        },
        {
          participants: {
            contains: user.id,
          },
        },
      ]

      return {
        or: orConditions,
      }
    },
    create: isCoordinatorOrAdmin,
    update: isCoordinatorOrAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'caseReferenceId',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Unique identifier for the case (e.g., CASE-2024-001)',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Open', value: 'open' },
        { label: 'In Progress', value: 'in-progress' },
        { label: 'Closed', value: 'closed' },
      ],
      defaultValue: 'open',
      required: true,
      admin: {
        description: 'Current status of the case',
      },
    },
    {
      name: 'mediators',
      label: 'Assigned Mediators',
      type: 'relationship',
      relationTo: 'users',
      hasMany: true,
      filterOptions: {
        role: { equals: 'mediator' },
      },
      required: true,
      minRows: 1,
      access: {
        update: isCoordinatorFieldLevel,
      },
    },
    {
      name: 'participants',
      label: 'Case Participants',
      type: 'relationship',
      relationTo: 'users',
      hasMany: true,
      filterOptions: {
        role: { equals: 'participant' },
      },
      required: true,
      minRows: 2,
      access: {
        update: isCoordinatorFieldLevel,
      },
    },
    {
      name: 'coordinatorNotes',
      label: 'Coordinator Notes (Internal)',
      type: 'textarea',
      access: {
        create: isCoordinatorFieldLevel,
        update: isCoordinatorFieldLevel,
        read: isCoordinatorFieldLevel,
      },
    },
    {
      name: 'mediatorNotes',
      label: 'Mediator Private Notes',
      type: 'textarea',
      access: {
        create: isAssignedMediatorOrAdmin,
        update: isAssignedMediatorOrAdmin,
        read: isAssignedMediatorOrAdmin,
      },
    },
    {
      name: 'publicNotes',
      label: 'Public Case Notes',
      type: 'textarea',
    },
  ],
  timestamps: true,
}
