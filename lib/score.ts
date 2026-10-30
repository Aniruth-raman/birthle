export const DATE_LENGTH = 4

export type Score = 'correct' | 'partial' | 'wrong'

// Wordle-style scoring: exact matches claim their digit first so repeated
// digits are only reported as partial once per occurrence in the date.
export function scoreGuess(guess: string, date: string): Score[] {
  const result: Score[] = []
  const unmatched = date.split('')

  for (let i = 0; i < DATE_LENGTH; i++) {
    if (guess[i] === date[i]) {
      result[i] = 'correct'
      unmatched[i] = ''
    }
  }
  for (let i = 0; i < DATE_LENGTH; i++) {
    if (result[i]) continue
    const match = unmatched.indexOf(guess[i])
    if (guess[i] && match !== -1) {
      result[i] = 'partial'
      unmatched[match] = ''
    } else {
      result[i] = 'wrong'
    }
  }
  return result
}
