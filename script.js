var cells = [];
var playerUp = "stencil";
var objAtBat;
var mysteryObj;
var divs = document.getElementsByTagName("div");

function setUpCells() {
	for(var i=0; i<8; i++) {
		var row = document.getElementsByClassName("row"+i);
		cells.push(row);
	}
}

function loadBoard() {
	for(var i=0; i<pieces.length; i++) {
		var piece = pieces[i];
		cells[piece.currRow][piece.currCol].textContent = piece.code;
		cells[piece.currRow][piece.currCol].classList.replace("empty", "pieces["+i+"]");
		cells[piece.currRow][piece.currCol].classList.add(piece.team);
	}
}

function changePlayerUp() {
	if(playerUp==="stencil") {
		document.getElementById("player-up").textContent = "SILLOUHETTE";
		playerUp = "sillouhette";
	}
	else {
		document.getElementById("player-up").textContent = "STENCIL";
		playerUp = "stencil";
	}
}

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

function showMoves(piece) {
	switch (piece.piece) {
		case "rook":
			// console.log("displaying rook moves");
			displayLinearMoves(piece);
			break;
		case "knight":
			// console.log("displaying knight moves");
			displayKnightMoves(piece);
			break;
		case "bishop":
			// console.log("displaying bishop moves");
			displayDiagonalMoves(piece);
			break;
		case "queen":
			// console.log("displaying queen moves");
			displayLinearMoves(piece);
			displayDiagonalMoves(piece);
			break;
		case "king":
			// console.log("displaying king moves");
			displayKingMoves(piece);
			break;
		case "pawn":
			// console.log("displaying pawn moves");
			displayPawnMoves(piece);
			break;
		default:
			console.log("defaulting");
	}
}

function screenforCheck(opposingTeam) { 
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

function screenForCheckMate(team) {
	return false;
}

function reverseMove() {
	console.log("reversing move");
}

function displayWinScreen(team) {
	console.log(team+" won the game!");
}

function movePiece(targetRow, targetCol) {
	clearOptions();
	cells[objAtBat.currRow][objAtBat.currCol].textContent = ""; //remove unicode from starting cell
	cells[targetRow][targetCol].textContent = objAtBat.code; //add unicode to target cell
	cells[objAtBat.currRow][objAtBat.currCol].classList.replace("pieces["+pieces.indexOf(objAtBat)+"]", "empty"); // replace the piece[i] class with the empty class
	if (cells[targetRow][targetCol].classList.contains("empty")){
		cells[targetRow][targetCol].classList.replace("empty", "pieces["+pieces.indexOf(objAtBat)+"]"); // add the piece[i] class to the target cell
	// 	cells[targetRow][targetCol].classList.remove("stencil", "sillouhette");
	// 	cells[targetRow][targetCol].classList.add(objAtBat.team);
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
	var stencilInCheck = screenforCheck("sillouhette");
	var stencilInCheckMate = screenForCheckMate("stencil");
	var sillouhetteInCheck = screenforCheck("stencil");
	var sillouhetteInCheckMate = screenForCheckMate("sillouhette");
	if(playerUp === "stencil") {
		if(stencilInCheck) {
			console.log("playerup: "+playerUp+" and stencil is in check");
			reverseMove();
		}
		else if (sillouhetteInCheck && sillouhetteInCheckMate) {
			displayWinScreen("stencil");
		}
		else if (sillouhetteInCheck) {
			console.log("sillouhette is in check!");
			changePlayerUp();

		}
		else {
			changePlayerUp();
		}
	}
	else {
		if(sillouhetteInCheck) {
			console.log("playerup: "+playerUp+" and sillouhette is in check");
			reverseMove();
		}
		else if (stencilInCheck && stencilInCheckMate) {
			displayWinScreen("sillouhette");
		}
		else if (stencilInCheck) {
			console.log("stencil is in check!");
			changePlayerUp();
		}
		else {
			changePlayerUp();
		}
	}
}

function clearOptions() {
	for(var i=0; i<divs.length; i++) {
		divs[i].classList.replace("option", "empty");
		divs[i].classList.remove("captureOption");
	}
}

function clearCheckClasses() {
	for(div of divs) {
		div.classList.remove("kingCaptureOption", "destruction-path", "endangered-king");
	}
}

document.addEventListener("DOMContentLoaded", function(){
	setUpCells();
	loadBoard();
	for(var i=0; i<cells.length; i++) {
		for(var j=0; j<cells[i].length; j++) {
			cells[i][j].addEventListener("click", function(event) {
				clearCheckClasses();
				if(this.classList[0] !== "empty" && this.classList[0] !== "option" && !this.classList.contains("captureOption")) {
					if (playerUp !== getPieceObject(this).team) {
						console.log("you can only play your own pieces");
					}
					else {
						objAtBat = getPieceObject(this);
						showMoves(objAtBat);
					}
				}
				else if (this.classList[0] === "option" || this.classList.contains("captureOption")) {
					var targetRow = parseInt(this.classList[1][3]);
					var targetCol = parseInt(this.classList[2][3]);
					movePiece(targetRow, targetCol);
				}
				else {
					console.log("empty");
				}
			})
		}
	}
});