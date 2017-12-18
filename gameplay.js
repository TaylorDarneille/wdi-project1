//This file contains the main functions called during each player's turn.


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
// 		Called when playerUp clicks the piece they want to move
//		highlights all possible moves in green and all possible
//		captures in red. display____Moves() functions can be found
//		in the moves.js file
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
	cells[targetRow][targetCol].classList.remove("stencil", "sillhouette");
	cells[targetRow][targetCol].classList.add(objAtBat.team);
	objAtBat.currRow = targetRow; //update the current position
	objAtBat.currCol = targetCol;
	checkWinSwitchPlayers();
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

//cheWinSwitchPlayers:
// executes AFTER each move by either player
// displays in message board if either player is in check
// reassigns playerUp
function checkWinSwitchPlayers() {
	var stencilInCheck = screenForCheck("sillhouette");
	var sillhouetteInCheck = screenForCheck("stencil");
	if (pieces[14].currRow===-1){
		document.getElementById("quote").style.display = "none";
		document.getElementById("sillhouette-check").style.display = "none";
		document.getElementById("stencil-check").style.display = "none";
		document.getElementById("sillhouette-win").style.display = "inline";
		removeCellListeners();
	}
	else if (pieces[15].currRow===-1) {
		document.getElementById("quote").style.display = "none";
		document.getElementById("sillhouette-check").style.display = "none";
		document.getElementById("stencil-check").style.display = "none";
		document.getElementById("stencil-win").style.display = "inline";
		removeCellListeners();
	}
	else if(stencilInCheck && !sillhouetteInCheck) {
		document.getElementById("quote").style.display = "none";
		document.getElementById("stencil-check").style.display = "inline";
		changePlayerUp();
	}
	else if (sillhouetteInCheck && !stencilInCheck) {
		document.getElementById("quote").style.display = "none";
		document.getElementById("sillhouette-check").style.display = "inline";
		changePlayerUp();
	}
	else {
		document.getElementById("sillhouette-check").style.display = "none";
		document.getElementById("stencil-check").style.display = "none";
		document.getElementById("quote").style.display = "inline";
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
		playerUp = "sillhouette";
	}
	else {
		document.getElementById("player-up").textContent = "\u2654";
		playerUp = "stencil";
	}
}