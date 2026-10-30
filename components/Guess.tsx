import { DATE_LENGTH, Score, scoreGuess } from '../lib/score'

const colors: Record<Score, string> = {
  correct: 'border-emerald-500 bg-emerald-500 text-slate-950',
  partial: 'border-amber-400 bg-amber-400 text-slate-950',
  wrong: 'border-slate-700 bg-slate-700 text-slate-300',
}

export default function Guess({
  isGuessed,
  isActive,
  guess,
  date,
}: {
  isGuessed: boolean
  isActive: boolean
  guess: string
  date: string
}) {
  const scores = isGuessed ? scoreGuess(guess, date) : []
  return (
    <div className="mb-1.5 grid grid-cols-4 gap-2">
      {new Array(DATE_LENGTH).fill(0).map((_, i) => {
        const next = isActive && i === guess.length
        return (
          <div
            key={i}
            className={`flex h-14 w-14 items-center justify-center rounded-lg border-2 text-2xl font-bold transition-colors duration-300 sm:h-16 sm:w-16 ${
              scores[i]
                ? colors[scores[i]]
                : next
                  ? 'border-sky-400/80 bg-slate-800 text-white'
                  : isActive
                    ? 'border-slate-600 bg-slate-900/60 text-white'
                    : 'border-slate-800 bg-slate-900/40 text-slate-200'
            }`}
          >
            {guess[i]}
          </div>
        )
      })}
    </div>
  )
}
