import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'

export function AppShell() {
  return (
    <div className="flex min-h-full flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-slate-200 bg-white py-4">
        <div className="mx-auto max-w-6xl px-4 text-xs text-slate-400">
          Maqueta funcional · <span className="font-semibold text-slate-500">Misión Topógrafo</span> —
          PID 2026, UC Temuco. Datos simulados con fines de demostración.
        </div>
      </footer>
    </div>
  )
}
