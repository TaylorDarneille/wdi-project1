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
	console.log("displaying pawn moves");
	var i = piece.currRow;
	var j = piece.currCol;
	var optionsArr = [];
	var captureOptionsArr = [];
	if(piece.team === "stencil") {
		console.log("enterring first if-statment");
		if(i===1) {
			optionsArr.push({i: i+2, j: j+2}); //can move two spaces down
		}
			optionsArr.push({i: i+1, j: j+2}); //can move one space down
			captureOptionsArr.push({i: i+1, j: j-1}); //check captures for down left
			captureOptionsArr.push({i: i+1, j: j+1}); //check captures for and down right
	}
	else {
		if(i===6) {
			optionsArr.push({i: i-2, j: j});//can move two spaces up
		}
		optionsArr.push({i: i-1, j: j}); //can move one space up
		captureOptionsArr.push({i: i-1, j: j-1}); //check captures for up left
		captureOptionsArr.push({i: i-1, j: j+1}); //check captures for up right
	}
	console.log("optionsArr: "+ optionsArr);
	console.log("captureOptionsArr: " + captureOptionsArr);
	for(var k=0; k<optionsArr.length; k++) {
		var m = optionsArr[k].i;
		var n = optionsArr[k].j;
		if(m>=0 && m<8 && n>=0 && n<8 && cells[m][n].classList.contains("empty")) {
			cells[m][j].classList.replace("empty", "option");
		}
	}
	for(var k=0; k<captureOptionsArr.length; k++) {
		m = captureOptionsArr[k].i;
		n = captureOptionsArr[k].j;
		if(m>=0 && m<8 && n>=0 && n<8 && !cells[m][n].classList.contains("empty")) {
			mysteryObj = getPieceObject(cells[m][n]);
			if(mysteryObj.team !== objAtBat.team) {
				cells[m][n].classList.add("captureOption");
			}
		}
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
		if(m>=0 && m<8 && n>=0 && n<8 && cells[m][n].classList.contains("empty")) {
			cells[m][n].classList.replace("empty", "option");
		}
		else if (m>=0 && m<8 && n>=0 && n<8){
			mysteryObj = getPieceObject(cells[m][n]);
			if(mysteryObj.team !== objAtBat.team) {
				cells[m][n].classList.add("captureOption");
			}
		}
	}
}

function displayKingMoves(piece) {
	var i = piece.currRow;
	var j = piece.currCol;
	var options = [[1,0],
					[0,1],
					[0,-1],
					[-1,0],
					[1,-1],
					[-1,1],
					[1,1],
					[-1,-1]];
	for(var k=0; k<options.length; k++) {
		var m = i+options[k][0];
		var n = j+options[k][1];
		if(m>=0 && m<8 && n>=0 && n<8 && cells[m][n].classList.contains("empty")) {
			cells[m][n].classList.replace("empty", "option");
		}
		else if (m>=0 && m<8 && n>=0 && n<8){
			mysteryObj = getPieceObject(cells[m][n]);
			if(mysteryObj.team !== objAtBat.team) {
				cells[m][n].classList.add("captureOption");
			}
		}
	}

}