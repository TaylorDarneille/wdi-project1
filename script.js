var cells = [];
var playerUp = "stencil";
var objAtBat;
var mysteryObj;
var divs = document.getElementsByTagName("div");
var targetRow, targetCol;

// setUpCells():
//		uses for-loop to populate 2d cells array so cell divs
//		can be accessed by cells[row][column]
function setUpCells() {
	for(var i=0; i<8; i++) {
		var row = document.getElementsByClassName("row"+i);
		cells.push(row);
	}
}

// loadBoard():
// 		runs through pieces array and uses each object's
//		currRow/currCol keys to place them in their starting
//		position (writes unicode to the divs and adds pieces[index] class)
function loadBoard() {
	for(var i=0; i<pieces.length; i++) {
		var piece = pieces[i];
		cells[piece.initRow][piece.initCol].textContent = piece.code;
		cells[piece.initRow][piece.initCol].classList.replace("empty", "pieces["+i+"]");
		cells[piece.initRow][piece.initCol].classList.add(piece.team);
	}
}

function clearBoard() {
	for(var i=0; i<cells.length; i++) {
		for(var j=0; j<cells[i].length; j++) {
			if(cells[i][j].classList[0] !== "empty") {
				if(playerUp === "sillhouette") {
					changePlayerUp();
				}
				var misplacedPiece = getPieceObject(cells[i][j]);
				misplacedPiece.currRow = misplacedPiece.initRow;
				misplacedPiece.currCol = misplacedPiece.initCol;
				var firstClass = cells[i][j].classList[0];
				cells[i][j].classList.replace(firstClass, "empty");
				cells[i][j].textContent = "";
			}
		}
	}
}

//resetGame()
//	calls helper functions to reset the cells and current
//	positions of the pieces
var resetGame = function() {
	clearOptions();
	clearCheckClasses();
	clearBoard();
	loadBoard();
	for(var i=0; i<cells.length; i++) {
		for(var j=0; j<cells[i].length; j++) {
			cells[i][j].addEventListener("click", function(event) {
				setCellListeners(this);
			})
		}
	}
	document.getElementById("sillhouette-win").style.display = "none";
	document.getElementById("stencil-win").style.display = "none";
	document.getElementById("sillhouette-check").style.display = "none";
	document.getElementById("stencil-check").style.display = "none";
	document.getElementById("quote").style.display = "inline";
	if(playerUp === "sillhouette") {
		changePlayerUp();
	}

}

//setCellListeners(cell):
//	This is the root of the game, determining which functions
//	run based one whose turn it is and whether or not the
// 	player up has already begun their turn. showMoves() and
//	movePiece() functions can be found in the gameplay.js file
function setCellListeners(cell){
	clearCheckClasses();
	if(cell.classList[0] !== "empty" && 
		cell.classList[0] !== "option" && 
		!cell.classList.contains("captureOption") &&
		!objAtBat) {
		if (playerUp == getPieceObject(cell).team) {
			objAtBat = getPieceObject(cell);
			showMoves(objAtBat);
		}
	}
	else if (cell.classList[0] === "option" || 
		cell.classList.contains("captureOption") ||
		cell.classList.contains("endangered-king")) {
		targetRow = parseInt(cell.classList[1][3]);
		targetCol = parseInt(cell.classList[2][3]);
		movePiece(targetRow, targetCol);
	}
}

//removeCellListeners()
//	Theoretically this removes the event listeners when someone wins
// 	but it doesn't actually work and I don't know why.
function removeCellListeners() {
	console.log("removing cell listeners");
	for(var i=0; i<cells.length; i++) {
		for(var j=0; j<cells[i].length; j++) {
			console.log("removing cell listener from "+cells[i][j]);
			cells[i][j].removeEventListener("click", function(event) {
				setCellListeners(this);
			})
		}
	}
}

//cell is where the game happens. First setUpCells() and loadBoard()
// along with an event listener for the reset button set the stage for play.
//	Then nested for-loops iteralte through the cells array, adding an
//	event listener to each cell. 
document.addEventListener("DOMContentLoaded", function(){
	setUpCells();
	loadBoard();
	document.getElementsByTagName("button")[0].addEventListener("click", resetGame);
	for(var i=0; i<cells.length; i++) {
		for(var j=0; j<cells[i].length; j++) {
			cells[i][j].addEventListener("click", function(event) {
				setCellListeners(this);
			})
		}
	}
});