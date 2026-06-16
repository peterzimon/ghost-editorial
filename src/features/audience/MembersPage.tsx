import { useEffect, useState } from 'react'
import { ListFilter, MoreHorizontal, Plus, Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Page } from '@/components/templates/page'
import { Breadcrumb } from '@/components/patterns/breadcrumb'
import { FilterBar, type FilterChip } from '@/components/patterns/filter-bar'
import { SavedViewsBar, type SavedViewItem } from '@/components/patterns/saved-views-bar'
import { MemberList } from './MemberList'

export type MembersFilter = 'all' | 'vip' | 'friends' | 'early-birds'

const TITLES: Record<MembersFilter, string> = {
  all: 'Members',
  vip: 'VIP',
  friends: 'Friends & Family',
  'early-birds': 'Early birds',
}

const SAVED_VIEWS: SavedViewItem[] = [
  { label: 'VIP', to: '/audience/members/vip' },
  { label: 'Friends & Family', to: '/audience/members/friends' },
  { label: 'Early birds', to: '/audience/members/early-birds' },
]

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
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')

  useEffect(() => {
    setFilterOpen(filter !== 'all')
    setChips(presetChips(filter))
  }, [filter])

  const addChip = () => {
    const next = MEMBER_FILTER_POOL.find((p) => !chips.some((c) => c.id === p.id))
    if (next) setChips([...chips, next])
  }
  const removeChip = (id: string) => setChips(chips.filter((c) => c.id !== id))

  const openSearch = () => setSearchOpen(true)
  const closeSearch = () => {
    setSearchOpen(false)
    setQuery('')
  }

  const isView = filter !== 'all'
  const showSavedViews = !isView && !filterOpen && !searchOpen
  const headerBorderOff = filterOpen || showSavedViews

  const headerClass = [
    'min-h-[80px]',
    headerBorderOff ? 'border-b-0' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Page>
      {isView && !searchOpen && (
        <div className="mb-6">
          <Breadcrumb
            items={[{ label: 'Members', to: '/audience/members' }, { label: TITLES[filter] }]}
          />
        </div>
      )}
      <Page.Header className={headerClass}>
        {searchOpen ? (
          <>
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Escape' && closeSearch()}
              placeholder="Search members"
              className="block flex-1 t-h1 bg-transparent outline-none placeholder:text-border min-w-0 p-0 border-0"
            />
            <button
              type="button"
              onClick={closeSearch}
              aria-label="Close search"
              className="size-8 mr-2 flex items-center justify-center text-muted hover:text-foreground transition-colors cursor-pointer"
            >
              <X className="size-6" strokeWidth={1.25} />
            </button>
          </>
        ) : (
          <>
            <Page.Title>{TITLES[filter]}</Page.Title>
            <Page.Actions>
              <Button variant="ghost" size="icon" aria-label="Search" onClick={openSearch}>
                <Search className="size-4" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="More actions">
                <MoreHorizontal className="size-4" />
              </Button>
              <Button
                variant={filterOpen ? 'pressed' : 'ghost'}
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
          </>
        )}
      </Page.Header>

      <Page.Content>
        {showSavedViews && <SavedViewsBar items={SAVED_VIEWS} />}
        {filterOpen && (
          <FilterBar
            chips={chips}
            onAdd={addChip}
            onRemove={removeChip}
            onSaveView={filter === 'all' ? () => {} : undefined}
          />
        )}
        <MemberList />
      </Page.Content>
    </Page>
  )
}
