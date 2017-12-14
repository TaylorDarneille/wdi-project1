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
	var objStr = clickedCell.classList[0];
	//console.log("objStr: " + objStr);
	var objIndex = objStr.charAt(7);
	//console.log("objIndex: " + objIndex);
	return pieces[objIndex];
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
		cells[targetRow][targetCol].classList.replace("pieces["+pieces.indexOf("enemy")+"]", "pieces["+pieces.indexOf(objAtBat)+"]");
		enemy.currRow = -1;
		enemy.currCol = -1;
		console.log(enemy);
	}
	objAtBat.currRow = targetRow; //update the current position
	objAtBat.currCol = targetCol;
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

// function displayLinearMoves(piece) {
// 	var i = piece.currRow;
// 	var j = piece.currCol;
// 	console.log("i: "+i+" j: "+j);
// 	//down direction
// 	i++;
// 	while(i>=0 && i<8 && j>=0 && j<8 && cells[i][j].classList.contains("empty")) {
// 		cells[i][j].classList.replace("empty", "option");
// 		i++;
// 	}
// 	checkCaptures(i, j);
// 	//right direction
// 	i = piece.currRow;
// 	j++;
// 	while(i>=0 && i<8 && j>=0 && j<8 && cells[i][j].classList.contains("empty")) {
// 		cells[i][j].classList.replace("empty", "option");
// 		j++;
// 	}
// 	checkCaptures(i, j);
// 	//up direction
// 	i--;
// 	j = piece.currCol;
// 	while(i>=0 && i<8 && j>=0 && j<8 && cells[i][j].classList.contains("empty")) {
// 		cells[i][j].classList.replace("empty", "option");
// 		i--;
// 	}
// 	checkCaptures(i, j);
// 	//left direction
// 	i = piece.currRow;
// 	j--;
// 	while(i>=0 && i<8 && j>=0 && j<8 && cells[i][j].classList.contains("empty")) {
// 		cells[i][j].classList.replace("empty", "option");
// 		j--;
// 	}
// 	checkCaptures(i, j);
// }

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
				if(this.classList[0] !== "empty" && this.classList[0] !== "option" && !this.classList.contains("captureOption")) {
					if (playerUp !== getPieceObject(this).team) {
						//console.log("you can only play your own pieces");
					}
					else { 
						objAtBat = getPieceObject(this);
						//console.log("team:"+objAtBat.team);
						displayKnightMoves(objAtBat);
					}
				}
				else if (this.classList[0] === "option" || this.classList.contains("captureOption")) {
					var targetRow = this.classList[1][3];
					var targetCol = this.classList[2][3];
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