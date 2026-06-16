import { useNavigate } from 'react-router-dom'
import { ListRow } from '@/components/patterns/list-row'
import type { Post } from './mockPosts'
import { formatRelativeDate } from '@/lib/formatRelativeDate'
import { PostActionsMenu } from './PostActionsMenu'
import { cn } from '@/lib/cn'

interface PostRowProps {
  post: Post
}

export function PostRow({ post }: PostRowProps) {
  const navigate = useNavigate()

  const isUntitled = post.title.trim() === ''
  const titleText = isUntitled ? 'Untitled' : post.title

  return (
    <ListRow
      onClick={() => navigate(`/content/posts/${post.id}/edit`)}
      className="flex items-baseline py-8"
    >
      <div className="w-[180px] shrink-0 flex items-center">
        <span className="t-mono text-muted">{formatRelativeDate(post.publishedAt)}</span>
      </div>

      <div className="flex-1 min-w-0 flex flex-col gap-[5px]">
        <p className={cn('t-post-title text-foreground', isUntitled && 'opacity-20')}>
          {titleText}
        </p>
        <p className="t-byline">
          <span className="text-muted">By </span>
          <span className="text-foreground">{post.author}</span>
          <span className="text-muted"> in {post.newsletter}</span>
        </p>
      </div>

      <div className="absolute right-4 top-[43px]">
        <PostActionsMenu postId={post.id} />
      </div>
    </ListRow>
  )
}
