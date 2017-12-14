var cells = [];
var playerUp = "stencil";
var objAtBat;
var mysteryObj;
// var targetRow;
// var targetCol;

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
	}
}

function getPieceObject(clickedCell) {
	console.log("clickedCell: "+clickedCell.classList[1]);
	var objStr = clickedCell.classList[0];
	//console.log("objStr: " + objStr);
	if(objStr.length === 9) {
		var objIndex = objStr.charAt(7);
	}
	else {
		var objIndex = objStr.charAt(7)+objStr.charAt(8);
	}
	//console.log("objIndex: " + objIndex);
	return pieces[objIndex];
}

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
		case "pawn":
			displayPawnMoves(piece);
			break;
		default:
			console.log("defaulting");
	}
}

function movePiece(targetRow, targetCol) {
	clearOptions();
	console.log("moving the "+objAtBat.team, objAtBat.piece+" from ["+objAtBat.currRow+"]["+objAtBat.currCol+"] to ["+targetRow+"]["+targetCol+"]");
	cells[objAtBat.currRow][objAtBat.currCol].textContent = ""; //remove unicode from starting cell
	cells[targetRow][targetCol].textContent = objAtBat.code; //add unicode to target cell
	cells[objAtBat.currRow][objAtBat.currCol].classList.replace("pieces["+pieces.indexOf(objAtBat)+"]", "empty"); // replace the piece[i] class with the empty class
	if (cells[targetRow][targetCol].classList.contains("empty")){
		cells[targetRow][targetCol].classList.replace("empty", "pieces["+pieces.indexOf(objAtBat)+"]"); // add the piece[i] class to the target cell
	}
	else {
		var enemy = getPieceObject(cells[targetRow][targetCol]);
		var capturedClass = cells[targetRow][targetCol].classList[0];
		console.log("capturedClass:"+capturedClass);
		cells[targetRow][targetCol].classList.replace(capturedClass, "pieces["+pieces.indexOf(objAtBat)+"]");
		enemy.currRow = -1;
		enemy.currCol = -1;
		console.log(enemy);
	}
	//var debughelper2 = typeof targetRow;
	//console.log("inside the movePiece function, targetRow is stored as: "+debughelper2);
	objAtBat.currRow = targetRow; //update the current position
	objAtBat.currCol = targetCol;
	console.log("this piece's new currRow:"+ objAtBat.currRow);
	console.log("this piece's new currCol:"+ objAtBat.currCol);
	if(playerUp === "stencil") {
		playerUp = "sillouhette";
	}
	else {
		playerUp = "stencil";
	}
}

function clearOptions() {
	var divs = document.getElementsByTagName("div");
	for(var i=0; i<divs.length; i++) {
		divs[i].classList.replace("option", "empty");
		divs[i].classList.remove("captureOption")
	}
}

function checkCaptures(i,j) {
	if(i>=0 && i<8 && j>=0 && j<8 && !cells[i][j].classList.contains("empty")) {
		mysteryObj = getPieceObject(cells[i][j]);
		if(mysteryObj.team !== objAtBat.team) {
			cells[i][j].classList.add("captureOption");
		}
	}
}


document.addEventListener("DOMContentLoaded", function(){
	setUpCells();
	loadBoard();
	for(var i=0; i<cells.length; i++) {
		for(var j=0; j<cells[i].length; j++) {
			cells[i][j].addEventListener("click", function(event) {
				console.log("playerUp:"+playerUp);
				console.log(this);
				if(this.classList[0] !== "empty" && this.classList[0] !== "option" && !this.classList.contains("captureOption")) {
					//console.log("entering first if statement");
					if (playerUp !== getPieceObject(this).team) {
						console.log("you can only play your own pieces");
					}
					else { 
						objAtBat = getPieceObject(this);
						showMoves(objAtBat);
						console.log("debugg: "+objAtBat.team, objAtBat.piece);
					}
				}
				else if (this.classList[0] === "option" || this.classList.contains("captureOption")) {
					// var targetRow = this.classList[1][3];
					// var targetCol = this.classList[2][3];
					var targetRow = parseInt(this.classList[1][3]);
					var targetCol = parseInt(this.classList[2][3]);
					//console.log("targetRow: "+ targetRow);
					movePiece(targetRow, targetCol);
				}
				else {
					console.log("empty");
				}
			}
			)
		}
	}
});