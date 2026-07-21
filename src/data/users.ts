import type { CohortStudent, DemoUser } from '@/types'

// Perfiles demo precargados (sin backend). El login solo selecciona un perfil.
export const demoUsers: DemoUser[] = [
  {
    id: 'est-1',
    name: 'Camila Reyes',
    role: 'estudiante',
    avatar: '🧑‍🎓',
    subtitle: 'Ing. en Construcción · 2° año',
  },
  {
    id: 'doc-1',
    name: 'Claudio Gil',
    role: 'docente',
    avatar: '👨‍🏫',
    subtitle: 'Docente responsable · Topografía',
  },
]

// Cohorte simulada 2027 para el panel docente (datos ficticios de demostración).
export const demoCohort: CohortStudent[] = [
  { id: 'c1', name: 'Camila Reyes', xp: 320, rubricLevel: 4, missionsDone: 3, motivation: 5, tracking: 82 },
  { id: 'c2', name: 'Matías Fuentes', xp: 250, rubricLevel: 3, missionsDone: 3, motivation: 4, tracking: 74 },
  { id: 'c3', name: 'Valentina Soto', xp: 210, rubricLevel: 3, missionsDone: 2, motivation: 5, tracking: 68 },
  { id: 'c4', name: 'Benjamín Rojas', xp: 180, rubricLevel: 3, missionsDone: 2, motivation: 4, tracking: 61 },
  { id: 'c5', name: 'Antonia Vega', xp: 150, rubricLevel: 2, missionsDone: 2, motivation: 4, tracking: 55 },
  { id: 'c6', name: 'Joaquín Muñoz', xp: 120, rubricLevel: 2, missionsDone: 1, motivation: 3, tracking: 49 },
  { id: 'c7', name: 'Isidora Cárcamo', xp: 240, rubricLevel: 3, missionsDone: 3, motivation: 5, tracking: 78 },
  { id: 'c8', name: 'Tomás Aravena', xp: 90, rubricLevel: 2, missionsDone: 1, motivation: 3, tracking: 44 },
]
