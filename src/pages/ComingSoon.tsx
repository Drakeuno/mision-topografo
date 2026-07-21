import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, Hammer, Lock } from 'lucide-react'
import { missions } from '@/data/missions'
import type { Unit } from '@/types'

export default function ComingSoon() {
  const { unit } = useParams()
  const mission = missions.find((m) => m.unit === (unit as Unit))

  if (!mission) return <Navigate to="/mapa" replace />

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <Link to="/mapa" className="mb-6 inline-flex items-center gap-1 text-sm font-semibold text-slate-500 hover:text-slate-700">
        <ArrowLeft size={16} /> Volver al mapa
      </Link>

      <div className="card overflow-hidden text-center">
        <div className="bg-slate-100 px-6 py-10">
          <div className="relative mx-auto grid h-20 w-20 place-items-center rounded-2xl bg-white text-5xl shadow-card">
            {mission.icon}
            <span className="absolute -bottom-2 -right-2 grid h-8 w-8 place-items-center rounded-full bg-slate-700 text-white">
              <Lock size={15} />
            </span>
          </div>
          <div className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
            {mission.code} · {mission.ra}
          </div>
          <h1 className="font-display text-2xl font-bold text-slate-900">{mission.title}</h1>
          <span className="mt-2 inline-flex items-center gap-1 chip bg-accent-100 text-accent-800">
            <Hammer size={13} /> En desarrollo
          </span>
        </div>

        <div className="p-6 text-left">
          <p className="text-slate-600">{mission.narrative}</p>

          <div className="mt-4">
            <div className="text-sm font-bold text-slate-800">Incluirá:</div>
            <ul className="mt-2 space-y-1.5">
              {mission.objectives.map((o, i) => (
                <li key={i} className="flex gap-2 text-sm text-slate-600">
                  <span className="text-slate-300">•</span> {o}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-5 rounded-xl bg-brand-50 p-4 text-sm text-brand-800">
            <span className="font-semibold">Alcance de la maqueta:</span> en esta demo, la unidad
            jugable es <span className="font-semibold">Nivelación Diferencial</span>. Taquimetría y
            Replanteo se muestran como roadmap del producto completo, tal como propone el MVP del
            proyecto PID.
          </div>

          <div className="mt-6 flex justify-center">
            <Link to="/mision/m-nivelacion" className="btn-primary px-6 py-2.5">
              Ir a la misión disponible
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
