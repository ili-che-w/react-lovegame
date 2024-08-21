import { useState } from 'react'
// import calculateWinner from './calculate-winner.js'

function calculateWinner(squares: Array<string | null>) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

interface SquareProps {
  value: string | null
  onSquareClick: React.MouseEventHandler
}

function Square({ value, onSquareClick }: SquareProps) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  )
}

interface BoardProps {
  squares: Array<string | null>
  handleClick: (index: number) => void
}

function Board({ squares, handleClick }: BoardProps) {
  return (
    <div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>

      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>

      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </div>
  )
}

function App() {
  const [evenMove, setEvenMove] = useState(true)
  const [squares, setSquares] = useState(Array(9).fill(null))

  const evenMoveSymbol = '\u{1F48B}',
    oddMoveSymbol = '\u{1F498}'

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

  const winner = calculateWinner(squares)
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
        <Board squares={squares} handleClick={handleClick} />

        <div style={{ marginLeft: '10px', display: 'flex' }}>
          <button onClick={refresh}>Обнулить</button>
        </div>
      </div>
    </>
  )
}

export default App
