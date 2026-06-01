export interface DashboardPost {
  id: string
  title: string
  author: string
  publishedAt: string
  thumbnail: string
  visitors: number
  members: number
}

export const LATEST_POST: DashboardPost = {
  id: 'lp',
  title: 'Sheet music for the algorithm era',
  author: 'Aron Lemke',
  publishedAt: 'Yesterday',
  thumbnail: 'https://picsum.photos/seed/sheet-algorithm/720/450',
  visitors: 1428,
  members: 42,
}

export const RECENT_POSTS: DashboardPost[] = [
  {
    id: 'r1',
    title: 'Berkshire Hathaway luxury getaway Monaco Royalty upgrade lifestyle',
    author: 'Aron Lemke',
    publishedAt: '2 weeks ago',
    thumbnail: 'https://picsum.photos/seed/monaco-luxury/240/160',
    visitors: 982,
    members: 28,
  },
  {
    id: 'r2',
    title: 'Beauty supplements clean beauty',
    author: 'Aron Lemke',
    publishedAt: '14 May 2026',
    thumbnail: 'https://picsum.photos/seed/beauty-clean/240/160',
    visitors: 615,
    members: 12,
  },
  {
    id: 'r3',
    title: 'Spontaneous the wanderers customised hand shaved',
    author: 'Aron Lemke',
    publishedAt: '4 Jan 2026',
    thumbnail: 'https://picsum.photos/seed/wanderers/240/160',
    visitors: 422,
    members: 9,
  },
  {
    id: 'r4',
    title: 'On working slowly in a world that rewards speed',
    author: 'Maren Calzoni',
    publishedAt: '21 Dec 2025',
    thumbnail: 'https://picsum.photos/seed/working-slowly/240/160',
    visitors: 384,
    members: 7,
  },
  {
    id: 'r5',
    title: 'Half-finished thoughts on subscription pricing',
    author: 'Aron Lemke',
    publishedAt: '12 Dec 2025',
    thumbnail: 'https://picsum.photos/seed/subscription-pricing/240/160',
    visitors: 297,
    members: 5,
  },
]
