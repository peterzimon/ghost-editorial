import {
  Bell,
  Clock,
  Crown,
  FileText,
  Mail,
  RefreshCw,
  UserPlus,
  type LucideIcon,
} from 'lucide-react'

export type AutomationStatus = 'active' | 'paused'

export interface Automation {
  id: string
  name: string
  trigger: string
  status: AutomationStatus
  icon: LucideIcon
  iconBg: string
  lastRun: Date
}

const TODAY = new Date('2026-05-30T00:00:00Z')

function daysAgo(n: number): Date {
  const d = new Date(TODAY)
  d.setUTCDate(d.getUTCDate() - n)
  return d
}

export const mockAutomations: Automation[] = [
  {
    id: 'a1',
    name: 'Welcome series',
    trigger: 'Member signs up',
    status: 'active',
    icon: UserPlus,
    iconBg: '#ceedf3',
    lastRun: daysAgo(0),
  },
  {
    id: 'a2',
    name: 'VIP onboarding',
    trigger: 'Tier changes to VIP',
    status: 'active',
    icon: Crown,
    iconBg: '#eae9c7',
    lastRun: daysAgo(1),
  },
  {
    id: 'a3',
    name: 'Re-engagement nudge',
    trigger: 'No opens in 30 days',
    status: 'active',
    icon: Bell,
    iconBg: '#ffdbe7',
    lastRun: daysAgo(3),
  },
  {
    id: 'a4',
    name: 'Trial reminder',
    trigger: '7 days before trial ends',
    status: 'paused',
    icon: Clock,
    iconBg: '#f2c6c8',
    lastRun: daysAgo(18),
  },
  {
    id: 'a5',
    name: 'New post digest',
    trigger: 'Post published',
    status: 'active',
    icon: FileText,
    iconBg: '#d1efdd',
    lastRun: daysAgo(1),
  },
  {
    id: 'a6',
    name: 'Annual renewal',
    trigger: 'Annual subscription ending',
    status: 'active',
    icon: RefreshCw,
    iconBg: '#fee0c9',
    lastRun: daysAgo(42),
  },
  {
    id: 'a7',
    name: 'Cancellation save',
    trigger: 'Member cancels subscription',
    status: 'paused',
    icon: Mail,
    iconBg: '#e0e4ff',
    lastRun: daysAgo(73),
  },
]
