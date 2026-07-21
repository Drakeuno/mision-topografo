import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

// Resultado persistido por misión (mejor intento).
export interface StoredResult {
  missionId: string
  missionTitle: string
  points: number
  xpGained: number
  stars: number
  rubricLevel: number
  earnedBadgeIds: string[]
  closureErrorMm: number
  withinTolerance: boolean
  maxErrorMm: number
  timestamp: number
}

interface GameState {
  results: Record<string, StoredResult>
  badges: string[]
}

interface GameContextValue {
  xp: number
  points: number
  badges: string[]
  completedMissions: string[]
  results: Record<string, StoredResult>
  lastResult?: StoredResult
  hasBadge: (id: string) => boolean
  applyResult: (result: StoredResult) => void
  reset: () => void
}

const GameContext = createContext<GameContextValue | null>(null)
const STORAGE_KEY = 'mt_game_v1'

const emptyState: GameState = { results: {}, badges: [] }

function loadState(): GameState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyState
    const parsed = JSON.parse(raw) as GameState
    return { results: parsed.results ?? {}, badges: parsed.badges ?? [] }
  } catch {
    return emptyState
  }
}

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GameState>(loadState)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const applyResult = useCallback((result: StoredResult) => {
    setState((prev) => {
      const existing = prev.results[result.missionId]
      // Conserva el mejor intento por puntaje; acumula insignias.
      const best = existing && existing.points >= result.points ? existing : result
      return {
        results: { ...prev.results, [result.missionId]: best },
        badges: Array.from(new Set([...prev.badges, ...result.earnedBadgeIds])),
      }
    })
  }, [])

  const reset = useCallback(() => setState(emptyState), [])

  const value = useMemo<GameContextValue>(() => {
    const resultList = Object.values(state.results)
    const xp = resultList.reduce((a, r) => a + r.xpGained, 0)
    const points = resultList.reduce((a, r) => a + r.points, 0)
    const lastResult = resultList.slice().sort((a, b) => b.timestamp - a.timestamp)[0]
    return {
      xp,
      points,
      badges: state.badges,
      completedMissions: Object.keys(state.results),
      results: state.results,
      lastResult,
      hasBadge: (id: string) => state.badges.includes(id),
      applyResult,
      reset,
    }
  }, [state, applyResult, reset])

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useGame() {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGame debe usarse dentro de <GameProvider>')
  return ctx
}
