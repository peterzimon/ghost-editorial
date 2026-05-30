import { READER_CATEGORIES, type ReaderCategory } from './reader-data'
import { cn } from '@/lib/cn'

interface ReaderCategoryPillsProps {
  active: ReaderCategory
  onChange: (c: ReaderCategory) => void
}

export function ReaderCategoryPills({ active, onChange }: ReaderCategoryPillsProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 -mb-2">
      {READER_CATEGORIES.map((category) => {
        const isActive = category === active
        return (
          <button
            key={category}
            type="button"
            onClick={() => onChange(category)}
            className={cn(
              'h-9 px-5 rounded-full text-[13px] font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer',
              isActive
                ? 'bg-foreground text-white'
                : 'bg-elevated text-foreground hover:bg-control-hover',
            )}
          >
            {category}
          </button>
        )
      })}
    </div>
  )
}
