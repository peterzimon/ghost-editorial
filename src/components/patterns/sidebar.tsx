import { Fragment } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  BadgePercent,
  FileText,
  Globe,
  Image,
  LogOut,
  MessageSquare,
  PenLine,
  Settings,
  Tag,
  TrendingUp,
  User,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Logomark } from './logomark'
import { StableLabel } from './stable-label'
import { cn } from '@/lib/cn'

interface SidebarSubItem {
  label: string
  to: string
  end?: boolean
}

interface SidebarLeaf {
  kind: 'leaf'
  label: string
  to: string
  end?: boolean
  icon: LucideIcon
  /** Sub-items shown indented when this leaf's route is active. */
  subItems?: SidebarSubItem[]
}

interface SidebarGroup {
  kind: 'group'
  label: string
  items: SidebarLeaf[]
}

type SidebarEntry = SidebarLeaf | SidebarGroup

const ENTRIES: SidebarEntry[] = [
  { kind: 'leaf', label: 'Analytics', to: '/analytics', icon: TrendingUp },
  { kind: 'leaf', label: 'Network', to: '/network', icon: Globe },
  {
    kind: 'group',
    label: 'Content',
    items: [
      {
        kind: 'leaf',
        label: 'Posts',
        to: '/content/posts',
        end: true,
        icon: PenLine,
        subItems: [
          { label: 'Drafts', to: '/content/posts/drafts' },
          { label: 'Scheduled', to: '/content/posts/scheduled' },
          { label: 'Published', to: '/content/posts/published' },
        ],
      },
      { kind: 'leaf', label: 'Pages', to: '/content/pages', icon: FileText },
      { kind: 'leaf', label: 'Tags', to: '/content/tags', icon: Tag },
      { kind: 'leaf', label: 'Media library', to: '/content/media', icon: Image },
    ],
  },
  {
    kind: 'group',
    label: 'Audience',
    items: [
      {
        kind: 'leaf',
        label: 'Members',
        to: '/audience/members',
        end: true,
        icon: User,
        subItems: [
          { label: 'VIP', to: '/audience/members/vip' },
          { label: 'Friends & Family', to: '/audience/members/friends' },
          { label: 'Early birds', to: '/audience/members/early-birds' },
        ],
      },
      { kind: 'leaf', label: 'Comments', to: '/audience/comments', icon: MessageSquare },
    ],
  },
  {
    kind: 'group',
    label: 'Growth',
    items: [
      { kind: 'leaf', label: 'Automations', to: '/growth/automations', icon: Zap },
      { kind: 'leaf', label: 'Offers', to: '/growth/offers', icon: BadgePercent },
    ],
  },
]

export const SIDEBAR_WIDTH_PX = 280

export function Sidebar() {
  const { pathname } = useLocation()

  return (
    <aside
      style={{ width: SIDEBAR_WIDTH_PX }}
      className="fixed top-0 left-0 bottom-0 z-40 bg-background flex flex-col"
    >
      <NavLink
        to="/"
        className="h-[100px] flex items-center px-10 text-foreground"
      >
        <span className="flex items-center gap-3">
          <Logomark />
          <span className="font-serif-headline text-[18px] font-[500] leading-none tracking-[-0.01em]">
            Shmøergh
          </span>
        </span>
      </NavLink>

      <nav className="flex-1 min-h-0 overflow-y-auto px-8 flex flex-col">
        {ENTRIES.map((entry, i) =>
          entry.kind === 'leaf' ? (
            <LeafItem key={`leaf-${i}`} leaf={entry} pathname={pathname} />
          ) : (
            <GroupBlock key={`group-${i}`} group={entry} pathname={pathname} />
          ),
        )}
      </nav>

      <div className="p-8">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              aria-label="User menu"
              className="size-8 flex items-center justify-center bg-[#e0e4ff] cursor-pointer rounded-[3px]"
            >
              <span className="font-mono text-[13px] font-medium uppercase tracking-[0.03em] text-[#4f4ca8]">
                Z
              </span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" align="start">
            <DropdownMenuItem>
              <User className="size-4" />
              <span>Account</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="size-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LogOut className="size-4" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  )
}

function GroupBlock({ group, pathname }: { group: SidebarGroup; pathname: string }) {
  return (
    <Fragment>
      <p className="t-info text-muted px-4 mt-6 mb-1 h-8 flex items-center">
        {group.label}
      </p>
      {group.items.map((leaf) => (
        <LeafItem key={leaf.to} leaf={leaf} pathname={pathname} />
      ))}
    </Fragment>
  )
}

function sectionExpanded(pathname: string, leaf: SidebarLeaf): boolean {
  if (!leaf.subItems) return false
  return pathname === leaf.to || pathname.startsWith(`${leaf.to}/`)
}

function LeafItem({ leaf, pathname }: { leaf: SidebarLeaf; pathname: string }) {
  const Icon = leaf.icon
  const expanded = sectionExpanded(pathname, leaf)

  return (
    <Fragment>
      <NavLink
        to={leaf.to}
        end={leaf.end}
        className={({ isActive }) =>
          cn(
            'flex items-center gap-3 h-8 px-4 rounded-[3px] transition-colors',
            isActive ? 'bg-elevated' : 'hover:bg-row-hover',
          )
        }
      >
        {({ isActive }) => (
          <>
            <Icon
              className={cn('size-4 shrink-0', isActive ? 'text-foreground' : 'text-muted')}
              strokeWidth={1.75}
            />
            <span
              className={cn(
                't-button text-foreground',
                isActive ? 'font-semibold' : 'font-medium',
              )}
            >
              <StableLabel>{leaf.label}</StableLabel>
            </span>
          </>
        )}
      </NavLink>

      {expanded && leaf.subItems && (
        <div className="flex flex-col">
          {leaf.subItems.map((item) => (
            <SubItemRow key={item.to} item={item} />
          ))}
        </div>
      )}
    </Fragment>
  )
}

function SubItemRow({ item }: { item: SidebarSubItem }) {
  return (
    <NavLink
      to={item.to}
      end={item.end}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-3 h-8 px-4 rounded-[3px] transition-colors',
          isActive ? 'bg-elevated' : 'hover:bg-row-hover',
        )
      }
    >
      {({ isActive }) => (
        <>
          <span className="size-4 shrink-0" aria-hidden />
          <span
            className={cn(
              't-button text-foreground',
              isActive ? 'font-semibold' : 'font-medium',
            )}
          >
            <StableLabel>{item.label}</StableLabel>
          </span>
        </>
      )}
    </NavLink>
  )
}
