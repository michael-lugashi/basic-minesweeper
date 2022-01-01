import React, { useEffect, useState } from 'react';
import generateBoard from '../helpers/generateBoard';
import reveal from '../helpers/reveal';

function Board(props) {
 const initialBoard = Array(8).fill(Array(10).fill({}));
 const [board, setBoard] = useState(initialBoard);
 const [gameIsWon, setGameIsWon] = useState(false);
 const [gameIsLost, setGameisLost] = useState(false);
 const [firstClick, setFirstClick] = useState(true);
 const [flags, setFlags] = useState(10);
 const [seconds, setSeconds] = useState(0);
 const [isTimerOn, setIsTimerOn] = useState(false);
 useEffect(() => {
  const flattendBoard = board.flat();
  let numOfRevealed = 0;
  for (const square of flattendBoard) {
   if (square.isRevealed && square.value === '💣') {
    setGameisLost(true);
    return;
   }
   if (square.isRevealed) {
    numOfRevealed++;
   }
   if (numOfRevealed === 70) {
    setGameIsWon(true);
   }
  }
 }, [board]);

 useEffect(() => {
  let secondIntervalId = null;
  if (isTimerOn) {
   secondIntervalId = setInterval(() => {
    setSeconds((lastSecond) => lastSecond + 1);
   }, 1000);
  } else {
   clearInterval(secondIntervalId);
  }
  return () => clearInterval(secondIntervalId);
 }, [isTimerOn]);

 useEffect(() => {
  if (seconds === 999) {
   setIsTimerOn(false);
  }
 }, [seconds]);

 useEffect(() => {
  if (gameIsWon) {
   setIsTimerOn(false);
   alert(`Congrats you won in ${seconds} seconds!`);
  }
 }, [gameIsWon]);

 useEffect(() => {
  if (gameIsLost) {
   setIsTimerOn(false);
   alert('Sorry you lost!');
  }
 }, [gameIsLost]);

 const gridColorDecider = (rowNum, colNum) => {
  const sum = rowNum + colNum;
  return sum % 2;
 };

 const display = (isFlagged, isRevealed, value) => {
  if (gameIsLost) {
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

  if (isRevealed && value) {
   return value;
  }

  return null;
 };

 return (
  <div>
   Flags: {flags}
   time: {seconds}
   <button
    onClick={() => {
     setIsTimerOn(false);
     setGameIsWon(false);
     setGameisLost(false);
     setSeconds(0);
     setFirstClick(true);
     setFlags(10)
     setBoard(initialBoard);
    }}
   >
    Redo🔄
   </button>
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
         if (isFlagged || gameIsLost || gameIsWon) {
          return;
         }

         if (firstClick) {
          setFirstClick(false);
          setBoard(generateBoard(8, 10, 10, rowNum, colNum));
          setIsTimerOn(true);
         }

         setBoard((prevstate) => {
          const newState = reveal(prevstate, rowNum, colNum);
          return newState;
         });
        }}
        onContextMenu={(e) => {
         e.preventDefault();
         if (firstClick || isRevealed || gameIsLost || gameIsWon) {
          return;
         }
         setFlags((prevstate) => {
          if (!isFlagged) {
           return prevstate - 1;
          }
          return prevstate + 1;
         });
         setBoard((prevstate) => {
          const newState = [...prevstate];
          newState[rowNum][colNum].isFlagged = !isFlagged;

          return newState;
         });
        }}
       >
        {display(isFlagged, isRevealed, value)}
       </div>
      );
     });
    })}
   </div>
  </div>
 );
}

export default Board;

