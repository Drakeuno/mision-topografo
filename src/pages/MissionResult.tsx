import type { ReactNode } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { Coins, Sparkles, Target, TrendingUp } from 'lucide-react'
import type { MissionScore } from '@/lib/gamification'
import type { ClosureResult } from '@/lib/leveling'
import { missionById } from '@/data/missions'
import { rubricById } from '@/data/rubrics'
import { badgeById } from '@/data/badges'
import { Stars } from '@/components/ui/Stars'
import { StatTile } from '@/components/ui/StatTile'

interface ResultState {
  missionId: string
  score: MissionScore
  closure: ClosureResult
  maxErrorMm: number
  avgErrorMm: number
  okCount: number
  totalReadings: number
  retries: number
}

export default function MissionResult() {
  const location = useLocation()
  const state = location.state as ResultState | null

  if (!state) return <Navigate to="/mapa" replace />

  const mission = missionById(state.missionId)
  const rubric = rubricById(mission?.rubricId)
  const { score, closure } = state

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      {/* Encabezado de celebración */}
      <div className="card animate-pop-in overflow-hidden text-center">
        <div
          className={`px-6 py-8 ${
            score.passed
              ? 'bg-gradient-to-br from-brand-600 to-brand-700'
              : 'bg-gradient-to-br from-slate-600 to-slate-700'
          } text-white`}
        >
          <div className="text-5xl">{score.passed ? '🎉' : '💪'}</div>
          <h1 className="mt-2 font-display text-2xl font-bold">
            {score.passed ? '¡Misión completada!' : 'Misión finalizada'}
          </h1>
          <p className="text-white/80">{mission?.title}</p>
          <div className="mt-4 flex justify-center">
            <Stars value={score.stars} size={30} />
          </div>
          <div className="mt-2 text-sm text-white/80">
            Desempeño: <span className="font-bold text-white">Nivel {score.rubricLevel} de 4</span>{' '}
            {score.passed ? '(cumple la meta ≥ 3)' : '(meta del proyecto: ≥ 3)'}
          </div>
        </div>

        <div className="grid grid-cols-3 divide-x divide-slate-100">
          <Metric icon={<Coins size={18} />} label="Puntos" value={score.points} />
          <Metric icon={<TrendingUp size={18} />} label="XP ganada" value={`+${score.xpGained}`} />
          <Metric
            icon={<Target size={18} />}
            label="Cierre"
            value={`${closure.closureErrorMm >= 0 ? '+' : ''}${closure.closureErrorMm} mm`}
          />
        </div>
      </div>

      {/* Insignias desbloqueadas */}
      {score.earnedBadgeIds.length > 0 && (
        <div className="mt-6">
          <div className="mb-3 flex items-center gap-2 font-display font-bold text-slate-800">
            <Sparkles size={18} className="text-accent-500" /> Insignias desbloqueadas
          </div>
          <div className="flex flex-wrap gap-3">
            {score.earnedBadgeIds.map((id) => {
              const b = badgeById(id)
              if (!b) return null
              return (
                <div key={id} className="card flex items-center gap-3 p-3 pr-4 ring-1 ring-accent-200">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-accent-50 text-2xl">
                    {b.icon}
                  </span>
                  <div>
                    <div className="text-sm font-bold text-slate-800">{b.name}</div>
                    <div className="text-xs text-slate-500">{b.description}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Detalle de rúbrica */}
      {rubric && (
        <div className="mt-6 card p-5">
          <h2 className="mb-3 font-display font-bold text-slate-800">Evaluación por rúbrica</h2>
          <div className="space-y-3">
            {rubric.criteria.map((c) => {
              const lvl = score.rubricByCriterion.find((r) => r.criterionId === c.id)?.level ?? 0
              return (
                <div key={c.id}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-slate-700">{c.name}</span>
                    <span className="text-slate-500">Nivel {lvl}/4</span>
                  </div>
                  <div className="mt-1 flex gap-1">
                    {[1, 2, 3, 4].map((n) => (
                      <div
                        key={n}
                        className={`h-2 flex-1 rounded-full ${
                          n <= lvl ? 'bg-brand-500' : 'bg-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="mt-1 text-xs text-slate-500">{c.levels[Math.max(0, lvl - 1)]}</p>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Métricas técnicas */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatTile label="Lecturas correctas" value={`${state.okCount}/${state.totalReadings}`} tone="brand" />
        <StatTile label="Error máx." value={`${state.maxErrorMm} mm`} tone="slate" />
        <StatTile label="Error prom." value={`${state.avgErrorMm} mm`} tone="slate" />
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/mapa" className="btn-primary px-6 py-3">
          Volver al mapa
        </Link>
        <Link to={`/mision/${state.missionId}`} className="btn-ghost px-6 py-3">
          Repetir misión
        </Link>
      </div>
    </div>
  )
}

function Metric({ icon, label, value }: { icon: ReactNode; label: string; value: ReactNode }) {
  return (
    <div className="px-3 py-4">
      <div className="mb-1 flex justify-center text-slate-400">{icon}</div>
      <div className="font-display text-xl font-bold text-slate-900">{value}</div>
      <div className="text-xs text-slate-500">{label}</div>
    </div>
  )
}
