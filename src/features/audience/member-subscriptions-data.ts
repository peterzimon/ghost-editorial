export type SubscriptionStatus = 'active' | 'cancelled' | 'paused'
export type SubscriptionPeriod = 'monthly' | 'yearly'

export interface Subscription {
  id: string
  tier: string
  amount: number
  currency: string
  period: SubscriptionPeriod
  status: SubscriptionStatus
  /** Renews date for active, cancellation date for cancelled. */
  date: Date
}

const TODAY = new Date('2026-05-30T00:00:00Z')

function inDays(n: number): Date {
  const d = new Date(TODAY)
  d.setUTCDate(d.getUTCDate() + n)
  return d
}

export function subscriptionsFor(memberId: string): Subscription[] {
  if (memberId === 'm2') {
    return [
      {
        id: 'sub-leo-1',
        tier: 'Supporter',
        amount: 5,
        currency: '$',
        period: 'monthly',
        status: 'active',
        date: inDays(11), // 10 Jun 2026
      },
    ]
  }
  if (memberId === 'm6') {
    return [
      {
        id: 'sub-jp-1',
        tier: 'Friends & Family',
        amount: 50,
        currency: '$',
        period: 'yearly',
        status: 'active',
        date: inDays(180),
      },
    ]
  }
  if (memberId === 'm15') {
    return [
      {
        id: 'sub-theo-1',
        tier: 'Supporter',
        amount: 5,
        currency: '$',
        period: 'monthly',
        status: 'cancelled',
        date: inDays(-14),
      },
    ]
  }
  return []
}

export interface MemberNewsletter {
  id: string
  name: string
  description: string
  subscribed: boolean
}

const NEWSLETTERS: Omit<MemberNewsletter, 'subscribed'>[] = [
  {
    id: 'nl-weekly',
    name: 'The Weekly Digest',
    description: 'A roundup of the best stories every Friday.',
  },
  {
    id: 'nl-field-notes',
    name: 'Field Notes',
    description: 'Short reflections and reading lists, twice a month.',
  },
  {
    id: 'nl-premium',
    name: 'Premium Briefing',
    description: 'Member-only deep dives sent on the first of each month.',
  },
  {
    id: 'nl-releases',
    name: 'Releases',
    description: 'New features and product updates as they ship.',
  },
]

export function newslettersFor(memberId: string): MemberNewsletter[] {
  if (memberId === 'm2') {
    return [
      { ...NEWSLETTERS[0], subscribed: true },
      { ...NEWSLETTERS[1], subscribed: true },
      { ...NEWSLETTERS[2], subscribed: true },
      { ...NEWSLETTERS[3], subscribed: false },
    ]
  }
  if (memberId === 'm6') {
    return [
      { ...NEWSLETTERS[0], subscribed: true },
      { ...NEWSLETTERS[1], subscribed: false },
      { ...NEWSLETTERS[2], subscribed: true },
      { ...NEWSLETTERS[3], subscribed: true },
    ]
  }
  return [
    { ...NEWSLETTERS[0], subscribed: true },
    { ...NEWSLETTERS[1], subscribed: false },
    { ...NEWSLETTERS[2], subscribed: false },
    { ...NEWSLETTERS[3], subscribed: true },
  ]
}
