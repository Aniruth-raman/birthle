export default function ColorBox() {
    return (
        <div className="mb-2 grid grid-cols-3 gap-3">
            < div className="grid h-16 w-16 bg-yellow-400 items-center text-center" >Partial Guess</div>
            < div className="flex h-16 w-16 bg-green-400 items-center text-center" >Correct Guess</div>
            < div className="flex h-16 w-16 bg-black items-center text-center text-white" >Wrong Guess</div>
        </div >
    )
}
