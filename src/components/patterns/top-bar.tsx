import { NavLink } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { LogOut, Settings, User } from 'lucide-react'
import { cn } from '@/lib/cn'

/**
 * Slim top strip rendered in-flow at the top of the content area —
 * scrolls with the page (no fixed positioning, no separator border).
 */
export function TopBar() {
  return (
    <div className="relative z-10 h-[100px] flex items-center justify-end gap-5">
      <div className="flex items-center gap-2">
        <div className="size-2 bg-positive" />
        <span className="t-info text-positive">27 Online</span>
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

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            aria-label="User menu"
            className="size-6 flex items-center justify-center bg-[#e0e4ff] cursor-pointer"
          >
            <span className="font-mono text-[12px] font-medium uppercase tracking-[0.03em] text-[#4f4ca8]">
              Z
            </span>
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
