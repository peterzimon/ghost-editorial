import { ListFilter, Plus, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Page } from '@/components/templates/page'
import { MemberList } from './MemberList'

export type MembersFilter = 'all' | 'vip' | 'friends' | 'early-birds'

const TITLES: Record<MembersFilter, string> = {
  all: 'Members',
  vip: 'VIP',
  friends: 'Friends & Family',
  'early-birds': 'Early birds',
}

interface MembersPageProps {
  filter: MembersFilter
}

export function MembersPage({ filter }: MembersPageProps) {
  return (
    <Page>
      <Page.Header>
        <Page.Title>{TITLES[filter]}</Page.Title>
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
      <Page.Content>
        <MemberList />
      </Page.Content>
    </Page>
  )
}
