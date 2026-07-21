import type { LevelingCircuit } from '@/types'

// Núcleo de cálculo de nivelación diferencial (100% en el cliente).

export type ReadingKind = 'BS' | 'FS'

export interface EnteredReading {
  setupId: string
  kind: ReadingKind
  value: number // lo que ingresó el estudiante (m)
  trueValue: number // lectura verdadera de la mira (m)
  errorMm: number // |value - trueValue| en mm
  ok: boolean // dentro de la tolerancia por lectura
}

export interface StationComputation {
  setupId: string
  fromPoint: string
  toPoint: string
  bs?: number
  fs?: number
  hi?: number // altura instrumental = cota(from) + BS
  elevation?: number // cota del punto "to" = HI - FS
}

export interface ClosureResult {
  knownElevation: number
  measuredElevation: number
  closureErrorMm: number // (medido - conocido) en mm, con signo
  toleranceMm: number
  withinTolerance: boolean
}

export interface RunSummary {
  totalReadings: number
  okCount: number
  maxErrorMm: number
  avgErrorMm: number
  allWithinTolerance: boolean
  allWithin2mm: boolean
  stations: StationComputation[]
  closure: ClosureResult
}

/** Error de una lectura en milímetros (entero). */
export const readingErrorMm = (value: number, trueValue: number) =>
  Math.round(Math.abs(value - trueValue) * 1000)

/** Evalúa una lectura contra el valor verdadero según la tolerancia del circuito. */
export function evaluateReading(
  setupId: string,
  kind: ReadingKind,
  value: number,
  trueValue: number,
  readingToleranceMm: number,
): EnteredReading {
  const errorMm = readingErrorMm(value, trueValue)
  return { setupId, kind, value, trueValue, errorMm, ok: errorMm <= readingToleranceMm }
}

/** Devuelve la lectura verdadera de una estación según el tipo (BS/FS). */
export function trueReading(circuit: LevelingCircuit, setupId: string, kind: ReadingKind): number {
  const s = circuit.setups.find((x) => x.id === setupId)!
  return kind === 'BS' ? s.backSight : s.foreSight
}

/**
 * Propaga las cotas usando las lecturas INGRESADAS por el estudiante.
 * Así, los errores de lectura se arrastran hasta el cierre (comportamiento real).
 */
export function computeStations(
  circuit: LevelingCircuit,
  readings: EnteredReading[],
): StationComputation[] {
  let currentElevation = circuit.benchmark.elevation
  return circuit.setups.map((setup) => {
    const bs = readings.find((r) => r.setupId === setup.id && r.kind === 'BS')?.value
    const fs = readings.find((r) => r.setupId === setup.id && r.kind === 'FS')?.value
    const comp: StationComputation = {
      setupId: setup.id,
      fromPoint: setup.fromPoint,
      toPoint: setup.toPoint,
      bs,
      fs,
    }
    if (bs !== undefined) comp.hi = round3(currentElevation + bs)
    if (bs !== undefined && fs !== undefined) {
      comp.elevation = round3(comp.hi! - fs)
      currentElevation = comp.elevation
    }
    return comp
  })
}

export function computeClosure(
  circuit: LevelingCircuit,
  stations: StationComputation[],
): ClosureResult {
  const known = circuit.benchmark.elevation
  const last = stations[stations.length - 1]
  const measured = last?.elevation ?? known
  const closureErrorMm = Math.round((measured - known) * 1000)
  return {
    knownElevation: known,
    measuredElevation: measured,
    closureErrorMm,
    toleranceMm: circuit.toleranceMm,
    withinTolerance: Math.abs(closureErrorMm) <= circuit.toleranceMm,
  }
}

export function summarizeRun(circuit: LevelingCircuit, readings: EnteredReading[]): RunSummary {
  const stations = computeStations(circuit, readings)
  const closure = computeClosure(circuit, stations)
  const errors = readings.map((r) => r.errorMm)
  const okCount = readings.filter((r) => r.ok).length
  const maxErrorMm = errors.length ? Math.max(...errors) : 0
  const avgErrorMm = errors.length ? errors.reduce((a, b) => a + b, 0) / errors.length : 0
  return {
    totalReadings: readings.length,
    okCount,
    maxErrorMm,
    avgErrorMm: Math.round(avgErrorMm * 10) / 10,
    allWithinTolerance: okCount === readings.length && readings.length > 0,
    allWithin2mm: readings.length > 0 && errors.every((e) => e <= 2),
    stations,
    closure,
  }
}

/** Total de lecturas requeridas por el circuito (BS + FS por estación). */
export const totalRequiredReadings = (circuit: LevelingCircuit) => circuit.setups.length * 2

const round3 = (n: number) => Math.round(n * 1000) / 1000
