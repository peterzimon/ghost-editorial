import { Outlet, useLocation } from 'react-router-dom'
import { TopNav } from '@/components/patterns/top-nav'
import { SubNav, type SubNavItem } from '@/components/patterns/sub-nav'

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

const NETWORK_LEFT: SubNavItem[] = [
  { label: 'ActivityPub', to: '/network' },
]

function getSubNav(pathname: string): { left: SubNavItem[]; right?: SubNavItem[] } | null {
  if (pathname.startsWith('/dashboard')) return { left: DASHBOARD_LEFT }
  if (pathname.startsWith('/network')) return { left: NETWORK_LEFT }
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

  return (
    <div className="min-h-full bg-background flex flex-col">
      <div>
        <TopNav />
        {sub && <SubNav leftItems={sub.left} rightItems={sub.right} />}
      </div>
      <main className="flex-1 w-full lg:max-w-[1280px] mx-auto px-10 pt-[60px]">
        <Outlet />
      </main>
    </div>
  )
}
