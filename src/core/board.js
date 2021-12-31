import React, { useState } from 'react';
import { useRef } from 'react/cjs/react.development';
import generateBoard from '../helpers/generageBoard';
import reveal from '../helpers/reveal';
// import initialBoard from '../helpers/initialBoard';
// import initialBoard from '../helpers/initialBoard';

function Board(props) {
 const initialBoard = Array(8).fill(Array(10).fill({}));
 const [board, setBoard] = useState(initialBoard);
 const [gameIsWon, setGameIsWon] = useState(false);
 const [gameIsLost, setGameisLost] = useState(false);
 const [firstClick, setFirstClick] = useState(true);
 const [flags, setFlags] = useState(10);
 const seconds = useRef(0);

 const runTimer = () => {
  setTimeout(() => {
   seconds.current++;
   if (!gameIsLost && !gameIsWon && seconds < 999) {
    runTimer();
   }
  }, 1000);
 };

 //  const patchedRemainder = (place) => {
 //   let addFactor = Math.floor(place / 10);
 //   return (addFactor + place) % 2;
 //  };

 const gridColorDecider = (rowNum, colNum) => {
  const sum = rowNum + colNum;
  return sum % 2;
 };

 const display = (isFlagged, isRevealed, value) => {
  if (gameIsWon || gameIsLost) {
   if (value === '💣' && isFlagged) {
    return '🚩';
   }
   if (value === '💣') {
    return '💣';
   }
   if (isFlagged) {
    return '❌';
   }
  }

  if (isFlagged) {
   return '🚩';
  }

  if (value) {
   return value;
  }

  return null;
 };

 return (
  <div>
   Flags: {flags}
   time: {seconds.current}
   <div className="board">
    {board.map((rowOfSquares, rowNum) => {
     return rowOfSquares.map((square, colNum) => {
      const { isFlagged, isRevealed, value, row, col } = square;
      return (
       <div
        className={`square ${
         gridColorDecider(rowNum, colNum) ? 'patchedEven' : 'patchedOdd'
        }
      ${
       isRevealed
        ? gridColorDecider(rowNum, colNum)
          ? 'revealedEven'
          : 'revealedOdd'
        : ''
      } ${isRevealed && value ? 'value' + value : ''}`}
        key={`${rowNum}_${colNum}`}
        onClick={() => {
         if (isFlagged) {
          return;
         }

         if (firstClick) {
          setFirstClick(false);
          setBoard(generateBoard(8, 10, 10, rowNum, colNum));
          runTimer();
         }

         setBoard((prevstate) => {
          const newState = reveal(prevstate, rowNum, colNum);
          console.log('new state: '+newState)
          return newState;
         });
        }}
       >
        {' '}
        {display(isFlagged, isRevealed, value)}
       </div>
      );
     });
    })}
   </div>
   {/* <div className="board">
    {board.map(
     ({ isMined, isFlagged, isRevealed, placement, adjacentMines }, i) => {
      return (
       <div
        className={`square ${patchedRemainder(i) ? 'patchedEven' : 'patchedOdd'}
        ${
         isRevealed
          ? patchedRemainder(i)
            ? 'revealedEven'
            : 'revealedOdd'
          : ''
        } ${
         isRevealed && adjacentMines ? 'adjacentMines' + adjacentMines : ''
        }`}
        key={placement || i}
        onClick={() => {
         if (isFlagged) {
          return;
         }

         if (firstClick) {
          //   setFirstClick(false);
          console.log(i);
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
        {minedOrFlaged(isMined, isFlagged, isRevealed, adjacentMines)}
       </div>
      );
     }
    )}
   </div> */}
  </div>
 );
}

export default Board;

// setBoard((prevstate) => {
//     const newState = prevstate.map((row) => {
//      return row.map((square) => {
//       if (square.row === rowNum && square.col === colNum) {
//        square.isRevealed = true;
//       }
//       return square;
//      });
//     });
//     return newState;
//    });
