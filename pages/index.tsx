import { observer, useLocalObservable } from 'mobx-react-lite'
import Head from 'next/head'
import { useEffect } from 'react'
import ColorBox from '../components/ColorBox'
import Guess from '../components/Guess'
import Qwerty from '../components/Qwerty'
import { createPuzzleStore } from '../stores/PuzzleStore'

export default observer(function Home() {
  const store = useLocalObservable(createPuzzleStore)

  useEffect(() => {
    store.init()
    window.addEventListener('keydown', store.handleKeyDown)

    return () => {
      window.removeEventListener('keydown', store.handleKeyDown)
    }
  }, [store])

  const formattedDate = `${store.date.slice(0, 2)}/${store.date.slice(2)}`
  const over = store.won || store.lost

  return (
    <div className="relative flex min-h-screen min-h-svh w-full items-center justify-center overflow-hidden bg-slate-950 p-4 text-slate-100">
      <Head>
        <title>Birthle — guess the birthday</title>
        <meta
          name="description"
          content="A Wordle-style game where you guess the birth date (DDMM)."
        />
        <meta name="theme-color" content="#020617" />
      </Head>

      <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-sky-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl" />

      <main className="relative z-10 flex w-full max-w-sm flex-col items-center">
        <header className="mb-3 text-center">
          <h1 className="bg-gradient-to-r from-sky-400 via-emerald-400 to-lime-300 bg-clip-text text-5xl font-black uppercase tracking-tight text-transparent sm:text-6xl">
            birthle
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Guess the birthday — type a date as DDMM
          </p>
        </header>

        <p
          className="mb-2 flex min-h-6 items-center justify-center text-center text-sm font-medium text-amber-300"
          role="status"
          aria-live="polite"
        >
          {store.message}
        </p>

        <section aria-label="Guesses" className="select-none">
          {store.guesses.map((_, i) => (
            <Guess
              key={i}
              date={store.date}
              guess={store.guesses[i]}
              isGuessed={i < store.currentGuess}
              isActive={!over && i === store.currentGuess}
            />
          ))}
        </section>

        {over && (
          <div
            className={`mt-2 w-full rounded-xl border p-3 text-center text-sm font-semibold ${
              store.won
                ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                : 'border-rose-500/30 bg-rose-500/10 text-rose-300'
            }`}
          >
            {store.won
              ? `You got it in ${store.currentGuess} ${
                  store.currentGuess === 1 ? 'guess' : 'guesses'
                }!`
              : `Out of guesses — it was ${formattedDate}`}
          </div>
        )}

        {over && (
          <button
            type="button"
            className="mt-2 w-full rounded-xl bg-emerald-500 px-4 py-2.5 font-bold text-slate-950 transition hover:bg-emerald-400 active:scale-[0.99]"
            onClick={store.init}
          >
            Play again
          </button>
        )}

        <Qwerty store={store} />
        <ColorBox />
      </main>
    </div>
  )
})
