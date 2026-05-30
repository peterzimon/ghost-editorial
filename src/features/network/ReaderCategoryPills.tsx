import { READER_CATEGORIES, type ReaderCategory } from './reader-data'
import { cn } from '@/lib/cn'

interface ReaderCategoryPillsProps {
  active: ReaderCategory
  onChange: (c: ReaderCategory) => void
}

export function ReaderCategoryPills({ active, onChange }: ReaderCategoryPillsProps) {
  return (
    <div className="relative -mx-10">
      <div className="flex items-center gap-2 overflow-x-auto px-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {READER_CATEGORIES.map((category) => {
          const isActive = category === active
          return (
            <button
              key={category}
              type="button"
              onClick={() => onChange(category)}
              className={cn(
                'h-9 px-5 rounded-full t-button whitespace-nowrap shrink-0 transition-colors cursor-pointer',
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
      {/* Edge fades — sit on the page gutter when scroll is at the extremes, fade pills when scrolling. */}
      <div className="pointer-events-none absolute top-0 left-0 h-full w-10 bg-[linear-gradient(to_right,var(--color-background),transparent)]" />
      <div className="pointer-events-none absolute top-0 right-0 h-full w-10 bg-[linear-gradient(to_left,var(--color-background),transparent)]" />
    </div>
  )
}
