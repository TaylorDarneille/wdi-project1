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
				if(playerUp === "sillouhette") {
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

// getPieceObject():
//		takes in a cell and returns the object whose
//		current position is in that cell
function getPieceObject(clickedCell) {
	var objStr = clickedCell.classList[0];
	if(objStr.length === 9) {
		var objIndex = objStr.charAt(7);
	}
	else {
		var objIndex = objStr.charAt(7)+objStr.charAt(8);
	}
	return pieces[objIndex];
}

// showMoves():
// 		called when playerUp clicks the piece they want to move
//		highlights all possible moves in green and alll possible
//		captures in red
function showMoves(piece) {
	switch (piece.piece) {
		case "rook":
			displayLinearMoves(piece);
			break;
		case "knight":
			displayKnightMoves(piece);
			break;
		case "bishop":
			displayDiagonalMoves(piece);
			break;
		case "queen":
			displayLinearMoves(piece);
			displayDiagonalMoves(piece);
			break;
		case "king":
			displayKingMoves(piece);
			break;
		case "pawn":
			displayPawnMoves(piece);
			break;
		default:
			console.log("defaulting");
	}
}

// movePiece():
//		handles moves to empty squares as well as captures
//		checkWinSwitchPlayers is called after piece is moved
function movePiece(targetRow, targetCol) {
	clearOptions();
	cells[objAtBat.currRow][objAtBat.currCol].textContent = ""; //remove unicode from starting cell
	cells[targetRow][targetCol].textContent = objAtBat.code; //add unicode to target cell
	cells[objAtBat.currRow][objAtBat.currCol].classList.replace("pieces["+pieces.indexOf(objAtBat)+"]", "empty"); // replace the piece[i] class with the empty class
	if (cells[targetRow][targetCol].classList.contains("empty")){
		cells[targetRow][targetCol].classList.replace("empty", "pieces["+pieces.indexOf(objAtBat)+"]"); // add the piece[i] class to the target cell
	}
	else {
		var enemy = getPieceObject(cells[targetRow][targetCol]);
		var capturedClass = cells[targetRow][targetCol].classList[0];
		cells[targetRow][targetCol].classList.replace(capturedClass, "pieces["+pieces.indexOf(objAtBat)+"]");
		enemy.currRow = -1;
		enemy.currCol = -1;
	}
	cells[targetRow][targetCol].classList.remove("stencil", "sillouhette");
	cells[targetRow][targetCol].classList.add(objAtBat.team);
	objAtBat.currRow = targetRow; //update the current position
	objAtBat.currCol = targetCol;
	checkWinSwitchPlayers();
}

//cheWinSwitchPlayers:
// executes AFTER each move by either player
// displays in message board if either player is in check
// reassigns playerUp

function checkWinSwitchPlayers() {
	var stencilInCheck = screenForCheck("sillouhette");
	var sillouhetteInCheck = screenForCheck("stencil");
	if(stencilInCheck) {
		document.getElementById("quote").style.display = "none";
		document.getElementById("stencil-check").style.display = "inline";
	}
	else if (sillouhetteInCheck) {
		document.getElementById("quote").style.display = "none";
		document.getElementById("sillouhette-check").style.display = "inline";
	}
	else {
		document.getElementById("sillouhette-check").style.display = "none";
		document.getElementById("stencil-check").style.display = "none";
		document.getElementById("quote").style.display = "inline";
	}
	if (pieces[14].currRow===-1){
		document.getElementById("quote").style.display = "none";
		document.getElementById("stencil-win").style.display = "inline";
	}
	else if (pieces[15].currRow===-1) {
		document.getElementById("quote").style.display = "none";
		document.getElementById("sillouhette-win").style.display = "inline";
	}
	else {
		changePlayerUp();
	}
	objAtBat = null;
}

// screenForCheck():
//		runs showMoves() for each active piece on the opposing team
//		checkThreatCells is an array of cells containing pieces that
//		could capture a king on their next move
//		returns true if checkThreatCells is non-empty, false otherwise
function screenForCheck(opposingTeam) { 
	for(var i=0; i<pieces.length; i++) {
		if(pieces[i].team===opposingTeam && pieces[i].currRow !== -1) {
			showMoves(pieces[i]);
		}
		clearOptions();
	}
	var checkThreatCells = document.getElementsByClassName(opposingTeam+" kingCaptureOption");
	if (checkThreatCells.length>0) {
		return true;
	}
	else {
		return false;
	}
}

// changePlayerUp():
//		reassigns playerUp variable, changes display in control board
function changePlayerUp() {
	if(playerUp==="stencil") {
		document.getElementById("player-up").textContent = "\u265A";
		playerUp = "sillouhette";
	}
	else {
		document.getElementById("player-up").textContent = "\u2654";
		playerUp = "stencil";
	}
}

// clearOptions():
//		removes classes from cells that were added by showMoves()
function clearOptions() {
	for(var i=0; i<divs.length; i++) {
		divs[i].classList.replace("option", "empty");
		divs[i].classList.remove("captureOption");
	}
}
//clearCheckClasses()
//		removes classes from cells that were added by showMoves()
//		to indicate check-related cells
function clearCheckClasses() {
	for(div of divs) {
		div.classList.remove("kingCaptureOption", "destruction-path", "endangered-king");
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
}

//This is where the game happens. First setUpCells() and loadBoard()
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
				clearCheckClasses();
				if(this.classList[0] !== "empty" && 
					this.classList[0] !== "option" && 
					!this.classList.contains("captureOption") &&
					!objAtBat) {
					if (playerUp == getPieceObject(this).team) {
						objAtBat = getPieceObject(this);
						showMoves(objAtBat);
					}
				}
				else if (this.classList[0] === "option" || 
					this.classList.contains("captureOption") ||
					this.classList.contains("endangered-king")) {
					targetRow = parseInt(this.classList[1][3]);
					targetCol = parseInt(this.classList[2][3]);
					movePiece(targetRow, targetCol);
				}
			})
		}
	}
});