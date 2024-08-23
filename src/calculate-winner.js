const evenMoveSymbol = '\u{1F48B}', // kiss mark
  oddMoveSymbol = '\u{1F498}' // heart with arrow

export function manageCell(nextMoveOdd) {
  return nextMoveOdd ? evenMoveSymbol : oddMoveSymbol
}

export function calculateWinner(squares) {
  const emptySquares = squares.filter((square) => square === null)

  if (!emptySquares.length) {
    return 'draw'
  }

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

export function calculateGameStatus(winner, nextMoveOdd) {
  if (winner) {
    if (winner === 'draw') {
      return 'Ничья'
    } else {
      return `Победитель: ${winner}`
    }
  } else {
    return `Следующий ход: ${nextMoveOdd ? evenMoveSymbol : oddMoveSymbol}`
  }
}
