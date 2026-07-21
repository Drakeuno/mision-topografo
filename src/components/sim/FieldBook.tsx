import type { LevelingCircuit } from '@/types'
import type { StationComputation } from '@/lib/leveling'
import { formatMeters } from '@/lib/format'

interface Props {
  circuit: LevelingCircuit
  stations: StationComputation[]
  currentSetupId?: string
}

const cell = (v?: number) => (v === undefined ? <span className="text-slate-300">—</span> : formatMeters(v))

export function FieldBook({ circuit, stations, currentSetupId }: Props) {
  return (
    <div className="card overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
        <h3 className="font-display text-sm font-bold text-slate-800">Libreta de campo</h3>
        <span className="chip bg-slate-100 text-slate-600">
          BM-1 = {formatMeters(circuit.benchmark.elevation)} m
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <th className="px-3 py-2 text-left font-semibold">Estación</th>
              <th className="px-3 py-2 text-left font-semibold">Tramo</th>
              <th className="px-3 py-2 text-right font-semibold">V. atrás (BS)</th>
              <th className="px-3 py-2 text-right font-semibold">Alt. instr. (HI)</th>
              <th className="px-3 py-2 text-right font-semibold">V. adelante (FS)</th>
              <th className="px-3 py-2 text-right font-semibold">Cota</th>
            </tr>
          </thead>
          <tbody>
            {stations.map((s, i) => (
              <tr
                key={s.setupId}
                className={`border-t border-slate-100 tabular-nums ${
                  s.setupId === currentSetupId ? 'bg-brand-50/60' : ''
                }`}
              >
                <td className="px-3 py-2 font-semibold text-slate-700">E{i + 1}</td>
                <td className="px-3 py-2 text-slate-600">
                  {s.fromPoint} → <span className="font-semibold text-slate-800">{s.toPoint}</span>
                </td>
                <td className="px-3 py-2 text-right">{cell(s.bs)}</td>
                <td className="px-3 py-2 text-right text-slate-500">{cell(s.hi)}</td>
                <td className="px-3 py-2 text-right">{cell(s.fs)}</td>
                <td className="px-3 py-2 text-right font-semibold text-slate-800">{cell(s.elevation)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="border-t border-slate-100 px-4 py-2 text-xs text-slate-400">
        HI = cota del punto atrás + BS &nbsp;·&nbsp; Cota nueva = HI − FS
      </p>
    </div>
  )
}
