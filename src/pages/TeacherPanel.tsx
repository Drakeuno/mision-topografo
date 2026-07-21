import { Download, TrendingUp, Users } from 'lucide-react'
import { indicators } from '@/data/indicators'
import { demoCohort } from '@/data/users'
import { IndicatorCard } from '@/components/teacher/IndicatorCard'
import { CohortChart } from '@/components/teacher/CohortChart'
import { StudentTable } from '@/components/teacher/StudentTable'
import { StatTile } from '@/components/ui/StatTile'

export default function TeacherPanel() {
  const avgTracking = Math.round(demoCohort.reduce((a, s) => a + s.tracking, 0) / demoCohort.length)
  const reachedGoals = indicators.filter((i) => i.current >= i.target).length

  const exportCsv = () => {
    const header = ['Estudiante', 'XP', 'Nivel_rubrica', 'Misiones', 'Motivacion', 'Seguimiento_pct']
    const rows = demoCohort.map((s) => [s.name, s.xp, s.rubricLevel, s.missionsDone, s.motivation, s.tracking])
    const csv = [header, ...rows].map((r) => r.join(',')).join('\n')
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'cohorte-2027-mision-topografo.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-slate-900">Panel docente</h1>
          <p className="mt-1 text-slate-500">
            Topografía · Ing. en Construcción — seguimiento de la experiencia gamificada.
          </p>
        </div>
        <button onClick={exportCsv} className="btn-ghost">
          <Download size={16} /> Exportar CSV
        </button>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatTile label="Estudiantes (cohorte 2027)" value={demoCohort.length} icon={<Users size={20} />} tone="brand" />
        <StatTile label="Seguimiento promedio" value={`${avgTracking}%`} icon={<TrendingUp size={20} />} tone="emerald" />
        <StatTile label="Metas alcanzadas" value={`${reachedGoals}/${indicators.length}`} icon={'🎯'} tone="accent" />
      </div>

      <section className="mt-10">
        <h2 className="mb-4 font-display text-xl font-bold text-slate-900">
          Indicadores del proyecto (PID)
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {indicators.map((i) => (
            <IndicatorCard key={i.id} indicator={i} />
          ))}
        </div>
      </section>

      <section className="mt-10 grid gap-4 lg:grid-cols-2">
        <CohortChart />
        <div className="card flex flex-col justify-center p-6">
          <h3 className="font-display text-base font-bold text-slate-800">Lectura del impacto</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            La cohorte 2027 (con gamificación) supera la línea base en todos los indicadores clave. El
            tamaño de efecto estimado (<span className="font-semibold">Cohen's d = 0,62</span>) indica un
            efecto <span className="font-semibold">medio-alto</span> de la intervención, por sobre la meta
            comprometida de 0,5.
          </p>
          <p className="mt-3 rounded-lg bg-slate-50 p-3 text-xs text-slate-500">
            Nota: los valores mostrados son <span className="font-semibold">datos simulados</span> para la
            demostración de la maqueta. Con el producto real, estos gráficos se alimentan de la analítica
            de la plataforma y del registro académico.
          </p>
        </div>
      </section>

      <section className="mt-10">
        <StudentTable />
      </section>
    </div>
  )
}
