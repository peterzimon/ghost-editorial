const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const DAY_MS = 86_400_000

/**
 * Prototype-only reference "today" — keeps mock data feeling stable
 * regardless of when the prototype is opened.
 */
export const TODAY = new Date('2026-05-30T00:00:00Z')

function startOfDay(d: Date): Date {
  const r = new Date(d)
  r.setUTCHours(0, 0, 0, 0)
  return r
}

function formatAbsolute(date: Date): string {
  return `${date.getUTCDate()} ${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`
}

export function formatRelativeDate(date: Date, now: Date = TODAY): string {
  const days = Math.round((startOfDay(now).getTime() - startOfDay(date).getTime()) / DAY_MS)

  // Future-dated (scheduled) posts always render as an absolute date.
  if (days < 0) return formatAbsolute(date)

  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days} days ago`
  if (days < 30) {
    const weeks = Math.round(days / 7)
    return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`
  }
  return formatAbsolute(date)
}
