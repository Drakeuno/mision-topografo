import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Flag, ListChecks, Play, Ruler, Trophy } from 'lucide-react'
import { missionById } from '@/data/missions'
import { rubricById } from '@/data/rubrics'
import { circuitById } from '@/data/levelingCircuits'
import { formatMeters } from '@/lib/format'

export default function MissionBriefing() {
  const { id } = useParams()
  const navigate = useNavigate()
  const mission = missionById(id ?? '')

  if (!mission) return <Navigate to="/mapa" replace />
  if (mission.status !== 'activa') return <Navigate to={`/proximamente/${mission.unit}`} replace />

  const rubric = rubricById(mission.rubricId)
  const circuit = circuitById(mission.circuitId)

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Link to="/mapa" className="mb-6 inline-flex items-center gap-1 text-sm font-semibold text-slate-500 hover:text-slate-700">
        <ArrowLeft size={16} /> Volver al mapa
      </Link>

      <header className="mb-6 flex items-start gap-4">
        <span className="grid h-16 w-16 place-items-center rounded-2xl bg-brand-50 text-4xl">
          {mission.icon}
        </span>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            {mission.code} · Unidad de {mission.unit}
          </div>
          <h1 className="font-display text-3xl font-bold text-slate-900">{mission.title}</h1>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="chip bg-brand-50 text-brand-700">{mission.ra}</span>
            <span className="chip bg-slate-100 text-slate-600">{mission.competency}</span>
            <span className="chip bg-accent-50 text-accent-700">
              <Trophy size={12} /> +{mission.xpReward} XP
            </span>
          </div>
        </div>
      </header>

      <div className="card mb-5 border-l-4 border-brand-500 p-5">
        <div className="mb-1 flex items-center gap-2 text-sm font-bold text-brand-700">
          <Flag size={16} /> Briefing de la misión
        </div>
        <p className="text-slate-700">{mission.narrative}</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="card p-5">
          <div className="mb-3 flex items-center gap-2 font-bold text-slate-800">
            <ListChecks size={18} className="text-brand-600" /> Objetivos
          </div>
          <ul className="space-y-2">
            {mission.objectives.map((o, i) => (
              <li key={i} className="flex gap-2 text-sm text-slate-600">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">
                  {i + 1}
                </span>
                {o}
              </li>
            ))}
          </ul>
          <div className="mt-4 rounded-lg bg-slate-50 p-3 text-xs text-slate-500">
            <span className="font-semibold text-slate-600">Resultado de Aprendizaje {mission.ra}:</span>{' '}
            {mission.raDescription}
          </div>
        </div>

        <div className="space-y-5">
          {circuit && (
            <div className="card p-5">
              <div className="mb-3 flex items-center gap-2 font-bold text-slate-800">
                <Ruler size={18} className="text-brand-600" /> El terreno
              </div>
              <dl className="space-y-1.5 text-sm">
                <Row k="Circuito" v={circuit.name} />
                <Row k="Mojón de referencia" v={`${circuit.benchmark.point} = ${formatMeters(circuit.benchmark.elevation)} m`} />
                <Row k="Estaciones" v={`${circuit.setups.length} (circuito cerrado)`} />
                <Row k="Tolerancia de cierre" v={`± ${circuit.toleranceMm} mm`} />
              </dl>
            </div>
          )}

          {rubric && (
            <div className="card p-5">
              <div className="mb-3 font-bold text-slate-800">Cómo se evalúa (rúbrica 1–4)</div>
              <ul className="space-y-1.5 text-sm">
                {rubric.criteria.map((c) => (
                  <li key={c.id} className="flex justify-between text-slate-600">
                    <span>{c.name}</span>
                    <span className="text-slate-400">{Math.round(c.weight * 100)}%</span>
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-xs text-slate-400">Meta del proyecto: nivel ≥ 3.</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <button onClick={() => navigate(`/sim/${mission.id}`)} className="btn-primary px-8 py-3 text-base">
          <Play size={18} /> Iniciar simulación
        </button>
      </div>
    </div>
  )
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-2">
      <dt className="text-slate-500">{k}</dt>
      <dd className="text-right font-semibold text-slate-700">{v}</dd>
    </div>
  )
}
