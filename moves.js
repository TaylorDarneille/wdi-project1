function displayLinearMoves(piece) {
	var i = piece.currRow;
	var j = piece.currCol;
	console.log("i: "+i+" j: "+j);
	//down direction
	i++;
	while(i>=0 && i<8 && j>=0 && j<8 && cells[i][j].classList.contains("empty")) {
		cells[i][j].classList.replace("empty", "option");
		i++;
	}
	checkCaptures(i, j);
	//right direction
	i = piece.currRow;
	j++;
	while(i>=0 && i<8 && j>=0 && j<8 && cells[i][j].classList.contains("empty")) {
		cells[i][j].classList.replace("empty", "option");
		j++;
	}
	checkCaptures(i, j);
	//up direction
	i--;
	j = piece.currCol;
	while(i>=0 && i<8 && j>=0 && j<8 && cells[i][j].classList.contains("empty")) {
		cells[i][j].classList.replace("empty", "option");
		i--;
	}
	checkCaptures(i, j);
	//left direction
	i = piece.currRow;
	j--;
	while(i>=0 && i<8 && j>=0 && j<8 && cells[i][j].classList.contains("empty")) {
		cells[i][j].classList.replace("empty", "option");
		j--;
	}
	checkCaptures(i, j);
}

function displayDiagonalMoves(piece) {
	// down, right direction
	var i = piece.currRow+1;
	var j = piece.currCol+1;
	while(i>=0 && i<8 && j>=0 && j<8 && cells[i][j].classList.contains("empty")) {
		cells[i][j].classList.replace("empty", "option");
		i++;
		j++;
	}
	checkCaptures(i, j);
	// up, right direction
	i = piece.currRow-1;
	j = piece.currCol+1;
	while(i>=0 && i<8 && j>=0 && j<8 && cells[i][j].classList.contains("empty")) {
		cells[i][j].classList.replace("empty", "option");
		i--;
		j++;
	}
	checkCaptures(i, j);
	// up, left direction
	i = piece.currRow-1;
	j = piece.currCol-1;
	while(i>=0 && i<8 && j>=0 && j<8 && cells[i][j].classList.contains("empty")) {
		cells[i][j].classList.replace("empty", "option");
		i--;
		j--;
	}
	checkCaptures(i, j);
	// down, left direction
	i = piece.currRow+1;
	j = piece.currCol-1;
	while(i>=0 && i<8 && j>=0 && j<8 && cells[i][j].classList.contains("empty")) {
		cells[i][j].classList.replace("empty", "option");
		i++;
		j--;
	}
	checkCaptures(i, j);
}

function displayPawnMoves(piece) {
	var i = piece.currRow;
	var j = piece.currCol;
	if(piece.team === "stencil") {
		if(i===1) {
			//can move two spaces down	
		}
		//can move one space down
		//check captures for down left and down right
	}
	else {
		if(i===6) {
			//can move two spaces up
		}
		//can move one space up
		//check captures for up left and up right
	}
}

function displayKnightMoves(piece) {
	var i = piece.currRow;
	var j = piece.currCol;
	console.log("currRow: "+i);
	console.log("currCol: "+j);
	var options = [[-2,-1],
					[-2,1],
					[2,-1],
					[2,1],
					[-1,-2],
					[1,-2],
					[-1,2],
					[1,2]];
	for(var k=0; k<options.length; k++) {
		var m = i+options[k][0];
		var n = j+options[k][1];
		//var debughelper = typeof m;
		//console.log(debughelper);
		if(m>=0 && m<8 && n>=0 && n<8 && cells[m][n].classList.contains("empty")) {
			cells[m][n].classList.replace("empty", "option");
			//console.log("replacing cells[" + m + "][" +n + "] empty to option");
		}
		else if (m>=0 && m<8 && n>=0 && n<8){
			mysteryObj = getPieceObject(cells[m][n]);
			if(mysteryObj.team !== objAtBat.team) {
				cells[m][n].classList.add("captureOption");
			}
		}
	}
}