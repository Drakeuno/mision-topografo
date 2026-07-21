interface Props {
  value: number // 0..100
  tone?: 'brand' | 'accent' | 'emerald'
  className?: string
  height?: string
}

const tones: Record<string, string> = {
  brand: 'bg-brand-500',
  accent: 'bg-accent-500',
  emerald: 'bg-emerald-500',
}

export function ProgressBar({ value, tone = 'brand', className = '', height = 'h-2.5' }: Props) {
  const clamped = Math.max(0, Math.min(100, value))
  return (
    <div className={`${height} w-full overflow-hidden rounded-full bg-slate-200 ${className}`}>
      <div
        className={`${height} rounded-full ${tones[tone]} transition-all duration-500`}
        style={{ width: `${clamped}%` }}
      />
    </div>
  )
}
