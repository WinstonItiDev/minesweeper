
document.addEventListener('DOMContentLoaded', startGame)

var board = {
  cells: []
};

var size = 4;

var resetButton;

var sound_applause;
var sound_flag;
var sound_explosion;


function gameBoard() {
	
	
  for(var r = 0; r < size; r++) {
    for (var c = 0; c < size; c++) {
      board.cells.push({
        col: c,
        row: r,
        isMine: Math.random() <= 0.2,
        hidden: true,
      })
    }
  }
}

function startGame() {

 
  sound_explosion = new soundFX("./soundFX/explosion.wav");

  gameBoard();

  resetButton = document.getElementById("buttonID");
  resetButton.classList.add("hideButton");
  
  for (var i = 0; i < board.cells.length; i++) {
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i])
  }
  
  document.addEventListener('click', checkForWin)
  document.addEventListener('contextmenu', checkForWin)

  lib.initBoard()
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?

function checkForWin () {

  sound_flag = new soundFX("./soundFX/flag.wav");
  sound_applause = new soundFX("./soundFX/applause.wav");
  resetButton = document.getElementById("buttonID");

  for (let index =0; index < board.cells.length; index++){
    if (board.cells[index].isMine && !board.cells[index].isMarked){
      sound_flag.play();
      
      return;
    }
    if (board.cells[index].isMarked && !board.cells[index].isMine && board.cells[index].hidden) {
      sound_flag.play();
      return;
    }
    if (!board.cells[index].isMine && board.cells[index].hidden) {
      sound_flag.play();
      return;
    }
  }
  resetButton.classList.remove("hideButton");
  sound_applause.play();
  return lib.displayMessage('You win!')

  }



// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.


function countSurroundingMines(cell) {
  var surroundingCells = lib.getSurroundingCells(cell.row, cell.col)
  var count = 0;

  for (var i = 0; i < surroundingCells.length; i++) {
    if(surroundingCells[i].isMine == true) {
      count = count + 1;
      
    }
  }
  return count;
}

function resetGame() {
	document.getElementsByClassName("board")[0].innerHTML = "";
	board = { cells: [] };
	startGame();
}


function soundFX(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function() {
    this.sound.pause();
  }
}