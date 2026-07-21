import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { cohortComparison } from '@/data/indicators'

export function CohortChart() {
  return (
    <div className="card p-5">
      <h3 className="mb-1 font-display text-base font-bold text-slate-800">
        Comparación de cohortes
      </h3>
      <p className="mb-4 text-xs text-slate-500">
        Indicadores clave: cohorte 2026 (sin proyecto) vs. cohorte 2027 (con gamificación).
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={cohortComparison} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis dataKey="indicador" tick={{ fontSize: 11, fill: '#64748b' }} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} axisLine={false} unit="%" />
            <Tooltip
              contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }}
              formatter={(v: number) => `${v}%`}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="cohorte2026" name="2026 (base)" fill="#94a3b8" radius={[4, 4, 0, 0]} />
            <Bar dataKey="cohorte2027" name="2027 (proyecto)" fill="#0d9488" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
