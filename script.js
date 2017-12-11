var whiteRook = "\u2656";
var whiteKnight = "\u2658";
var whiteBishop = "\u2657";
var whiteQueen = "\u2655";
var whiteKing = "\u2654";
var whitePawn = "\u2659";
var blackRook = "\u265C";
var blackKnight = "\u265E";
var blackBishop = "\u265D";
var blackQueen = "\u265B";
var blackKing = "\u265A";
var blackPawn = "\u265F";
var cells = [];
var playerUp = "white";
var selectedCell;

function setUpCells() {
	for(var i=0; i<8; i++) {
		var row = document.getElementsByClassName("row"+i);
		cells.push(row);
	}
}


function loadBoard() {
	cells[0][0].textContent = whiteRook;
	cells[0][7].textContent = whiteRook;
	cells[0][1].textContent = whiteKnight;
	cells[0][6].textContent = whiteKnight;
	cells[0][2].textContent = whiteBishop;
	cells[0][5].textContent = whiteBishop;
	cells[0][3].textContent = whiteQueen;
	cells[0][4].textContent = whiteKing;
	for(var i=0; i<8; i++) {
		cells[1][i].textContent = whitePawn;
		cells[1][i].classList.add("white");
		cells[0][i].classList.add("white");
	}

	cells[7][0].textContent = blackRook;
	cells[7][7].textContent = blackRook;
	cells[7][1].textContent = blackKnight;
	cells[7][6].textContent = blackKnight;
	cells[7][2].textContent = blackBishop;
	cells[7][5].textContent = blackBishop;
	cells[7][3].textContent = blackQueen;
	cells[7][4].textContent = blackKing;
	for(var i=0; i<8; i++) {
		cells[6][i].textContent = blackPawn;
		cells[6][i].classList.add("black");
		cells[7][i].classList.add("black");
	}
}

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


	});