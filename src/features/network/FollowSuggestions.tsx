import { ArrowRight, Globe, Plus } from 'lucide-react'

interface Suggestion {
  id: string
  name: string
  handle: string
  initial: string
  bg: string
}

const SUGGESTIONS: Suggestion[] = [
  { id: 's1', name: 'Artistic Display',  handle: '@index@artisticdisplayny.com', initial: 'A', bg: '#f3f3f2' },
  { id: 's2', name: 'Ailyn Eida Brands', handle: '@index@ailyneida.com',         initial: 'A', bg: '#ffdbe7' },
  { id: 's3', name: 'eniki.studio',      handle: '@index@eniki.studio',          initial: 'e', bg: '#191919' },
  { id: 's4', name: 'Sasha Pohlmann',    handle: '@sashap@mastodon.social',      initial: 'S', bg: '#ceedf3' },
  { id: 's5', name: 'Field Notes',       handle: '@field@notes.zone',            initial: 'F', bg: '#eae9c7' },
]

export function FollowSuggestions() {
  return (
    <aside className="pl-10 pt-6 flex flex-col gap-6 sticky top-[68px] self-start">
      <header className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <Globe className="size-4 text-foreground" />
          <h3 className="text-foreground font-semibold text-[15px]">Follow suggestions</h3>
        </div>
        <p className="t-byline text-muted">Accounts you might be interested in</p>
      </header>

      <ul className="flex flex-col gap-5">
        {SUGGESTIONS.map((s) => (
          <li key={s.id} className="flex items-center gap-3">
            <div className="relative size-10 shrink-0">
              <div
                className="size-10 rounded-full flex items-center justify-center text-foreground font-semibold text-[14px]"
                style={{ backgroundColor: s.bg, color: s.bg === '#191919' ? '#ffffff' : undefined }}
              >
                {s.initial}
              </div>
              <button
                type="button"
                aria-label={`Follow ${s.name}`}
                className="absolute -bottom-0.5 -right-0.5 size-5 rounded-full bg-foreground text-white flex items-center justify-center hover:bg-foreground/85 transition-colors cursor-pointer"
              >
                <Plus className="size-3" strokeWidth={2.25} />
              </button>
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <p className="text-foreground font-medium text-[14px] truncate">{s.name}</p>
              <p className="text-muted text-[13px] truncate">{s.handle}</p>
            </div>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="self-start t-button text-foreground hover:text-muted transition-colors cursor-pointer flex items-center gap-2"
      >
        Find more
        <ArrowRight className="size-3" />
      </button>
    </aside>
  )
}
