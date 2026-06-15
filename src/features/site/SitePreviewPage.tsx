import { useEffect, useState } from 'react'
import { cn } from '@/lib/cn'

// Matches the bezel-retract transition in Layout, so the iframe waits for
// the frame to be done before fading in.
const FRAME_ANIMATION_MS = 520

export function SitePreviewPage() {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const id = window.setTimeout(() => setReady(true), FRAME_ANIMATION_MS)
    return () => window.clearTimeout(id)
  }, [])

  return (
    <iframe
      title="The Blueprint"
      src="https://shmoergh.com"
      className={cn(
        'block w-full h-full border-0 transition-opacity duration-500',
        ready ? 'opacity-100' : 'opacity-0',
      )}
    />
  )
}
