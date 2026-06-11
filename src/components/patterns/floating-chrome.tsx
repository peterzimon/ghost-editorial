import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { LogOut, Settings, User } from 'lucide-react'
import { Logomark } from './logomark'
import { SearchPalette } from './search-palette'
import { SITE_MENU_WIDTH_PX, SiteMenu } from './site-menu'
import { cn } from '@/lib/cn'

// Capsule morph — gentle overshoot so it grows a touch past size then settles
// back (the "bump"). Smooth, not snappy.
const BUMP = 'cubic-bezier(0.34, 1.45, 0.5, 1)'
// Content unfurl — buttery decelerating ease, no overshoot (overshooting the
// grid-rows height would briefly over-expand the content area).
const SPRING = 'cubic-bezier(0.16, 1, 0.3, 1)'

// 54 (not 52) so the closed pill's width matches its auto height — the 52px
// avatar row plus the 1px border top/bottom — making it a perfect circle.
const AVATAR_PILL_PX = 54
const AVATAR_PILL_PX_COMPACT = 46
const USER_MENU_WIDTH_PX = 232

/** Shared glass treatment for both capsules. */
const GLASS =
  'bg-white/55 backdrop-blur-xl backdrop-saturate-150 border border-white/50 ' +
  'shadow-[0_0_0.5px_rgba(0,0,0,0.35),0_40px_60px_-15px_rgba(0,0,0,0.18),0_12px_24px_-8px_rgba(0,0,0,0.1),0_3px_8px_rgba(0,0,0,0.04)]'

/**
 * Hover-intent open/close with a small close delay so the cursor can travel
 * from the trigger into the panel without the panel flickering shut.
 */
function useHoverIntent() {
  const [open, setOpen] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  const cancel = () => {
    if (timer.current) {
      window.clearTimeout(timer.current)
      timer.current = undefined
    }
  }
  const onEnter = () => {
    cancel()
    setOpen(true)
  }
  const onLeave = () => {
    cancel()
    timer.current = window.setTimeout(() => {
      setOpen(false)
      timer.current = undefined
    }, 120)
  }

  useEffect(() => cancel, [])

  return { open, onEnter, onLeave, cancel }
}

/**
 * Floating chrome layer. Two frosted "liquid glass" capsules: the logo
 * top-left morphs into the site menu on hover (a left-edge hot zone also
 * opens it); the avatar top-right morphs into the user menu on hover. Hosts
 * the global Cmd+K search palette listener.
 */
