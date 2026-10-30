import dates from '../dates.json'
import { DATE_LENGTH, Score, scoreGuess } from '../lib/score'

export const MAX_GUESSES = 6

export function createPuzzleStore() {
  return {
    date: '',
    guesses: new Array(MAX_GUESSES).fill('') as string[],
    currentGuess: 0,
    message: '',
    get won() {
      return this.guesses[this.currentGuess - 1] === this.date
    },
    get lost() {
      return !this.won && this.currentGuess === MAX_GUESSES
    },
    // Best status seen for each digit, used to colour the on-screen keypad.
    get digitScores() {
      const scores: Record<string, Score> = {}
      this.guesses.slice(0, this.currentGuess).forEach((guess) => {
        scoreGuess(guess, this.date).forEach((score, i) => {
          const digit = guess[i]
          if (
            score === 'correct' ||
            (score === 'partial' && scores[digit] !== 'correct')
          ) {
            scores[digit] = score
          }
        })
      })
      return scores
    },
    init() {
      this.date = dates[Math.floor(Math.random() * dates.length)]
      this.guesses.replace(new Array(MAX_GUESSES).fill(''))
      this.currentGuess = 0
      this.message = ''
    },
    submitGuess() {
      const guess = this.guesses[this.currentGuess]
      if (guess.length < DATE_LENGTH) {
        this.message = 'Enter 4 digits, then press Enter'
        return
      }
      if (!dates.includes(guess)) {
        this.message = 'That is not a real date (use DDMM)'
        return
      }
      this.message = ''
      this.currentGuess += 1
    },
    handleKeyDown(e: {
      key: string
      code?: string
      repeat?: boolean
      target?: EventTarget | null
    }) {
      if (this.won || this.lost || e.repeat) {
        return
      }

      // A focused button handles its own Enter/Space activation; don't also
      // submit the guess from the global listener.
      if (
        (e.key === 'Enter' || e.key === ' ') &&
        (e.target as HTMLElement | null)?.tagName === 'BUTTON'
      ) {
        return
      }

      if (e.key === 'Enter') {
        return this.submitGuess()
      }
      if (e.key === 'Backspace') {
        this.message = ''
        this.guesses[this.currentGuess] = this.guesses[this.currentGuess].slice(0, -1)
        return
      }
      // Fall back to the physical key code so non-Latin layouts and the
      // numeric keypad still produce the expected ASCII digit.
      const digit = /^[0-9]$/.test(e.key)
        ? e.key
        : e.code?.match(/^(?:Digit|Numpad)([0-9])$/)?.[1] ?? ''
      if (digit && this.guesses[this.currentGuess].length < DATE_LENGTH) {
        const next = this.guesses[this.currentGuess] + digit
        this.guesses[this.currentGuess] = next
        this.message =
          next.length < DATE_LENGTH
            ? ''
            : dates.includes(next)
              ? 'Press Enter to submit'
              : 'That is not a real date (use DDMM)'
      }
    },
  }
}

export type PuzzleStore = ReturnType<typeof createPuzzleStore>
