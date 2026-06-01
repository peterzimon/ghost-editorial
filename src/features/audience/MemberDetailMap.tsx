import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface MemberDetailMapProps {
  lat: number
  lng: number
}

/**
 * Dimmed map backdrop centred on a city. Uses CartoDB's free "light no labels"
 * basemap (OSM data) — no API token required. Interaction is disabled so it
 * behaves as a static backdrop; CSS filters mute it further.
 */
export function MemberDetailMap({ lat, lng }: MemberDetailMapProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const map = L.map(el, {
      center: [lat, lng],
      zoom: 5,
      zoomControl: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      boxZoom: false,
      keyboard: false,
      dragging: false,
      touchZoom: false,
      attributionControl: false,
      zoomSnap: 0,
    })

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}@2x.png', {
      maxZoom: 19,
      subdomains: 'abcd',
    }).addTo(map)

    L.marker([lat, lng], {
      icon: L.divIcon({
        className: 'member-map-pin',
        html: '<span style="display:block;width:14px;height:14px;border-radius:9999px;background:#ef0e22;box-shadow:0 0 0 3px #fff,0 2px 6px rgba(0,0,0,0.25);"></span>',
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      }),
      interactive: false,
      keyboard: false,
    }).addTo(map)

    return () => {
      map.remove()
    }
  }, [lat, lng])

  return (
    <div
      ref={ref}
      className="w-full h-full"
      style={{ filter: 'grayscale(0.4) opacity(0.55)' }}
    />
  )
}
