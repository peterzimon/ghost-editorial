import { Calendar, ChevronDown, LayoutGrid } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Page } from '@/components/templates/page'
import { STATS } from './dashboard-data'
import { StatCard } from './StatCard'

export type DashboardView = 'overview' | 'web-analytics' | 'newsletters' | 'growth' | 'sources'

interface DashboardPageProps {
  view: DashboardView
}

export function DashboardPage({ view }: DashboardPageProps) {
  return (
    <Page>
      <Page.Header>
        <Page.Title>Dashboard</Page.Title>
        <Page.Actions>
          <Button variant="ghost" size="icon" aria-label="Customize dashboard">
            <LayoutGrid className="size-4" />
          </Button>
          <Button variant="ghost">
            <Calendar className="size-4" />
            Last 30 days
            <ChevronDown className="size-4" />
          </Button>
        </Page.Actions>
      </Page.Header>
      <Page.Content>
        {view === 'overview' ? (
          <section className="grid grid-cols-3 gap-8 pt-2">
            {STATS.map((stat) => (
              <StatCard key={stat.label} stat={stat} />
            ))}
          </section>
        ) : null}
      </Page.Content>
    </Page>
  )
}
