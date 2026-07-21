// Vista magnificada del telescopio del nivel: el estudiante lee la mira en la retícula.
// NO muestra el valor numérico de la lectura; solo las graduaciones para interpretarlo.

interface Props {
  reading: number // valor verdadero (m) donde cae el hilo medio
  windowM?: number // altura de la ventana visible (m)
  size?: number
}

export function TelescopeView({ reading, windowM = 0.2, size = 260 }: Props) {
  const D = size
  const topVal = reading + windowM / 2
  const y = (v: number) => ((topVal - v) / windowM) * D

  const startCm = Math.floor((reading - windowM / 2) * 100)
  const endCm = Math.ceil((reading + windowM / 2) * 100)

  const blocks: JSX.Element[] = []
  const ticks: JSX.Element[] = []
  for (let cm = startCm; cm <= endCm; cm++) {
    const v = cm / 100
    const yy = y(v)
    const isDm = cm % 10 === 0
    // Patrón tipo mira: bloques de 1 cm alternados en negro/blanco.
    if (cm % 2 === 0) {
      blocks.push(
        <rect key={`b${cm}`} x={D * 0.5} y={y(v + 0.01)} width={D * 0.16} height={D * (0.01 / windowM)} fill="#0f172a" />,
      )
    }
    ticks.push(
      <line
        key={`t${cm}`}
        x1={D * 0.5}
        y1={yy}
        x2={D * 0.5 - (isDm ? 26 : cm % 5 === 0 ? 16 : 9)}
        y2={yy}
        stroke={isDm ? '#b91c1c' : '#334155'}
        strokeWidth={isDm ? 2 : 1}
      />,
    )
    if (isDm) {
      ticks.push(
        <text
          key={`l${cm}`}
          x={D * 0.5 - 30}
          y={yy + 4}
          textAnchor="end"
          fontSize={13}
          fontWeight={700}
          fill="#b91c1c"
        >
          {v.toFixed(2).replace('.', ',')}
        </text>,
      )
    }
  }

  const cx = D * 0.58
  const cy = D / 2
  return (
    <div className="relative">
      <svg viewBox={`0 0 ${D} ${D}`} className="h-64 w-64 rounded-full bg-white shadow-inner ring-4 ring-slate-800">
        <defs>
          <clipPath id="scope">
            <circle cx={D / 2} cy={D / 2} r={D / 2 - 2} />
          </clipPath>
          <radialGradient id="vignette" cx="50%" cy="50%" r="55%">
            <stop offset="70%" stopColor="rgba(0,0,0,0)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.18)" />
          </radialGradient>
        </defs>
        <g clipPath="url(#scope)">
          <rect x={D * 0.5} y={0} width={D * 0.16} height={D} fill="#ffffff" />
          {blocks}
          {ticks}
          {/* Retícula */}
          <line x1={0} y1={cy} x2={D} y2={cy} stroke="#b91c1c" strokeWidth={1.6} />
          <line x1={cx} y1={0} x2={cx} y2={D} stroke="#b91c1c" strokeWidth={1.6} />
          {/* Hilos estadimétricos */}
          <line x1={cx - 34} y1={cy - 46} x2={cx + 34} y2={cy - 46} stroke="#b91c1c" strokeWidth={1} strokeDasharray="3 3" />
          <line x1={cx - 34} y1={cy + 46} x2={cx + 34} y2={cy + 46} stroke="#b91c1c" strokeWidth={1} strokeDasharray="3 3" />
          <rect x={0} y={0} width={D} height={D} fill="url(#vignette)" />
        </g>
      </svg>
      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 rounded-full bg-slate-800/80 px-2 py-0.5 text-[10px] font-semibold text-white">
        hilo medio
      </span>
    </div>
  )
}