export function FloatingChrome() {
  const [searchOpen, setSearchOpen] = useState(false)
  const { pathname } = useLocation()

  const site = useHoverIntent()
  const userMenu = useHoverIntent()

  // Compact mode below 1380px — shrinks the pills + matches the smaller
  // page title. Tracked in JS so closedWidth / avatar width stay in sync.
  const [compact, setCompact] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1379px)')
    setCompact(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setCompact(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const pillRowH = compact ? 44 : 52
  const avatarPillW = compact ? AVATAR_PILL_PX_COMPACT : AVATAR_PILL_PX
  const closedRadius = compact ? 23 : 27
  const openRadius = compact ? 16 : 20
  const logoPxClass = compact ? 'px-5' : 'px-6'
  const avatarSizeClass = compact ? 'size-7' : 'size-8'

  // Measure the logo's natural width so the closed capsule hugs it exactly
  // (and the width can animate to the open panel width). +2 for the 1px border
  // on each side so the closed pill doesn't clip the wordmark. Re-measures
  // when compact mode flips (logo row height/padding changes).
  const logoRef = useRef<HTMLDivElement>(null)
  const [closedWidth, setClosedWidth] = useState<number>()
  useLayoutEffect(() => {
    if (logoRef.current) setClosedWidth(logoRef.current.offsetWidth + 2)
  }, [compact])

  // When the route changes, a layout shift inside the panel (sub-items
  // expanding/collapsing) can fire a synthetic mouseleave even though the
  // cursor never really left. Cancel any pending close so the panel doesn't
  // flicker shut and reopen via the hot zone.
  useEffect(() => {
    site.cancel()
  }, [pathname]) // eslint-disable-line react-hooks/exhaustive-deps

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

  return (
    <>
      {/* Hot zone — invisible strip along the left edge that scales with the
          page gutter, so hovering the left side of the page reveals the menu. */}
      <div
        className="fixed top-0 left-0 bottom-0 z-30"
        style={{ width: 'clamp(40px, calc((100vw - 1280px) / 2 + 40px), 160px)' }}
        onMouseEnter={site.onEnter}
        onMouseLeave={site.onLeave}
      />

      {/* Top-left: the liquid-glass site-menu capsule. Always visible as an
          affordance around the logo; morphs into the full menu on hover. */}
      <div
        onMouseEnter={site.onEnter}
        onMouseLeave={site.onLeave}
        style={{
          width: site.open ? SITE_MENU_WIDTH_PX : closedWidth,
          borderRadius: site.open ? openRadius : closedRadius,
          transitionProperty: 'width, border-radius',
          transitionDuration: '520ms',
          // Bump in both directions — the slight dip on close reads fine here.
          transitionTimingFunction: BUMP,
        }}
        className={cn('fixed top-4 left-4 z-40 overflow-hidden', GLASS)}
      >
        {/* Logo — fixed height + content width so the capsule's width animation
            never stretches or compresses it. px-6 puts the Logomark at
            x = 16 + 24 = 40, matching the nav items below. */}
        <div
          ref={logoRef}
          style={{ height: pillRowH }}
          className={cn(
            'relative w-max flex items-center gap-2 text-foreground',
            logoPxClass,
          )}
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
            gridTemplateRows: site.open ? '1fr' : '0fr',
            transitionTimingFunction: SPRING,
          }}
        >
          <div className="overflow-hidden">
            <div
              className={cn(
                'px-3 pt-2 pb-4 transition-opacity duration-200',
                site.open ? 'opacity-100 delay-75' : 'opacity-0',
              )}
            >
              <SiteMenu />
            </div>
          </div>
        </div>
      </div>

      {/* Top-right: the liquid-glass user-menu capsule. Closed it's a circle
          hugging the avatar; on hover it morphs into the user menu, growing
          leftward from the fixed right edge. */}
      <div
        onMouseEnter={userMenu.onEnter}
        onMouseLeave={userMenu.onLeave}
        style={{
          width: userMenu.open ? USER_MENU_WIDTH_PX : avatarPillW,
          borderRadius: userMenu.open ? openRadius : closedRadius,
          transitionProperty: 'width, border-radius',
          transitionDuration: '520ms',
          // Overshoot only while opening; close on the smooth curve so the
          // width never dips below the avatar circle (which would clip it).
          transitionTimingFunction: userMenu.open ? BUMP : SPRING,
        }}
        className={cn('fixed top-4 right-4 z-40 overflow-hidden', GLASS)}
      >
        {/* Avatar row — fixed 52px circle band. Avatar sits on the left and
            travels leftward with the growing capsule; the name block to its
            right fades in once the capsule is open. */}
        <div
          style={{ height: pillRowH }}
          className="flex items-center gap-3 px-[10px]"
        >
          <div
            className={cn(
              'shrink-0 flex items-center justify-center bg-[#e0e4ff] rounded-full',
              avatarSizeClass,
            )}
          >
            <span className="font-mono text-[12px] font-medium uppercase tracking-[0.03em] text-[#4f4ca8]">
              Z
            </span>
          </div>
          <div
            className={cn(
              'flex flex-col items-start text-left whitespace-nowrap transition-opacity duration-200',
              userMenu.open ? 'opacity-100 delay-75' : 'opacity-0',
            )}
          >
            <span className="text-[13px] font-medium leading-tight text-foreground">Zoë Bauer</span>
            <span className="t-info text-muted">zoe@shmoergh.com</span>
          </div>
        </div>

        {/* Menu — unfurls below the avatar on hover. */}
        <div
          className="grid transition-[grid-template-rows] duration-[450ms]"
          style={{
            gridTemplateRows: userMenu.open ? '1fr' : '0fr',
            transitionTimingFunction: SPRING,
          }}
        >
          <div className="overflow-hidden">
            <div
              className={cn(
                'px-3 pt-1 pb-3 transition-opacity duration-200',
                userMenu.open ? 'opacity-100 delay-75' : 'opacity-0',
              )}
            >
              <UserMenuItem icon={User} label="Account" />
              <UserMenuItem icon={Settings} label="Settings" />
              <UserMenuItem icon={LogOut} label="Sign out" />
            </div>
          </div>
        </div>
      </div>

      <SearchPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}

function UserMenuItem({
  icon: Icon,
  label,
}: {
  icon: typeof User
  label: string
}) {
  return (
    <button
      type="button"
      className="w-full flex items-center gap-3 h-9 px-3 rounded-[4px] transition-colors hover:bg-row-hover cursor-pointer text-left"
    >
      <Icon className="size-4 shrink-0 text-muted" strokeWidth={1.75} />
      <span className="text-[13px] font-medium text-foreground whitespace-nowrap">{label}</span>
    </button>
  )
}
