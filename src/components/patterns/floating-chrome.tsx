import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { LogOut, Settings, User } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Logomark } from './logomark'
import { SearchPalette } from './search-palette'
import { SITE_MENU_WIDTH_PX, SiteMenu } from './site-menu'
import { cn } from '@/lib/cn'

/**
 * Floating chrome layer: a logo+wordmark anchor top-left that reveals the
 * site menu on hover, an invisible full-height hot zone along the left edge
 * that also triggers the menu, and an avatar dropdown top-right. Hosts the
 * global Cmd+K search palette listener.
 */
export function FloatingChrome() {
  const [siteMenuOpen, setSiteMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const closeTimer = useRef<number | undefined>(undefined)
  const { pathname } = useLocation()

  // When the route changes, a layout shift inside the panel (sub-items
  // expanding/collapsing) can fire a synthetic mouseleave even though the
  // cursor never really left. Cancel any pending close so the panel doesn't
  // flicker shut and reopen via the hot zone.
  useEffect(() => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current)
      closeTimer.current = undefined
    }
  }, [pathname])

  // Cmd+K toggles the search palette
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearchOpen((v) => !v)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Cleanup pending timer on unmount
  useEffect(
    () => () => {
      if (closeTimer.current) window.clearTimeout(closeTimer.current)
    },
    [],
  )

  const open = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current)
      closeTimer.current = undefined
    }
    setSiteMenuOpen(true)
  }
  const scheduleClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => {
      setSiteMenuOpen(false)
      closeTimer.current = undefined
    }, 120)
  }

  return (
    <>
      {/* Hot zone — slim invisible strip along the left edge of the viewport,
          so hovering anywhere on the left reveals the menu. Sits behind the
          logo+panel wrapper. */}
      <div
        className="fixed top-0 left-0 bottom-0 z-30"
        style={{ width: 'clamp(40px, calc((100vw - 1280px) / 2 + 40px), 160px)' }}
        onMouseEnter={open}
        onMouseLeave={scheduleClose}
      />

      {/* Top-left: hover-driven site menu. The wrapper itself has
          pointer-events-none so only the visible children (logo always, panel
          when open) capture hover — empty interior space falls through to the
          page below. */}
      <div className="fixed top-4 left-4 z-40 pointer-events-none">
        {/* Logo — always visible, sits on top of the panel. px-6 puts the
            Logomark at viewport x = 16 + 24 = 40, matching the nav items
            (panel px-3 + item px-3 = 24 + 16 = 40). */}
        <div
          onMouseEnter={open}
          onMouseLeave={scheduleClose}
          className="pointer-events-auto relative z-10 h-[52px] flex items-center gap-2 px-6 text-foreground"
        >
          <Logomark />
          <span className="font-serif-headline text-[18px] font-[500] leading-none tracking-[-0.01em]">
            Shmøergh
          </span>
        </div>

        {/* Panel — fades + slides on hover. Pointer events are toggled with
            opacity so the closed panel doesn't intercept hover on empty space. */}
        <div
          onMouseEnter={open}
          onMouseLeave={scheduleClose}
          style={{ width: SITE_MENU_WIDTH_PX }}
          className={cn(
            'relative z-0 -mt-[52px] rounded-[16px] bg-white/70 backdrop-blur-md px-3 pt-[80px] pb-4 shadow-[0_0_0.5px_rgba(0,0,0,0.35),0_100px_40px_rgba(0,0,0,0.07),0_42px_17px_rgba(0,0,0,0.05),0_22px_9px_rgba(0,0,0,0.04),0_13px_5px_rgba(0,0,0,0.04),0_7px_3px_rgba(0,0,0,0.03),0_3px_1px_rgba(0,0,0,0.02)] transition duration-200 ease-out',
            siteMenuOpen
              ? 'opacity-100 translate-x-0 pointer-events-auto'
              : 'opacity-0 -translate-x-2 pointer-events-none',
          )}
        >
          <SiteMenu />
        </div>
      </div>

      {/* Top-right: avatar / user menu. right-10 (40px) mirrors the logomark's
          40px left inset so the top corners feel balanced. */}
      <div className="fixed top-4 right-10 z-40">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              aria-label="User menu"
              className="size-8 flex items-center justify-center bg-[#e0e4ff] cursor-pointer rounded-full"
            >
              <span className="font-mono text-[12px] font-medium uppercase tracking-[0.03em] text-[#4f4ca8]">
                Z
              </span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" align="end">
            <DropdownMenuItem>
              <User className="size-4" />
              <span>Account</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="size-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LogOut className="size-4" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <SearchPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
