import type { MouseEvent, ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface ListRowProps {
  children: ReactNode
  onClick?: (e: MouseEvent<HTMLDivElement>) => void
  className?: string
}

/**
 * Reusable row wrapper for editorial list patterns (Posts, Members, Reader, etc).
 *
 * Visual behaviors:
 * - Hover background extends 32px past the row's natural left/right edges into
 *   the parent's padding (so content stays aligned with the page title but the
 *   highlight breathes wider).
 * - A 1px bottom divider sits inset 32px on each side so dividers line up with
 *   the title separator, not the wider hover bg.
 * - On hover the row's own divider hides; via `:has(+ [data-list-row]:hover)`
 *   the previous row's divider also hides — adjacent rows merge cleanly into
 *   the highlighted surface.
 *
 * Override extension/divider insets via className (tailwind-merge resolves
 * conflicting `-mx-*`, `px-*`, `after:left-*`, `after:right-*`). Use the `group`
 * class on the row to drive hover-reveal styles on children with `group-hover:`.
 */
export function ListRow({ children, onClick, className }: ListRowProps) {
  return (
    <div
      data-list-row
      onClick={onClick}
      className={cn(
        'group relative -mx-8 px-8',
        'hover:bg-row-hover transition-colors cursor-pointer',
        'after:content-[""] after:absolute after:left-8 after:right-8 after:bottom-0 after:h-px after:bg-border after:transition-opacity',
        'hover:after:opacity-0 has-[+[data-list-row]:hover]:after:opacity-0',
        className,
      )}
    >
      {children}
    </div>
  )
}
