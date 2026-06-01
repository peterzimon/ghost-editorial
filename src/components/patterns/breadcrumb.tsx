import { Fragment } from 'react'
import { ChevronRight } from 'lucide-react'
import { NavLink } from 'react-router-dom'

export interface BreadcrumbItem {
  label: string
  /** If provided, renders as a link. Omit for the trailing (current) crumb. */
  to?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className="flex items-center gap-3">
      {items.map((item, i) => {
        const isLast = i === items.length - 1
        return (
          <Fragment key={`${item.label}-${i}`}>
            {item.to && !isLast ? (
              <NavLink to={item.to} className="t-nav hover:text-foreground transition-colors">
                {item.label}
              </NavLink>
            ) : (
              <span className={isLast ? 't-nav-active' : 't-nav'}>{item.label}</span>
            )}
            {!isLast && <ChevronRight className="size-3 text-muted shrink-0" strokeWidth={1.5} />}
          </Fragment>
        )
      })}
    </div>
  )
}
