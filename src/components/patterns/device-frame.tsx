import { useEffect, useState, type ReactNode } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { cn } from '@/lib/cn'

export const TOP_BAR_H_PX = 36
export const BEZEL_PX = 10

/**
 * The 36px black top bar. Rendered as a child of a `fixed` parent in Layout
 * so it stays visible during scroll. Holds the global GHOST / View site /
 * Network nav on the left and the stats strip on the right.
 */
export function DeviceFrameTopBar() {
  return (
    <div className="h-9 flex items-center text-white">
      {/* Left: brand + global nav */}
      <div className="flex-1 min-w-0 flex items-center gap-6 pl-6">
        <BrandLink />
        <TopBarLink to="/site">View site</TopBarLink>
        <TopBarLink to="/network">Network</TopBarLink>
      </div>

      {/* Right: live clock + static stats */}
      <div className="flex-1 min-w-0 flex items-center justify-end gap-5 pr-6">
        <Clock />
        <div className="flex items-center gap-2">
          <span className="block size-2 bg-positive" aria-hidden />
          <span className="t-info text-muted">27 Online</span>
        </div>
        <div className="flex items-center gap-1 t-info">
          <span className="text-muted">Subs</span>
          <span className="text-white">874</span>
        </div>
        <div className="flex items-center gap-1 t-info">
          <span className="text-muted">MRR</span>
          <span className="text-white">$1,276</span>
        </div>
      </div>
    </div>
  )
}

/**
 * GHOST is active on every route EXCEPT /site and /network, so the three
 * top-bar items behave like mutually-exclusive tabs.
 */
function BrandLink() {
  const { pathname } = useLocation()
  const onNetwork = pathname === '/network' || pathname.startsWith('/network/')
  const active = pathname !== '/site' && !onNetwork
  return (
    <NavLink
      to="/"
      className={cn(
        't-info font-semibold transition-colors',
        active ? 'text-white' : 'text-muted hover:text-white',
      )}
    >
      Ghost
    </NavLink>
  )
}

function TopBarLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          't-info transition-colors hover:text-white',
          isActive ? 'text-white' : 'text-muted',
        )
      }
    >
      {children}
    </NavLink>
  )
}

/** Live date + HH:MM clock with a blinking colon between hours and minutes. */
function Clock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(id)
  }, [])

  const date = now.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
  })
  const hh = String(now.getHours()).padStart(2, '0')
  const mm = String(now.getMinutes()).padStart(2, '0')

  return (
    <div className="flex items-center gap-2 t-info text-muted">
      <span>{date}</span>
      <span>
        {hh}
        <span style={{ animation: 'clock-blink 1s infinite' }}>:</span>
        {mm}
      </span>
    </div>
  )
}
