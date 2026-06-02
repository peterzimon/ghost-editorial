import type { ReactNode } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { TopNav } from '@/components/patterns/top-nav'
import { SubNav, type SubNavItem } from '@/components/patterns/sub-nav'
import { Breadcrumb } from '@/components/patterns/breadcrumb'
import { NetworkSubNavRight } from '@/features/network/NetworkSubNavRight'
import { mockMembers } from '@/features/audience/mockMembers'
import { cn } from '@/lib/cn'

const CONTENT_LEFT: SubNavItem[] = [
  { label: 'Posts', to: '/content/posts' },
  { label: 'Pages', to: '/content/pages' },
  { label: 'Tags', to: '/content/tags' },
  { label: 'Media', to: '/content/media' },
]

const POSTS_RIGHT: SubNavItem[] = [
  { label: 'All posts', to: '/content/posts', end: true },
  { label: 'Drafts', to: '/content/posts/drafts' },
  { label: 'Scheduled', to: '/content/posts/scheduled' },
  { label: 'Published', to: '/content/posts/published' },
]

const DASHBOARD_LEFT: SubNavItem[] = [
  { label: 'Overview', to: '/dashboard', end: true },
  { label: 'Web Analytics', to: '/dashboard/web-analytics' },
  { label: 'Newsletters', to: '/dashboard/newsletters' },
  { label: 'Growth', to: '/dashboard/growth' },
  { label: 'Sources', to: '/dashboard/sources' },
]

const AUDIENCE_LEFT: SubNavItem[] = [
  { label: 'Members', to: '/audience/members' },
  { label: 'Comments', to: '/audience/comments' },
]

const AUDIENCE_RIGHT: SubNavItem[] = [
  { label: 'All members', to: '/audience/members', end: true },
  { label: 'VIP', to: '/audience/members/vip' },
  { label: 'Friends & Family', to: '/audience/members/friends' },
  { label: 'Early birds', to: '/audience/members/early-birds' },
]

const GROWTH_LEFT: SubNavItem[] = [
  { label: 'Automations', to: '/growth/automations' },
  { label: 'Offers', to: '/growth/offers' },
]

const NETWORK_LEFT: SubNavItem[] = [
  { label: 'Reader', to: '/network/reader' },
  { label: 'Notes', to: '/network/notes' },
  { label: 'Explore', to: '/network/explore' },
  { label: 'Profile', to: '/network/profile' },
]

const MEMBER_FILTER_SLUGS = new Set(['vip', 'friends', 'early-birds'])

interface SubNavSpec {
  left?: SubNavItem[]
  leftSlot?: ReactNode
  right?: SubNavItem[]
  rightSlot?: ReactNode
}

function getSubNav(pathname: string): SubNavSpec | null {
  if (pathname.startsWith('/dashboard')) return { left: DASHBOARD_LEFT }
  if (pathname.startsWith('/network')) return { left: NETWORK_LEFT, rightSlot: <NetworkSubNavRight /> }
  if (pathname.startsWith('/content/posts')) return { left: CONTENT_LEFT, right: POSTS_RIGHT }
  if (pathname.startsWith('/content')) return { left: CONTENT_LEFT }

  // Member detail page — swap the standard sub-nav for a breadcrumb.
  const memberDetailMatch = pathname.match(/^\/audience\/members\/([^/]+)$/)
  if (memberDetailMatch && !MEMBER_FILTER_SLUGS.has(memberDetailMatch[1])) {
    const member = mockMembers.find((m) => m.id === memberDetailMatch[1])
    return {
      leftSlot: (
        <Breadcrumb
          items={[
            { label: 'Members', to: '/audience/members' },
            { label: member?.name ?? 'Member' },
          ]}
        />
      ),
    }
  }

  if (pathname.startsWith('/audience/members')) return { left: AUDIENCE_LEFT, right: AUDIENCE_RIGHT }
  if (pathname.startsWith('/audience')) return { left: AUDIENCE_LEFT }
  if (pathname.startsWith('/growth')) return { left: GROWTH_LEFT }
  return null
}

export function Layout() {
  const { pathname } = useLocation()
  const sub = getSubNav(pathname)
  const fullBleed = pathname === '/site'

  return (
    <div className="h-full bg-background flex flex-col pt-[52px]">
      <div className="fixed top-0 left-0 right-0 z-50 bg-background">
        <TopNav />
      </div>
      {sub && (
        <div className="relative z-20">
          <SubNav
            leftItems={sub.left}
            leftSlot={sub.leftSlot}
            rightItems={sub.right}
            rightSlot={sub.rightSlot}
          />
        </div>
      )}
      <main
        className={cn(
          'flex-1 min-h-0 w-full',
          fullBleed ? '' : 'lg:max-w-[1280px] mx-auto px-10 pt-[60px]',
        )}
      >
        <Outlet />
      </main>
    </div>
  )
}
