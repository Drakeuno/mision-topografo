import type { Indicator } from '@/types'

// Indicadores del proyecto (sección 14 del formulario PID). "current" = resultado
// simulado de la cohorte 2027 para la demostración del panel docente.
export const indicators: Indicator[] = [
  {
    id: 'aprobacion',
    name: 'Tasa de aprobación del curso',
    shortName: 'Aprobación',
    unit: '% ≥ 4.0',
    baseline: 70,
    target: 80,
    current: 82,
    format: 'percent',
    source: 'Registro académico',
  },
  {
    id: 'competencias',
    name: 'Desempeño en competencias específicas',
    shortName: 'Competencias',
    unit: '% rúbrica ≥ 3',
    baseline: 50,
    target: 75,
    current: 76,
    format: 'percent',
    source: 'Rúbrica de misiones gamificadas',
  },
  {
    id: 'motivacion',
    name: 'Motivación y aprendizaje significativo',
    shortName: 'Motivación',
    unit: '% ≥ 4/5',
    baseline: 50,
    target: 70,
    current: 74,
    format: 'percent',
    source: 'Encuesta Likert validada',
  },
  {
    id: 'autorregulacion',
    name: 'Autorregulación del aprendizaje',
    shortName: 'Autorregulación',
    unit: '% con seguimiento activo',
    baseline: 30,
    target: 60,
    current: 63,
    format: 'percent',
    source: 'Analytics de plataforma',
  },
  {
    id: 'satisfaccion',
    name: 'Satisfacción con simulaciones digitales',
    shortName: 'Satisfacción',
    unit: 'escala 1-5',
    baseline: 0,
    target: 4.0,
    current: 4.3,
    format: 'score',
    source: 'Encuesta de usabilidad',
  },
  {
    id: 'cohen',
    name: 'Efectividad estadística (tamaño de efecto)',
    shortName: "Cohen's d",
    unit: "Cohen's d",
    baseline: 0,
    target: 0.5,
    current: 0.62,
    format: 'effect',
    source: 'Prueba t + ANOVA',
  },
]

// Comparación de cohortes para el gráfico del panel docente (datos ilustrativos).
export const cohortComparison = [
  { indicador: 'Aprobación', cohorte2026: 70, cohorte2027: 82 },
  { indicador: 'Competencias', cohorte2026: 50, cohorte2027: 76 },
  { indicador: 'Motivación', cohorte2026: 48, cohorte2027: 74 },
  { indicador: 'Autorregulación', cohorte2026: 30, cohorte2027: 63 },
]
