import { useParams } from 'react-router-dom'
import { Page } from '@/components/templates/page'
import { mockPosts } from './mockPosts'

export function PostAnalyticsPage() {
  const { id } = useParams<{ id: string }>()
  const post = mockPosts.find((p) => p.id === id)
  const title = post?.title?.trim() ? post.title : 'Untitled'

  return (
    <Page>
      <Page.Header>
        <Page.Title>{title}</Page.Title>
      </Page.Header>
      <Page.Content />
    </Page>
  )
}
