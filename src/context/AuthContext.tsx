import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { DemoUser } from '@/types'
import { demoUsers } from '@/data/users'

interface AuthContextValue {
  user: DemoUser | null
  login: (user: DemoUser) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)
const STORAGE_KEY = 'mt_auth_v1'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(() => {
    const id = localStorage.getItem(STORAGE_KEY)
    return demoUsers.find((u) => u.id === id) ?? null
  })

  useEffect(() => {
    if (user) localStorage.setItem(STORAGE_KEY, user.id)
    else localStorage.removeItem(STORAGE_KEY)
  }, [user])

  const value = useMemo<AuthContextValue>(
    () => ({ user, login: setUser, logout: () => setUser(null) }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  return ctx
}
