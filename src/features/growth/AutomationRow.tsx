import { ListRow } from '@/components/patterns/list-row'
import { formatRelativeDate } from '@/lib/formatRelativeDate'
import { cn } from '@/lib/cn'
import type { Automation } from './mockAutomations'

export function AutomationRow({ automation }: { automation: Automation }) {
  const Icon = automation.icon
  const isActive = automation.status === 'active'

  return (
    <ListRow className="flex gap-2 items-center py-4">
      <div className="flex-1 min-w-0 flex gap-[14px] items-center">
        <div
          className="size-8 shrink-0 flex items-center justify-center text-foreground"
          style={{ backgroundColor: automation.iconBg }}
        >
          <Icon className="size-4" strokeWidth={1.75} />
        </div>
        <p className="text-[14px] font-medium text-foreground truncate">{automation.name}</p>
      </div>
      <p className="flex-1 min-w-0 text-[12px] text-foreground">{automation.trigger}</p>
      <div className="flex-1 min-w-0 flex items-center gap-2">
        <span className={cn('size-2', isActive ? 'bg-positive' : 'bg-muted')} aria-hidden />
        <span
          className={cn(
            't-info',
            isActive ? 'text-positive' : 'text-muted',
          )}
        >
          {isActive ? 'Active' : 'Paused'}
        </span>
      </div>
      <p className="flex-1 min-w-0 text-[12px] text-foreground">
        {formatRelativeDate(automation.lastRun)}
      </p>
    </ListRow>
  )
}
