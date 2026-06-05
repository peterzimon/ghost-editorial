import { Calendar, ChevronDown, LayoutGrid } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Page } from '@/components/templates/page'
import { ViewTabs, type ViewTabItem } from '@/components/patterns/view-tabs'
import { STATS } from './dashboard-data'
import { LATEST_POST, RECENT_POSTS } from './dashboard-posts-data'
import { StatCard } from './StatCard'
import { LatestPostCard } from './LatestPostCard'
import { TopPostsList } from './TopPostsList'
import { AnalyticsBanner } from './AnalyticsBanner'

export type DashboardView = 'overview' | 'web-analytics' | 'newsletters' | 'growth' | 'sources'

const VIEWS: ViewTabItem[] = [
  { label: 'Overview', to: '/analytics', end: true },
  { label: 'Web Analytics', to: '/analytics/web-analytics' },
  { label: 'Newsletters', to: '/analytics/newsletters' },
  { label: 'Growth', to: '/analytics/growth' },
  { label: 'Sources', to: '/analytics/sources' },
]

interface DashboardPageProps {
  view: DashboardView
}

export function DashboardPage({ view }: DashboardPageProps) {
  return (
    <Page>
      <Page.Header>
        <Page.Title>Analytics</Page.Title>
        <div className="flex items-center gap-2">
          <div className="size-2 bg-positive" />
          <span className="t-info text-positive">27 Online</span>
        </div>
      </Page.Header>

      <div className="flex items-center justify-between gap-3 py-4 border-b border-border">
        <ViewTabs items={VIEWS} />
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
      </div>

      <Page.Content>
        {view === 'overview' ? (
          <>
            <section className="grid grid-cols-3 gap-8 pt-2">
              {STATS.map((stat) => (
                <StatCard key={stat.label} stat={stat} />
              ))}
            </section>
            <section className="grid grid-cols-3 gap-8 pt-12">
              <LatestPostCard post={LATEST_POST} />
              <div className="col-span-2">
                <TopPostsList posts={RECENT_POSTS} />
              </div>
            </section>
            <section className="pt-12">
              <AnalyticsBanner />
            </section>
          </>
        ) : null}
      </Page.Content>
    </Page>
  )
}
