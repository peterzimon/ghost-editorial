import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface SlotProps {
  children?: ReactNode
  className?: string
}

function Page({ children, className }: SlotProps) {
  return <div className={cn('flex flex-col -mt-2', className)}>{children}</div>
}

function PageHeader({ children, className }: SlotProps) {
  return (
    <div className={cn('flex items-baseline gap-5 pb-8 border-b border-border', className)}>
      {children}
    </div>
  )
}

function PageTitle({ children, className }: SlotProps) {
  return <h1 className={cn('flex-1 t-h1', className)}>{children}</h1>
}

function PageActions({ children, className }: SlotProps) {
  return <div className={cn('flex items-center gap-3', className)}>{children}</div>
}

function PageContent({ children, className }: SlotProps) {
  return <div className={cn('flex flex-col pb-10', className)}>{children}</div>
}

Page.Header = PageHeader
Page.Title = PageTitle
Page.Actions = PageActions
Page.Content = PageContent

export { Page }
