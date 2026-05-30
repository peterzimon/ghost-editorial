import { ListFilter, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Page } from '@/components/templates/page'

export function PagesPage() {
  return (
    <Page>
      <Page.Header>
        <Page.Title>Pages</Page.Title>
        <Page.Actions>
          <Button variant="ghost">
            <ListFilter className="size-4" />
            Filter
          </Button>
          <Button variant="primary">
            <Plus className="size-4" />
            New page
          </Button>
        </Page.Actions>
      </Page.Header>
      <Page.Content />
    </Page>
  )
}
