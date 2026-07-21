import type { ReactNode } from 'react'

interface Props {
  label: string
  value: ReactNode
  sub?: ReactNode
  icon?: ReactNode
  tone?: 'brand' | 'accent' | 'slate' | 'emerald'
}

const tones: Record<string, string> = {
  brand: 'text-brand-700 bg-brand-50',
  accent: 'text-accent-700 bg-accent-50',
  slate: 'text-slate-700 bg-slate-100',
  emerald: 'text-emerald-700 bg-emerald-50',
}

export function StatTile({ label, value, sub, icon, tone = 'brand' }: Props) {
  return (
    <div className="card flex items-center gap-4 p-4">
      {icon && (
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl ${tones[tone]}`}>
          {icon}
        </div>
      )}
      <div className="min-w-0">
        <div className="text-2xl font-bold leading-tight text-slate-900">{value}</div>
        <div className="truncate text-xs font-medium uppercase tracking-wide text-slate-500">
          {label}
        </div>
        {sub && <div className="mt-0.5 text-xs text-slate-500">{sub}</div>}
      </div>
    </div>
  )
}
