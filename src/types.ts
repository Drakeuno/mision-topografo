// Tipos compartidos de la maqueta "Misión Topógrafo".

export type Role = 'estudiante' | 'docente'

export type Unit = 'nivelacion' | 'taquimetria' | 'replanteo'

export interface DemoUser {
  id: string
  name: string
  role: Role
  avatar: string // emoji
  subtitle: string
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string // emoji
  criterion: string // regla de desbloqueo (texto)
}

export interface RubricCriterion {
  id: string
  name: string
  weight: number // 0..1, suma 1
  levels: [string, string, string, string] // descriptores nivel 1..4
}

export interface Rubric {
  id: string
  missionId: string
  name: string
  scale: 4
  criteria: RubricCriterion[]
}

export interface Mission {
  id: string
  code: string
  title: string
  unit: Unit
  status: 'activa' | 'proximamente'
  ra: string
  raDescription: string
  competency: string
  narrative: string
  objectives: string[]
  rubricId?: string
  circuitId?: string
  xpReward: number
  icon: string
  color: string // clase tailwind de acento por unidad
}

export interface LevelingSetup {
  id: string
  fromPoint: string // punto de vista atrás (conocido)
  toPoint: string // punto de vista adelante (nuevo)
  backSight: number // lectura verdadera de vista atrás (m)
  foreSight: number // lectura verdadera de vista adelante (m)
  note?: string
}

export interface LevelingCircuit {
  id: string
  name: string
  description: string
  benchmark: { point: string; elevation: number }
  staffMax: number // altura de mira (m) para escala de dibujo
  toleranceMm: number // tolerancia de cierre (mm)
  readingToleranceMm: number // tolerancia por lectura (mm)
  setups: LevelingSetup[]
}

export interface Indicator {
  id: string
  name: string
  shortName: string
  unit: string
  baseline: number
  target: number
  current: number
  format: 'percent' | 'score' | 'effect'
  source: string
}

export interface CohortStudent {
  id: string
  name: string
  xp: number
  rubricLevel: number // 1..4
  missionsDone: number
  motivation: number // 1..5
  tracking: number // % seguimiento plataforma
}
