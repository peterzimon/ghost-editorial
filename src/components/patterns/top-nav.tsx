import { NavLink } from 'react-router-dom'
import { ChevronDown, LogOut, Search, Settings, User } from 'lucide-react'
import { Logomark } from './logomark'
import { StableLabel } from './stable-label'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/cn'

const SECTIONS = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Network', to: '/network' },
  { label: 'Content', to: '/content' },
  { label: 'Audience', to: '/audience' },
  { label: 'Growth', to: '/growth' },
] as const

export function TopNav() {
  return (
    <div className="h-[52px] flex items-center justify-between px-10 border-b border-border w-full">
      <div className="flex items-center w-[260px]">
        <NavLink to="/" className="group flex items-center gap-3 text-foreground">
          <Logomark />
          <span className="font-serif-headline text-[16px] leading-none tracking-[-0.01em] opacity-0 translate-y-2 transition-all duration-200 ease-out group-hover:opacity-100 group-hover:translate-y-0">
            The Blueprint
          </span>
        </NavLink>
      </div>

      <nav className="flex items-center gap-5 h-full">
        {SECTIONS.map((section) => (
          <NavLink
            key={section.to}
            to={section.to}
            className={({ isActive }) =>
              cn(
                'flex items-center border-y-[3px] border-transparent justify-center h-full transition-colors hover:t-nav-active',
                isActive ? 't-nav-active border-t-accent' : 't-nav',
              )
            }
          >
            <StableLabel>{section.label}</StableLabel>
          </NavLink>
        ))}
      </nav>

      <div className="flex items-center justify-end gap-5 w-[260px]">
        <div className="flex items-center gap-2">
          <div className="size-2 bg-accent" />
          <span className="t-info text-accent">27 Online</span>
        </div>
        <NavLink to="/site" className="t-info text-muted hover:text-foreground transition-colors cursor-pointer">
          View site
        </NavLink>
        <button type="button" aria-label="Search" className="text-muted hover:text-foreground transition-colors cursor-pointer">
          <Search className="size-4" />
        </button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button type="button" aria-label="User menu" className="flex items-center gap-1 text-muted cursor-pointer">
              <div className="size-6 flex items-center justify-center bg-[#e0e4ff]">
                <span className="font-mono text-[12px] font-medium uppercase tracking-[0.03em] text-[#4f4ca8]">
                  Z
                </span>
              </div>
              <ChevronDown className="size-3" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
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
    </div>
  )
}
