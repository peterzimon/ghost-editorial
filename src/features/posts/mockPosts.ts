export type PostStatus = 'published' | 'draft' | 'scheduled'

export interface Post {
  id: string
  title: string
  author: string
  newsletter: string
  publishedAt: Date
  status: PostStatus
}

export const mockPosts: Post[] = [
  {
    id: 'p1',
    title: 'More waves than Die Hard movies hand-san home schooling Amazon getting richer',
    author: 'Aron Lemke',
    newsletter: 'Newsletters',
    publishedAt: new Date('2026-05-29T10:00:00Z'),
    status: 'published',
  },
  {
    id: 'p2',
    title: 'Berkshire Hathaway luxury getaway Monaco Royalty upgrade lifestyle',
    author: 'Aron Lemke',
    newsletter: 'Newsletters',
    publishedAt: new Date('2026-05-16T10:00:00Z'),
    status: 'published',
  },
  {
    id: 'p3',
    title: 'Beauty supplements clean beauty',
    author: 'Aron Lemke',
    newsletter: 'Newsletters',
    publishedAt: new Date('2026-05-14T10:00:00Z'),
    status: 'published',
  },
  {
    id: 'p4',
    title: '',
    author: 'Aron Lemke',
    newsletter: 'Newsletters',
    publishedAt: new Date('2026-04-19T10:00:00Z'),
    status: 'draft',
  },
  {
    id: 'p5',
    title: 'Spontaneous the wanderers customised hand shaved',
    author: 'Aron Lemke',
    newsletter: 'Newsletters',
    publishedAt: new Date('2026-01-04T10:00:00Z'),
    status: 'published',
  },
  {
    id: 'p6',
    title: 'Ten ways to go beyond your usual self',
    author: 'Aron Lemke',
    newsletter: 'Newsletters',
    publishedAt: new Date('2025-12-21T10:00:00Z'),
    status: 'published',
  },
  {
    id: 'p7',
    title: 'A short note about quiet mornings',
    author: 'Aron Lemke',
    newsletter: 'Field Notes',
    publishedAt: new Date('2026-06-12T10:00:00Z'),
    status: 'scheduled',
  },
  {
    id: 'p8',
    title: 'On working slowly in a world that rewards speed',
    author: 'Maren Calzoni',
    newsletter: 'Field Notes',
    publishedAt: new Date('2026-06-04T10:00:00Z'),
    status: 'scheduled',
  },
  {
    id: 'p9',
    title: 'Half-finished thoughts on subscription pricing',
    author: 'Aron Lemke',
    newsletter: 'Field Notes',
    publishedAt: new Date('2026-05-22T10:00:00Z'),
    status: 'draft',
  },
  {
    id: 'p10',
    title: 'Why we left San Francisco — second attempt',
    author: 'Leo George',
    newsletter: 'Newsletters',
    publishedAt: new Date('2026-05-18T10:00:00Z'),
    status: 'draft',
  },
  {
    id: 'p11',
    title: 'A field guide to launching things that aren’t ready',
    author: 'Aron Lemke',
    newsletter: 'Newsletters',
    publishedAt: new Date('2025-11-02T10:00:00Z'),
    status: 'published',
  },
  {
    id: 'p12',
    title: 'Letters from the desk: April recap',
    author: 'Maren Calzoni',
    newsletter: 'Letters',
    publishedAt: new Date('2025-09-15T10:00:00Z'),
    status: 'published',
  },
]
