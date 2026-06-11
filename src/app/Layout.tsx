import { Outlet, useLocation } from 'react-router-dom'
import { FloatingChrome } from '@/components/patterns/floating-chrome'
import { cn } from '@/lib/cn'

export function Layout() {
  const { pathname } = useLocation()
  const fullBleed = pathname === '/site'

  return (
    <div className="h-full bg-background">
      <FloatingChrome />
      <main
        className={cn(
          'w-full',
          fullBleed ? 'h-full' : 'relative min-h-full lg:max-w-[1280px] mx-auto px-10 pt-[4vw]',
        )}
      >
        <Outlet />
      </main>
    </div>
  )
}
