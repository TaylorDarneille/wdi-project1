var whiterook = '\u2656';
var r1c1 = document.getElementsByClassName("row1 col1")[0];


function loadBoard() {
	r1c1.textContent=whiterook;
}

document.addEventListener("DOMContentLoaded", function(){
	console.log("DOMContentLoaded");
	loadBoard();
})
