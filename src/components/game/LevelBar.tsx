import { levelForXp } from '@/lib/gamification'
import { ProgressBar } from '../ui/ProgressBar'

export function LevelBar({ xp }: { xp: number }) {
  const p = levelForXp(xp)
  return (
    <div className="card p-5">
      <div className="mb-2 flex items-end justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Nivel {p.level.index}
          </div>
          <div className="font-display text-xl font-bold text-slate-900">{p.level.name}</div>
        </div>
        <div className="text-right">
          <div className="font-display text-2xl font-bold text-brand-600">{xp}</div>
          <div className="text-xs text-slate-500">XP total</div>
        </div>
      </div>
      <ProgressBar value={p.pct} tone="accent" />
      <div className="mt-2 text-xs text-slate-500">
        {p.next ? (
          <>
            Faltan <span className="font-semibold text-slate-700">{p.span - p.intoLevel} XP</span> para{' '}
            <span className="font-semibold text-slate-700">{p.next.name}</span>
          </>
        ) : (
          <span className="font-semibold text-accent-600">¡Nivel máximo alcanzado!</span>
        )}
      </div>
    </div>
  )
}
