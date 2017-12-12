//Moves are written as follows [currRow+this, currCol+this]

var pieces = [
{
	piece: "rook",
	team: "stencil",
	code: "\u2656",
	currRow: 0,
	currCol: 0,
	moves: [[0, this.distance],[this.distance, 0],[0, -this.distance],[-this.distance, 0]]
	// specialMoves: [{condition: //this piece and the king are in their original position,
	// 							//knight and bishop are out of the way
	// 							//king is not currently in check
	// 							//king does not end up in check
	// 							//king does not pass over a square that would put him in check if he stopped there
	// 				move: //write this up later
	// 				}]
},
// {
// 	//rook stencil #2

// },
// {
// 	//rook sillouhette
// },
// {
// 	//rook sillouhette #2
// },
{
	piece: "knight",
	team: "stencil",
	code: "\u2658",
	currRow: 0,
	currCol: 1,
	moves: [[-1,2],[-1,-2],[1,2],[1,-2],[-2,1],[-2,-1],[2,1],[2,-1]]
},
{
	piece: "knight",
  	team: "stencil",
  	code: "\u2658",
  	currRow: 0,
  	currCol: 6,
  	moves: [[-1,2],[-1,-2],[1,2],[1,-2],[-2,1],[-2,-1],[2,1],[2,-1]]
},
{
	piece: "knight",
  	team: "sillouhette",
  	code: "\u265E",
  	currRow: 7,
  	currCol: 1,
  	moves: [[-1,2],[-1,-2],[1,2],[1,-2],[-2,1],[-2,-1],[2,1],[2,-1]]
},
{
	piece: "knight",
  	team: "sillouhette",
  	code: "\u265E",
  	currRow: 7,
  	currCol: 6,
  	moves: [[-1,2],[-1,-2],[1,2],[1,-2],[-2,1],[-2,-1],[2,1],[2,-1]]
},
// {
// 	//bishop stencil
// },
// {
// 	//bishop stencil #2
// },
// {
// 	//bishop sillouhette
// },
// {
// 	//bishop sillouhette #2
// },
// {
// 	//queen stencil
// },
// {
// 	//queen sillouhette
// },
// {
// 	//king stencil
// },
// {
// 	//king sillouhette
// },
{
	piece: "pawn", 
	team: "stencil",
	code: "\u2659",
	currRow: 1,
	currCol: 0,
	initialMoves: [[1,0],[2,0]],
	captureMoves: [[1,-1],[1,1]],
	basicMoves: [[1,0]]
}
]