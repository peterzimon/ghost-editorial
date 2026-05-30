import { useMemo } from 'react'
import { ListFilter, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Page } from '@/components/templates/page'
import { mockPosts, type PostStatus } from './mockPosts'
import { PostRow } from './PostRow'

interface PostsPageProps {
  filter: 'all' | PostStatus
}

export function PostsPage({ filter }: PostsPageProps) {
  const posts = useMemo(() => {
    const filtered = filter === 'all' ? mockPosts : mockPosts.filter((p) => p.status === filter)
    return [...filtered].sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
  }, [filter])

  return (
    <Page>
      <Page.Header>
        <Page.Title>Posts</Page.Title>
        <Page.Actions>
          <Button variant="ghost">
            <ListFilter className="size-4" />
            Filter
          </Button>
          <Button variant="primary">
            <Plus className="size-4" />
            New post
          </Button>
        </Page.Actions>
      </Page.Header>

      <Page.Content>
        {posts.length === 0 ? (
          <div className="py-16 t-byline text-muted">No posts in this view yet.</div>
        ) : (
          posts.map((post) => <PostRow key={post.id} post={post} />)
        )}
      </Page.Content>
    </Page>
  )
}
