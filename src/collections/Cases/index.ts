// src/collections/Cases/index.ts

import type { CollectionConfig, Where, FieldAccess } from 'payload'
import { isCoordinatorOrAdmin, isAdmin, isCoordinatorFieldLevel } from '@/access/roles'
import type { User, Case } from '@/payload-types'

// --- NEW: Define a clear type for a row in the 'mediators' array to help with type safety. ---
type MediatorRow = {
  mediator: string | number | User
  notes?: string | null
  id?: string | null
}

// This helper function is now fully type-safe.
const isAssignedMediatorOrAdmin: FieldAccess<Case, User> = ({ req, doc, data }) => {
  const { user } = req
  if (!user) return false
  if (isCoordinatorFieldLevel({ req })) return true

  // Check either the incoming `data` (for create) or the existing `doc` (for read/update)
  const documentToCheck = data || doc

  if (!documentToCheck || !documentToCheck.mediators || !Array.isArray(documentToCheck.mediators)) {
    return false
  }

  // --- CORRECTED: Use the MediatorRow type for the assertion. ---
  const assignedMediatorIds = (documentToCheck.mediators as MediatorRow[]).map((item) =>
    typeof item.mediator === 'object' ? item.mediator.id : item.mediator,
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
    read: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'admin' || user.role === 'coordinator') {
        return true
      }
      const orConditions: Where[] = [
        {
          'mediators.mediator': {
            contains: user.id,
          },
        },
        {
          'participants.participant': {
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
          label: 'Intake Details',
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
              type: 'array',
              minRows: 1,
              fields: [
                {
                  name: 'mediator',
                  type: 'relationship',
                  relationTo: 'users',
                  required: true,
                  filterOptions: { role: { equals: 'mediator' } },
                },
                {
                  name: 'notes',
                  type: 'textarea',
                },
              ],
              access: {
                update: isCoordinatorFieldLevel,
              },
            },
            {
              name: 'participants',
              label: 'Case Participants',
              type: 'array',
              minRows: 2,
              fields: [
                {
                  name: 'participant',
                  type: 'relationship',
                  relationTo: 'users',
                  required: true,
                  filterOptions: { role: { equals: 'participant' } },
                },
                {
                  name: 'roleInCase',
                  label: 'Role in Case',
                  type: 'select',
                  options: ['participant_1', 'participant_2', 'other_involved_party'],
                  required: true,
                },
                { name: 'consentFormLink', type: 'text' },
                { name: 'consentFormSignedAt', type: 'date' },
                { name: 'notes', type: 'textarea' },
              ],
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
