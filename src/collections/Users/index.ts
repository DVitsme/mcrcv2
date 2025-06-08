import type { CollectionConfig } from 'payload'
import {
  isAdmin,
  isCoordinatorOrAdmin,
  canManageUsers,
  isAdminFieldLevel,
} from '../../access/roles'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true, // This enables Payload's authentication features
  admin: {
    useAsTitle: 'email',
  },
  access: {
    // Admins and Coordinators can read all users; others can only read their own profile
    read: canManageUsers,
    // Admins and Coordinators can create new users
    create: isCoordinatorOrAdmin,
    // Admins and Coordinators can update all users; others can only update their own
    update: canManageUsers,
    // Only Admins can delete users
    delete: isAdmin,
  },
  fields: [
    // Add the 'role' field
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
        { label: 'Participant', value: 'participant' },
      ],
      required: true,
      defaultValue: 'participant', // Default new users to the 'participant' role
      access: {
        // Only Admins can set or change a user's role
        create: isAdminFieldLevel,
        update: isAdminFieldLevel,
      },
    },
    // Your other user fields from the 'profiles' table go here:
    // { name: 'fullName', type: 'text' },
    // { name: 'avatar', type: 'upload', relationTo: 'media' },
    // { name: 'bio', type: 'textarea' },
    // etc...
  ],
}
