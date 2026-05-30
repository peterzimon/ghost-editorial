import { Bell, Search, SlidersHorizontal } from 'lucide-react'

const NOTIFICATION_COUNT = 3

export function NetworkSubNavRight() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 h-8 px-3 rounded-full bg-elevated">
        <Search className="size-3.5 text-muted shrink-0" />
        <input
          type="text"
          placeholder="Search the social web"
          className="bg-transparent outline-none text-[12px] text-foreground placeholder:text-muted w-[200px]"
        />
      </div>
      <button
        type="button"
        aria-label={`Notifications (${NOTIFICATION_COUNT} unread)`}
        className="relative size-8 flex items-center justify-center text-muted hover:text-foreground transition-colors cursor-pointer"
      >
        <Bell className="size-4" />
        <span className="absolute top-0.5 right-0 min-w-[16px] h-4 px-1 flex items-center justify-center rounded-full bg-accent text-white text-[10px] font-semibold leading-none">
          {NOTIFICATION_COUNT}
        </span>
      </button>
      <button
        type="button"
        aria-label="Preferences"
        className="size-8 flex items-center justify-center text-muted hover:text-foreground transition-colors cursor-pointer"
      >
        <SlidersHorizontal className="size-4" />
      </button>
    </div>
  )
}
