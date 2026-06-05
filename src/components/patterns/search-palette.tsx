import { useEffect, useRef } from 'react'
import { Search } from 'lucide-react'

interface SearchPaletteProps {
  open: boolean
  onClose: () => void
}

interface ResultGroup {
  label: string
  items: { title: string; meta?: string }[]
}

const MOCK_RESULTS: ResultGroup[] = [
  {
    label: 'Posts',
    items: [
      { title: 'On craft, attention, and slow returns', meta: 'Published · 2 days ago' },
      { title: 'A new rhythm for the newsletter', meta: 'Draft' },
      { title: 'Notes from the field, vol. 7', meta: 'Scheduled · Fri 9am' },
    ],
  },
  {
    label: 'Members',
    items: [
      { title: 'Leo George', meta: 'leo@example.com' },
      { title: 'Maren Calzoni', meta: 'maren@example.com' },
    ],
  },
  {
    label: 'Pages',
    items: [{ title: 'About', meta: '/about' }],
  },
]

export function SearchPalette({ open, onClose }: SearchPaletteProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    // focus the input after mount
    requestAnimationFrame(() => inputRef.current?.focus())
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      aria-modal
      role="dialog"
      className="fixed inset-0 z-50 flex items-start justify-center pt-[14vh] bg-black/30 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[640px] bg-background rounded-[6px] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.25)] border border-border overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-5 h-14 border-b border-border">
          <Search className="size-4 text-muted shrink-0" strokeWidth={1.75} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search posts, members, pages…"
            className="flex-1 min-w-0 bg-transparent outline-none placeholder:text-muted text-[15px] font-medium"
          />
          <span className="t-info text-muted">esc</span>
        </div>

        <div className="max-h-[60vh] overflow-y-auto py-2">
          {MOCK_RESULTS.map((group) => (
            <div key={group.label} className="py-2">
              <p className="t-info text-muted px-5 mb-1">{group.label}</p>
              {group.items.map((item) => (
                <button
                  key={item.title}
                  type="button"
                  className="w-full flex items-center justify-between gap-4 px-5 h-10 hover:bg-row-hover transition-colors text-left"
                  onClick={onClose}
                >
                  <span className="t-button font-medium text-foreground truncate">{item.title}</span>
                  {item.meta && (
                    <span className="t-info text-muted shrink-0">{item.meta}</span>
                  )}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
