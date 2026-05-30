import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Page } from '@/components/templates/page'

export function TagsPage() {
  return (
    <Page>
      <Page.Header>
        <Page.Title>Tags</Page.Title>
        <Page.Actions>
          <Button variant="primary">
            <Plus className="size-4" />
            New tag
          </Button>
        </Page.Actions>
      </Page.Header>
      <Page.Content />
    </Page>
  )
}
