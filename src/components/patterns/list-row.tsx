import type { MouseEvent, ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface ListRowProps {
  children: ReactNode
  onClick?: (e: MouseEvent<HTMLDivElement>) => void
  className?: string
}

/**
 * Reusable row wrapper for list patterns (Posts, Members, Reader, etc).
 *
 * Classic table feel: the row spans the content area edge-to-edge, with a
 * small horizontal cell padding for content. Hover background and the 1px
 * bottom divider both fill the full row width, so they line up with the
 * page header sides. Adjacent dividers hide as you hover (current row
 * and the row above) so the highlight reads as one continuous surface.
 *
 * Use the `group` class on the row to drive hover-reveal styles on
 * children with `group-hover:`.
 */
export function ListRow({ children, onClick, className }: ListRowProps) {
  return (
    <div
      data-list-row
      onClick={onClick}
      className={cn(
        'group relative px-4',
        'hover:bg-row-hover transition-colors cursor-pointer',
        'after:content-[""] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-px after:bg-border after:transition-opacity',
        'hover:after:opacity-0 has-[+[data-list-row]:hover]:after:opacity-0',
        className,
      )}
    >
      {children}
    </div>
  )
}
