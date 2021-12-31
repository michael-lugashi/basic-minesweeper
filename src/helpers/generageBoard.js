// function generateBoard(startingSquare) {
//  const notMined = [];
//  for (let i = 0; i < 0; i++) {
//   notMined.push(new Square(false));
//  }
//  const mined = [];
//  for (let i = 0; i < 71; i++) {
//   mined.push(new Square(true));
//  }
//  const board = notMined.concat(mined);
//  board.sort(() => Math.random() - 0.5);
//  const freeSpaceIndexes = [-11, -10, -9, -1, 0, 1, 9, 10, 11];

//  for (const indexDif of freeSpaceIndexes) {
//   if (startingSquare % 10 === 0 && [-11, -1, 9].includes(indexDif)) {
//    continue;
//   }
//   board.splice(startingSquare + indexDif, 0, new Square(false));
//  }

//  for (let i = 0; i < board.length; i++) {
//   board[i].placement = i;

//   if (board[i].isMined) {
//    continue;
//   }

//   const surroundingIndexs = [-11, -1, 9, -10, 10, -9, 1, 11];
//   let _adjacentMines = 0;
//   for (let j = 0; j < 3; j++) {
//    const diff = surroundingIndexs[j];
//    if (board[i + diff] && board[i + diff].isMined && i % 10 !== 0) {
//     _adjacentMines++;
//    }
//   }
//   console.log(i);
//   console.log(_adjacentMines);
//   for (let j = 3; j < 5; j++) {
//    const diff = surroundingIndexs[j];
//    if (board[i + diff] && board[i + diff].isMined) {
//     _adjacentMines++;
//    }
//   }
//   console.log(i);
//   console.log(_adjacentMines);
//   for (let j = 5; j < 9; j++) {
//    const diff = surroundingIndexs[j];
//    if (board[i + diff] && board[i + diff].isMined && (i + 1) % 10 !== 0) {
//     _adjacentMines++;
//    }
//   }
//   board[i].adjacentMines = _adjacentMines;
//  }

//  return board;
// }

function generateBoard(totalRows, totalCols, mines, startRow, StartCol) {
 //generate empty grid
 const grid = [];
 for (let row = 0; row < totalRows; row++) {
  const subArray = [];
  for (let col = 0; col < totalCols; col++) {
   subArray.push(0);
  }
  grid.push(subArray);
 }

 //randomize mines
 let mineCount = 0;
 while (mineCount < mines) {
  const row = Math.floor(Math.random() * totalRows);
  const col = Math.floor(Math.random() * totalCols);

  // TOP

  // Top Left

  if (row === startRow - 1 && col === StartCol - 1) {
   continue;
  }

  // Top Middle

  if (row === startRow - 1 && col === StartCol) {
   continue;
  }

  // Top Right

  if (row === startRow - 1 && col === StartCol + 1) {
   continue;
  }

  // MIDDLE

  // Middle Left

  if (row === startRow && col === StartCol - 1) {
   continue;
  }

  // Middle Middle -starting square

  if (row === startRow && col === StartCol) {
   continue;
  }

  // Middle Right

  if (row === startRow && col === StartCol + 1) {
   continue;
  }

  // Bottom

  // Bottom Left

  if (row === startRow + 1 && col === StartCol - 1) {
   continue;
  }

  // Bottom Middle

  if (row === startRow + 1 && col === StartCol) {
   continue;
  }

  // Bottom Right

  if (row === startRow + 1 && col === StartCol + 1) {
   continue;
  }

  if (grid[row][col] === 0) {
   grid[row][col] = '💣';
   mineCount++;
  }
 }

 // add adjacent bombs

 for (let row = 0; row < totalRows; row++) {
  for (let col = 0; col < totalCols; col++) {
   if (grid[row][col] === '💣') {
    continue;
   }

   // Top

   // Top Left
   if (row > 0 && col > 0 && grid[row - 1][col - 1] === '💣') {
    grid[row][col]++;
   }

   // Top Middle
   if (row > 0 && grid[row - 1][col] === '💣') {
    grid[row][col]++;
   }

   // Top Right
   if (row > 0 && col < totalCols - 1 && grid[row - 1][col + 1] === '💣') {
    grid[row][col]++;
   }

   // MIDDLE

   // Middle Left
   if (col > 0 && grid[row][col - 1] === '💣') {
    grid[row][col]++;
   }
   // Middle Right
   if (col < totalCols - 1 && grid[row][col + 1] === '💣') {
    grid[row][col]++;
   }

   //BOTTOM

   // Bottom Left
   if (row < totalRows - 1 && col > 0 && grid[row + 1][col - 1] === '💣') {
    grid[row][col]++;
   }

   // Bottom Middle
   if (row < totalRows - 1 && grid[row + 1][col] === '💣') {
    grid[row][col]++;
   }

   // Bottom Right
   if (
    row < totalRows - 1 &&
    col < totalCols - 1 &&
    grid[row + 1][col + 1] === '💣'
   ) {
    grid[row][col]++;
   }
  }
 }

 return fillBoardSquares(grid);
}

function fillBoardSquares(grid) {
 const board = [];
 for (let row = 0; row < grid.length; row++) {
  const rowOfSquares = [];
  for (let col = 0; col < grid[row].length; col++) {
   rowOfSquares.push(new Square(grid[row][col], row, col));
  }
  board.push(rowOfSquares);
 }
 return board;
}

class Square {
 constructor(_value, _row, _col) {
  this.isRevealed = false;
  this.isFlagged = false;
  this.value = _value;
  this.row = _row;
  this.col = _col;
 }
}

// console.log(generateBoard(8, 10, 10, 4, 5));
export default generateBoard;
// && (i + 1) % 10 !== 0
// && i % 10 !== 0
