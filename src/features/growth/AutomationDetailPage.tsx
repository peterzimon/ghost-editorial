import { useEffect, useState } from 'react'
import { ChevronLeft, MoreHorizontal } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { mockAutomations } from './mockAutomations'
import { cn } from '@/lib/cn'

const GRID_BG_STYLE: React.CSSProperties = {
  backgroundImage: 'radial-gradient(rgba(0,0,0,0.1) 1px, transparent 1px)',
  backgroundSize: '18px 18px',
}

// Matches the Layout's FRAME_DURATION_MS so the device chrome and the editor
// chrome cross paths cleanly without overlap.
const HEADER_ANIM_MS = 520
const HEADER_EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'

export function AutomationDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const automation = mockAutomations.find((a) => a.id === id)

  // entered: header slides down once the device chrome has slid up.
  // leaving: back-button pressed; header slides up before we navigate so
  // the device chrome can slide back in cleanly.
  const [entered, setEntered] = useState(false)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    // Wait for the device top bar to slide up, then enter.
    const id = window.setTimeout(() => setEntered(true), HEADER_ANIM_MS)
    return () => window.clearTimeout(id)
  }, [])

  const handleBack = () => {
    setLeaving(true)
    window.setTimeout(() => navigate('/growth/automations'), HEADER_ANIM_MS)
  }

  const headerHidden = !entered || leaving

  if (!automation) {
    return (
      <div className="h-full flex items-center justify-center bg-background">
        <span className="t-mono text-muted">Automation not found</span>
      </div>
    )
  }

  const isActive = automation.status === 'active'

  return (
    <div className="h-full bg-background flex flex-col">
      <header
        className="fixed top-0 left-0 right-0 z-50 h-[52px] flex items-center justify-between px-10 border-b border-border bg-background"
        style={{
          transform: headerHidden ? 'translateY(-100%)' : 'translateY(0)',
          transitionProperty: 'transform',
          transitionDuration: `${HEADER_ANIM_MS}ms`,
          transitionTimingFunction: HEADER_EASE,
        }}
      >
        <button
          type="button"
          onClick={handleBack}
          aria-label="Back to automations"
          className="size-8 -ml-2 flex items-center justify-center text-muted hover:text-foreground transition-colors cursor-pointer"
        >
          <ChevronLeft className="size-5" strokeWidth={1.5} />
        </button>

        <div className="flex items-center gap-3">
          <span className="text-[14px] font-medium text-foreground">{automation.name}</span>
          <div className="flex items-center gap-2">
            <span className={cn('size-2', isActive ? 'bg-positive' : 'bg-muted')} aria-hidden />
            <span className={cn('t-info', isActive ? 'text-positive' : 'text-muted')}>
              {isActive ? 'Active' : 'Paused'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 -mr-2">
          <button
            type="button"
            aria-label="More actions"
            className="size-8 flex items-center justify-center text-muted hover:text-foreground transition-colors cursor-pointer"
          >
            <MoreHorizontal className="size-4" />
          </button>
          <Button variant="primary">Save</Button>
        </div>
      </header>

      <main className="flex-1 min-h-0 w-full bg-row-hover overflow-auto" style={GRID_BG_STYLE}>
        <div className="flex flex-col items-center py-20">
          <StepCard label="Trigger" title={automation.trigger} description="When this happens, the automation begins." />
          <StepConnector />
          <StepCard
            label="Action"
            title="Send welcome email"
            description="Deliver a templated message and mark the member as onboarded."
          />
        </div>
      </main>
    </div>
  )
}

function StepCard({ label, title, description }: { label: string; title: string; description: string }) {
  return (
    <div className="w-[480px] bg-background p-6 rounded-[4px] flex flex-col gap-2 shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_2px_4px_rgba(0,0,0,0.04),0_12px_24px_rgba(0,0,0,0.05)]">
      <p className="t-info text-muted">{label}</p>
      <p className="text-foreground text-[18px] font-medium tracking-[-0.005em]">{title}</p>
      <p className="t-byline text-muted">{description}</p>
    </div>
  )
}

function StepConnector() {
  return <div className="w-px h-8 bg-border" />
}
