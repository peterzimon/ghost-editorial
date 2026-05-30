import { Outlet, useLocation } from 'react-router-dom'
import { TopNav } from '@/components/patterns/top-nav'
import { SubNav, type SubNavItem } from '@/components/patterns/sub-nav'
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
  { label: 'Growth Tools', to: '/growth/tools' },
]

function getSubNav(pathname: string): { left: SubNavItem[]; right?: SubNavItem[] } | null {
  if (pathname.startsWith('/dashboard')) return { left: DASHBOARD_LEFT }
  if (pathname.startsWith('/content/posts')) return { left: CONTENT_LEFT, right: POSTS_RIGHT }
  if (pathname.startsWith('/content')) return { left: CONTENT_LEFT }
  if (pathname.startsWith('/audience/members')) return { left: AUDIENCE_LEFT, right: AUDIENCE_RIGHT }
  if (pathname.startsWith('/audience')) return { left: AUDIENCE_LEFT }
  if (pathname.startsWith('/growth')) return { left: GROWTH_LEFT }
  return null
}

export function Layout() {
  const { pathname } = useLocation()
  const sub = getSubNav(pathname)
  const fullBleed = pathname === '/site' || pathname === '/network'

  return (
    <div className="h-full bg-background flex flex-col pt-[52px]">
      <div className="fixed top-0 left-0 right-0 z-50 bg-background">
        <TopNav />
      </div>
      {sub && <SubNav leftItems={sub.left} rightItems={sub.right} />}
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
