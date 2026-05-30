import type { ReaderArticle } from './reader-data'

export function ReaderArticleRow({ article }: { article: ReaderArticle }) {
  return (
    <article className="relative flex gap-8 items-start py-6 pl-8 -ml-8 pr-10 -mr-10 hover:bg-row-hover transition-colors cursor-pointer after:content-[''] after:absolute after:left-8 after:right-10 after:bottom-0 after:h-px after:bg-border after:transition-opacity hover:after:opacity-0 has-[+article:hover]:after:opacity-0">
      <div className="flex-1 min-w-0 flex flex-col gap-2">
        <div className="flex items-center gap-2 text-[13px]">
          <span
            className="size-5 flex items-center justify-center rounded-full text-white text-[10px] font-semibold leading-none"
            style={{ backgroundColor: article.source.bg }}
            aria-hidden
          >
            {article.source.initial}
          </span>
          <span className="font-medium text-foreground">{article.source.name}</span>
          <span className="text-muted">· {article.publishedAt}</span>
        </div>

        <h3 className="text-[18px] font-semibold leading-snug text-foreground tracking-[-0.005em]">
          {article.title}
        </h3>

        {article.description && (
          <p className="text-[14px] text-muted leading-snug line-clamp-2 max-w-[640px]">
            {article.description}
          </p>
        )}

        <p className="t-info text-muted mt-1">{article.readMinutes} min read</p>
      </div>

      {article.thumbnail && (
        <img
          src={article.thumbnail}
          alt=""
          className="w-[128px] h-[80px] object-cover shrink-0"
          loading="lazy"
          draggable={false}
        />
      )}
    </article>
  )
}
