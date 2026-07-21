import { Link } from 'react-router-dom'
import { ArrowRight, Lock } from 'lucide-react'
import type { Mission } from '@/types'
import { Stars } from '../ui/Stars'

interface Props {
  mission: Mission
  completed?: boolean
  stars?: number
}

const accents: Record<string, { bar: string; chip: string; icon: string }> = {
  brand: { bar: 'bg-brand-500', chip: 'bg-brand-50 text-brand-700', icon: 'bg-brand-50' },
  accent: { bar: 'bg-accent-500', chip: 'bg-accent-50 text-accent-700', icon: 'bg-accent-50' },
  emerald: { bar: 'bg-emerald-500', chip: 'bg-emerald-50 text-emerald-700', icon: 'bg-emerald-50' },
}

export function MissionCard({ mission, completed, stars = 0 }: Props) {
  const a = accents[mission.color] ?? accents.brand
  const active = mission.status === 'activa'
  const to = active ? `/mision/${mission.id}` : `/proximamente/${mission.unit}`

  return (
    <Link
      to={to}
      className={`card group relative flex overflow-hidden transition hover:shadow-pop ${
        active ? '' : 'opacity-80'
      }`}
    >
      <div className={`w-1.5 shrink-0 ${a.bar}`} />
      <div className="flex-1 p-5">
        <div className="mb-2 flex items-start justify-between gap-2">
          <div className={`grid h-12 w-12 place-items-center rounded-xl text-2xl ${a.icon}`}>
            {mission.icon}
          </div>
          {active ? (
            completed ? (
              <span className="chip bg-emerald-50 text-emerald-700">Completada</span>
            ) : (
              <span className="chip bg-brand-600 text-white">Disponible</span>
            )
          ) : (
            <span className="chip bg-slate-100 text-slate-500">
              <Lock size={12} /> Próximamente
            </span>
          )}
        </div>
        <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          {mission.code}
        </div>
        <h3 className="font-display text-lg font-bold text-slate-900">{mission.title}</h3>
        <div className="mt-1 flex flex-wrap items-center gap-2">
          <span className={`chip ${a.chip}`}>{mission.ra}</span>
          <span className="text-xs text-slate-500">{mission.competency.split(':')[1]?.trim()}</span>
        </div>
        <p className="mt-2 line-clamp-2 text-sm text-slate-600">{mission.raDescription}</p>

        <div className="mt-3 flex items-center justify-between">
          {completed ? (
            <Stars value={stars} size={16} />
          ) : (
            <span className="text-xs text-slate-400">+{mission.xpReward} XP</span>
          )}
          {active && (
            <span className="flex items-center gap-1 text-sm font-semibold text-brand-600 group-hover:gap-2">
              {completed ? 'Repetir' : 'Iniciar'} <ArrowRight size={16} />
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
