import { Button } from '@/components/ui/button'

export function AnalyticsBanner() {
  return (
    <aside className="relative flex items-center overflow-hidden bg-[#FFF78D] rounded-[2px] min-h-[180px]">
      <div className="relative z-10 flex flex-col gap-3 px-8 py-8 max-w-[520px]">
        <h3 className="text-foreground text-[24px] font-medium leading-tight tracking-[-0.005em]">
          Understanding analytics in Ghost
        </h3>
        <p className="text-foreground text-[14px] leading-snug max-w-[420px]">
          Find out how to review the performance of your content and get the most out of post
          analytics.
        </p>
        <div className="mt-3">
          <Button variant="primary">Learn more</Button>
        </div>
      </div>
      <img
        src="/dashboard-graphics.png"
        alt=""
        aria-hidden
        className="absolute right-0 top-0 h-full"
      />
    </aside>
  )
}
