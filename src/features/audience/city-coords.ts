/** [lat, lng] for the cities used by mockMembers. */
export const CITY_COORDS: Record<string, [number, number]> = {
  London: [51.5074, -0.1278],
  Berlin: [52.52, 13.405],
  'New York': [40.7128, -74.006],
  Lisbon: [38.7223, -9.1393],
  Paris: [48.8566, 2.3522],
  Tokyo: [35.6762, 139.6503],
  Amsterdam: [52.3676, 4.9041],
  Glasgow: [55.8642, -4.2518],
  'San Francisco': [37.7749, -122.4194],
  Vienna: [48.2082, 16.3738],
  Milan: [45.4642, 9.19],
  Remote: [20, 0],
}

export function coordsFor(city: string): [number, number] {
  return CITY_COORDS[city] ?? [20, 0]
}
