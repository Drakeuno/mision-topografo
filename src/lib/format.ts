// Utilidades de formato.

export const formatMeters = (n: number, decimals = 3) =>
  n.toLocaleString('es-CL', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })

export const formatMm = (mm: number) => `${mm >= 0 ? '+' : ''}${mm} mm`

export const formatIndicator = (value: number, format: 'percent' | 'score' | 'effect') => {
  if (format === 'percent') return `${value}%`
  if (format === 'score') return value.toFixed(1)
  return value.toFixed(2)
}
