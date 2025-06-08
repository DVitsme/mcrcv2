import type { Access, User } from 'payload'

// Helper function to check for a specific role
const hasRole = (
  user: User | null | undefined,
  role: 'admin' | 'coordinator' | 'mediator' | 'participant',
): boolean => {
  return user?.role === role
}

// Access control for Admins
export const isAdmin: Access = ({ req }: { req: { user: User | null } }) => {
  const user = req.user
  return hasRole(user, 'admin')
}

// Access control for Admins or Coordinators
export const isCoordinatorOrAdmin: Access = ({ req }: { req: { user: User | null } }) => {
  const user = req.user
  return hasRole(user, 'admin') || hasRole(user, 'coordinator')
}

// Access control for managing the Users collection
export const canManageUsers: Access = ({ req }: { req: { user: User | null } }) => {
  const user = req.user
  if (user) {
    // Admins and coordinators can access all users
    if (hasRole(user, 'admin') || hasRole(user, 'coordinator')) {
      return true
    }
    // Other logged-in users can only access their own document
    return {
      id: {
        equals: user.id,
      },
    }
  }
  // Reject access for unauthenticated users
  return false
}

// Access control for Mediators
export const isMediator: Access = ({ req }: { req: { user: User | null } }) => {
  const user = req.user
  return hasRole(user, 'mediator')
}

// Access control for Participants
export const isParticipant: Access = ({ req }: { req: { user: User | null } }) => {
  const user = req.user
  return hasRole(user, 'participant')
}

// Access control for authenticated users
export const isAuthenticated: Access = ({ req }: { req: { user: User | null } }) => {
  const user = req.user
  return !!user
}

// A strictly-typed access control function for field-level access
export const isAdminFieldLevel = ({ req }: { req: { user: User | null } }): boolean => {
  return req.user?.role === 'admin'
}

// Field-level access control for Admins or Coordinators
export const isCoordinatorFieldLevel = ({ req }: { req: { user: User | null } }): boolean => {
  const user = req.user
  return hasRole(user, 'admin') || hasRole(user, 'coordinator')
}
