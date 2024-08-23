import { useState } from 'react'
import { Board } from './Board'
import * as GameEngine from './calculate-winner'

function App() {
  const [nextMoveOdd, setNextMoveOdd] = useState(true)
  const [squares, setSquares] = useState(Array(9).fill(null))

  function handleClick(index: number) {
    if (squares[index]) {
      return
    }

    const nextSquares = squares.slice()
    nextSquares[index] = GameEngine.manageCell(nextMoveOdd) // ? evenMoveSymbol : oddMoveSymbol
    setSquares(nextSquares)
    setNextMoveOdd(!nextMoveOdd)
  }

  function refresh() {
    setSquares(Array(9).fill(null))
    setNextMoveOdd(true)
  }

  const winner = GameEngine.calculateWinner(squares)

  const status = GameEngine.calculateGameStatus(winner, nextMoveOdd)

  return (
    <>
      <div className="status" style={{ marginBottom: '10px' }}>
        {status}
      </div>

      <div style={{ display: 'flex' }}>
        <Board squares={squares} onSquareClick={handleClick} />

        <div style={{ marginLeft: '10px', display: 'flex' }}>
          <button onClick={refresh}>Обнулить</button>
        </div>
      </div>
    </>
  )
}

export default App
