// app/(frontend)/(cms)/dashboard/layout.tsx

import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import {
  AppSidebar,
  type SidebarNavItem,
  type SidebarTeam,
} from '@/components/Dashboard/app-sidebar'
import { payloadFetch } from '@/lib/auth'
import type { User } from '@/payload-types'
import DashboardBreadcrumbs from '@/components/Dashboard/dashboard-breadcrumbs'

// Optional hints (match what you used in the page)
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Fetch the current user (authed request)
async function getCurrentUser(): Promise<User | null> {
  const res = await payloadFetch('/api/users/me')
  if (!res.ok) return null
  const data = await res.json()
  return (data?.user ?? data) as User
}

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  // (cms)/layout.tsx already guards auth/role and redirects, so here we just read the user for UI.
  const user = await getCurrentUser()

  const sidebarUser = {
    name: user?.name ?? 'Staff User',
    email: user?.email ?? 'staff@example.com',
    avatar: undefined as string | undefined, // map real avatar url later if you want
  }

  const navMain: SidebarNavItem[] = [
    {
      title: 'Blog Posts',
      url: '/dashboard/posts',
      iconKey: 'squareTerminal',
      isActive: true,
      items: [
        { title: 'New Post', url: '/dashboard/posts/new' },
        { title: 'All Posts', url: '/dashboard/posts' },
        { title: 'Categories', url: '/dashboard/categories' },
        { title: 'Trash', url: '/dashboard/posts/trash' },
      ],
    },
    {
      title: 'Events',
      url: '/dashboard/events',
      iconKey: 'calendar',
      items: [
        { title: 'New Event', url: '/dashboard/events/new' },
        { title: 'All Events', url: '/dashboard/events' },
        { title: 'Tags', url: '/dashboard/events/tags' },
        { title: 'Trash', url: '/dashboard/events/trash' },
      ],
    },
  ]

  const teams: SidebarTeam[] = [
    { name: 'MCRC CMS', logoKey: 'galleryVerticalEnd', plan: user?.role ?? 'member' },
  ]

  return (
    <SidebarProvider>
      <AppSidebar user={sidebarUser} navMain={navMain} teams={teams} />
      <SidebarInset>
        {/* Shared dashboard header */}
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
            {/* Dynamic breadcrumbs */}
            <DashboardBreadcrumbs />
          </div>
        </header>

        {/* Every /dashboard/* page content renders here */}
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
