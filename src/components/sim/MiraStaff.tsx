import type { ReactNode } from 'react'

// Mira topográfica completa (contexto espacial). Muestra dónde cae la línea de puntería
// dentro de la mira de `staffMax` metros, sin revelar el valor de la lectura.

interface Props {
  reading: number
  staffMax: number
  height?: number
}

export function MiraStaff({ reading, staffMax, height = 380 }: Props) {
  const H = height
  const W = 58
  const y = (v: number) => H - (v / staffMax) * H

  const marks: ReactNode[] = []
  const dmCount = Math.round(staffMax * 10)
  for (let dm = 0; dm <= dmCount; dm++) {
    const v = dm / 10
    const yy = y(v)
    if (dm % 2 === 0 && dm < dmCount) {
      marks.push(
        <rect key={`blk${dm}`} x={W * 0.42} y={y(v + 0.1)} width={W * 0.3} height={(H / dmCount)} fill="#b91c1c" />,
      )
    }
    marks.push(
      <line key={`tk${dm}`} x1={W * 0.42} y1={yy} x2={W * 0.42 - (dm % 5 === 0 ? 12 : 6)} y2={yy} stroke="#334155" strokeWidth={dm % 5 === 0 ? 1.5 : 1} />,
    )
    if (dm % 5 === 0) {
      marks.push(
        <text key={`lb${dm}`} x={W * 0.42 - 15} y={yy + 4} textAnchor="end" fontSize={11} fontWeight={600} fill="#475569">
          {v.toFixed(1).replace('.', ',')}
        </text>,
      )
    }
  }

  const yr = y(reading)
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ height, width: W }} className="overflow-visible">
      <rect x={W * 0.42} y={0} width={W * 0.3} height={H} fill="#ffffff" stroke="#cbd5e1" />
      {marks}
      {/* Línea de puntería */}
      <line x1={W * 0.2} y1={yr} x2={W} y2={yr} stroke="#dc2626" strokeWidth={1.5} strokeDasharray="4 2" />
      <polygon points={`${W},${yr - 5} ${W},${yr + 5} ${W - 8},${yr}`} fill="#dc2626" />
    </svg>
  )
}
