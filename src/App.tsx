import { useState } from 'react'
import { Board } from './Board'
import * as GameEngine from './calculate-winner'

const evenMoveSymbol = '\u{1F48B}', // kiss mark
  oddMoveSymbol = '\u{1F498}' // heart with arrow

function App() {
  const [evenMove, setEvenMove] = useState(true)
  const [squares, setSquares] = useState(Array(9).fill(null))

  function handleClick(index: number) {
    if (squares[index]) {
      return
    }

    const nextSquares = squares.slice()
    nextSquares[index] = evenMove ? evenMoveSymbol : oddMoveSymbol
    setSquares(nextSquares)
    setEvenMove(!evenMove)
  }

  function refresh() {
    setSquares(Array(9).fill(null))
    setEvenMove(true)
  }

  const winner = GameEngine.calculateWinner(squares)

  const status = ((winner) => {
    if (winner) {
      return `Победитель: ${winner}`
    } else {
      return `Следующий ход: ${evenMove ? evenMoveSymbol : oddMoveSymbol}`
    }
  })(winner)

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
