export type Avatar =
  | { kind: 'photo'; src: string }
  | { kind: 'initials'; text: string; bg: string }

export interface Member {
  id: string
  name: string
  avatar: Avatar
  openRate: number
  location: string
  createdAt: Date
}

const photo = (n: number): Avatar => ({ kind: 'photo', src: `https://i.pravatar.cc/64?img=${n}` })

export const mockMembers: Member[] = [
  { id: 'm1',  name: 'Ashlynn Bator',  avatar: { kind: 'initials', text: 'AB', bg: '#f2c6c8' }, openRate: 18, location: 'London',     createdAt: new Date('2026-02-12') },
  { id: 'm2',  name: 'Leo George',     avatar: photo(12),                                       openRate: 41, location: 'Berlin',     createdAt: new Date('2026-02-11') },
  { id: 'm3',  name: 'Leo Carder',     avatar: { kind: 'initials', text: 'LC', bg: '#eae9c7' }, openRate: 12, location: 'London',     createdAt: new Date('2026-02-10') },
  { id: 'm4',  name: 'Marley Stanton', avatar: photo(32),                                       openRate: 29, location: 'New York',   createdAt: new Date('2026-02-08') },
  { id: 'm5',  name: 'Maren Calzoni',  avatar: photo(47),                                       openRate: 22, location: 'Lisbon',     createdAt: new Date('2026-02-07') },
  { id: 'm6',  name: 'Jordyn Press',   avatar: { kind: 'initials', text: 'JP', bg: '#ceedf3' }, openRate: 38, location: 'Paris',      createdAt: new Date('2026-02-03') },
  { id: 'm7',  name: 'Emerson Donin',  avatar: { kind: 'initials', text: 'ED', bg: '#ffdbe7' }, openRate: 18, location: 'London',     createdAt: new Date('2026-01-30') },
  { id: 'm8',  name: 'Zaire Bergson',  avatar: photo(58),                                       openRate: 51, location: 'Tokyo',      createdAt: new Date('2026-01-28') },
  { id: 'm9',  name: 'alex@ghost.org', avatar: { kind: 'initials', text: 'A',  bg: '#fee0c9' }, openRate: 9,  location: 'Remote',     createdAt: new Date('2026-01-22') },
  { id: 'm10', name: 'Roger Kenter',   avatar: photo(13),                                       openRate: 24, location: 'Amsterdam',  createdAt: new Date('2026-01-19') },
  { id: 'm11', name: 'Marilyn Lubin',  avatar: photo(45),                                       openRate: 33, location: 'London',     createdAt: new Date('2026-01-14') },
  { id: 'm12', name: 'Paityn Carder',  avatar: { kind: 'initials', text: 'PC', bg: '#d1efdd' }, openRate: 16, location: 'Glasgow',    createdAt: new Date('2026-01-09') },
  { id: 'm13', name: 'Marley Press',   avatar: { kind: 'initials', text: 'MP', bg: '#f0c5c5' }, openRate: 27, location: 'San Francisco', createdAt: new Date('2025-12-30') },
  { id: 'm14', name: 'Sasha Pohlmann', avatar: photo(20),                                       openRate: 19, location: 'Vienna',     createdAt: new Date('2025-12-21') },
  { id: 'm15', name: 'Theo Rinaldi',   avatar: { kind: 'initials', text: 'TR', bg: '#e0e4ff' }, openRate: 44, location: 'Milan',      createdAt: new Date('2025-12-15') },
]
