import { MoreHorizontal, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/cn'
import type { Subscription, SubscriptionStatus } from './member-subscriptions-data'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function formatDate(d: Date) {
  return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`
}

const STATUS_LABEL: Record<SubscriptionStatus, string> = {
  active: 'Active',
  cancelled: 'Cancelled',
  paused: 'Paused',
}

function statusColor(status: SubscriptionStatus) {
  if (status === 'active') return 'bg-positive text-positive'
  if (status === 'cancelled') return 'bg-accent text-accent'
  return 'bg-muted text-muted'
}

function dateLabel(status: SubscriptionStatus) {
  if (status === 'cancelled') return 'Cancelled'
  if (status === 'paused') return 'Paused since'
  return 'Renews'
}

export function MemberSubscriptions({ subscriptions }: { subscriptions: Subscription[] }) {
  if (subscriptions.length === 0) {
    return (
      <div className="mt-6">
        <Button variant="primary">
          <Plus className="size-4" />
          Add subscription
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col mt-6 border-t border-border">
      {subscriptions.map((sub) => (
        <SubscriptionRow key={sub.id} subscription={sub} />
      ))}
    </div>
  )
}

function SubscriptionRow({ subscription }: { subscription: Subscription }) {
  const [statusBg, statusText] = statusColor(subscription.status).split(' ')

  return (
    <div className="flex items-center gap-6 py-5 border-b border-border">
      <div className="w-[100px] shrink-0 flex flex-col gap-2">
        <p
          className="font-sans text-[28px] leading-none tracking-[-0.025em] text-foreground"
          style={{ fontVariationSettings: "'opsz' 32, 'wght' 400" }}
        >
          {subscription.currency}
          {subscription.amount}
        </p>
        <p className="t-mono text-muted">
          {subscription.period === 'monthly' ? 'Monthly' : 'Yearly'}
        </p>
      </div>

      <div className="flex-1 min-w-0 flex flex-col gap-1.5">
        <div className="flex items-center gap-3">
          <p className="text-foreground text-[15px] font-medium">{subscription.tier}</p>
          <div className="flex items-center gap-1.5">
            <span className={cn('size-1.5 rounded-full', statusBg)} aria-hidden />
            <span className={cn('t-info', statusText)}>
              {STATUS_LABEL[subscription.status]}
            </span>
          </div>
        </div>
        <p className="t-byline text-muted">
          {dateLabel(subscription.status)} {formatDate(subscription.date)}
        </p>
      </div>

      <Button variant="ghost" size="icon" aria-label="Subscription actions">
        <MoreHorizontal className="size-4" />
      </Button>
    </div>
  )
}
