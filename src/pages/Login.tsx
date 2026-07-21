import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { demoUsers } from '@/data/users'
import type { DemoUser } from '@/types'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const pick = (u: DemoUser) => {
    login(u)
    navigate(u.role === 'estudiante' ? '/mapa' : '/panel')
  }

  return (
    <div className="grid min-h-full lg:grid-cols-2">
      {/* Panel de marca */}
      <div className="relative flex flex-col justify-center overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 px-8 py-16 text-white lg:px-14">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-accent-400/20 blur-3xl" />
        <div className="relative max-w-md">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm font-semibold">
            📐 PID 2026 · UC Temuco
          </div>
          <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl">
            Misión Topógrafo
          </h1>
          <p className="mt-4 text-lg text-brand-50/90">
            Gamificación como metodología de aprendizaje en Topografía. Aprende nivelación, taquimetría
            y replanteo resolviendo misiones, ganando insignias y superando niveles.
          </p>
          <ul className="mt-8 space-y-2 text-brand-50/90">
            <li className="flex items-center gap-2">✅ Simulación interactiva de Nivelación Diferencial</li>
            <li className="flex items-center gap-2">🏅 Puntos, niveles e insignias</li>
            <li className="flex items-center gap-2">📊 Panel docente con indicadores del proyecto</li>
          </ul>
          <p className="mt-10 text-xs text-brand-100/70">
            Maqueta funcional de demostración · datos simulados
          </p>
        </div>
      </div>

      {/* Selección de perfil */}
      <div className="flex flex-col justify-center bg-slate-50 px-8 py-16 lg:px-14">
        <div className="mx-auto w-full max-w-md">
          <h2 className="font-display text-2xl font-bold text-slate-900">Ingresa a la demo</h2>
          <p className="mt-1 text-sm text-slate-500">
            Elige un perfil para explorar la experiencia. No requiere registro.
          </p>
          <div className="mt-8 space-y-3">
            {demoUsers.map((u) => (
              <button
                key={u.id}
                onClick={() => pick(u)}
                className="card group flex w-full items-center gap-4 p-4 text-left transition hover:border-brand-300 hover:shadow-pop"
              >
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-3xl">
                  {u.avatar}
                </span>
                <span className="flex-1">
                  <span className="block font-display text-lg font-bold text-slate-900">{u.name}</span>
                  <span className="block text-sm text-slate-500">{u.subtitle}</span>
                  <span className="mt-1 inline-block chip bg-slate-100 text-slate-600">
                    {u.role === 'estudiante' ? 'Estudiante' : 'Docente'}
                  </span>
                </span>
                <ArrowRight className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-brand-500" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
