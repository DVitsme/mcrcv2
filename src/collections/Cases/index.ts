// src/collections/Cases/index.ts

import type { CollectionConfig, Where, FieldAccess } from 'payload'
import { isCoordinatorOrAdmin, isAdmin, isCoordinatorFieldLevel } from '@/access/roles'
import type { User, Case } from '@/payload-types'

// This field-level access function correctly handles all operations (create, read, update)
// by checking both incoming `data` and the existing `doc`.
const isAssignedMediatorOrAdmin: FieldAccess<Case, User> = ({ req: { user }, data, doc }) => {
  if (!user) return false
  if (isCoordinatorFieldLevel({ req: { user } })) return true

  // On 'create', check incoming data. On 'update' or 'read', check existing doc.
  const documentToCheck = data || doc

  if (!documentToCheck || !documentToCheck.mediators) return false

  const assignedMediatorIds = documentToCheck.mediators.map((mediator: string | number | User) =>
    typeof mediator === 'object' ? mediator.id : mediator,
  )

  return assignedMediatorIds.includes(user.id)
}

export const Cases: CollectionConfig = {
  slug: 'cases',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'caseReferenceId', 'status', 'updatedAt'],
  },
  access: {
    // --- CORRECTED: Restored secure read access logic ---
    read: ({ req: { user } }) => {
      if (!user) return false
      // Admins and coordinators can read all cases
      if (user.role === 'admin' || user.role === 'coordinator') {
        return true
      }

      // Other users can only read cases where they are listed as a mediator OR a participant
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
      name: 'title',
      type: 'text',
      required: true,
      label: 'Case Title / Subject',
    },
    {
      name: 'caseReferenceId',
      label: 'Case Reference ID',
      type: 'text',
      unique: true,
      admin: {
        description: 'Unique identifier for the case (e.g., MCRC-2025-001)',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Case Information',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'status',
                  type: 'select',
                  options: [
                    'new',
                    'under_review',
                    'awaiting_participant_2',
                    'p2_response_received',
                    'p2_declined_pending_closure',
                    'awaiting_mediator_assignment',
                    'awaiting_consent',
                    'scheduled',
                    'in_progress',
                    'follow_up_required',
                    'on_hold',
                    'closed_resolved_agreement',
                    'closed_resolved_no_agreement',
                    'closed_unresolved',
                    'closed_rejected_intake',
                    'closed_p2_declined',
                    'closed_other',
                  ].map((val) => ({
                    label: val.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
                    value: val,
                  })),
                  defaultValue: 'new',
                  required: true,
                },
                {
                  name: 'mainCategory',
                  label: 'Main Category',
                  type: 'select',
                  options: ['Mediation', 'Restorative Justice'],
                },
              ],
            },
            { name: 'caseSubtype', label: 'Case Subtype', type: 'text' },
          ],
        },
        {
          label: 'Participants',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'participant1',
                  label: 'Participant 1 (Initiator)',
                  type: 'group',
                  fields: [
                    { name: 'fullName', label: 'Full Name', type: 'text' },
                    { name: 'email', type: 'email' },
                    { name: 'phone', type: 'text' },
                    {
                      name: 'conflictDescription',
                      label: 'Description of Conflict',
                      type: 'textarea',
                    },
                    { name: 'desiredOutcome', label: 'Desired Outcome', type: 'textarea' },
                  ],
                },
                {
                  name: 'participant2',
                  label: 'Participant 2 (As described by P1)',
                  type: 'group',
                  fields: [
                    { name: 'fullName', label: 'Full Name', type: 'text' },
                    { name: 'email', type: 'email' },
                    { name: 'phone', type: 'text' },
                    { name: 'relationshipToP1', label: 'Relationship to P1', type: 'text' },
                  ],
                },
              ],
            },
            {
              name: 'p2WillingToMediate',
              label: 'Is Participant 2 willing to mediate?',
              type: 'checkbox',
            },
            {
              name: 'conflictDescriptionByP2',
              label: 'Conflict Description by P2',
              type: 'textarea',
            },
          ],
        },
        {
          label: 'Staffing & Notes',
          fields: [
            {
              name: 'assignedCoordinator',
              label: 'Assigned Coordinator',
              type: 'relationship',
              relationTo: 'users',
              filterOptions: { role: { equals: 'coordinator' } },
            },
            {
              name: 'mediators',
              label: 'Assigned Mediator(s)',
              type: 'relationship',
              relationTo: 'users',
              hasMany: true,
              filterOptions: { role: { equals: 'mediator' } },
              required: true,
              minRows: 1,
              access: {
                update: isCoordinatorFieldLevel,
              },
            },
            {
              name: 'participants',
              label: 'Case Participants (as Users)',
              type: 'relationship',
              relationTo: 'users',
              hasMany: true,
              filterOptions: { role: { equals: 'participant' } },
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
        },
        {
          label: 'Closure Details',
          fields: [
            {
              name: 'rejectionClosureReason',
              label: 'Reason for Rejection / Closure',
              type: 'text',
            },
            {
              name: 'rejectionClosureDetails',
              label: 'Details',
              type: 'textarea',
            },
          ],
        },
      ],
    },
  ],
  timestamps: true,
}
