export interface ReaderSource {
  id: string
  name: string
  initial: string
  bg: string
}

const SOURCES: Record<string, ReaderSource> = {
  tangle:    { id: 'tangle',    name: 'Tangle',    initial: 'T', bg: '#7c2c66' },
  spyglass:  { id: 'spyglass',  name: 'Spyglass',  initial: 'S', bg: '#2563eb' },
  '404':     { id: '404',       name: '404 Media', initial: '4', bg: '#191919' },
  verge:     { id: 'verge',     name: 'The Verge', initial: 'V', bg: '#e0563b' },
  strat:     { id: 'strat',     name: 'Stratechery', initial: 'S', bg: '#0f766e' },
  wired:     { id: 'wired',     name: 'Wired',     initial: 'W', bg: '#000000' },
  defector:  { id: 'defector',  name: 'Defector',  initial: 'D', bg: '#d97706' },
}

export interface ReaderArticle {
  id: string
  source: ReaderSource
  publishedAt: string
  title: string
  description?: string
  readMinutes: number
  thumbnail?: string
}

export const READER_CATEGORIES = [
  'Following',
  'Personal',
  'Technology',
  'Business',
  'Culture',
  'Programming',
  'News',
  'Art',
  'Travel',
  'Education',
  'Entertainment',
  'Finance',
  'Politics',
  'Science',
] as const

export type ReaderCategory = (typeof READER_CATEGORIES)[number]

export const READER_ARTICLES: ReaderArticle[] = [
  {
    id: 'r1',
    source: SOURCES.tangle,
    publishedAt: 'Yesterday',
    title: 'What It Really Takes to Be a Competitive Chess Player',
    description:
      'By Anonymous — A game of chess played in the open might appear to be a simple, quiet game, but most of the winning is actually done away from the board. Everything from…',
    readMinutes: 5,
    thumbnail: 'https://picsum.photos/seed/chess-player/240/200',
  },
  {
    id: 'r2',
    source: SOURCES.spyglass,
    publishedAt: 'Yesterday',
    title: 'Microsoft Seeks a Surface RT & Copilot+ PC Do-Over with NVIDIA',
    description: "Can the main AI chip maker ensure Windows owns the 'AI PC'?",
    readMinutes: 3,
    thumbnail: 'https://picsum.photos/seed/ms-nvidia/240/200',
  },
  {
    id: 'r3',
    source: SOURCES['404'],
    publishedAt: 'Yesterday',
    title: 'Behind the Blog: Being New and Some Numbers',
    description:
      "This week, we discuss going deeper and Google's search changes.",
    readMinutes: 1,
    thumbnail: 'https://picsum.photos/seed/blog-numbers/240/200',
  },
  {
    id: 'r4',
    source: SOURCES.tangle,
    publishedAt: 'Yesterday',
    title: 'The best of your best.',
    description: 'The Tangle staff picks our favorite reader essays.',
    readMinutes: 6,
    thumbnail: 'https://picsum.photos/seed/best-essays/240/200',
  },
  {
    id: 'r5',
    source: SOURCES['404'],
    publishedAt: 'Yesterday',
    title: "New Study Reveals the Manipulative 'Dark Patterns' of AI Chatbots",
    description:
      "A new study by the Center for Democracy & Technology shows how chatbots like ChatGPT, Gemini, Replika and more can lead users down paths they didn't intend.",
    readMinutes: 5,
    thumbnail: 'https://picsum.photos/seed/dark-patterns/240/200',
  },
  {
    id: 'r6',
    source: SOURCES.spyglass,
    publishedAt: '28 May',
    title: 'Inklings #014 ✍️',
    description:
      'A weekly batch of small thoughts, sketches, and reading notes — mostly about how the web is shifting under our feet.',
    readMinutes: 4,
    thumbnail: 'https://picsum.photos/seed/inklings-14/240/200',
  },
  {
    id: 'r7',
    source: SOURCES.verge,
    publishedAt: '27 May',
    title: 'Spotify is testing AI-curated playlists for paying subscribers',
    description:
      'The new feature builds a continuously updating mix from your listening habits and a short text prompt — and yes, you can tell it to be weirder.',
    readMinutes: 4,
    thumbnail: 'https://picsum.photos/seed/spotify-ai/240/200',
  },
  {
    id: 'r8',
    source: SOURCES.strat,
    publishedAt: '26 May',
    title: 'The end of the open algorithm',
    description:
      'For two decades the open social graph was a load-bearing assumption of the web. We are quietly past the moment it stopped being true.',
    readMinutes: 8,
    thumbnail: 'https://picsum.photos/seed/open-algorithm/240/200',
  },
  {
    id: 'r9',
    source: SOURCES.wired,
    publishedAt: '24 May',
    title: 'The future of writing assistants is not what you think',
    description:
      'Less autocomplete, more thought partner. A look at the research teams quietly redefining what a “writing tool” actually does.',
    readMinutes: 7,
    thumbnail: 'https://picsum.photos/seed/writing-future/240/200',
  },
  {
    id: 'r10',
    source: SOURCES.defector,
    publishedAt: '22 May',
    title: 'How the worst draft pick in living memory became a folk hero',
    description:
      'He could not shoot, could not pass, and could not defend. Twenty years on, he is the most-quoted player in the franchise.',
    readMinutes: 6,
    thumbnail: 'https://picsum.photos/seed/draft-pick/240/200',
  },
]
