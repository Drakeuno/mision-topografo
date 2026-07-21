import { Check } from 'lucide-react'
import type { Indicator } from '@/types'
import { formatIndicator } from '@/lib/format'

const maxByFormat = { percent: 100, score: 5, effect: 1 } as const

export function IndicatorCard({ indicator }: { indicator: Indicator }) {
  const max = maxByFormat[indicator.format]
  const pct = (v: number) => Math.max(0, Math.min(100, (v / max) * 100))
  const reached = indicator.current >= indicator.target

  return (
    <div className="card p-4">
      <div className="flex items-start justify-between gap-2">
        <div className="text-sm font-semibold text-slate-700">{indicator.shortName}</div>
        <span
          className={`chip ${reached ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}
        >
          {reached && <Check size={12} />} Meta {formatIndicator(indicator.target, indicator.format)}
        </span>
      </div>

      <div className="mt-1 flex items-end gap-2">
        <span className="font-display text-3xl font-bold text-slate-900">
          {formatIndicator(indicator.current, indicator.format)}
        </span>
        <span className="mb-1 text-xs text-slate-500">{indicator.unit}</span>
      </div>

      <div className="relative mt-3 h-2.5 w-full rounded-full bg-slate-200">
        <div
          className={`h-full rounded-full ${reached ? 'bg-emerald-500' : 'bg-brand-500'}`}
          style={{ width: `${pct(indicator.current)}%` }}
        />
        {/* Marcador de meta */}
        <div
          className="absolute -top-1 h-4.5 w-0.5 bg-slate-700"
          style={{ left: `calc(${pct(indicator.target)}% - 1px)`, height: '1.1rem' }}
          title={`Meta: ${formatIndicator(indicator.target, indicator.format)}`}
        />
      </div>

      <div className="mt-2 flex justify-between text-xs text-slate-400">
        <span>Base: {formatIndicator(indicator.baseline, indicator.format)}</span>
        <span>{indicator.source}</span>
      </div>
    </div>
  )
}
