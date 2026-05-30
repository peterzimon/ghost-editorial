import { useState } from 'react'
import { Page } from '@/components/templates/page'
import { READER_ARTICLES, type ReaderCategory } from './reader-data'
import { ReaderCategoryPills } from './ReaderCategoryPills'
import { ReaderArticleRow } from './ReaderArticleRow'

export function ReaderPage() {
  const [category, setCategory] = useState<ReaderCategory>('Following')

  return (
    <Page>
      <Page.Header>
        <Page.Title>Reader</Page.Title>
      </Page.Header>
      <Page.Content className="gap-6 pt-6">
        <ReaderCategoryPills active={category} onChange={setCategory} />
        <div className="flex flex-col">
          {READER_ARTICLES.map((article) => (
            <ReaderArticleRow key={article.id} article={article} />
          ))}
        </div>
      </Page.Content>
    </Page>
  )
}
