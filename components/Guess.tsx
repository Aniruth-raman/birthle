export default function Guess({ isGuessed, guess, date }) {
  return (
    <div className="mb-2 grid grid-cols-4 gap-2">
      {new Array(4).fill(0).map((_, i) => {
        const bgColor = !isGuessed
          ? 'bg-black'
          : guess[i] === date[i]
            ? 'bg-green-400'
            : date.includes(guess[i])
              ? 'bg-yellow-400'
              : 'bg-black'

        return (
          <div
            className={`flex h-16 w-16 items-center justify-center border border-gray-400 font-bold uppercase text-white ${bgColor}`}
          >
            {guess[i]}
          </div>
        )
      })}
    </div>
  )
}
