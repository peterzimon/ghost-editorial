interface PlaceholderPageProps {
  title?: string
  note?: string
}

export function PlaceholderPage({ title = 'Coming soon', note }: PlaceholderPageProps) {
  return (
    <div className="border-b border-border pb-8">
      <h1 className="t-h1">{title}</h1>
      {note && <p className="t-byline text-muted mt-6">{note}</p>}
    </div>
  )
}
