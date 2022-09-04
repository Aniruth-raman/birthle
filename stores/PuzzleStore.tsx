import dates from '../dates.json'

export default {
  date: '',
  guesses: [],
  currentGuess: 0,
  get won() {
    return this.guesses[this.currentGuess - 1] === this.date
  },
  get lost() {
    return this.currentGuess === 6
  },
  get allGuesses() {
    return this.guesses.slice(0, this.currentGuess).join('').split('')
  },
  //   get exactGuesses() {
  //     return (
  //       this.word
  //       .split('')
  //         // if any guesses include this letter in this position/index
  //         .filter((letter: any, i: string | number) => {
  //           return this.guesses
  //           .slice(0, this.currentGuess)
  //           .map((word: { [x: string]: any }) => word[i])
  //           .includes(letter)
  //         })
  //     )
  //   },
  // get inexactGuesses() {
  //   return this.date
  //     .split('')
  //     .filter((letter: any) => this.allGuesses.includes(letter))
  // },
  init() {
    this.date = dates[Math.round(Math.random() * dates.length)]
    this.guesses.replace(new Array(6).fill(''))
    this.currentGuess = 0
  },
  submitGuess() {
    if (dates.includes(this.guesses[this.currentGuess])) {
      this.currentGuess += 1
    }
  },
  handleKeyup(e: { key: string }) {
    if (this.won || this.lost) {
      return
    }

    if (e.key === 'Enter') {
      return this.submitGuess()
    }
    if (e.key === 'Backspace') {
      this.guesses[this.currentGuess] = this.guesses[this.currentGuess].slice(
        0,
        this.guesses[this.currentGuess].length - 1
      )
      return
    }
    if (this.guesses[this.currentGuess].length < 4 && e.key.match(/^[0-9]$/)) {
      this.guesses[this.currentGuess] = this.guesses[this.currentGuess] + e.key
    }
  },
}
