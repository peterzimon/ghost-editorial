import { Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Page } from '@/components/templates/page'

export function MediaPage() {
  return (
    <Page>
      <Page.Header>
        <Page.Title>Media</Page.Title>
        <Page.Actions>
          <Button variant="primary">
            <Upload className="size-4" />
            Upload
          </Button>
        </Page.Actions>
      </Page.Header>
      <Page.Content />
    </Page>
  )
}
