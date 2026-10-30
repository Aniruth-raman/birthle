import { observer } from 'mobx-react-lite'
import { PuzzleStore } from '../stores/PuzzleStore'

const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']

export default observer(function Qwerty({ store }: { store: PuzzleStore }) {
  const keyClass = (digit: string) => {
    const score = store.digitScores[digit]
    if (score === 'correct') return 'border-emerald-500 bg-emerald-500 text-slate-950'
    if (score === 'partial') return 'border-amber-400 bg-amber-400 text-slate-950'
    if (score === 'wrong') return 'border-slate-800 bg-slate-800 text-slate-400'
    return 'border-slate-700 bg-slate-800 text-slate-100 hover:bg-slate-700'
  }
  const over = store.won || store.lost
  const button =
    'h-11 touch-manipulation select-none rounded-lg border font-bold transition active:scale-95 disabled:pointer-events-none disabled:opacity-50'

  return (
    <div className="mt-4 grid w-full grid-cols-5 gap-2">
      {keys.map((digit) => (
        <button
          key={digit}
          type="button"
          disabled={over}
          className={`${button} ${keyClass(digit)}`}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => store.handleKeyDown({ key: digit })}
        >
          {digit}
        </button>
      ))}
      <button
        type="button"
        disabled={over}
        aria-label="Delete last digit"
        className={`${button} col-span-2 border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700`}
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => store.handleKeyDown({ key: 'Backspace' })}
      >
        Delete
      </button>
      <button
        type="button"
        disabled={over}
        className={`${button} col-span-3 border-sky-500 bg-sky-500 text-slate-950 hover:bg-sky-400`}
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => store.handleKeyDown({ key: 'Enter' })}
      >
        Enter
      </button>
    </div>
  )
})
