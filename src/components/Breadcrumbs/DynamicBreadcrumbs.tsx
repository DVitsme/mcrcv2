'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { Breadcrumb, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbLink, BreadcrumbItem, BreadcrumbList } from '../ui/breadcrumb'
import { Home } from 'lucide-react'

interface BreadcrumbSegment {
  label: string
  href: string
}

const DynamicBreadcrumbs = () => {
  const pathname = usePathname()

  const generateBreadcrumbs = (): BreadcrumbSegment[] => {
    // Remove trailing slash and split path into segments
    const segments = pathname.replace(/\/$/, '').split('/').filter(Boolean)

    // Always start with home
    const breadcrumbs: BreadcrumbSegment[] = [
      { label: 'Home', href: '/' }
    ]

    // Build up the breadcrumbs array
    let currentPath = ''
    segments.forEach((segment) => {
      currentPath += `/${segment}`

      // Format the label (capitalize and replace hyphens with spaces)
      const label = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')

      breadcrumbs.push({
        label,
        href: currentPath
      })
    })

    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumbs()

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={crumb.href}>
            <BreadcrumbItem>
              {index === 0 ? (
                <BreadcrumbLink href={crumb.href}>
                  <Home className="h-4 w-4" />
                </BreadcrumbLink>
              ) : index === breadcrumbs.length - 1 ? (
                <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={crumb.href}>{crumb.label}</BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default DynamicBreadcrumbs