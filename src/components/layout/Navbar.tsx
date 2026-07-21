import { NavLink, useNavigate } from 'react-router-dom'
import { Coins, LogOut, Map, Medal, LayoutDashboard } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useGame } from '@/context/GameContext'
import { levelForXp } from '@/lib/gamification'

export function Navbar() {
  const { user, logout } = useAuth()
  const { xp, points } = useGame()
  const navigate = useNavigate()

  if (!user) return null
  const isStudent = user.role === 'estudiante'
  const lvl = levelForXp(xp)

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold transition ${
      isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-100'
    }`

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4">
        <button
          onClick={() => navigate(isStudent ? '/mapa' : '/panel')}
          className="flex items-center gap-2"
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-600 text-lg">📐</span>
          <span className="hidden font-display text-lg font-bold text-slate-900 sm:block">
            Misión Topógrafo
          </span>
        </button>

        <nav className="ml-2 hidden items-center gap-1 md:flex">
          {isStudent ? (
            <>
              <NavLink to="/mapa" className={linkClass}>
                <Map size={16} /> Mapa
              </NavLink>
              <NavLink to="/insignias" className={linkClass}>
                <Medal size={16} /> Insignias
              </NavLink>
            </>
          ) : (
            <NavLink to="/panel" className={linkClass}>
              <LayoutDashboard size={16} /> Panel docente
            </NavLink>
          )}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          {isStudent && (
            <div className="hidden items-center gap-3 sm:flex">
              <span className="chip bg-brand-50 text-brand-700">
                Nivel {lvl.level.index} · {lvl.level.name}
              </span>
              <span className="chip bg-accent-50 text-accent-700">
                <Coins size={13} /> {points} pts
              </span>
            </div>
          )}
          <div className="flex items-center gap-2 rounded-full border border-slate-200 py-1 pl-1 pr-3">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-slate-100 text-base">
              {user.avatar}
            </span>
            <span className="hidden text-sm font-semibold text-slate-700 sm:block">
              {user.name.split(' ')[0]}
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="grid h-8 w-8 place-items-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700"
            title="Salir"
          >
            <LogOut size={17} />
          </button>
        </div>
      </div>
    </header>
  )
}
