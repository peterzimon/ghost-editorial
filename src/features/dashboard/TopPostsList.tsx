import { ListRow } from '@/components/patterns/list-row'
import { SectionHeading } from '@/components/patterns/section-heading'
import type { DashboardPost } from './dashboard-posts-data'

function formatNumber(n: number): string {
  return n.toLocaleString('en-US')
}

const STAT_COL = 'w-[88px] shrink-0 text-right'

export function TopPostsList({ posts }: { posts: DashboardPost[] }) {
  return (
    <section className="flex flex-col">
      <SectionHeading>Recent posts</SectionHeading>

      <div className="flex flex-col">
        <div className="flex items-center gap-4 t-info text-muted h-[52px] px-4 py-4 border-b border-border">
          <p className="flex-1">Post</p>
          <p className={STAT_COL}>Visitors</p>
          <p className={STAT_COL}>Members</p>
        </div>

        {posts.map((post) => (
          <ListRow key={post.id} className="flex items-center gap-4 py-4">
            <img
              src={post.thumbnail}
              alt=""
              className="w-[80px] h-[50px] object-cover shrink-0 rounded-[2px]"
              loading="lazy"
              draggable={false}
            />
            <div className="flex-1 min-w-0 flex flex-col gap-1">
              <p className="text-foreground text-[14px] font-medium truncate">{post.title}</p>
              <p className="t-byline text-[13px]">
                <span className="text-muted">By </span>
                <span className="text-foreground">{post.author}</span>
                <span className="text-muted"> — {post.publishedAt}</span>
              </p>
            </div>
            <p
              className={`${STAT_COL} font-sans text-[14px] leading-none tracking-[-0.02em] text-foreground`}
              style={{ fontVariationSettings: "'opsz' 24, 'wght' 400" }}
            >
              {formatNumber(post.visitors)}
            </p>
            <p
              className={`${STAT_COL} font-sans text-[14px] leading-none tracking-[-0.02em] text-foreground`}
              style={{ fontVariationSettings: "'opsz' 24, 'wght' 400" }}
            >
              {formatNumber(post.members)}
            </p>
          </ListRow>
        ))}
      </div>
    </section>
  )
}
