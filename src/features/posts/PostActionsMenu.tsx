import { useNavigate } from 'react-router-dom'
import { MoreHorizontal, LineChart, Pencil } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface PostActionsMenuProps {
  postId: string
}

export function PostActionsMenu({ postId }: PostActionsMenuProps) {
  const navigate = useNavigate()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="h-8 w-10 flex items-center justify-center bg-white border border-border text-foreground opacity-0 group-hover:opacity-100 data-[state=open]:opacity-100 transition-opacity cursor-pointer"
          onClick={(e) => e.stopPropagation()}
          aria-label="Post actions"
        >
          <MoreHorizontal className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={6}>
        <DropdownMenuItem onSelect={() => navigate(`/content/posts/${postId}/analytics`)}>
          <LineChart className="size-4" />
          <span>Analytics</span>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => navigate(`/content/posts/${postId}/edit`)}>
          <Pencil className="size-4" />
          <span>Edit</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
