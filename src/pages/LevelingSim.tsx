import { useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { CheckCircle2, AlertTriangle, X } from 'lucide-react'
import { missionById } from '@/data/missions'
import { rubricById } from '@/data/rubrics'
import { circuitById } from '@/data/levelingCircuits'
import {
  computeStations,
  evaluateReading,
  summarizeRun,
  type EnteredReading,
  type ReadingKind,
} from '@/lib/leveling'
import { computeMissionScore, readingPoints } from '@/lib/gamification'
import { useGame } from '@/context/GameContext'
import { TelescopeView } from '@/components/sim/TelescopeView'
import { MiraStaff } from '@/components/sim/MiraStaff'
import { FieldBook } from '@/components/sim/FieldBook'
import { ClosurePanel } from '@/components/sim/ClosurePanel'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { formatMeters } from '@/lib/format'

interface Step {
  setupId: string
  kind: ReadingKind
  trueValue: number
  fromPoint: string
  toPoint: string
  aimPoint: string
  note?: string
}

export default function LevelingSim() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { applyResult } = useGame()
  const mission = missionById(id ?? '')
  const circuit = circuitById(mission?.circuitId)

  const [readings, setReadings] = useState<EnteredReading[]>([])
  const [stepIndex, setStepIndex] = useState(0)
  const [input, setInput] = useState('')
  const [retries, setRetries] = useState(0)
  const [feedback, setFeedback] = useState<{ ok: boolean; errorMm: number; points: number } | null>(null)

  const steps: Step[] = useMemo(() => {
    if (!circuit) return []
    return circuit.setups.flatMap((s) => [
      { setupId: s.id, kind: 'BS' as const, trueValue: s.backSight, fromPoint: s.fromPoint, toPoint: s.toPoint, aimPoint: s.fromPoint, note: s.note },
      { setupId: s.id, kind: 'FS' as const, trueValue: s.foreSight, fromPoint: s.fromPoint, toPoint: s.toPoint, aimPoint: s.toPoint },
    ])
  }, [circuit])

  if (!mission || !circuit) return <Navigate to="/mapa" replace />

  const stations = computeStations(circuit, readings)
  const done = stepIndex >= steps.length
  const current = steps[stepIndex]
  const setupNumber = current ? circuit.setups.findIndex((s) => s.id === current.setupId) + 1 : circuit.setups.length

  const submit = () => {
    if (!current) return
    const val = parseFloat(input.replace(',', '.'))
    if (Number.isNaN(val)) return
    const ev = evaluateReading(current.setupId, current.kind, val, current.trueValue, circuit.readingToleranceMm)
    setReadings((prev) => [...prev, ev])
    if (!ev.ok) setRetries((r) => r + 1)
    setFeedback({ ok: ev.ok, errorMm: ev.errorMm, points: readingPoints(ev) })
    setInput('')
    setStepIndex((i) => i + 1)
  }

  const finish = () => {
    const rubric = rubricById(mission.rubricId)!
    const summary = summarizeRun(circuit, readings)
    const score = computeMissionScore(summary, rubric, retries)
    applyResult({
      missionId: mission.id,
      missionTitle: mission.title,
      points: score.points,
      xpGained: score.xpGained,
      stars: score.stars,
      rubricLevel: score.rubricLevel,
      earnedBadgeIds: score.earnedBadgeIds,
      closureErrorMm: summary.closure.closureErrorMm,
      withinTolerance: summary.closure.withinTolerance,
      maxErrorMm: summary.maxErrorMm,
      timestamp: Date.now(),
    })
    navigate('/resultado', {
      state: {
        missionId: mission.id,
        score,
        closure: summary.closure,
        maxErrorMm: summary.maxErrorMm,
        avgErrorMm: summary.avgErrorMm,
        okCount: summary.okCount,
        totalReadings: summary.totalReadings,
        retries,
      },
    })
  }

  const summary = done ? summarizeRun(circuit, readings) : null

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      {/* Barra superior */}
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            {mission.title}
          </div>
          <h1 className="font-display text-xl font-bold text-slate-900">Simulador de Nivelación</h1>
        </div>
        <button
          onClick={() => navigate('/mapa')}
          className="grid h-9 w-9 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          title="Salir de la simulación"
        >
          <X size={18} />
        </button>
      </div>

      <div className="mb-6">
        <ProgressBar value={(Math.min(stepIndex, steps.length) / steps.length) * 100} />
        <div className="mt-1 text-xs text-slate-500">
          Lectura {Math.min(stepIndex + (done ? 0 : 1), steps.length)} de {steps.length}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Escena del instrumento */}
        <div className="card flex flex-col items-center gap-4 bg-slate-900 p-6">
          <div className="text-center text-xs font-semibold uppercase tracking-wide text-slate-400">
            Visor del nivel automático
          </div>
          <div className="flex items-center gap-6">
            <TelescopeView reading={(current ?? steps[steps.length - 1]).trueValue} />
            <div className="rounded-xl bg-white/5 p-2">
              <MiraStaff reading={(current ?? steps[steps.length - 1]).trueValue} staffMax={circuit.staffMax} height={300} />
            </div>
          </div>
          <div className="text-center text-xs text-slate-400">
            Lee el valor donde el <span className="font-semibold text-red-300">hilo medio</span> corta la mira.
          </div>
        </div>

        {/* Tarea actual / cierre */}
        <div className="flex flex-col gap-4">
          {!done && current && (
            <div className="card animate-slide-up p-6">
              <div className="mb-2 flex items-center gap-2">
                <span className={`chip ${current.kind === 'BS' ? 'bg-brand-50 text-brand-700' : 'bg-accent-50 text-accent-700'}`}>
                  {current.kind === 'BS' ? 'Vista atrás (BS)' : 'Vista adelante (FS)'}
                </span>
                <span className="chip bg-slate-100 text-slate-500">Estación {setupNumber}</span>
              </div>
              <h2 className="font-display text-lg font-bold text-slate-900">
                Apunta la mira {current.kind === 'BS' ? 'ATRÁS' : 'ADELANTE'} sobre el punto{' '}
                <span className="text-brand-600">{current.aimPoint}</span>
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {current.kind === 'BS' && current.aimPoint === circuit.benchmark.point
                  ? `Punto de cota conocida (${formatMeters(circuit.benchmark.elevation)} m).`
                  : current.note ?? 'Registra la lectura del hilo medio.'}
              </p>

              <label className="mt-5 block text-sm font-semibold text-slate-700">
                Lectura de mira (m)
              </label>
              <div className="mt-1 flex gap-2">
                <input
                  autoFocus
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && submit()}
                  inputMode="decimal"
                  placeholder="Ej: 1,487"
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-lg tabular-nums focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
                />
                <button onClick={submit} disabled={!input} className="btn-primary px-6">
                  Registrar
                </button>
              </div>

              {feedback && (
                <div
                  className={`mt-4 flex items-center gap-2 rounded-xl px-4 py-3 text-sm ${
                    feedback.ok ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                  }`}
                >
                  {feedback.ok ? <CheckCircle2 size={18} /> : <AlertTriangle size={18} />}
                  <span>
                    Lectura anterior: {feedback.ok ? '¡correcta!' : 'fuera de tolerancia'} · error{' '}
                    {feedback.errorMm} mm · <span className="font-semibold">+{feedback.points} pts</span>
                  </span>
                </div>
              )}
            </div>
          )}

          {done && summary && (
            <>
              <ClosurePanel closure={summary.closure} />
              <button onClick={finish} className="btn-primary py-3 text-base">
                Ver resultados de la misión →
              </button>
            </>
          )}

          <FieldBook circuit={circuit} stations={stations} currentSetupId={current?.setupId} />
        </div>
      </div>
    </div>
  )
}
