import { Lock } from 'lucide-react'
import { badges } from '@/data/badges'

export function BadgeGrid({ earnedIds }: { earnedIds: string[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {badges.map((b) => {
        const earned = earnedIds.includes(b.id)
        return (
          <div
            key={b.id}
            className={`card flex flex-col items-center p-4 text-center transition ${
              earned ? 'ring-1 ring-accent-200' : 'opacity-60'
            }`}
          >
            <div
              className={`relative mb-2 grid h-14 w-14 place-items-center rounded-full text-2xl ${
                earned ? 'bg-accent-50' : 'bg-slate-100 grayscale'
              }`}
            >
              {b.icon}
              {!earned && (
                <span className="absolute -bottom-1 -right-1 grid h-6 w-6 place-items-center rounded-full bg-slate-200 text-slate-500">
                  <Lock size={12} />
                </span>
              )}
            </div>
            <div className="text-sm font-bold text-slate-800">{b.name}</div>
            <div className="mt-1 text-xs leading-snug text-slate-500">{b.description}</div>
          </div>
        )
      })}
    </div>
  )
}
