import { useEffect, useState } from 'react'
import { ChevronLeft, MoreHorizontal } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { mockPosts } from './mockPosts'

const HEADER_ANIM_MS = 520
const HEADER_EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'

const BODY_PARAGRAPHS = [
  'There’s a particular kind of quiet that settles over a desk in the early hours, before the inbox catches up. The light is flatter, the keyboard sounds louder, and the day hasn’t yet decided what it wants from you. It’s the only window I’ve found where the writing comes out roughly the shape it was in my head.',
  'For a long time I treated this hour as overhead — a warm-up before the “real” work started. What changed was noticing how often the warm-up was the only thing I’d remember at the end of the week. The meetings blurred. The Slack threads blurred. The two paragraphs I drafted at 7am stayed.',
  'So the rule now is simple: nothing else goes in this slot. No standups, no “quick reviews,” no preparing for the day. Whatever I write here doesn’t have to be good, it doesn’t have to ship, it doesn’t have to connect to anything I’m officially working on. It just has to be written before the rest of the day asks for its share.',
  'Most mornings the output is forgettable. Some mornings it isn’t. The interesting part is that I can’t tell in advance which kind of morning I’m about to have — and that turns out to be the whole argument for showing up.',
]

export function PostEditorPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const post = mockPosts.find((p) => p.id === id)
  const title = post?.title?.trim() ? post.title : 'Untitled'

  const [entered, setEntered] = useState(false)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const t = window.setTimeout(() => setEntered(true), HEADER_ANIM_MS)
    return () => window.clearTimeout(t)
  }, [])

  const handleBack = () => {
    setLeaving(true)
    window.setTimeout(() => navigate('/content/posts'), HEADER_ANIM_MS)
  }

  const headerHidden = !entered || leaving

  return (
    <div className="h-full bg-background flex flex-col">
      <header
        className="fixed top-0 left-0 right-0 z-50 h-[52px] flex items-center justify-between px-10 bg-background"
        style={{
          transform: headerHidden ? 'translateY(-100%)' : 'translateY(0)',
          transitionProperty: 'transform',
          transitionDuration: `${HEADER_ANIM_MS}ms`,
          transitionTimingFunction: HEADER_EASE,
        }}
      >
        <button
          type="button"
          onClick={handleBack}
          aria-label="Back to posts"
          className="size-8 -ml-2 flex items-center justify-center text-muted hover:text-foreground transition-colors cursor-pointer"
        >
          <ChevronLeft className="size-5" strokeWidth={1.5} />
        </button>

        <div className="flex items-center gap-3 -mr-2">
          <button
            type="button"
            aria-label="More actions"
            className="size-8 flex items-center justify-center text-muted hover:text-foreground transition-colors cursor-pointer"
          >
            <MoreHorizontal className="size-4" />
          </button>
          <Button variant="ghost">Preview</Button>
          <Button variant="primary">Publish</Button>
        </div>
      </header>

      <main className="flex-1 min-h-0 w-full bg-background overflow-auto">
        <article className="max-w-[720px] mx-auto px-10 pt-[140px] pb-32">
          <h1 className="t-h1 text-foreground">{title}</h1>
          <div className="mt-10 flex flex-col gap-6">
            {BODY_PARAGRAPHS.map((p, i) => (
              <p key={i} className="text-foreground text-[18px] leading-[1.65]">
                {p}
              </p>
            ))}
          </div>
        </article>
      </main>
    </div>
  )
}
