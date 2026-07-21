import type { Mission } from '@/types'

// Las 3 zonas temáticas de "Misión Topógrafo". Solo Nivelación está jugable en la maqueta.
export const missions: Mission[] = [
  {
    id: 'm-nivelacion',
    code: 'Misión 1',
    title: 'Control de Desniveles',
    unit: 'nivelacion',
    status: 'activa',
    ra: 'RA1',
    raDescription:
      'Aplica procedimientos de nivelación geométrica para determinar cotas y desniveles con precisión.',
    competency: 'Competencia específica: Técnicas de medición',
    narrative:
      'La Facultad necesita verificar las cotas de un circuito de nivelación en el Cerro Ñielol antes de iniciar una obra. Tu misión: operar el nivel automático, leer la mira en cada estación y cerrar el circuito dentro de la tolerancia.',
    objectives: [
      'Leer correctamente la mira en vistas atrás (BS) y adelante (FS).',
      'Calcular la altura instrumental (HI) y las cotas de cada punto.',
      'Cerrar el circuito controlando el error dentro de la tolerancia.',
    ],
    rubricId: 'rub-nivelacion',
    circuitId: 'ruta-cerro',
    xpReward: 120,
    icon: '📐',
    color: 'brand',
  },
  {
    id: 'm-taquimetria',
    code: 'Misión 2',
    title: 'Taquimetría Express',
    unit: 'taquimetria',
    status: 'proximamente',
    ra: 'RA2',
    raDescription: 'Realiza levantamientos taquimétricos para la representación del relieve.',
    competency: 'Competencia específica: Levantamientos',
    narrative:
      'Desafío contra el reloj: levanta el relieve de un sector con la estación total y genera el modelo del terreno antes de que se agote el tiempo.',
    objectives: [
      'Registrar lecturas de estadía y ángulos.',
      'Calcular distancias y desniveles taquimétricos.',
      'Representar el relieve con puntos de detalle.',
    ],
    xpReward: 140,
    icon: '📊',
    color: 'accent',
  },
  {
    id: 'm-replanteo',
    code: 'Misión 3',
    title: 'Replanteo de Camino Rural',
    unit: 'replanteo',
    status: 'proximamente',
    ra: 'RA3',
    raDescription: 'Ejecuta replanteos de obras lineales y curvas de nivel.',
    competency: 'Competencia específica: Replanteo',
    narrative:
      'Misión grupal colaborativa: replantea el eje y las curvas de un camino rural coordinando al equipo en terreno.',
    objectives: [
      'Calcular coordenadas de replanteo del eje.',
      'Materializar puntos y curvas en terreno.',
      'Coordinar el trabajo colaborativo del equipo.',
    ],
    xpReward: 160,
    icon: '🛣️',
    color: 'emerald',
  },
]

export const missionById = (id: string) => missions.find((m) => m.id === id)
export const activeMission = missions.find((m) => m.status === 'activa')!
