import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/cn'

export interface SavedViewItem {
  label: string
  to: string
  end?: boolean
}

interface SavedViewsBarProps {
  items: SavedViewItem[]
}

/**
 * Horizontal pill row of saved views — same look as the Reader category
 * pills but route-driven. Sits directly under the page header on list
 * pages (Posts, Members) and replaces the old sidebar sub-items.
 */
export function SavedViewsBar({ items }: SavedViewsBarProps) {
  return (
    <div className="border-y border-border">
      <div className="relative -mx-10">
        <div className="flex items-center gap-2 overflow-x-auto px-10 py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  'inline-flex items-center justify-center h-8 px-5 rounded-full t-button whitespace-nowrap shrink-0 transition-colors cursor-pointer',
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
        <div className="pointer-events-none absolute top-0 left-0 h-full w-10 bg-[linear-gradient(to_right,var(--color-background),transparent)]" />
        <div className="pointer-events-none absolute top-0 right-0 h-full w-10 bg-[linear-gradient(to_left,var(--color-background),transparent)]" />
      </div>
    </div>
  )
}
