import { Pencil, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { DashboardPost } from './dashboard-posts-data'

function formatNumber(n: number): string {
  return n.toLocaleString('en-US')
}

export function LatestPostCard({ post }: { post: DashboardPost }) {
  return (
    <aside className="bg-elevated p-8 flex flex-col gap-6">
      <img
        src={post.thumbnail}
        alt=""
        className="w-full aspect-[16/10] object-cover rounded-[2px]"
        loading="lazy"
        draggable={false}
      />

      <div className="flex flex-col gap-2">
        <p className="t-mono text-muted">Latest post</p>
        <h3 className="text-foreground text-[18px] font-medium leading-snug tracking-[-0.005em]">
          {post.title}
        </h3>
        <p className="t-byline">
          <span className="text-muted">By </span>
          <span className="text-foreground">{post.author}</span>
          <span className="text-muted"> — {post.publishedAt}</span>
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-5 border-t border-border">
        <Stat label="Members" value={post.members} />
        <Stat label="Unique visitors" value={post.visitors} />
      </div>

      <div className="flex gap-3">
        <Button variant="primary">
          <Pencil className="size-4" />
          Edit post
        </Button>
        <Button variant="secondary">
          <Share2 className="size-4" />
          Share
        </Button>
      </div>
    </aside>
  )
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="t-mono text-muted">{label}</p>
      <p
        className="font-sans text-[26px] leading-none tracking-[-0.025em] text-foreground"
        style={{ fontVariationSettings: "'opsz' 32, 'wght' 400" }}
      >
        {formatNumber(value)}
      </p>
    </div>
  )
}
