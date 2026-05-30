import { useParams } from 'react-router-dom'
import { Page } from '@/components/templates/page'
import { Button } from '@/components/ui/button'
import { mockPosts } from './mockPosts'

export function PostEditorPage() {
  const { id } = useParams<{ id: string }>()
  const post = mockPosts.find((p) => p.id === id)
  const title = post?.title?.trim() ? post.title : 'Untitled'

  return (
    <Page>
      <Page.Header>
        <Page.Title>{title}</Page.Title>
        <Page.Actions>
          <Button variant="ghost">Preview</Button>
          <Button variant="primary">Publish</Button>
        </Page.Actions>
      </Page.Header>
      <Page.Content />
    </Page>
  )
}
