import { demoCohort } from '@/data/users'
import { Stars } from '../ui/Stars'

export function StudentTable() {
  return (
    <div className="card overflow-hidden">
      <div className="border-b border-slate-200 px-4 py-3">
        <h3 className="font-display text-base font-bold text-slate-800">
          Estudiantes — cohorte 2027
        </h3>
        <p className="text-xs text-slate-500">Participación y desempeño en "Misión Topógrafo".</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <th className="px-4 py-2 text-left font-semibold">Estudiante</th>
              <th className="px-4 py-2 text-right font-semibold">XP</th>
              <th className="px-4 py-2 text-center font-semibold">Rúbrica</th>
              <th className="px-4 py-2 text-center font-semibold">Misiones</th>
              <th className="px-4 py-2 text-right font-semibold">Motivación</th>
              <th className="px-4 py-2 text-right font-semibold">Seguimiento</th>
            </tr>
          </thead>
          <tbody>
            {demoCohort.map((s) => (
              <tr key={s.id} className="border-t border-slate-100">
                <td className="px-4 py-2 font-semibold text-slate-700">{s.name}</td>
                <td className="px-4 py-2 text-right tabular-nums text-slate-600">{s.xp}</td>
                <td className="px-4 py-2">
                  <div className="flex justify-center">
                    <Stars value={s.rubricLevel} size={13} />
                  </div>
                </td>
                <td className="px-4 py-2 text-center tabular-nums text-slate-600">
                  {s.missionsDone}/3
                </td>
                <td className="px-4 py-2 text-right tabular-nums text-slate-600">{s.motivation}/5</td>
                <td className="px-4 py-2 text-right">
                  <span
                    className={`chip ${
                      s.tracking >= 60 ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {s.tracking}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
