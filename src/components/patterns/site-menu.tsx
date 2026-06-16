import { Fragment } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  BadgePercent,
  FileText,
  Image,
  MessageSquare,
  PenLine,
  Tag,
  TrendingUp,
  User,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import { StableLabel } from './stable-label'
import { cn } from '@/lib/cn'

// TODO(pin): future iteration — add a pin toggle next to the wordmark that
// keeps this panel docked (re-introducing the old fixed sidebar behavior,
// re-applying a paddingLeft offset on Layout's outer wrapper).

interface SubItem {
  label: string
  to: string
  end?: boolean
}

interface Leaf {
  kind: 'leaf'
  label: string
  to: string
  end?: boolean
  icon: LucideIcon
  subItems?: SubItem[]
}

interface Group {
  kind: 'group'
  label: string
  items: Leaf[]
}

type Entry = Leaf | Group

const ENTRIES: Entry[] = [
  { kind: 'leaf', label: 'Analytics', to: '/analytics', icon: TrendingUp },
  {
    kind: 'group',
    label: 'Content',
    items: [
      {
        kind: 'leaf',
        label: 'Posts',
        to: '/content/posts',
        icon: PenLine,
        // Saved-view sub-items are surfaced under the page header as pills
        // now (see SavedViewsBar). Kept here, commented, in case we want to
        // bring them back into the sidebar.
        // end: true,
        // subItems: [
        //   { label: 'Drafts', to: '/content/posts/drafts' },
        //   { label: 'Scheduled', to: '/content/posts/scheduled' },
        //   { label: 'Published', to: '/content/posts/published' },
        // ],
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
        icon: User,
        // Saved-view sub-items moved into the SavedViewsBar below the page
        // header. Kept here, commented, in case we want them in the sidebar.
        // end: true,
        // subItems: [
        //   { label: 'VIP', to: '/audience/members/vip' },
        //   { label: 'Friends & Family', to: '/audience/members/friends' },
        //   { label: 'Early birds', to: '/audience/members/early-birds' },
        // ],
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

export const SITE_MENU_WIDTH_PX = 269

interface SiteMenuProps {
  /** Called when the user clicks the wordmark or any nav item — used by the floating chrome to close the panel. */
  onItemClick?: () => void
}

export function SiteMenu({ onItemClick }: SiteMenuProps) {
  const { pathname } = useLocation()

  return (
    <nav className="flex flex-col">
      {ENTRIES.map((entry, i) =>
        entry.kind === 'leaf' ? (
          <LeafItem key={`leaf-${i}`} leaf={entry} pathname={pathname} onClick={onItemClick} />
        ) : (
          <GroupBlock key={`group-${i}`} group={entry} pathname={pathname} onClick={onItemClick} />
        ),
      )}
    </nav>
  )
}

function GroupBlock({
  group,
  pathname,
  onClick,
}: {
  group: Group
  pathname: string
  onClick?: () => void
}) {
  return (
    <Fragment>
      <p className="t-info text-muted px-3 mt-6 mb-1 h-8 flex items-center">{group.label}</p>
      {group.items.map((leaf) => (
        <LeafItem key={leaf.to} leaf={leaf} pathname={pathname} onClick={onClick} />
      ))}
    </Fragment>
  )
}

function isExpanded(pathname: string, leaf: Leaf): boolean {
  if (!leaf.subItems) return false
  return pathname === leaf.to || pathname.startsWith(`${leaf.to}/`)
}

function LeafItem({
  leaf,
  pathname,
  onClick,
}: {
  leaf: Leaf
  pathname: string
  onClick?: () => void
}) {
  const Icon = leaf.icon
  const expanded = isExpanded(pathname, leaf)

  return (
    <Fragment>
      <NavLink
        to={leaf.to}
        end={leaf.end}
        onClick={onClick}
        className={({ isActive }) =>
          cn(
            'flex items-center gap-3 h-8 px-3 rounded-[4px] transition-colors',
            isActive ? 'bg-[rgba(160,160,160,0.15)]' : 'hover:bg-[rgba(160,160,160,0.08)]',
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
            <SubItemRow key={item.to} item={item} onClick={onClick} />
          ))}
        </div>
      )}
    </Fragment>
  )
}

function SubItemRow({ item, onClick }: { item: SubItem; onClick?: () => void }) {
  return (
    <NavLink
      to={item.to}
      end={item.end}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-3 h-8 px-3 rounded-[4px] transition-colors',
          isActive ? 'bg-[rgba(160,160,160,0.15)]' : 'hover:bg-[rgba(160,160,160,0.08)]',
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
