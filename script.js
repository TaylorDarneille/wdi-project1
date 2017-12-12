
// var stencilRook = "\u2656";
// var stencilKnight = "\u2658";
// var stencilBishop = "\u2657";
// var stencilQueen = "\u2655";
// var stencilKing = "\u2654";
// var stencilPawn = "\u2659";
// var sillouhetteRook = "\u265C";
// var sillouhetteKnight = "\u265E";
// var sillouhetteBishop = "\u265D";
// var sillouhetteQueen = "\u265B";
// var sillouhetteKing = "\u265A";
// var sillouhettePawn = "\u265F";
var cells = [];
var playerUp = "stencil";
var selectedCell;
var distance;

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
		cells[piece.currRow][piece.currCol].classList += " pieces["+i+"]";
	}
}

// 	cells[0][0].textContent = stencilRook;
// 	cells[0][0].classList.add("rook");
// 	cells[0][7].textContent = stencilRook;
// 	cells[0][7].classList.add("rook");
// 	cells[0][1].textContent = stencilKnight;
// 	cells[0][1].classList.add("knight");
// 	cells[0][6].textContent = stencilKnight;
// 	cells[0][6].classList.add("knight");
// 	cells[0][2].textContent = stencilBishop;
// 	cells[0][2].classList.add("bishop");
// 	cells[0][5].textContent = stencilBishop;
// 	cells[0][5].classList.add("bishop");
// 	cells[0][3].textContent = stencilQueen;
// 	cells[0][3].classList.add("queen");
// 	cells[0][4].textContent = stencilKing;
// 	cells[0][4].classList.add("king");
// 	for(var i=0; i<8; i++) {
// 		cells[1][i].textContent = stencilPawn;
// 		cells[1][i].classList.add("pawn", "stencil");
// 		cells[0][i].classList.add("stencil");
// 	}
// 	cells[7][0].textContent = sillouhetteRook;
// 	cells[7][0].classList.add("rook");
// 	cells[7][7].textContent = sillouhetteRook;
// 	cells[7][7].classList.add("rook");
// 	cells[7][1].textContent = sillouhetteKnight;
// 	cells[7][1].classList.add("knight");
// 	cells[7][6].textContent = sillouhetteKnight;
// 	cells[7][6].classList.add("knight");
// 	cells[7][2].textContent = sillouhetteBishop;
// 	cells[7][2].classList.add("bishop");
// 	cells[7][5].textContent = sillouhetteBishop;
// 	cells[7][5].classList.add("bishop");
// 	cells[7][3].textContent = sillouhetteQueen;
// 	cells[7][3].classList.add("queen");
// 	cells[7][4].textContent = sillouhetteKing;
// 	cells[7][4].classList.add("king");
// 	for(var i=0; i<8; i++) {
// 		cells[6][i].textContent = sillouhettePawn;
// 		cells[6][i].classList.add("pawn", "sillouhette");
// 		cells[7][i].classList.add("sillouhette");
// 	}
// }

function movePiece(piece, row, col) {
	console.log("moving the piece");

}

function showOptions(piece) {
	console.log("showing options");
	var optionsArr = [];
	switch(piece){
		case rook:
			displayRookOptions();
			break;
		case knight:
			displayKnightOptions();
			break;
		case bishop:
			displayBishopOptions();
			break;
		case queen:
			displayQueenOptions();
		case king:
			displayKingOptions();
		case pawn:
			displayPawnOptions();
		default: 
			console.log("defaulting");
	}
}

function displayPawnOptions() {
	console.log("displaying pawn options");
}


document.addEventListener("DOMContentLoaded", function(){
	setUpCells();
	loadBoard();
	// 
});
//for(var i=0; i<cells.length; i++) {
	// 	for(var j=0; j<cells[i].length; j++) {
	// 		console.log()
	// 		cells[i][j].addEventListener("click", function(event) {
	// 			console.log(this.classList);
	// 		})
	// 	}
	// }






