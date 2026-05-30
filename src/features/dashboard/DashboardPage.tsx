import { Calendar, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Page } from '@/components/templates/page'

export type DashboardView = 'overview' | 'web-analytics' | 'newsletters' | 'growth' | 'sources'

const TITLES: Record<DashboardView, string> = {
  overview: 'Overview',
  'web-analytics': 'Web Analytics',
  newsletters: 'Newsletters',
  growth: 'Growth',
  sources: 'Sources',
}

interface DashboardPageProps {
  view: DashboardView
}

export function DashboardPage({ view }: DashboardPageProps) {
  return (
    <Page>
      <Page.Header>
        <Page.Title>{TITLES[view]}</Page.Title>
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
