const Piece = require('./pieces.js');
const BombPiece = require('./bomb_pieces.js');
const ShieldPiece = require('./shieldpieces.js');

class Board {
  /*
  starts Board with the default configuration. Note that an empty
   Board could possibly be useful for testing purposes.
  */

  constructor() {
    this.pieces = this.setBoardUp();
  }

  setBoardUp(){

  }



  _isInbound(x, y){
    if ( x > 0 && x <= 7  || y > 0 || y <= 7 ) return true;
    return false;
  }
  /*
   Gets the piece at position (x, y) on the board, or null if there is no piece.
   If (x, y) are out of bounds, returns null.
   */
  pieceAt( x, y){
    if (!(this._isInbound())) return null;
    return this.pieces[x][y];
  }

  /* Places p at (x, y). If (x, y) is out of bounds or if p is null, does nothing.
   If another piece already exists at (x, y), p will replace that piece. (This method is potentially
   useful for creating specific test circumstances.)
   */
   place( piece ,  x,  y){
     if ( this._isInbound() ) {
       if (piece !== null){
         this.pieces[x][y] = piece;
       }
     }
   }

  /*
  Executes a remove. Returns the piece that was removed.
  If the input (x, y) is out of bounds, returns null and prints an appropriate message.
  If there is no piece at (x, y), returns null and prints an appropriate message.
   */
  remove( x,  y) {
    if ( !(this._isInbound()) ) return null;
    let piece = this.pieces[x][y];
    this.pieces[x][y] = null;
    return piece;
  }
  /*
   Returns true if the square at (x, y) can be selected.
  - A square with a piece may be selected if it is the corresponding player’s turn and one of the following is true:
      * The player has not selected a piece yet.
    * The player has selected a piece, but did not move it.

  - An empty square may be selected if one of the following is true:
    * During this turn, the player has selected a Piece which hasn’t moved yet and is
      selecting an empty spot which is a valid move for the previously selected Piece.
    * During this turn, the player has selected a Piece, captured, and has selected another
        valid capture destination. When performing multi-captures, you should only select the active
        piece once; all other selections should be valid destination points.
  */
  canSelect(x, y){

  }

  /*
Selects the square at (x, y). This method assumes canSelect (x,y) returns true.
  In respect to the GUI, when you select a Piece, color the background
  of the selected
  square white on the GUI via the pen color function. For any piece to
  perform a capture,
  that piece must have been selected first. If you select a square with
  a piece, you are prepping
  that piece for movement. If you select an empty square (assuming
  canSelect returns true), you should
  move your most recently selected piece to that square.
  */

  select( x, y){

  }

  /*
  Assumes Piece p's movement from (x1, y1) to (x2, y2) is valid.
  Moves the piece at (x1, y1), to (x2, y2) capturing any intermediate
  piece if applicable.
  */


  move( x1,  y1,  x2,  y2){

  }

  /*
  Returns whether or not the the current player can end their turn.
  To be able to end a turn, a piece must have moved or performed a capture.
  */
  canEndTurn(){

  }
  /*
  Called at the end of each turn. Handles switching of players and anything else that should happen at the end of a turn.
  */

  endTurn() {

  }

  /*
   - Returns the winner of the game: "Fire", "Water", "Tie", or null.
   If only fire pieces remain on the board, fire wins. If only water
    pieces remain, water wins. If no pieces remain (consider an explosion
    capture), no one wins and it is a tie. If the game is still in
    progress (ie there are pieces from both sides still on the board)
     return null. Assume there is no stalemate situation in which the
     current player has pieces but cannot legally move any of them
     (In this event, just leave it at null). Determine the winner solely
     by the number of pieces belonging to each team.
  */
 winner(){

  }



}
