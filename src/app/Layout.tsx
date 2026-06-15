import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { FloatingChrome } from '@/components/patterns/floating-chrome'
import { SITE_MENU_WIDTH_PX } from '@/components/patterns/site-menu'
import { cn } from '@/lib/cn'

// Left offset (16) + sidebar width + comfortable gap (16) before the content.
const PINNED_CONTENT_OFFSET_PX = 16 + SITE_MENU_WIDTH_PX + 16

export function Layout() {
  const { pathname } = useLocation()
  const fullBleed = pathname === '/site'
  const [pinned, setPinned] = useState(false)

  return (
    <div
      className="h-full bg-background"
      style={{
        paddingLeft: pinned && !fullBleed ? PINNED_CONTENT_OFFSET_PX : 0,
        transitionProperty: 'padding-left',
        transitionDuration: '520ms',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <FloatingChrome pinned={pinned} onPinChange={setPinned} />
      <main
        className={cn(
          'w-full',
          fullBleed
            ? 'h-full'
            : 'relative min-h-full max-w-[1080px] min-[1380px]:max-w-[1280px] mx-auto px-10 pt-[max(100px,4vw)]',
        )}
      >
        <Outlet />
      </main>
    </div>
  )
}
