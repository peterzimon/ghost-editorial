import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/cn'
import { StableLabel } from './stable-label'

export type SubNavItem = {
  label: string
  to: string
  /** If true, only matches when route is exactly this path (default false = startsWith). */
  end?: boolean
}

interface SubNavProps {
  leftItems: SubNavItem[]
  rightItems?: SubNavItem[]
}

export function SubNav({ leftItems, rightItems = [] }: SubNavProps) {
  return (
    <div className="h-[52px] flex items-center justify-between px-10 w-full">
      <div className="flex items-center h-full gap-6">
        {leftItems.map((item) => (
          <SubNavLink key={item.to} item={item} />
        ))}
      </div>
      {rightItems.length > 0 && (
        <div className="flex items-center h-full gap-6">
          {rightItems.map((item) => (
            <SubNavLink key={item.to} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}

function SubNavLink({ item }: { item: SubNavItem }) {
  return (
    <NavLink
      to={item.to}
      end={item.end}
      className={({ isActive }) =>
        cn('whitespace-nowrap h-full flex items-center transition-colors hover:t-nav-active', isActive ? 't-nav-active' : 't-nav')
      }
    >
      <StableLabel>{item.label}</StableLabel>
    </NavLink>
  )
}
