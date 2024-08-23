type CellValue = string | null

interface SquareProps {
  value: CellValue
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
  squares: Array<CellValue>
  onSquareClick: (index: number) => void
}

// number of rows on game board
const numOfRows = 3

export function Board({ squares, onSquareClick }: BoardProps) {
  const rows = []

  const chunkSize = squares.length / numOfRows
  for (
    let start = 0, end = chunkSize;
    start < squares.length;
    start += chunkSize, end += chunkSize
  ) {
    const newChunk = squares.slice(start, end)
    rows.push(newChunk)
  }

  return (
    <div>
      {rows.map((row, rowNumber) => {
        return (
          <div className="board-row" key={rowNumber}>
            {row.map((value, index) => (
              <Square
                value={value}
                onSquareClick={() =>
                  onSquareClick(rowNumber * chunkSize + index)
                }
                key={index}
              />
            ))}
          </div>
        )
      })}
    </div>
  )
}
