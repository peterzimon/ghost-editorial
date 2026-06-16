import { Plus, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export interface FilterChip {
  id: string
  field: string
  value: string
}

interface FilterBarProps {
  chips: FilterChip[]
  onAdd: () => void
  onRemove: (id: string) => void
  onSaveView?: () => void
}

export function FilterBar({ chips, onAdd, onRemove, onSaveView }: FilterBarProps) {
  return (
    <div className="bg-elevated flex items-center justify-between gap-4 px-3 h-[52px] rounded-[8px]">
      <div className="flex items-center gap-2 flex-wrap">
        {chips.map((chip) => (
          <FilterChipPill key={chip.id} chip={chip} onRemove={() => onRemove(chip.id)} />
        ))}
        <button
          type="button"
          onClick={onAdd}
          aria-label="Add filter"
          className="size-7 flex items-center justify-center rounded-full text-foreground hover:bg-background transition-colors cursor-pointer"
        >
          <Plus className="size-4" />
        </button>
      </div>
      {onSaveView && (
        <Button variant="secondary" onClick={onSaveView}>
          Save view
        </Button>
      )}
    </div>
  )
}

function FilterChipPill({ chip, onRemove }: { chip: FilterChip; onRemove: () => void }) {
  return (
    <div className="bg-background flex items-center h-7 rounded-[6px] text-[12px]">
      <span className="px-3 text-foreground">{chip.field}</span>
      <span className="px-2 text-muted border-l border-r border-border h-full flex items-center">
        is
      </span>
      <div className="flex items-center gap-1 px-3">
        <span className="text-foreground">{chip.value}</span>
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${chip.field} filter`}
          className="text-muted hover:text-foreground transition-colors cursor-pointer flex items-center"
        >
          <X className="size-3" />
        </button>
      </div>
    </div>
  )
}
