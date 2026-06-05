import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar, SIDEBAR_WIDTH_PX } from '@/components/patterns/sidebar'
import { TopBar } from '@/components/patterns/top-bar'
import { cn } from '@/lib/cn'

export function Layout() {
  const { pathname } = useLocation()
  const fullBleed = pathname === '/site'

  return (
    <div className="h-full bg-background" style={{ paddingLeft: SIDEBAR_WIDTH_PX }}>
      <Sidebar />
      <main
        className={cn(
          'w-full',
          fullBleed ? 'h-full' : 'min-h-full lg:max-w-[1280px] mx-auto px-10',
        )}
      >
        {!fullBleed && <TopBar />}
        <Outlet />
      </main>
    </div>
  )
}
