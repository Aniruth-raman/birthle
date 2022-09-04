import { observer, useLocalObservable } from 'mobx-react-lite'
import { useEffect } from 'react'
import Guess from '../components/Guess'
import Qwerty from '../components/Qwerty'
import PuzzleStore from '../stores/PuzzleStore'
import ColorBox from '../components/ColorBox'

export default observer(function Home() {
  const store = useLocalObservable(() => PuzzleStore)
  useEffect(() => {
    store.init()
    window.addEventListener('keyup', store.handleKeyup)

    return () => {
      window.removeEventListener('keyup', store.handleKeyup)
    }
  }, [])
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-gray-600">
      <h1 className="bg-gradient-to-br from-blue-400 to-green-400 bg-clip-text text-6xl font-bold uppercase text-transparent">
        birthle
      </h1>
      <br />
      {/* <div className='flex h-screen w-screen flex-col items-center justify-center'> */}
      {store.guesses.map((_, i) => (
        <Guess
          key={i}
          date={store.date}
          guess={store.guesses[i]}
          isGuessed={i < store.currentGuess}
        />
      ))}
      {/* </div> */}
      {store.won && <h1 className='font-bold uppercase m-2'>You won!</h1>}
      {store.lost && <h1 className='font-bold uppercase m-2'>You lost!</h1>}
      {(store.won || store.lost) && (
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={store.init}>Play Again</button>
      )}
      {store.date}
      {store.guesses}
      {/* <Qwerty store={store} /> */}
      {<ColorBox/>}
    </div>
  )
})
