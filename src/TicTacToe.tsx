import { useEffect, useState } from 'react'

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null)) // board state with 9 empty square
  const [player, setPlayer] = useState('X') // Current player, X goes first
  const [scores, setScores] = useState({ X: 0, O: 0, tie: 0 } as Record<string, number>) // Scores for X, O, and Tie

  const winningCombos = [ // All possible winning combinations
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

   // Check if the game is over (either won or tied)
   const checkWinner = (): string => {
    if (board.includes(null)) { // There are still empty squares
      for (let combo of winningCombos) {
        const [a, b, c] = combo
        if (board[a] && board[a] === board[b] && board[b] === board[c]) { // A winning combination is found
          return board[a]
        }
      }
      return '' // No winning combination found, game is not over yet
    } else { // All squares are filled, game is tied
      return 'Tie'
    }
  }

  const handleCellClick = (index: number) => {
    if (board[index] === null) {
      const newBoard = [...board]
      newBoard[index] = player
      setBoard(newBoard)
    }
  }


  useEffect(() => {
    const storage = window.localStorage.getItem("ticTacToeScores") as string
    const scoresFromLocalStorage = JSON.parse(storage)
    if (scoresFromLocalStorage) {
      setScores(scoresFromLocalStorage)
    }
  }, [])

  useEffect(() => {
    const winner = checkWinner()
    if (winner) {
      const newScore = { ...scores, [winner]: scores[winner] + 1 }
      setScores(newScore)
      setBoard(Array(9).fill(null))
      setPlayer("X")
      window.localStorage.setItem("ticTacToeScores", JSON.stringify(newScore))
    } else {
      setPlayer(player === "X" ? "O" : "X")
    }
  }, [board])


  const playerIcon = (cell: string) => {
    if(cell === "O") {
      return (
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      )
    } else if (cell === "X") {
      return (
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      )
    }
  }

  return (
      <main 
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          minHeight: '100vh',
          padding: '6rem'
        }}
      >
        <div style={{
          background: 'black',
          maxWidth: 480,
          width: 480,
          position:'relative',
          padding: 12,
        }}>
          <div style={{
            width: '100%',
            height: '480px',
            display: 'grid',
            gridTemplateColumns: 'auto auto auto',
            gap: '4px',
            background: 'white'
          }}>
            {board.map((cell, index) => (
              <div
                key={index}
                onClick={() => handleCellClick(index)}
                style={{
                  display: "flex",
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: '100%',
                  margin: 'auto',
                  cursor: "pointer",
                  color: 'white',
                  background: 'black'
                }}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke-width="2" 
                  stroke="currentColor" 
                  style={{
                    width: 80,
                    height: 80,
                    color: 'white'}}
                >
                  {playerIcon(cell)}
                </svg>
              </div>
            ))}

          </div>
          <div style={{
            marginTop: 12,
            display: 'flex',
            justifyContent: 'space-between',
            margin: 'auto',
            width: 300,
            color: 'white',
            bottom: '0'
          }}>
            <div>
              <p>PLAYER 1 (x)</p>
              <p>{scores.X}</p>
            </div>
            <div>
              <p>TIE</p>
              <p>{scores.tie}</p>
            </div>
            <div>
              <p>PLAYER 2 (O)</p>
              <p>{scores.O}</p>
            </div>
          </div>
        </div>
      </main>
  )
}


export default TicTacToe
