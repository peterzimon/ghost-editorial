import { Fragment } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Logomark } from './logomark'
import { StableLabel } from './stable-label'
import { cn } from '@/lib/cn'

export interface SidebarSubItem {
  label: string
  to: string
  /** If true, only matches when route is exactly this path (default false). */
  end?: boolean
}

export interface SidebarSection {
  label: string
  /** Path used for "is this section active" matching and as the parent link. */
  to: string
  subItems?: SidebarSubItem[]
}

const SECTIONS: SidebarSection[] = [
  {
    label: 'Dashboard',
    to: '/dashboard',
    subItems: [
      { label: 'Overview', to: '/dashboard', end: true },
      { label: 'Web Analytics', to: '/dashboard/web-analytics' },
      { label: 'Newsletters', to: '/dashboard/newsletters' },
      { label: 'Growth', to: '/dashboard/growth' },
      { label: 'Sources', to: '/dashboard/sources' },
    ],
  },
  {
    label: 'Network',
    to: '/network',
    subItems: [
      { label: 'Reader', to: '/network/reader' },
      { label: 'Notes', to: '/network/notes' },
      { label: 'Explore', to: '/network/explore' },
      { label: 'Profile', to: '/network/profile' },
    ],
  },
  {
    label: 'Content',
    to: '/content',
    subItems: [
      { label: 'Posts', to: '/content/posts' },
      { label: 'Pages', to: '/content/pages' },
      { label: 'Tags', to: '/content/tags' },
      { label: 'Media', to: '/content/media' },
    ],
  },
  {
    label: 'Audience',
    to: '/audience',
    subItems: [
      { label: 'Members', to: '/audience/members' },
      { label: 'Comments', to: '/audience/comments' },
    ],
  },
  {
    label: 'Growth',
    to: '/growth',
    subItems: [
      { label: 'Automations', to: '/growth/automations' },
      { label: 'Offers', to: '/growth/offers' },
    ],
  },
]

export const SIDEBAR_WIDTH_PX = 240

export function Sidebar() {
  const { pathname } = useLocation()

  return (
    <aside
      style={{ width: SIDEBAR_WIDTH_PX }}
      className="fixed top-0 left-0 bottom-0 z-40 bg-background border-r border-border flex flex-col"
    >
      <NavLink
        to="/"
        className="h-[52px] flex items-center gap-3 px-6 border-b border-border text-foreground"
      >
        <Logomark />
        <span className="font-serif-headline text-[16px] leading-none tracking-[-0.01em]">
          Shmøergh
        </span>
      </NavLink>

      <nav className="flex-1 min-h-0 overflow-y-auto py-4">
        {SECTIONS.map((section) => (
          <SidebarSectionItem key={section.to} section={section} pathname={pathname} />
        ))}
      </nav>
    </aside>
  )
}

function isSectionActive(pathname: string, section: SidebarSection): boolean {
  return pathname === section.to || pathname.startsWith(`${section.to}/`)
}

function SidebarSectionItem({
  section,
  pathname,
}: {
  section: SidebarSection
  pathname: string
}) {
  const active = isSectionActive(pathname, section)

  return (
    <Fragment>
      <NavLink
        to={section.to}
        className={cn(
          'flex items-center h-9 px-6 transition-colors',
          active ? 't-nav-active' : 't-nav hover:t-nav-active',
        )}
      >
        <StableLabel>{section.label}</StableLabel>
      </NavLink>

      {active && section.subItems && (
        <div className="flex flex-col pb-2">
          {section.subItems.map((item) => (
            <SidebarSubItemRow key={item.to} item={item} />
          ))}
        </div>
      )}
    </Fragment>
  )
}

function SidebarSubItemRow({ item }: { item: SidebarSubItem }) {
  return (
    <NavLink
      to={item.to}
      end={item.end}
      className={({ isActive }) =>
        cn(
          'relative flex items-center h-8 pl-10 pr-4 transition-colors',
          'before:absolute before:left-0 before:top-1.5 before:bottom-1.5 before:w-[3px] before:transition-colors',
          isActive
            ? 't-nav-active before:bg-accent'
            : 't-nav hover:t-nav-active before:bg-transparent',
        )
      }
    >
      <StableLabel>{item.label}</StableLabel>
    </NavLink>
  )
}
