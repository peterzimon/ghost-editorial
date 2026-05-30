import { ListFilter, Plus, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Page } from '@/components/templates/page'

export function MembersPage() {
  return (
    <Page>
      <Page.Header>
        <Page.Title>Members</Page.Title>
        <Page.Actions>
          <Button variant="ghost" size="icon" aria-label="Search">
            <Search className="size-4" />
          </Button>
          <Button variant="ghost">
            <ListFilter className="size-4" />
            Filter
          </Button>
          <Button variant="primary">
            <Plus className="size-4" />
            New member
          </Button>
        </Page.Actions>
      </Page.Header>
      <Page.Content />
    </Page>
  )
}
