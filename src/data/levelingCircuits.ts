import type { LevelingCircuit } from '@/types'

// Circuito de nivelación cerrado. Las lecturas verdaderas están diseñadas para que,
// si se leen perfectamente, el circuito cierre exactamente en la cota del BM (100.000 m).
//   ΣBS = 1.500 + 0.750 + 3.000 = 5.250
//   ΣFS = 2.250 + 2.400 + 0.600 = 5.250  →  cierre = 0
// Cotas verdaderas resultantes: A = 99.250, B = 97.600, BM-1 (retorno) = 100.000.
export const levelingCircuits: LevelingCircuit[] = [
  {
    id: 'ruta-cerro',
    name: 'Circuito Cerro Ñielol',
    description:
      'Nivelación diferencial cerrada de 3 estaciones que parte y retorna al mojón BM-1 de cota conocida.',
    benchmark: { point: 'BM-1', elevation: 100.0 },
    staffMax: 4.0,
    toleranceMm: 8,
    readingToleranceMm: 5,
    setups: [
      {
        id: 's1',
        fromPoint: 'BM-1',
        toPoint: 'A',
        backSight: 1.5,
        foreSight: 2.25,
        note: 'Estación entre el mojón BM-1 y el punto A.',
      },
      {
        id: 's2',
        fromPoint: 'A',
        toPoint: 'B',
        backSight: 0.75,
        foreSight: 2.4,
        note: 'Estación entre A y B. El terreno desciende.',
      },
      {
        id: 's3',
        fromPoint: 'B',
        toPoint: 'BM-1',
        backSight: 3.0,
        foreSight: 0.6,
        note: 'Estación de cierre: retorno al mojón BM-1.',
      },
    ],
  },
]

export const circuitById = (id?: string) => levelingCircuits.find((c) => c.id === id)
