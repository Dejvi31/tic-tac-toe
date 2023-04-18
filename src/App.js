import React, { useState } from 'react';
import './App.css';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [p1Name,setP1Name] = useState('')
  const [p2Name,setP2Name] = useState('')
  const [namesEntered, setNamesEntered] = useState(false);
  const [gameOver, setGameOver] = useState(false);


  const winner = calculateWinner(board);

  function handleClick(index) {
    if (!namesEntered || winner || board[index]) return;

    const newBoard = [...board];
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
    if (calculateWinner(newBoard) || newBoard.every(square => square != null)) {
      setGameOver(true);
    }
  }

  function renderRestartButton() {
    return (
      <div style={{display: 'flex' ,justifyContent: 'center', alignItems: 'center', marginTop: '1rem'}}>
      <button className='restart' onClick={handleRestart}>
        Restart Game
      </button>
      </div>
    );
  }
  function handleRestart() {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setGameOver(false);
    setP1Name('');
    setP2Name('');
    setNamesEntered(false);
  }

  function renderSquare(index) {
    const isWinningSquare = winner && winner.line.includes(index);
    return (
      <button 
        className={isWinningSquare ? 'boxes boxes-winning' : 'boxes'}
        onClick={() => handleClick(index)}
      >
        {board[index]}
      </button>
    );
  }

    const currentPlayerName = xIsNext ? p1Name : p2Name;
    let status;
    if (!namesEntered) {
      status = (
        <div className='form-box'>
          <form>
            <label>
              Player 1 Name:
              <input type="text" value={p1Name} onChange={(e) => setP1Name(e.target.value)} />
            </label>
            <br />
            <label>
              Player 2 Name:
              <input type="text" value={p2Name} onChange={(e) => setP2Name(e.target.value)} />
            </label>
          </form>
          <div className='btn-box'>
          <button className='start-game' onClick={() => setNamesEntered(true)}>Start Game</button>
          </div>
        </div>
      );
    } else if (winner) {
      status = <div className='status'>Winner: {winner.player === 'X' ? p1Name : p2Name}</div>;
    } else if (board.every((square) => square != null)) {
      status = <div className='status'>Draw!</div>;
    } else {
      status = <div className='status'>Next player: {currentPlayerName}</div>;
    }


  return (
    <>
    <div className='container'>
    <div className='game-title'>
      <h1>Tic-Tac-Toe</h1>
    </div>
    <div className='game'>
      <div className='board'>
        {status}
        {namesEntered && (
          <>
            <div className='row'>
              {renderSquare(0)}
              {renderSquare(1)}
              {renderSquare(2)}
            </div>
            <div className='row'>
              {renderSquare(3)}
              {renderSquare(4)}
              {renderSquare(5)}
            </div>
            <div className='row'>
              {renderSquare(6)}
              {renderSquare(7)}
              {renderSquare(8)}
            </div>
          </>
        )}
      </div>
    </div>
    {gameOver && renderRestartButton()}
  </div>
  </>
  );
  
}

function calculateWinner(board) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      return { player: board[a], line: [a, b, c] };
    }
  }
  return null;
}

export default App;
