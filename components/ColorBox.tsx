const items = [
  { color: 'bg-emerald-500', label: 'Correct spot' },
  { color: 'bg-amber-400', label: 'Wrong spot' },
  { color: 'bg-slate-700', label: 'Not in date' },
]

export default function ColorBox() {
  return (
    <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-slate-400">
      {items.map(({ color, label }) => (
        <span key={label} className="flex items-center gap-1.5">
          <span className={`h-3 w-3 rounded-sm ${color}`} />
          {label}
        </span>
      ))}
    </div>
  )
}
