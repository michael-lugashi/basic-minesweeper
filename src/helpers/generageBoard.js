function generateBoard(staringSquare) {
 const notMined = [];
 for (let i = 0; i < 61; i++) {
  notMined.push(new Square(false));
 }
 const mined = [];
 for (let i = 0; i < 10; i++) {
  mined.push(new Square(true));
 }
 const board = notMined.concat(mined);
 board.sort(() => Math.random() - 0.5);

 const surroundingIndexs = [-11, -1, 9, -10, 0, 10, -9, 1, 11];

 for (const indexDif of surroundingIndexs) {
  board.splice(staringSquare + indexDif, 0, new Square(false));
 }

 for (let i = 0; i < board.length; i++) {
  board[i].placement = i;

  if (board[i].isMined) {
   continue;
  }

  let _adjacentMines = 0;
  for (let j = 0; j < 3; j++) {
   const diff = surroundingIndexs[j];
   if (board[i + diff] && board[i + diff].isMined && i % 10 !== 0) {
    _adjacentMines++;
   }
  }
  for (let j = 3; j < 6; j++) {
   const diff = surroundingIndexs[j];
   if (board[i + diff] && board[i + diff].isMined) {
    _adjacentMines++;
   }
  }
  for (let j = 6; j < 10; j++) {
   const diff = surroundingIndexs[j];
   if (board[i + diff] && board[i + diff].isMined && (i + 1) % 10 !== 0) {
    _adjacentMines++;
   }
  }
  board[i].adjacentMines = _adjacentMines;
 }

 return board;
}

class Square {
 constructor(_isMined) {
  this.isRevealed = false;
  this.isFlagged = false;
  this.isMined = _isMined;
 }
}

export default generateBoard;
