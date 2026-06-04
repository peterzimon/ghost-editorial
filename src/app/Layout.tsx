import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar, SIDEBAR_WIDTH_PX } from '@/components/patterns/sidebar'
import { TopBar } from '@/components/patterns/top-bar'
import { cn } from '@/lib/cn'

export function Layout() {
  const { pathname } = useLocation()
  const fullBleed = pathname === '/site'

  return (
    <div
      className="h-full bg-background"
      style={{ paddingLeft: SIDEBAR_WIDTH_PX, paddingTop: 52 }}
    >
      <Sidebar />
      <TopBar />
      <main
        className={cn(
          'min-h-full w-full',
          fullBleed ? '' : 'lg:max-w-[1280px] mx-auto px-10 pt-[60px]',
        )}
      >
        <Outlet />
      </main>
    </div>
  )
}
