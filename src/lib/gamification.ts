import type { Rubric } from '@/types'
import type { EnteredReading, RunSummary } from './leveling'

// Niveles de progresión de "Misión Topógrafo".
export interface GameLevel {
  index: number
  name: string
  minXp: number
}

export const LEVELS: GameLevel[] = [
  { index: 1, name: 'Aprendiz', minXp: 0 },
  { index: 2, name: 'Técnico', minXp: 150 },
  { index: 3, name: 'Topógrafo', minXp: 350 },
  { index: 4, name: 'Maestro Topógrafo', minXp: 600 },
]

export interface LevelProgress {
  level: GameLevel
  next?: GameLevel
  intoLevel: number // XP acumulada dentro del nivel
  span: number // XP total del tramo hacia el siguiente
  pct: number // 0..100 hacia el siguiente nivel
}

export function levelForXp(xp: number): LevelProgress {
  let level = LEVELS[0]
  for (const l of LEVELS) if (xp >= l.minXp) level = l
  const next = LEVELS.find((l) => l.minXp > level.minXp)
  const span = next ? next.minXp - level.minXp : 1
  const intoLevel = xp - level.minXp
  const pct = next ? Math.min(100, Math.round((intoLevel / span) * 100)) : 100
  return { level, next, intoLevel, span, pct }
}

// Puntaje de una lectura individual (para feedback inmediato en la simulación).
export function readingPoints(reading: EnteredReading): number {
  if (!reading.ok) return 10
  return Math.max(40, 100 - reading.errorMm * 8)
}

export interface RubricScore {
  criterionId: string
  level: number // 1..4
}

export interface MissionScore {
  points: number
  xpGained: number
  rubricByCriterion: RubricScore[]
  rubricLevel: number // 1..4 (global, ponderado)
  stars: number // 1..4
  earnedBadgeIds: string[]
  passed: boolean // rúbrica global ≥ 3
}

export function computeMissionScore(
  summary: RunSummary,
  rubric: Rubric,
  retries: number,
): MissionScore {
  const { closure } = summary
  const withinRatio = summary.totalReadings ? summary.okCount / summary.totalReadings : 0

  const criterionLevel = (id: string): number => {
    switch (id) {
      case 'lectura':
        if (summary.allWithin2mm) return 4
        if (summary.allWithinTolerance) return 3
        if (withinRatio >= 0.5) return 2
        return 1
      case 'calculo':
        // El motor calcula HI/cotas; el nivel refleja la calidad de las lecturas de entrada.
        if (summary.allWithin2mm) return 4
        if (summary.allWithinTolerance) return 3
        return 2
      case 'cierre':
        if (closure.withinTolerance) return closure.closureErrorMm === 0 ? 4 : 3
        return Math.abs(closure.closureErrorMm) <= closure.toleranceMm * 2 ? 2 : 1
      case 'eficiencia':
        if (retries === 0) return 4
        if (retries <= 2) return 3
        if (retries <= 5) return 2
        return 1
      default:
        return 2
    }
  }

  const rubricByCriterion: RubricScore[] = rubric.criteria.map((c) => ({
    criterionId: c.id,
    level: criterionLevel(c.id),
  }))

  const weighted = rubric.criteria.reduce((acc, c) => {
    const lvl = rubricByCriterion.find((r) => r.criterionId === c.id)!.level
    return acc + lvl * c.weight
  }, 0)
  const rubricLevel = Math.round(weighted)
  const stars = Math.max(1, Math.min(4, rubricLevel))

  // Puntos: lecturas + bono de cierre - penalización por reintentos.
  const readingPts = Math.round((summary.avgErrorMm <= 5 ? 100 - summary.avgErrorMm * 8 : 40) * summary.totalReadings)
  const closureBonus = closure.withinTolerance ? (closure.closureErrorMm === 0 ? 250 : 150) : 0
  const points = Math.max(0, readingPts + closureBonus - retries * 10)
  const xpGained = points

  const earnedBadgeIds: string[] = []
  if (summary.okCount >= 1) earnedBadgeIds.push('primera-lectura')
  if (summary.allWithin2mm) earnedBadgeIds.push('ojo-halcon')
  if (closure.withinTolerance) earnedBadgeIds.push('cierre-perfecto')
  if (rubricLevel >= 3) earnedBadgeIds.push('control-desniveles')

  return {
    points,
    xpGained,
    rubricByCriterion,
    rubricLevel,
    stars,
    earnedBadgeIds,
    passed: rubricLevel >= 3,
  }
}
