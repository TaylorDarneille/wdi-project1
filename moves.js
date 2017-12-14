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

function displayKnightMoves(piece) {
	var i = piece.currRow;
	var j = piece.currCol;
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