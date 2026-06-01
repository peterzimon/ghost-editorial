interface SparklineProps {
  data: number[]
  lineColor: string
  fillColor: string
  className?: string
}

const VIEW_W = 400
const VIEW_H = 110
const PAD_TOP = 10
const PAD_BOTTOM = 8

/**
 * Smooth Catmull-Rom-to-cubic-bezier interpolation across the points.
 * Produces a C2-continuous curve through every sample.
 */
function smoothPath(points: ReadonlyArray<readonly [number, number]>): string {
  if (points.length === 0) return ''
  const tension = 0.5
  const segs: string[] = [`M ${points[0][0].toFixed(2)} ${points[0][1].toFixed(2)}`]
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)]
    const p1 = points[i]
    const p2 = points[i + 1]
    const p3 = points[Math.min(points.length - 1, i + 2)]
    const cp1x = p1[0] + ((p2[0] - p0[0]) * tension) / 6
    const cp1y = p1[1] + ((p2[1] - p0[1]) * tension) / 6
    const cp2x = p2[0] - ((p3[0] - p1[0]) * tension) / 6
    const cp2y = p2[1] - ((p3[1] - p1[1]) * tension) / 6
    segs.push(
      `C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)} ${cp2x.toFixed(2)} ${cp2y.toFixed(2)} ${p2[0].toFixed(2)} ${p2[1].toFixed(2)}`,
    )
  }
  return segs.join(' ')
}

export function Sparkline({ data, lineColor, fillColor, className }: SparklineProps) {
  if (data.length < 2) return null

  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const stepX = VIEW_W / (data.length - 1)
  const chartH = VIEW_H - PAD_TOP - PAD_BOTTOM

  const points = data.map(
    (v, i) => [i * stepX, PAD_TOP + ((max - v) / range) * chartH] as const,
  )

  const linePath = smoothPath(points)
  const areaPath = `${linePath} L ${VIEW_W} ${VIEW_H} L 0 ${VIEW_H} Z`

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio="none"
      className={className}
      aria-hidden
    >
      <path d={areaPath} fill={fillColor} fillOpacity={0.3} />
      <path
        d={linePath}
        stroke={lineColor}
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}
