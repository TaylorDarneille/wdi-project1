var cells = [];
var playerUp = "stencil";
var objAtBat;
var mysteryObj;
var targetRow;
var targetCol;

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

function movePiece(piece, row, col) {
	console.log("moving the "+objAtBat.team, objAtBat.piece+" from ["+objAtBat.currRow+"]["+objAtBat.currCol+"] to ["+targetRow+"]["+targetCol+"]");
}

function displayRookMoves(rookObj) {
	//console.log(rookObj);
	var i = rookObj.currRow;
	var j = rookObj.currCol;
	//down direction
	i++;
	while(i>=0 && i<8 && j>=0 && j<8 && cells[i][j].classList.contains("empty")) {
		cells[i][j].classList.replace("dark", "option");
		cells[i][j].classList.replace("light", "option");
		i++;
		//set event listener to these empty squares so if the user clicks on
		//one, the piece moves there
		cells[i][j].addEventListener("click", function(event){
			targetRow = i;
			targetCol = j;
			movePiece(objAtBat, targetRow, targetCol);
		});
	}
	checkRookCaptures(i, j);
	//right direction
	i = rookObj.currRow;
	j++;
	while(i>=0 && i<8 && j>=0 && j<8 && cells[i][j].classList.contains("empty")) {
		cells[i][j].classList.replace("dark", "option");
		cells[i][j].classList.replace("light", "option");
		j++;
		//set event listener to these empty squares so if the user clicks on
		//one, the piece moves there
	}
	checkRookCaptures(i, j);
	//up direction
	i--;
	j = rookObj.currCol;
	while(i>=0 && i<8 && j>=0 && j<8 && cells[i][j].classList.contains("empty")) {
		cells[i][j].classList.replace("dark", "option");
		cells[i][j].classList.replace("light", "option");
		i--;
		//set event listener to these empty squares so if the user clicks on
		//one, the piece moves there
	}
	checkRookCaptures(i, j);
	//left direction
	i = rookObj.currRow;
	j--;
	while(i>=0 && i<8 && j>=0 && j<8 && cells[i][j].classList.contains("empty")) {
		cells[i][j].classList.replace("dark", "option");
		cells[i][j].classList.replace("light", "option");
		j--;
		//set event listener to these empty squares so if the user clicks on
		//one, the piece moves there
	}
	checkRookCaptures(i, j);
}

function checkRookCaptures(i,j) {
	if(i>=0 && i<8 && j>=0 && j<8 && !cells[i][j].classList.contains("empty")) {
		mysteryObj = getPieceObject(cells[i][j]);
		if(mysteryObj.team !== objAtBat.team) {
			cells[i][j].classList.replace("dark", "captureOption");
			cells[i][j].classList.replace("light", "captureOption");
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
			console.log()
			cells[i][j].addEventListener("click", function(event) {
				if(this.classList[0] !== "empty") {
					objAtBat = getPieceObject(this);
					console.log(objAtBat);
					displayRookMoves(objAtBat);
				}
				else {
					console.log("empty");
				}
			}
			)
		}
	}
});






