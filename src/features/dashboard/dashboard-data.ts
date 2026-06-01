export interface StatData {
  label: string
  value: string
  series: number[]
  color: string
  rangeStart: string
  rangeEnd: string
}

export const STATS: StatData[] = [
  {
    label: 'Unique visitors',
    value: '68',
    series: [
      30, 32, 32, 33, 35, 36, 36, 38, 38, 40,
      42, 42, 44, 46, 48, 50, 51, 52, 53, 54,
      56, 58, 60, 62, 63, 64, 65, 66, 67, 68,
    ],
    color: '#16a34a',
    rangeStart: '2 May',
    rangeEnd: '1 Jun',
  },
  {
    label: 'Members',
    value: '21,043',
    series: [
      21015, 21017, 21019, 21019, 21020, 21021, 21020, 21020, 21021, 21022,
      21022, 21023, 21023, 21024, 21024, 21025, 21025, 21025, 21026, 21027,
      21027, 21027, 21028, 21029, 21030, 21032, 21035, 21038, 21041, 21043,
    ],
    color: '#4f46e5',
    rangeStart: '2 May',
    rangeEnd: '1 Jun',
  },
  {
    label: 'MRR',
    value: '$41',
    series: [
      28, 29, 29, 30, 30, 31, 31, 31, 32, 33,
      33, 33, 34, 35, 35, 35, 36, 37, 37, 38,
      38, 38, 39, 40, 40, 40, 40, 41, 41, 41,
    ],
    color: '#be185d',
    rangeStart: '2 May',
    rangeEnd: '1 Jun',
  },
]
