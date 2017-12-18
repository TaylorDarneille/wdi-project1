Created by Taylor Darneille
Project #1
Web Development Immersive - 16
General Assembly, Seattle

Game: Two-player chess - stencil vs sillhouette.

- king icon for the team whose turn it is displays at the top of the control board
- stencil is always the first player up
- when the player up clicks on a piece from their team, showOptions function runs and possible moves are displayed in chartreuse and possible captures are displayed in red
- after each move, the game checks to see if either player is in check and if so, highlights both the attacking piece and the endangered king in orange, and the path between the two (in the case of rooks, bishops, and queens) in yellow
- game is over when a king is captured

Issues and potential improvements:

- currently: each time a player picks a piece to move, their options for relocation will always display with the color-coded squares
- goal: include a toggle so more advanced players can turn the visual features of showOptions() off

- currently: the player up can only move the piece on their team that they initially click once it is their turn (if they accidentally click the wrong piece, they're out of luck); 
- goal: modify event listener or showOptions() function so that it is safe to allow the player up to click one piece on their team, not move it, and then click another piece on their team that they do decide to move

- currently: castling is not enabled in this game
- goal: write a castle() function that checks whether the move is available/legal each time a player clicks their king or rook on their turn

- currently: a player can make a move that puts themself in check (this is traditionally illegal in chess)
- goal: write a reverseMove() function that automatically undoes the move if player up moves themself into check and restarts that player's turn

- currently: message-board only shows if one player is in check
- goal: gets styles right so that message-board can handle both players in check simultaneously

- currenlty: the game only registers a win when a king is captured
- goal: end game and display appropiate message when a player is in checkmate
[Plan for carrying out this goal: Once the screenForCheck function determines that the defending player is in check, it will call a screenForCheckMate function. This function will call showOptions on the endangeredKing. The game already keeps track of "paths of destruction" (the yellow and orange squares connecting a king in check and the pieces that are endangering the king). First, screenForCheck would need to use showOptions to determine the King's possible moves. Then it would need to run showOptions on every enemy piece and see if any of the king's potential destinations shows up as a captureOption of an enemy piece. If there is no match, the king has a safe option so return false. If there IS a match, then screenForCheck will need to determine if the king can be saved by an offensive move. First it would need to determine if more than one enemy piece has the king in check, and if so, differentiate between the paths of destruction associated with each piece (because blocking only one of those paths would not be sufficient to relieve the king). 
	___If there is only one threat to the king: run showOptions on every active piece on the endangered king's team and see if at least one of them can capture the threatening enemy piece or move into one of the path of destruction cells. If either of these is possible, return false because the king can be protected. If none of the optional moves covers the path of destruction, return true, the king is in checkmate.
	___If there are mutliple threats to the king: Because the defensive team only has one chance to get out of check, if there are multiple paths of destruction, they must intersect in order for all of them to get blocked at once. So, screenForCheck must see if there is a cell in common between all the paths of destruction. If there is not, then return true because the king cannot move out of check and also cannot be blocked from all of the threats. If there IS a shared cell, run showOptions on every piece on the endangered king's team and see if any of them can legally move onto that shared cell. If so, return false, the king can be protected. Otherwise, return true.
]

- currently: once a player has won the game, they can still click their own pieces and run showOptions() which means the removeCellListeners() function does not work properly
- goal: disable all cell event listeners after a player wins the game

- currently: "How To Play" link opens a wikihow page.
- goal: have a self-coded pop-up with instructions


