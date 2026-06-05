import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/cn'

export interface ViewTabItem {
  label: string
  to: string
  /** If true, only matches when route is exactly this path. */
  end?: boolean
}

interface ViewTabsProps {
  items: ViewTabItem[]
  className?: string
}

/**
 * Horizontal pill tabs for switching between views of the same page
 * (e.g. All posts / Drafts / Scheduled / Published). Route-driven.
 */
export function ViewTabs({ items, className }: ViewTabsProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          className={({ isActive }) =>
            cn(
              'inline-flex items-center justify-center h-9 px-5 rounded-full t-button whitespace-nowrap shrink-0 transition-colors cursor-pointer',
              isActive
                ? 'bg-foreground text-white'
                : 'bg-elevated text-foreground hover:bg-control-hover',
            )
          }
        >
          {item.label}
        </NavLink>
      ))}
    </div>
  )
}
