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
var row1 = document.getElementsByClassName("row1");
var row2 = document.getElementsByClassName("row2");
var row7 = document.getElementsByClassName("row7");
var row8 = document.getElementsByClassName("row8");


function loadBoard() {
	row1[0].textContent = whiteRook;
	row1[7].textContent = whiteRook;
	row1[1].textContent = whiteKnight;
	row1[6].textContent = whiteKnight;
	row1[2].textContent = whiteBishop;
	row1[5].textContent = whiteBishop;
	row1[3].textContent = whiteQueen;
	row1[4].textContent = whiteKing;
	for(var i=0; i<8; i++) {
		row2[i].textContent = whitePawn;
	}

	row8[0].textContent = blackRook;
	row8[7].textContent = blackRook;
	row8[1].textContent = blackKnight;
	row8[6].textContent = blackKnight;
	row8[2].textContent = blackBishop;
	row8[5].textContent = blackBishop;
	row8[3].textContent = blackQueen;
	row8[4].textContent = blackKing;
	for(var i=0; i<8; i++) {
		row7[i].textContent = blackPawn;
	}
}

document.addEventListener("DOMContentLoaded", function(){
	console.log("DOMContentLoaded");
	loadBoard();
})
