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

 const patchedRemainder = (place) => {
  let addFactor = Math.floor(place / 10);
  return (addFactor + place) % 2;
 };

 const minedOrFlaged = (mined, flagged) => {
  if (gameIsWon || gameIsLost) {
//    if (mined && flagged) {
    return '🚩';
   }
   if (mined) {
    return '💣';
   }
   if (flagged) {
    return '❌';
   }
//   }
//   if (flagged) {
//    return '🚩';
//   }
  return null;
 };

 return (
  <div>
   Flags: {flags}
   time: {seconds}
   <div className="board">
    {board.map(
     ({ isMined, isFlagged, isRevealed, placement, adjacentMines }, i) => {
      return (
       <div
        className={`square ${
         patchedRemainder(i) ? 'patchedEven' : 'patchedOdd'
        }`}
        key={placement || i}
        onClick={() => {
         if (isFlagged) {
          return;
         }
         if (firstClick) {
          setFirstClick(false);
          setBoard(generateBoard(i));
          runTimer();
         }

         setBoard((prevstate) => {
          const newState = prevstate.map((square) => {
           if (square.placement === placement) {
            square.isRevealed = true;
           }
           return square;
          });
          return newState;
         });
        }}
       >
        {adjacentMines ? adjacentMines : null}
        {minedOrFlaged(isMined, isFlagged)}
       </div>
      );
     }
    )}
   </div>
  </div>
 );
}

export default Board;
