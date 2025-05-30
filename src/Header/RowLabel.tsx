/**
 * Row Label Component for Payload CMS Admin UI
 * This component is used to display custom labels for navigation items in the Payload admin interface
 */

'use client'
import { Header } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  // Get the current row data from Payload's useRowLabel hook
  const data = useRowLabel<NonNullable<Header['navItems']>[number]>()

  // Create a label that includes the row number and link label if available
  const label = data?.data?.link?.label
    ? `Nav item ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}: ${data?.data?.link?.label}`
    : 'Row'

  return <div>{label}</div>
}
