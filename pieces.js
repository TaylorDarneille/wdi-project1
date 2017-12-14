//Moves are written as follows [currRow+this, currCol+this]

var pieces = [
{
	piece: "rook",
	team: "stencil",
	code: "\u2656",
	currRow: 0,
	currCol: 0
},
{
	piece: "rook",
	team: "stencil",
	code: "\u2656",
	currRow: 0,
	currCol: 7
},
{
	//rook sillouhette
	piece: "rook",
	team: "sillouhette",
	code: "\u265C",
	currRow: 7,
	currCol: 0,
},
{
	//rook sillouhette #2
	piece: "rook",
	team: "sillouhette",
	code: "\u265C",
	currRow: 7,
	currCol: 7,
},
{
	piece: "knight",
	team: "stencil",
	code: "\u2658",
	currRow: 0,
	currCol: 1,
},
{
	piece: "knight",
  	team: "stencil",
  	code: "\u2658",
  	currRow: 0,
  	currCol: 6,
},
{
	piece: "knight",
  	team: "sillouhette",
  	code: "\u265E",
  	currRow: 7,
  	currCol: 1,
},
{
	piece: "knight",
  	team: "sillouhette",
  	code: "\u265E",
  	currRow: 7,
  	currCol: 6,
},
{
	piece: "bishop",
  	team: "stencil",
  	code: "\u2657",
  	currRow: 0,
  	currCol: 2,
},
{
	piece: "bishop",
  	team: "stencil",
  	code: "\u2657",
  	currRow: 0,
  	currCol: 5,
},
{
	piece: "bishop",
  	team: "sillouhette",
  	code: "\u265D",
  	currRow: 7,
  	currCol: 2,
},
{
	piece: "bishop",
  	team: "sillouhette",
  	code: "\u265D",
  	currRow: 7,
  	currCol: 5,
},
{
	piece: "queen",
	team: "stencil",
	code: "\u2655",
	currRow: 0,
	currCol: 3,
},
{
	piece: "queen",
	team: "sillouhette",
	code: "\u265B",
	currRow: 7,
	currCol: 3,
},
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
}
]