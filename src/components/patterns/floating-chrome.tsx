import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { LogOut, Pin, Settings, User } from 'lucide-react'
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

/** Shared glass treatment (background + border) for both capsules. */
const GLASS =
  'bg-white/55 backdrop-blur-xl backdrop-saturate-150 border border-white/50'

/** Default floating shadow — used by the avatar capsule and the unpinned
 * site capsule. */
const SHADOW_FLOAT =
  '0 0 0.5px rgba(0,0,0,0.35), 0 40px 60px -15px rgba(0,0,0,0.18), 0 12px 24px -8px rgba(0,0,0,0.1), 0 3px 8px rgba(0,0,0,0.04)'

/** Lighter shadow for the pinned sidebar — softer floating layers plus a
 * 1px no-blur outline so it still reads against light page backgrounds. */
const SHADOW_PINNED =
  '0 0 0 1px rgba(0,0,0,0.06), 0 8px 24px -10px rgba(0,0,0,0.06), 0 2px 6px rgba(0,0,0,0.03)'

/**
 * Hover-intent open/close with a configurable close delay so the cursor can
 * travel from the trigger into the panel without the panel flickering shut.
 */
function useHoverIntent(closeDelayMs = 120) {
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
    }, closeDelayMs)
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
interface FloatingChromeProps {
  pinned: boolean
  onPinChange: (pinned: boolean) => void
  /** When the page is wrapped in the device frame, the capsules need to
   *  shift down past the top bar and inward past the bezel. */
  framed?: boolean
}

// Device-frame insets — kept in sync with DeviceFrame's layout.
const FRAME_TOP_BAR_PX = 36
const FRAME_BEZEL_PX = 10

