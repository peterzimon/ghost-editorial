import { Sparkline } from './Sparkline'
import type { StatData } from './dashboard-data'
import { cn } from '@/lib/cn'

interface StatCardProps {
  stat: StatData
  className?: string
}

export function StatCard({ stat, className }: StatCardProps) {
  return (
    <div className={cn('flex flex-col py-6', className)}>
      <div className="flex flex-col gap-2">
        <p className="t-mono text-muted">{stat.label}</p>
        <p
          className="font-sans text-[32px] leading-none tracking-[-0.025em] text-foreground"
          style={{ fontVariationSettings: "'opsz' 36, 'wght' 400" }}
        >
          {stat.value}
        </p>
      </div>

      <div className="mt-4 pt-6 border-t border-border">
        <Sparkline
          data={stat.series}
          lineColor={stat.lineColor}
          fillColor={stat.fillColor}
          className="w-full h-[110px] block"
        />
      </div>

      <div className="mt-2 flex items-baseline justify-between t-mono text-muted">
        <span>{stat.rangeStart}</span>
        <span>{stat.rangeEnd}</span>
      </div>
    </div>
  )
}
