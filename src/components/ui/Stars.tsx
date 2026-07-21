import { Star } from 'lucide-react'

export function Stars({ value, max = 4, size = 20 }: { value: number; max?: number; size?: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${value} de ${max} estrellas`}>
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={i < value ? 'fill-accent-400 text-accent-500' : 'text-slate-300'}
        />
      ))}
    </div>
  )
}
