document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {

	cells: [
		{row: 0, col:0, isMine: false, hidden: true},
		{row: 0, col:1, isMine: true, hidden: true},
		{row: 0, col:2, isMine: false, hidden: true},
		{row: 1, col:0, isMine: true, hidden: true},
		{row: 1, col:1, isMine: false, hidden: true},
		{row: 1, col:2, isMine: false, hidden: true},
		{row: 2, col:0, isMine: true, hidden: true},
		{row: 2, col:1, isMine: false, hidden: true},
		{row: 2, col:2, isMine: false, hidden: true},
	]

};

//testing different was of 'getting' properties from the board object
console.log(board.cells[0])

//using the string for 'getting' the cells
console.log(board['cells'][1])

//getting the 6th cell and 'getting' its row
console.log(board.cells[6].row)
//should output 2 

console.log(board['cells'][3].col)
//should output 0

//alternate way of writing an object with properties

/*var board = {
  cells: [
    {
      row: 0,
      col: 0
      // ...
    },
    {
      row: 0,
      col: 1
      // ...
    }
  ]
}*/



console.log(board.cells)

function startGame () {

  for (var i = 0; i < board.cells.length; i++) {
  	//adding a new property inside cells array
  	board.cells[i].surroundingMines = countSurroundingMines(board.cells[i])
  }

  console.log(board.cells)
  // Don't remove this function call: it makes the game work!
  lib.initBoard()
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {

  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  //   lib.displayMessage('You win!')
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {
	var surrounding = lib.getSurroundingCells(cell.row, cell.col)

	var count = 0;

	for(var i = 0; i < surrounding.length; i++) {
		if(surrounding[i].isMine === true) {
			count++
		}
	};

	return count;
}

