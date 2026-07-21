import type { Rubric } from '@/types'

// Rúbrica de la misión de Nivelación (escala 1-4). Meta del proyecto: nivel ≥ 3.
export const rubrics: Rubric[] = [
  {
    id: 'rub-nivelacion',
    missionId: 'm-nivelacion',
    name: 'Rúbrica — Control de Desniveles',
    scale: 4,
    criteria: [
      {
        id: 'lectura',
        name: 'Lectura de mira',
        weight: 0.35,
        levels: [
          'Lecturas con errores frecuentes fuera de tolerancia.',
          'Lecturas con algunos errores sobre la tolerancia.',
          'Lecturas correctas dentro de tolerancia en la mayoría de las estaciones.',
          'Lecturas precisas (error ≤ 2 mm) en todas las estaciones.',
        ],
      },
      {
        id: 'calculo',
        name: 'Cálculo de HI y cotas',
        weight: 0.25,
        levels: [
          'No aplica correctamente HI = cota + BS.',
          'Aplica el método con errores de arrastre.',
          'Calcula HI y cotas correctamente.',
          'Calcula con exactitud y comprende el arrastre de cotas.',
        ],
      },
      {
        id: 'cierre',
        name: 'Control de cierre',
        weight: 0.3,
        levels: [
          'No controla el error de cierre.',
          'Cierre fuera de tolerancia.',
          'Cierre dentro de tolerancia.',
          'Cierre óptimo (error mínimo) y lo interpreta.',
        ],
      },
      {
        id: 'eficiencia',
        name: 'Método y eficiencia',
        weight: 0.1,
        levels: [
          'Requiere muchos reintentos.',
          'Avanza con reintentos moderados.',
          'Procede con método y pocos reintentos.',
          'Ejecuta con método riguroso, sin reintentos.',
        ],
      },
    ],
  },
]

export const rubricById = (id?: string) => rubrics.find((r) => r.id === id)
