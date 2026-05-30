import { Calendar, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Page } from '@/components/templates/page'

export function DashboardPage() {
  return (
    <Page>
      <Page.Header>
        <Page.Title>Dashboard</Page.Title>
        <Page.Actions>
          <Button variant="ghost">
            <Calendar className="size-4" />
            Last 30 days
            <ChevronDown className="size-4" />
          </Button>
        </Page.Actions>
      </Page.Header>
      <Page.Content />
    </Page>
  )
}
