import { CheckCircle2, XCircle } from 'lucide-react'
import type { ClosureResult } from '@/lib/leveling'
import { formatMeters } from '@/lib/format'

export function ClosurePanel({ closure }: { closure: ClosureResult }) {
  const ok = closure.withinTolerance
  return (
    <div
      className={`card border-2 p-5 ${
        ok ? 'border-emerald-300 bg-emerald-50/50' : 'border-red-300 bg-red-50/50'
      }`}
    >
      <div className="mb-3 flex items-center gap-2">
        {ok ? (
          <CheckCircle2 className="text-emerald-600" size={22} />
        ) : (
          <XCircle className="text-red-600" size={22} />
        )}
        <h3 className="font-display text-base font-bold text-slate-800">Control de cierre</h3>
      </div>
      <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
        <Field label="Cota conocida" value={`${formatMeters(closure.knownElevation)} m`} />
        <Field label="Cota medida" value={`${formatMeters(closure.measuredElevation)} m`} />
        <Field
          label="Error de cierre"
          value={`${closure.closureErrorMm >= 0 ? '+' : ''}${closure.closureErrorMm} mm`}
          strong
          tone={ok ? 'ok' : 'bad'}
        />
        <Field label="Tolerancia" value={`± ${closure.toleranceMm} mm`} />
      </div>
      <p className={`mt-3 text-sm font-semibold ${ok ? 'text-emerald-700' : 'text-red-700'}`}>
        {ok
          ? '¡Circuito cerrado dentro de la tolerancia! El levantamiento es válido.'
          : 'El error supera la tolerancia. Revisa tus lecturas para mejorar el cierre.'}
      </p>
    </div>
  )
}

function Field({
  label,
  value,
  strong,
  tone,
}: {
  label: string
  value: string
  strong?: boolean
  tone?: 'ok' | 'bad'
}) {
  const color = tone === 'ok' ? 'text-emerald-700' : tone === 'bad' ? 'text-red-700' : 'text-slate-800'
  return (
    <div>
      <div className="text-xs uppercase tracking-wide text-slate-500">{label}</div>
      <div className={`tabular-nums ${strong ? 'text-lg font-bold' : 'font-semibold'} ${color}`}>
        {value}
      </div>
    </div>
  )
}
