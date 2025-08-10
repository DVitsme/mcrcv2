export const ALLOWED_ROLES = new Set(['admin', 'coordinator'] as const)
export function canUseCMS(role?: string | null) {
  return role ? ALLOWED_ROLES.has(role as any) : false
}
