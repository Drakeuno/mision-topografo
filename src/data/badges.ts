import type { Badge } from '@/types'

// Insignias de la experiencia. Los ids son usados por lib/gamification.ts.
export const badges: Badge[] = [
  {
    id: 'primera-lectura',
    name: 'Primera Lectura',
    description: 'Registraste tu primera lectura de mira correcta.',
    icon: '🎯',
    criterion: 'Acierta una lectura dentro de tolerancia.',
  },
  {
    id: 'ojo-halcon',
    name: 'Ojo de Halcón',
    description: 'Todas tus lecturas con error ≤ 2 mm. Precisión de topógrafo experto.',
    icon: '🦅',
    criterion: 'Todas las lecturas de la misión con error ≤ 2 mm.',
  },
  {
    id: 'cierre-perfecto',
    name: 'Cierre Perfecto',
    description: 'Cerraste el circuito de nivelación dentro de la tolerancia.',
    icon: '✅',
    criterion: 'Error de cierre ≤ tolerancia del circuito.',
  },
  {
    id: 'control-desniveles',
    name: 'Control de Desniveles',
    description: 'Completaste la misión de Nivelación con desempeño ≥ nivel 3.',
    icon: '📐',
    criterion: 'Completa "Control de Desniveles" con rúbrica ≥ 3.',
  },
  {
    id: 'taquimetro-experto',
    name: 'Taquímetro Experto',
    description: 'Domina la misión de Taquimetría. (Disponible próximamente)',
    icon: '📊',
    criterion: 'Completa la unidad de Taquimetría.',
  },
  {
    id: 'maestro-replanteo',
    name: 'Maestro del Replanteo',
    description: 'Lidera el replanteo colaborativo de obra lineal. (Disponible próximamente)',
    icon: '🛣️',
    criterion: 'Completa la unidad de Replanteo.',
  },
]

export const badgeById = (id: string) => badges.find((b) => b.id === id)
