import { useEffect, useLayoutEffect, useRef, useState } from 'react'
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

// Capsule morph — gentle overshoot so it grows a touch past size then settles
// back (the "bump"). Smooth, not snappy.
const BUMP = 'cubic-bezier(0.34, 1.45, 0.5, 1)'
// Nav unfurl — buttery decelerating ease, no overshoot (overshooting the
// grid-rows height would briefly over-expand the content area).
const SPRING = 'cubic-bezier(0.16, 1, 0.3, 1)'

/**
 * Floating chrome layer. The logo lives inside a frosted "liquid glass"
 * capsule top-left; on hover the capsule morphs (grows + the nav unfurls)
 * into the full site menu. A slim hot zone along the left edge also opens it.
 * Avatar dropdown top-right. Hosts the global Cmd+K search palette listener.
 */
export function FloatingChrome() {
  const [siteMenuOpen, setSiteMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const closeTimer = useRef<number | undefined>(undefined)
  const { pathname } = useLocation()

  // Measure the logo's natural width so the closed capsule hugs it exactly
  // (and the width can animate to the open panel width).
  const logoRef = useRef<HTMLDivElement>(null)
  const [closedWidth, setClosedWidth] = useState<number>()
  useLayoutEffect(() => {
    // +2 for the capsule's 1px border on each side so the closed pill doesn't
    // clip the wordmark.
    if (logoRef.current) setClosedWidth(logoRef.current.offsetWidth + 2)
  }, [])

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
      {/* Hot zone — invisible strip along the left edge that scales with the
          page gutter, so hovering the left side of the page reveals the menu. */}
      <div
        className="fixed top-0 left-0 bottom-0 z-30"
        style={{ width: 'clamp(40px, calc((100vw - 1280px) / 2 + 40px), 160px)' }}
        onMouseEnter={open}
        onMouseLeave={scheduleClose}
      />

      {/* Top-left: the liquid-glass capsule. Always visible as an affordance
          around the logo; morphs into the full menu on hover. */}
      <div
        onMouseEnter={open}
        onMouseLeave={scheduleClose}
        style={{
          width: siteMenuOpen ? SITE_MENU_WIDTH_PX : closedWidth,
          transitionProperty: 'width, border-radius',
          transitionDuration: '520ms',
          transitionTimingFunction: BUMP,
        }}
        className={cn(
          'fixed top-4 left-4 z-40 overflow-hidden',
          'bg-white/55 backdrop-blur-xl backdrop-saturate-150 border border-white/50',
          'shadow-[0_0_0.5px_rgba(0,0,0,0.35),0_40px_60px_-15px_rgba(0,0,0,0.18),0_12px_24px_-8px_rgba(0,0,0,0.1),0_3px_8px_rgba(0,0,0,0.04)]',
          siteMenuOpen ? 'rounded-[20px]' : 'rounded-[26px]',
        )}
      >
        {/* Logo — fixed height + content width so the capsule's width animation
            never stretches or compresses it. px-6 puts the Logomark at
            x = 16 + 24 = 40, matching the nav items below. */}
        <div
          ref={logoRef}
          className="relative h-[52px] w-max flex items-center gap-2 px-6 text-foreground"
        >
          <Logomark className="shrink-0" />
          <span className="shrink-0 whitespace-nowrap font-serif-headline text-[18px] font-[500] leading-none tracking-[-0.01em]">
            Shmøergh
          </span>
        </div>

        {/* Nav — unfurls via a grid-rows 0fr→1fr transition so it animates
            smoothly regardless of how tall the menu is on the active route. */}
        <div
          className="grid transition-[grid-template-rows] duration-[450ms]"
          style={{
            gridTemplateRows: siteMenuOpen ? '1fr' : '0fr',
            transitionTimingFunction: SPRING,
          }}
        >
          <div className="overflow-hidden">
            <div
              className={cn(
                'px-3 pt-2 pb-4 transition-opacity duration-200',
                siteMenuOpen ? 'opacity-100 delay-75' : 'opacity-0',
              )}
            >
              <SiteMenu />
            </div>
          </div>
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
