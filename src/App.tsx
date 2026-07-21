import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useAuth } from '@/context/AuthContext'
import { AppShell } from '@/components/layout/AppShell'
import Login from '@/pages/Login'
import StudentDashboard from '@/pages/StudentDashboard'
import MissionBriefing from '@/pages/MissionBriefing'
import LevelingSim from '@/pages/LevelingSim'
import MissionResult from '@/pages/MissionResult'
import Profile from '@/pages/Profile'
import ComingSoon from '@/pages/ComingSoon'
import TeacherPanel from '@/pages/TeacherPanel'
import type { Role } from '@/types'

function homeFor(role: Role) {
  return role === 'estudiante' ? '/mapa' : '/panel'
}

function RequireAuth() {
  const { user } = useAuth()
  return user ? <Outlet /> : <Navigate to="/" replace />
}

function RoleRoute({ role, children }: { role: Role; children: ReactNode }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/" replace />
  if (user.role !== role) return <Navigate to={homeFor(user.role)} replace />
  return <>{children}</>
}

function PublicOnly() {
  const { user } = useAuth()
  if (user) return <Navigate to={homeFor(user.role)} replace />
  return <Login />
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicOnly />} />

      <Route element={<RequireAuth />}>
        <Route element={<AppShell />}>
          {/* Estudiante */}
          <Route path="/mapa" element={<RoleRoute role="estudiante"><StudentDashboard /></RoleRoute>} />
          <Route path="/mision/:id" element={<RoleRoute role="estudiante"><MissionBriefing /></RoleRoute>} />
          <Route path="/sim/:id" element={<RoleRoute role="estudiante"><LevelingSim /></RoleRoute>} />
          <Route path="/resultado" element={<RoleRoute role="estudiante"><MissionResult /></RoleRoute>} />
          <Route path="/insignias" element={<RoleRoute role="estudiante"><Profile /></RoleRoute>} />
          <Route path="/proximamente/:unit" element={<RoleRoute role="estudiante"><ComingSoon /></RoleRoute>} />
          {/* Docente */}
          <Route path="/panel" element={<RoleRoute role="docente"><TeacherPanel /></RoleRoute>} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
