function generateBoard(freeSpace) {
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
 const freePlaces = [-11, -10, -9, -1, 0, 1, 9, 10, 11];
 for (const num of freePlaces) {
    board.splice(freeSpace + num, 0, new Square(false));
 }


 for (let i = 0; i < board.length; i++) {
  board[i].placement = i;

  if (board[i].mined) {
   continue;
  }
  let adjacentMines = 0;
  if (board[i - 10] && board[i - 10].mined) {
   adjacentMines++;
  }
  if (board[i - 9] && board[i - 9].mined) {
   adjacentMines++;
  }
  if (board[i - 11] && board[i - 11].mined) {
   adjacentMines++;
  }
  if (board[i - 1] && board[i - 1].mined) {
   adjacentMines++;
  }
  if (board[i + 1] && board[i + 1].mined) {
   adjacentMines++;
  }
  if (board[i + 10] && board[i + 10].mined) {
   adjacentMines++;
  }
  if (board[i + 9] && board[i + 9].mined) {
   adjacentMines++;
  }
  if (board[i + 11] && board[i + 11].mined) {
   adjacentMines++;
  }
  board[i].adjacentMines = adjacentMines;
 }
 return board;
}

class Square {
 constructor(mined) {
  this.revealed = false;
  this.flagged = false;
  this.mined = mined;
 }
}

export default generateBoard;
