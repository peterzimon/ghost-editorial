import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface SectionHeadingProps {
  children: ReactNode
  className?: string
}

/**
 * Inter Display, medium, 21px, ~-1.3% letter-spacing.
 * Use for section/group headings inside a page (one step below the page H1).
 */
export function SectionHeading({ children, className }: SectionHeadingProps) {
  return (
    <h2 className={cn('t-post-title text-foreground pb-4 border-b border-border', className)}>
      {children}
    </h2>
  )
}
