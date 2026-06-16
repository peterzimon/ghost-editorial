import { AutomationRow } from './AutomationRow'
import { mockAutomations } from './mockAutomations'

const COLUMNS = ['Name', 'Trigger', 'Status', 'Last run'] as const

export function AutomationList() {
  return (
    <div className="flex flex-col w-full">
      <div className="flex gap-2 items-center h-[52px] px-4 py-4 border-b border-border t-info text-muted">
        {COLUMNS.map((label) => (
          <p key={label} className="flex-1 min-w-0">
            {label}
          </p>
        ))}
      </div>
      {mockAutomations.map((automation) => (
        <AutomationRow key={automation.id} automation={automation} />
      ))}
    </div>
  )
}
