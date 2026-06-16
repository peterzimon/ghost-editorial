import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
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

const ANIM_MS = 280
const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'

// Solid white surface, but keep the same multi-layer shadow + insets used
// on the floating chrome pills so the lift and edge highlight match.
const PANEL_SHADOW =
  'inset 0 1px 0 rgba(255,255,255,0.55), inset 0 -1px 0 rgba(255,255,255,0.12), 0 0 0 0.5px rgba(0,0,0,0.06), 0 40px 60px -15px rgba(0,0,0,0.18), 0 12px 24px -8px rgba(0,0,0,0.1), 0 3px 8px rgba(0,0,0,0.04)'

/**
 * Dropdown command palette anchored over the bezel search field. Uses the
 * same liquid-glass treatment as the floating chrome pills, drops in with
 * a soft pop animation, and closes on any outside click.
 */
export function SearchPalette({ open, onClose }: SearchPaletteProps) {
  // Keep the palette mounted across the exit animation, then unmount.
  const [mounted, setMounted] = useState(open)
  const [closing, setClosing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setMounted(true)
      setClosing(false)
      return
    }
    if (!mounted) return
    setClosing(true)
    const id = window.setTimeout(() => setMounted(false), ANIM_MS)
    return () => window.clearTimeout(id)
  }, [open, mounted])

  useEffect(() => {
    if (!mounted || closing) return
    requestAnimationFrame(() => inputRef.current?.focus())
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mounted, closing, onClose])

  if (!mounted) return null

  // Portal to document.body so the palette escapes the bezel wrapper's
  // CSS transform. A transformed ancestor becomes the containing block
  // for fixed descendants, which would otherwise constrain the backdrop
  // and click-catcher to the 44px bezel area.
  return createPortal(
    <>
      {/* Visible dim — only below the bezel so the top bar stays crisp. */}
      <div
        aria-hidden
        className="fixed left-0 right-0 bottom-0 top-11 z-40 bg-black/25 backdrop-blur-[1px] pointer-events-none"
        style={{
          animation: `${closing ? 'palette-backdrop-out' : 'palette-backdrop-in'} ${ANIM_MS}ms ${EASE} forwards`,
        }}
      />

      {/* Invisible click-catcher covering the whole viewport — clicking
          anywhere outside the panel closes the palette. */}
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
      />

      {/* Outer wrapper handles horizontal centering — keeping the inner
          element's transform free to animate scale/translate cleanly.
          Offset 8px from the top so the panel doesn't snap to the viewport
          edge — input nests visually inside the bezel. */}
      <div
        className="fixed left-1/2 z-50 w-full max-w-[480px] -translate-x-1/2"
        style={{ top: 8 }}
      >
        <div
          role="dialog"
          aria-modal
          style={{
            transformOrigin: 'top center',
            animation: `${closing ? 'palette-out' : 'palette-in'} ${ANIM_MS}ms ${EASE} forwards`,
            boxShadow: PANEL_SHADOW,
          }}
          className="relative rounded-[10px] overflow-hidden bg-background border border-white/70"
        >
          {/* Generous 44px input row — sits 8px below the viewport edge so
              it nests inside the bezel rather than snapping to the top. */}
          <div className="relative flex items-center gap-3 px-4 h-11 border-b border-border">
            <Search className="size-4 text-muted shrink-0" strokeWidth={1.75} />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search posts, members, pages…"
              className="flex-1 min-w-0 bg-transparent outline-none placeholder:text-muted text-[14px]"
            />
            <span className="t-info text-muted">esc</span>
          </div>

          <div className="relative max-h-[60vh] overflow-y-auto py-2">
            {MOCK_RESULTS.map((group) => (
              <div key={group.label} className="py-2">
                <p className="t-info text-muted px-4 mb-1">{group.label}</p>
                {group.items.map((item) => (
                  <button
                    key={item.title}
                    type="button"
                    className="w-full flex items-center justify-between gap-4 px-4 h-10 hover:bg-row-hover transition-colors text-left cursor-pointer"
                    onClick={onClose}
                  >
                    <span className="text-[14px] font-medium text-foreground truncate">
                      {item.title}
                    </span>
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
    </>,
    document.body,
  )
}
