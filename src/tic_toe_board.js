import React, { useState } from 'react'


function Square({ xo, onSquareClick }) {
  return (<button className="squarexo" onClick={onSquareClick}>{xo}</button>);
}

function Board({ isnextxo, squares, onPlay, name1, name2, draw }) {

  const handleClick = i => {
    if (squares[i] || calculateWinner(squares)) { return; }
    const nextsquares = squares.slice();
    nextsquares[i] = isnextxo ? 'X' : 'O';
    onPlay(nextsquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    if (winner === 'X')
      status = "Winner: " + name1;
    else
      status = "Winner: " + name2;
  } else {
    if(draw===9)  status = "Match Draw";
    else status = "Next player: " + (isnextxo ? name1: name2);
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="boardbox">
      <div className='tic_toe_board'>
      <Square xo={squares[0]} onSquareClick={() => handleClick(0)} />
      <Square xo={squares[1]} onSquareClick={() => handleClick(1)} />
      <Square xo={squares[2]} onSquareClick={() => handleClick(2)} />
      <Square xo={squares[3]} onSquareClick={() => handleClick(3)} />
      <Square xo={squares[4]} onSquareClick={() => handleClick(4)} />
      <Square xo={squares[5]} onSquareClick={() => handleClick(5)} />
      <Square xo={squares[6]} onSquareClick={() => handleClick(6)} />
      <Square xo={squares[7]} onSquareClick={() => handleClick(7)} />
      <Square xo={squares[8]} onSquareClick={() => handleClick(8)} />
    </div>
    </div>
    </>
  );
}

function Usernames({player1,player2,adduser}) {
  return(
    <div className="username">
<form action="" className="d-flex justify-content-center ">
  <div className="input-group">
    <span className="input-group-text">Player 1</span>
    <input type="text" aria-label="First name" className="form-control" name='player1' value={player1} onChange={(e) => adduser(e.target.value, player2)}/>
  </div>
  <div className="input-group">
    <span className="input-group-text">Player 2</span>
    <input type="text" aria-label="First name" className="form-control" name='player2' value={player2}   onChange={(e) => adduser(player1, e.target.value)}/>
  </div>
</form>
</div>
  );
}

export default function Game() {

  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const isnextxo = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }
  function jumpTo(nextMove) {
    if (nextMove === 0)
      setCurrentMove(nextMove);
    else
      setCurrentMove(currentMove - 1);
  }
  const addgameplayer = (name1, name2) => {
    setPlayer1(name1);
    setPlayer2(name2);
  };  

  return (
    <div className="tic_tac_toe">
    <Usernames player1={player1} player2={player2} adduser={addgameplayer}/>
      <div className='game d-flex justify-content-center align-items-center'>
        <div className="gamebox">
          <Board isnextxo={isnextxo} squares={currentSquares} onPlay={handlePlay} name1={player1} name2={player2} draw ={currentMove} />
        </div>
        <div className="goto">
          <ol>
            <li><button className="btn btn-primary" onClick={() => jumpTo(0)}>Start Again</button></li>
            <li><button className="btn btn-warning" onClick={() => jumpTo(1)}>go back</button></li>
          </ol>
        </div>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
