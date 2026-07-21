import { Link } from 'react-router-dom'
import { Coins, Medal, Target } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useGame } from '@/context/GameContext'
import { missions } from '@/data/missions'
import { badges } from '@/data/badges'
import { LevelBar } from '@/components/game/LevelBar'
import { MissionCard } from '@/components/game/MissionCard'
import { StatTile } from '@/components/ui/StatTile'

export default function StudentDashboard() {
  const { user } = useAuth()
  const { xp, points, badges: earned, results } = useGame()

  const completedCount = Object.keys(results).length
  const recentBadges = badges.filter((b) => earned.includes(b.id)).slice(0, 4)

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <header className="mb-6">
        <h1 className="font-display text-3xl font-bold text-slate-900">
          Hola, {user?.name.split(' ')[0]} 👋
        </h1>
        <p className="mt-1 text-slate-500">
          Bienvenida al Cerro Ñielol. Completa las misiones de topografía para dominar la
          <span className="font-semibold text-slate-700"> Misión Topógrafo</span>.
        </p>
      </header>

      <div className="grid gap-4 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <LevelBar xp={xp} />
        </div>
        <StatTile label="Puntos" value={points} icon={<Coins size={20} />} tone="accent" />
        <StatTile
          label="Insignias"
          value={`${earned.length}/${badges.length}`}
          icon={<Medal size={20} />}
          tone="brand"
        />
      </div>

      <section className="mt-10">
        <div className="mb-4 flex items-center gap-2">
          <Target size={18} className="text-brand-600" />
          <h2 className="font-display text-xl font-bold text-slate-900">Tu ruta de misiones</h2>
          <span className="chip bg-slate-100 text-slate-500">{completedCount}/3 completadas</span>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {missions.map((m) => {
            const r = results[m.id]
            return <MissionCard key={m.id} mission={m} completed={!!r} stars={r?.stars} />
          })}
        </div>
      </section>

      <section className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl font-bold text-slate-900">Insignias</h2>
          <Link to="/insignias" className="text-sm font-semibold text-brand-600 hover:underline">
            Ver todas →
          </Link>
        </div>
        {recentBadges.length === 0 ? (
          <div className="card p-6 text-center text-sm text-slate-500">
            Aún no tienes insignias. ¡Completa tu primera misión para ganar la insignia{' '}
            <span className="font-semibold">🎯 Primera Lectura</span>!
          </div>
        ) : (
          <div className="flex flex-wrap gap-3">
            {recentBadges.map((b) => (
              <div key={b.id} className="card flex items-center gap-3 p-3 pr-4">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-accent-50 text-2xl">
                  {b.icon}
                </span>
                <div>
                  <div className="text-sm font-bold text-slate-800">{b.name}</div>
                  <div className="text-xs text-slate-500">Obtenida</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
