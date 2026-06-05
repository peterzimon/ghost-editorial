import { useState } from 'react'
import { Page } from '@/components/templates/page'
import { NetworkSubNavRight } from './NetworkSubNavRight'
import { READER_ARTICLES, type ReaderCategory } from './reader-data'
import { ReaderCategoryPills } from './ReaderCategoryPills'
import { ReaderArticleRow } from './ReaderArticleRow'
import { FollowSuggestions } from './FollowSuggestions'

export function ReaderPage() {
  const [category, setCategory] = useState<ReaderCategory>('Following')

  return (
    <Page>
      <Page.Header>
        <Page.Title>Reader</Page.Title>
        <Page.Actions>
          <NetworkSubNavRight />
        </Page.Actions>
      </Page.Header>
      <Page.Content className="gap-6 pt-4">
        <ReaderCategoryPills active={category} onChange={setCategory} />
        <div className="grid grid-cols-3">
          <div className="col-span-2 flex flex-col border-r border-border pr-10">
            {READER_ARTICLES.map((article) => (
              <ReaderArticleRow key={article.id} article={article} />
            ))}
          </div>
          <FollowSuggestions />
        </div>
      </Page.Content>
    </Page>
  )
}
