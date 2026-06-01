import { useId, useState } from 'react'
import type { MemberNewsletter } from './member-subscriptions-data'
import { cn } from '@/lib/cn'

export function MemberNewsletters({ newsletters }: { newsletters: MemberNewsletter[] }) {
  return (
    <div className="flex flex-col mt-6 border-t border-border">
      {newsletters.map((nl) => (
        <NewsletterRow key={nl.id} newsletter={nl} />
      ))}
    </div>
  )
}

function NewsletterRow({ newsletter }: { newsletter: MemberNewsletter }) {
  const [on, setOn] = useState(newsletter.subscribed)
  const id = useId()
  return (
    <div className="flex items-center gap-6 py-5 border-b border-border">
      <div className="flex-1 min-w-0 flex flex-col gap-1">
        <label htmlFor={id} className="text-foreground text-[15px] font-medium cursor-pointer">
          {newsletter.name}
        </label>
        <p className="t-byline text-muted">{newsletter.description}</p>
      </div>
      <Toggle id={id} checked={on} onChange={setOn} />
    </div>
  )
}

interface ToggleProps {
  id?: string
  checked: boolean
  onChange: (next: boolean) => void
  label?: string
}

function Toggle({ id, checked, onChange, label }: ToggleProps) {
  return (
    <label className="relative inline-flex items-center cursor-pointer shrink-0">
      <input
        id={id}
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        aria-label={label}
      />
      <span
        className={cn(
          'w-8 h-4 rounded-full transition-colors',
          checked ? 'bg-foreground' : 'bg-control-hover',
        )}
      />
      <span
        className={cn(
          'absolute top-0.5 left-0.5 size-3 rounded-full bg-background transition-transform',
          checked && 'translate-x-4',
        )}
      />
    </label>
  )
}
