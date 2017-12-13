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
	console.log("objStr: " + objStr);
	var objIndex = objStr.charAt(7);
	console.log("objIndex: " + objIndex);
	return pieces[objIndex];
}

function movePiece(piece, targetRow, targetCol) {
	console.log("moving the "+objAtBat.team, objAtBat.piece+" from ["+objAtBat.currRow+"]["+objAtBat.currCol+"] to ["+targetRow+"]["+targetCol+"]");
	clearOptions();
}

function clearOptions() {
	// var optionsArr = document.getElementsByClassName("option");
	var divs = document.getElementsByTagName("div");
	// var captureOptionsArr = document.getElementsByClassName("captureOption");
	// console.log(captureOptionsArr);
	for(var i=0; i<divs.length; i++) {
		divs[i].classList.replace("option", "empty");
		divs[i].classList.remove("captureOption")
	}
	// for (var i=0; i<captureOptionsArr.length; i++) {
	// 	captureOptionsArr[i].classList.remove("captureOption");
	// }
}

function displayRookMoves(rookObj) {
	//console.log(rookObj);
	var i = rookObj.currRow;
	var j = rookObj.currCol;
	console.log("i: "+i+" j: "+j);
	//down direction
	i++;
	while(i>=0 && i<8 && j>=0 && j<8 && cells[i][j].classList.contains("empty")) {
		cells[i][j].classList.replace("empty", "option");
		i++;
	}
	checkRookCaptures(i, j);
	//right direction
	i = rookObj.currRow;
	j++;
	while(i>=0 && i<8 && j>=0 && j<8 && cells[i][j].classList.contains("empty")) {
		cells[i][j].classList.replace("empty", "option");
		j++;
	}
	checkRookCaptures(i, j);
	//up direction
	i--;
	j = rookObj.currCol;
	while(i>=0 && i<8 && j>=0 && j<8 && cells[i][j].classList.contains("empty")) {
		cells[i][j].classList.replace("empty", "option");
		i--;
	}
	checkRookCaptures(i, j);
	//left direction
	i = rookObj.currRow;
	j--;
	while(i>=0 && i<8 && j>=0 && j<8 && cells[i][j].classList.contains("empty")) {
		cells[i][j].classList.replace("empty", "option");
		j--;
	}
	checkRookCaptures(i, j);
}

function checkRookCaptures(i,j) {
	if(i>=0 && i<8 && j>=0 && j<8 && !cells[i][j].classList.contains("empty")) {
		console.log("checkingRookCaptures");
		mysteryObj = getPieceObject(cells[i][j]);
		if(mysteryObj.team !== objAtBat.team) {
			cells[i][j].classList.add("captureOption");
			//set event listener to capture the opponents piece if the user
			//clicks here
		}
	}
}



// function showOptions(piece) {
// 	console.log("showing options");
// 	var optionsArr = [];
// 	switch(piece){
// 		case rook:
// 			displayRookOptions();
// 			break;
// 		case knight:
// 			displayKnightOptions();
// 			break;
// 		case bishop:
// 			displayBishopOptions();
// 			break;
// 		case queen:
// 			displayQueenOptions();
// 		case king:
// 			displayKingOptions();
// 		case pawn:
// 			displayPawnOptions();
// 		default: 
// 			console.log("defaulting");
// 	}
// }


document.addEventListener("DOMContentLoaded", function(){
	setUpCells();
	loadBoard();
	for(var i=0; i<cells.length; i++) {
		for(var j=0; j<cells[i].length; j++) {
			cells[i][j].addEventListener("click", function(event) {
				if(this.classList[0] !== "empty" && this.classList[0] !== "option") {
					objAtBat = getPieceObject(this);
					console.log(objAtBat);
					displayRookMoves(objAtBat);
				}
				else if (this.classList[0] === "option") {
					console.log(this);
					var targetRow = this.classList[1][3];
					var targetCol = this.classList[2][3];
					console.log("targetRow: "+targetRow);
					console.log("targetCol: "+targetCol);
					movePiece(objAtBat, targetRow, targetCol);
				}
				else {
					console.log("empty");
				}
			}
			)
		}
	}
});