export function FloatingChrome({ pinned, onPinChange, framed = false }: FloatingChromeProps) {
  const [searchOpen, setSearchOpen] = useState(false)
  const { pathname } = useLocation()

  // Site menu gets a longer close delay so it's forgiving when the cursor
  // drifts off the panel; the smaller user menu keeps the snappy default.
  const site = useHoverIntent(600)
  const userMenu = useHoverIntent()

  // When pinned, the site capsule is always "open" (height extends to the
  // viewport bottom; hover-intent is a no-op).
  const siteOpen = site.open || pinned

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
  const avatarSizeClass = compact ? 'size-7' : 'size-8'
  const avatarSize = compact ? 28 : 32

  // When framed, anchor the capsules + hot zone to the inside of the white
  // card (= viewport top + top bar, viewport sides + bezel), so they don't
  // overlap the device-frame top bar.
  const capsuleTopPx = framed ? FRAME_TOP_BAR_PX + 16 : 16 // 52 vs 16
  const capsuleSidePx = framed ? FRAME_BEZEL_PX + 16 : 16 // 24 vs 16
  const hotZoneTopPx = framed ? FRAME_TOP_BAR_PX : 0
  const hotZoneLeftPx = framed ? FRAME_BEZEL_PX : 0
  // Pinned capsule fills the available vertical space: viewport minus top
  // bar, bottom bezel, and the 16px inset at top + bottom.
  const pinnedCapsuleHeight = framed
    ? `calc(100vh - ${FRAME_TOP_BAR_PX + FRAME_BEZEL_PX + 32}px)`
    : 'calc(100vh - 32px)'
  // Symmetric row padding such that the avatar lands at the pill's exact
  // horizontal center when closed. The pill has a 1px border on each side,
  // so the row's content area is (pillW - 2), not pillW.
  const avatarRowPadX = (avatarPillW - 2 - avatarSize) / 2

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
          page gutter, so hovering the left side of the page reveals the menu.
          When framed, sits below the top bar and inside the left bezel. */}
      <div
        className="fixed bottom-0 z-30"
        style={{
          top: hotZoneTopPx,
          left: hotZoneLeftPx,
          width: 'clamp(40px, calc((100vw - 1280px) / 2 + 40px), 160px)',
        }}
        onMouseEnter={site.onEnter}
        onMouseLeave={site.onLeave}
      />

      {/* Top-left: the liquid-glass site-menu capsule. Always visible as an
          affordance around the logo; morphs into the full menu on hover, or
          stays open + extends to the viewport bottom when pinned. Wrapped in
          a flex container that holds the capsule plus an invisible hover
          buffer to its right — so the cursor has a small threshold before
          the panel starts closing. */}
      <div
        onMouseEnter={site.onEnter}
        onMouseLeave={site.onLeave}
        style={{ top: capsuleTopPx, left: capsuleSidePx }}
        className="fixed z-40 flex items-stretch"
      >
        <div
          style={{
            width: siteOpen ? SITE_MENU_WIDTH_PX : closedWidth,
            // `auto` (not undefined) so interpolate-size can transition it.
            height: pinned ? pinnedCapsuleHeight : 'auto',
            borderRadius: siteOpen ? openRadius : closedRadius,
            boxShadow: pinned ? SHADOW_PINNED : SHADOW_FLOAT,
            transitionProperty: 'width, height, border-radius, box-shadow',
            transitionDuration: '520ms',
            // Bump in both directions — the slight dip on close reads fine here.
            transitionTimingFunction: BUMP,
          }}
          className={cn(
            'relative overflow-hidden flex flex-col shrink-0',
            GLASS,
          )}
        >
        {/* Logo — fixed height + content width so the capsule's width animation
            never stretches or compresses it. */}
        <div
          ref={logoRef}
          style={{
            height: pillRowH,
            paddingLeft: compact ? 20 : 24,
            paddingRight: compact ? 20 : 24,
          }}
          className="shrink-0 w-max flex items-center gap-2 text-foreground"
        >
          <Logomark className="shrink-0" />
          <span className="shrink-0 whitespace-nowrap font-serif-headline text-[18px] font-[500] leading-none tracking-[-0.01em]">
            Shmøergh
          </span>
        </div>

        {/* Pin button — absolute, anchored to the capsule (not the logo row)
            so it tracks the capsule's right edge smoothly while the width
            animates, instead of snapping when the row's sizing flips. */}
        <button
          type="button"
          onClick={() => onPinChange(!pinned)}
          aria-label={pinned ? 'Unpin sidebar' : 'Pin sidebar'}
          style={{
            top: (pillRowH - 28) / 2,
            right: 8,
          }}
          className={cn(
            'absolute size-7 flex items-center justify-center rounded-full text-muted hover:bg-black/5 hover:text-foreground transition-[opacity,color,background-color] duration-200 cursor-pointer',
            // Visibility tracks the raw hover state (not pinned) so the
            // button hides when you move off the panel, even in pinned mode.
            site.open
              ? 'opacity-100 delay-75 pointer-events-auto'
              : 'opacity-0 pointer-events-none',
          )}
        >
          <Pin
            className="size-4 transition-transform duration-300"
            strokeWidth={1.75}
            style={{
              transform: pinned ? 'rotate(45deg)' : 'rotate(0deg)',
              transitionTimingFunction: SPRING,
            }}
            />
        </button>

        {/* Nav — unfurls via a grid-rows 0fr→1fr transition so it animates
            smoothly regardless of how tall the menu is on the active route.
            When pinned, switch to flex-1 so it fills the available space. */}
        <div
          className={cn(
            'transition-[grid-template-rows] duration-[450ms] min-h-0',
            pinned ? 'flex-1 flex' : 'grid',
          )}
          style={
            pinned
              ? undefined
              : {
                  gridTemplateRows: siteOpen ? '1fr' : '0fr',
                  transitionTimingFunction: SPRING,
                }
          }
        >
          <div className={cn('overflow-hidden', pinned && 'flex-1 flex overflow-y-auto')}>
            <div
              className={cn(
                'px-3 pt-2 pb-4 transition-opacity duration-200',
                pinned && 'flex-1 w-full',
                siteOpen ? 'opacity-100 delay-75' : 'opacity-0',
              )}
            >
              <SiteMenu />
            </div>
          </div>
        </div>
        </div>

        {/* Hover buffer to the right — keeps the panel open while the cursor
            travels off the capsule. Only active when meaningfully open. */}
        {siteOpen && !pinned && <div aria-hidden className="w-12 shrink-0" />}
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
          boxShadow: SHADOW_FLOAT,
          top: capsuleTopPx,
          right: capsuleSidePx,
          transitionProperty: 'width, border-radius',
          transitionDuration: '520ms',
          // Overshoot only while opening; close on the smooth curve so the
          // width never dips below the avatar circle (which would clip it).
          transitionTimingFunction: userMenu.open ? BUMP : SPRING,
        }}
        className={cn('fixed z-40 overflow-hidden', GLASS)}
      >
        {/* Avatar row — fixed 52px circle band. Avatar sits on the left and
            travels leftward with the growing capsule; the name block to its
            right fades in once the capsule is open. */}
        <div
          style={{ height: pillRowH, paddingLeft: avatarRowPadX, paddingRight: avatarRowPadX }}
          className="flex items-center gap-3"
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
