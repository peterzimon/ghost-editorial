import { useEffect, useState, type ReactNode } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { cn } from '@/lib/cn'

export const TOP_BAR_H_PX = 36
export const BEZEL_PX = 10

/**
 * The 36px black top bar. Rendered as a child of a `fixed` parent in Layout
 * so it stays visible during scroll. Holds the global GHOST / View site /
 * Network nav on the left and the stats strip on the right.
 */
export function DeviceFrameTopBar() {
  const navigate = useNavigate()

  // Option + 1 / 2 / 3 → Ghost / View site / Network. Use e.code to side-step
  // the special characters Option-digit produces on macOS.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!e.altKey || e.metaKey || e.ctrlKey || e.shiftKey) return
      let to: string | null = null
      if (e.code === 'Digit1') to = '/'
      else if (e.code === 'Digit2') to = '/site'
      else if (e.code === 'Digit3') to = '/network'
      if (to) {
        e.preventDefault()
        navigate(to)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate])

  return (
    <div className="h-9 flex items-center text-white">
      {/* Left: brand + global nav */}
      <div className="flex-1 min-w-0 flex items-center gap-6 pl-6">
        <BrandLink />
        <TopBarLink to="/site" shortcut="Option + 2">
          View site
        </TopBarLink>
        <TopBarLink to="/network" shortcut="Option + 3">
          Network
        </TopBarLink>
      </div>

      {/* Right: live clock + static stats (linked to Analytics) */}
      <div className="flex-1 min-w-0 flex items-center justify-end gap-5 pr-6">
        <Clock />
        <Link to="/analytics" className="group h-full flex items-center gap-2">
          <span className="block size-2 bg-positive" aria-hidden />
          <span className="t-info text-muted transition-colors group-hover:text-white">
            27 Online
          </span>
        </Link>
        <Link to="/analytics" className="group h-full flex items-center gap-1 t-info">
          <span className="text-muted transition-colors group-hover:text-white">Members</span>
          <span className="text-white">874</span>
        </Link>
        <Link to="/analytics" className="group h-full flex items-center gap-1 t-info">
          <span className="text-muted transition-colors group-hover:text-white">MRR</span>
          <span className="text-white">$1,276</span>
        </Link>
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
      title="Option + 1"
      className={cn(
        'h-full flex items-center t-info font-semibold transition-colors',
        active ? 'text-white' : 'text-muted hover:text-white',
      )}
    >
      Ghost
    </NavLink>
  )
}

function TopBarLink({
  to,
  shortcut,
  children,
}: {
  to: string
  shortcut?: string
  children: ReactNode
}) {
  return (
    <NavLink
      to={to}
      title={shortcut}
      className={({ isActive }) =>
        cn(
          'h-full flex items-center t-info transition-colors hover:text-white',
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
