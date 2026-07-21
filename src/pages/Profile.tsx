import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useGame } from '@/context/GameContext'
import { badges } from '@/data/badges'
import { levelForXp } from '@/lib/gamification'
import { BadgeGrid } from '@/components/game/BadgeGrid'
import { LevelBar } from '@/components/game/LevelBar'

export default function Profile() {
  const { user } = useAuth()
  const { xp, badges: earned } = useGame()
  const lvl = levelForXp(xp)

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Link to="/mapa" className="mb-6 inline-flex items-center gap-1 text-sm font-semibold text-slate-500 hover:text-slate-700">
        <ArrowLeft size={16} /> Volver al mapa
      </Link>

      <header className="mb-6 flex items-center gap-4">
        <span className="grid h-16 w-16 place-items-center rounded-2xl bg-brand-50 text-4xl">
          {user?.avatar}
        </span>
        <div>
          <h1 className="font-display text-3xl font-bold text-slate-900">{user?.name}</h1>
          <p className="text-slate-500">
            {lvl.level.name} · {earned.length} de {badges.length} insignias
          </p>
        </div>
      </header>

      <div className="mb-8 max-w-md">
        <LevelBar xp={xp} />
      </div>

      <h2 className="mb-4 font-display text-xl font-bold text-slate-900">Colección de insignias</h2>
      <BadgeGrid earnedIds={earned} />
    </div>
  )
}
