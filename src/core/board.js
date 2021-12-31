import React, { useState } from 'react';
import generateBoard from '../helpers/generageBoard';
// import initialBoard from '../helpers/initialBoard';
// import initialBoard from '../helpers/initialBoard';
const initialBoard = Array(80).fill({});

function Board(props) {
 console.log(initialBoard);
 const [board, setBoard] = useState(initialBoard);
 const [gameIsWon, setGameIsWon] = useState(false);
 const [gameIsLost, setGameisLost] = useState(false);
 const [firstClick, setFirstClick] = useState(true);
 const [flags, setFlags] = useState(10);
 const [seconds, setSeconds] = useState(0);
 const runTimer = () => {
  setTimeout(() => {
   setSeconds((prevstate) => prevstate + 1);
   if (!gameIsLost && !gameIsWon && seconds < 999) {
    runTimer();
   }
  }, 1000);
 };

 return (
  <div>
   Flags: {flags}
   time: {seconds}
   <div className="board">
    {board.map((square, i) => {
     const opposite = findColor(i);
     return (
      <div
       style={{ backgroundColor: opposite ? 'green' : 'lightgreen' }}
       className="square"
       key={square.placement || i}
       onClick={() => {
        if (firstClick) {
         setFirstClick(false);
         setBoard(generateBoard(i));
         runTimer();
        }
       }}
      >
       {square.adjacentMines ? square.adjacentMines : null}
       {minedOrFlaged(square)}
       {/* {square.mined  ? '💣': null}
       {square.flagged? '🚩': null} */}
      </div>
     );
    })}
   </div>
  </div>
 );
}

export default Board;

function findColor(place) {
 let addFactor = Math.floor(place / 10);
 return (addFactor + place) % 2;
}

function minedOrFlaged({ mined, flagged }) {
 if (mined && flagged) {
  return '🚩';
 }
 if (mined) {
  return '💣';
 }
 if (flagged) {
  return '❌';
 }
}
