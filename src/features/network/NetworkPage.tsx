export type NetworkView = 'reader' | 'notes' | 'explore' | 'profile'

const LABELS: Record<NetworkView, string> = {
  reader: 'Reader',
  notes: 'Notes',
  explore: 'Explore',
  profile: 'Profile',
}

interface NetworkPageProps {
  view: NetworkView
}

export function NetworkPage({ view }: NetworkPageProps) {
  return (
    <div className="h-full flex items-center justify-center">
      <span className="t-mono text-muted">{LABELS[view]}</span>
    </div>
  )
}
