import { useEffect, useState } from 'react'
import { ListFilter, Plus, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Page } from '@/components/templates/page'
import { FilterBar, type FilterChip } from '@/components/patterns/filter-bar'
import { MemberList } from './MemberList'

export type MembersFilter = 'all' | 'vip' | 'friends' | 'early-birds'

const TITLES: Record<MembersFilter, string> = {
  all: 'Members',
  vip: 'VIP',
  friends: 'Friends & Family',
  'early-birds': 'Early birds',
}

const MEMBER_FILTER_POOL: FilterChip[] = [
  { id: 'status', field: 'Member status', value: 'Complimentary' },
  { id: 'location', field: 'Location', value: 'London' },
  { id: 'created', field: 'Created', value: 'Last 30 days' },
  { id: 'open-rate', field: 'Open rate', value: '> 30%' },
]

function presetChips(filter: MembersFilter): FilterChip[] {
  if (filter === 'all') return []
  const tierLabel: Record<Exclude<MembersFilter, 'all'>, string> = {
    vip: 'VIP',
    friends: 'Friends & Family',
    'early-birds': 'Early birds',
  }
  return [{ id: 'tier', field: 'Tier', value: tierLabel[filter] }]
}

interface MembersPageProps {
  filter: MembersFilter
}

export function MembersPage({ filter }: MembersPageProps) {
  const [filterOpen, setFilterOpen] = useState(filter !== 'all')
  const [chips, setChips] = useState<FilterChip[]>(() => presetChips(filter))

  useEffect(() => {
    setFilterOpen(filter !== 'all')
    setChips(presetChips(filter))
  }, [filter])

  const addChip = () => {
    const next = MEMBER_FILTER_POOL.find((p) => !chips.some((c) => c.id === p.id))
    if (next) setChips([...chips, next])
  }
  const removeChip = (id: string) => setChips(chips.filter((c) => c.id !== id))

  return (
    <Page>
      <Page.Header>
        <Page.Title>{TITLES[filter]}</Page.Title>
        <Page.Actions>
          <Button variant="ghost" size="icon" aria-label="Search">
            <Search className="size-4" />
          </Button>
          <Button
            variant={filterOpen ? 'secondary' : 'ghost'}
            onClick={() => setFilterOpen((v) => !v)}
          >
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
        {filterOpen && <FilterBar chips={chips} onAdd={addChip} onRemove={removeChip} />}
        <MemberList />
      </Page.Content>
    </Page>
  )
}
