import { NavLink } from 'react-router-dom'
import { ChevronDown, LogOut, Search, Settings, User } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/cn'
import { SIDEBAR_WIDTH_PX } from './sidebar'

export function TopBar() {
  return (
    <div
      style={{ left: SIDEBAR_WIDTH_PX }}
      className="fixed top-0 right-0 z-30 h-[52px] bg-background border-b border-border flex items-center justify-end gap-5 px-10"
    >
      <div className="flex items-center gap-2">
        <div className="size-2 bg-accent" />
        <span className="t-info text-accent">27 Online</span>
      </div>

      <NavLink
        to="/site"
        className={({ isActive }) =>
          cn(
            't-info transition-colors cursor-pointer hover:text-foreground',
            isActive ? 'text-foreground' : 'text-muted',
          )
        }
      >
        View site
      </NavLink>

      <button
        type="button"
        aria-label="Search"
        className="text-muted hover:text-foreground transition-colors cursor-pointer"
      >
        <Search className="size-4" />
      </button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            aria-label="User menu"
            className="flex items-center gap-1 text-muted cursor-pointer"
          >
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
  )
}
