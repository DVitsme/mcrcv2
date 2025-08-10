// src/collections/Users/index.ts

import type { CollectionConfig } from 'payload'
import {
  isAdmin,
  isCoordinatorOrAdmin,
  canManageUsers,
  isAdminFieldLevel,
  isCoordinatorFieldLevel,
} from '@/access/roles'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    // enable login with email/password
    // optional: lockout / password expires, etc.
    // maxLoginAttempts: 5,
    // lockTime: 60 * 15,
    // expires: 60 * 60 * 24,
  },
  admin: {
    useAsTitle: 'name', // Use 'name' as it's more user-friendly than email
    defaultColumns: ['name', 'email', 'role', 'updatedAt'],
  },
  access: {
    read: canManageUsers,
    create: isCoordinatorOrAdmin,
    update: canManageUsers,
    delete: isAdmin,
  },
  fields: [
    // This will be the user's full name, mapping from `full_name`
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      label: 'Role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Coordinator', value: 'coordinator' },
        { label: 'Mediator', value: 'mediator' },
        { label: 'Volunteer', value: 'volunteer' }, // Added Volunteer role
        { label: 'Participant', value: 'participant' },
      ],
      required: true,
      defaultValue: 'participant',
      access: {
        create: isAdminFieldLevel,
        update: isAdminFieldLevel,
      },
    },
    {
      name: 'userStatus',
      label: 'Status',
      type: 'select',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Active', value: 'active' },
        { label: 'Rejected', value: 'rejected' },
      ],
      defaultValue: 'pending',
      admin: {
        position: 'sidebar',
        description: "Controls the user's application and activation status.",
      },
      access: {
        // Only Admins and Coordinators can change a user's status
        update: isAdminFieldLevel,
      },
    },
    // Using Tabs to organize the user profile
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Profile Information',
          fields: [
            {
              name: 'avatar',
              label: 'Avatar',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'bio',
              type: 'textarea',
            },
            {
              name: 'phoneNumber',
              label: 'Phone Number',
              type: 'text',
            },
          ],
        },
        // Mediator-specific fields, conditionally shown
        {
          label: 'Volunteer & Mediator Details', // Updated label
          admin: {
            // Updated condition to include 'volunteer'
            condition: (data) => data.role === 'mediator' || data.role === 'volunteer',
          },
          fields: [
            {
              name: 'skills',
              type: 'array',
              fields: [
                {
                  name: 'skill',
                  type: 'text',
                },
              ],
            },
            {
              name: 'languagesSpoken',
              label: 'Languages Spoken',
              type: 'array',
              fields: [
                {
                  name: 'language',
                  type: 'text',
                },
              ],
            },
            {
              name: 'preferredCaseTypes',
              label: 'Preferred Case Types',
              type: 'select',
              hasMany: true,
              options: [
                { label: 'Mediation', value: 'mediation' },
                { label: 'Restorative Justice', value: 'restorative_justice' },
              ],
            },
            {
              name: 'isAvailableForNewCases',
              label: 'Available for New Cases',
              type: 'checkbox',
              defaultValue: false,
            },
          ],
        },
        // Contact preferences and other sensitive info
        {
          label: 'Settings & Demographics',
          fields: [
            {
              name: 'contactPreferences',
              label: 'Contact Preferences',
              type: 'group',
              fields: [
                {
                  name: 'optInNewCaseNotifications',
                  label: 'Opt-in to new case notifications',
                  type: 'checkbox',
                  defaultValue: false,
                },
                // You can add more preferences here as needed
              ],
            },
            // The following fields should only be visible to Admins/Coordinators
            {
              name: 'demographics',
              label: 'Demographics (Private)',
              type: 'group',
              access: {
                read: isCoordinatorFieldLevel,
              },
              fields: [
                {
                  name: 'age',
                  type: 'number',
                },
                {
                  name: 'raceEthnicity',
                  label: 'Race / Ethnicity',
                  type: 'text',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  timestamps: true,
}
