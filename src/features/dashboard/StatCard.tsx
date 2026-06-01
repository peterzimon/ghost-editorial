import { Sparkline } from './Sparkline'
import type { StatData } from './dashboard-data'
import { cn } from '@/lib/cn'

interface StatCardProps {
  stat: StatData
  className?: string
}

export function StatCard({ stat, className }: StatCardProps) {
  return (
    <div className={cn('flex flex-col gap-4 py-6', className)}>
      <div className="flex flex-col gap-3">
        <p className="t-mono text-muted">{stat.label}</p>
        <p
          className="font-sans text-[32px] leading-none tracking-[-0.015em] text-foreground"
          style={{ fontVariationSettings: "'opsz' 36, 'wght' 400" }}
        >
          {stat.value}
        </p>
      </div>

      <div className="border-t border-border">
        <Sparkline data={stat.series} color={stat.color} className="w-full h-[110px] block" />
      </div>

      <div className="flex items-baseline justify-between t-mono text-muted">
        <span>{stat.rangeStart}</span>
        <span>{stat.rangeEnd}</span>
      </div>
    </div>
  )
}
