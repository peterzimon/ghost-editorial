import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Page } from '@/components/templates/page'
import { AutomationList } from './AutomationList'

export function AutomationsPage() {
  return (
    <Page>
      <Page.Header>
        <Page.Title>Automations</Page.Title>
        <Page.Actions>
          <Button variant="primary">
            <Plus className="size-4" />
            New automation
          </Button>
        </Page.Actions>
      </Page.Header>
      <Page.Content>
        <AutomationList />
      </Page.Content>
    </Page>
  )
}
