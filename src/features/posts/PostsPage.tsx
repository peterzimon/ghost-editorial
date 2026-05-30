import { useEffect, useMemo, useState } from 'react'
import { ListFilter, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Page } from '@/components/templates/page'
import { FilterBar, type FilterChip } from '@/components/patterns/filter-bar'
import { mockPosts, type PostStatus } from './mockPosts'
import { PostRow } from './PostRow'

type PostsFilter = 'all' | PostStatus

const TITLES: Record<PostsFilter, string> = {
  all: 'Posts',
  draft: 'Drafts',
  scheduled: 'Scheduled',
  published: 'Published',
}

const STATUS_LABEL: Record<PostStatus, string> = {
  draft: 'Draft',
  scheduled: 'Scheduled',
  published: 'Published',
}

const POST_FILTER_POOL: FilterChip[] = [
  { id: 'author', field: 'Author', value: 'Maren Calzoni' },
  { id: 'newsletter', field: 'Newsletter', value: 'Newsletters' },
  { id: 'tag', field: 'Tag', value: 'Lifestyle' },
  { id: 'visibility', field: 'Visibility', value: 'Paid members' },
]

function presetChips(filter: PostsFilter): FilterChip[] {
  if (filter === 'all') return []
  return [{ id: 'status', field: 'Status', value: STATUS_LABEL[filter] }]
}

interface PostsPageProps {
  filter: PostsFilter
}

export function PostsPage({ filter }: PostsPageProps) {
  const posts = useMemo(() => {
    const filtered = filter === 'all' ? mockPosts : mockPosts.filter((p) => p.status === filter)
    return [...filtered].sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
  }, [filter])

  const [filterOpen, setFilterOpen] = useState(filter !== 'all')
  const [chips, setChips] = useState<FilterChip[]>(() => presetChips(filter))

  // Sync filter bar to the active view when the sub-nav tab changes.
  useEffect(() => {
    setFilterOpen(filter !== 'all')
    setChips(presetChips(filter))
  }, [filter])

  const addChip = () => {
    const next = POST_FILTER_POOL.find((p) => !chips.some((c) => c.id === p.id))
    if (next) setChips([...chips, next])
  }
  const removeChip = (id: string) => setChips(chips.filter((c) => c.id !== id))

  return (
    <Page>
      <Page.Header>
        <Page.Title>{TITLES[filter]}</Page.Title>
        <Page.Actions>
          <Button
            variant={filterOpen ? 'secondary' : 'ghost'}
            onClick={() => setFilterOpen((v) => !v)}
          >
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
        {filterOpen && <FilterBar chips={chips} onAdd={addChip} onRemove={removeChip} />}
        {posts.length === 0 ? (
          <div className="py-16 t-byline text-muted">No posts in this view yet.</div>
        ) : (
          posts.map((post) => <PostRow key={post.id} post={post} />)
        )}
      </Page.Content>
    </Page>
  )
}
