import { Plus, X } from 'lucide-react'

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
    <div className="bg-elevated flex items-center justify-between gap-4 px-5 h-[52px]">
      <div className="flex items-center gap-2 flex-wrap">
        {chips.map((chip) => (
          <FilterChipPill key={chip.id} chip={chip} onRemove={() => onRemove(chip.id)} />
        ))}
        <button
          type="button"
          onClick={onAdd}
          aria-label="Add filter"
          className="size-7 flex items-center justify-center rounded-full text-foreground hover:bg-control-hover transition-colors cursor-pointer"
        >
          <Plus className="size-4" />
        </button>
      </div>
      <button
        type="button"
        onClick={onSaveView}
        className="t-button text-foreground px-3 py-2 cursor-pointer hover:bg-control-hover transition-colors"
      >
        Save view
      </button>
    </div>
  )
}

function FilterChipPill({ chip, onRemove }: { chip: FilterChip; onRemove: () => void }) {
  return (
    <div className="bg-background flex items-center h-7 rounded-[2px] text-[12px]">
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
