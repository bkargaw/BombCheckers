const Piece = require('./pieces.js');
const BombPiece = require('./bomb_pieces.js');
const ShieldPiece = require('./shield_pieces.js');

class Board {
  constructor() {
    this.pieces = this.setBoardUp();
    this.current_player = 'blue';
    this.current_player_has_moved = false;
    this.current_player_has_selected = false;
    this.current_player_piece_pos = [];
  }

  setBoardUp(){
    let grid = new Array(8);
    for (let i = 0 ; i< 8 ; i++){
      grid[i] = new Array(8);
      for(let j = 0 ; j < 8 ; j++){
        grid[i][j]= null;
      }
    }
    // red classic
    let R1 = new Piece('red', this, [0, 0]);
    let R2 = new Piece('red', this, [2, 0]);
		let R3 = new Piece('red', this, [4, 0]);
    let R4 = new Piece('red', this, [6, 0]);
		// red Shields
		let R5 = new ShieldPiece('red', this, [1, 1]);
    let R6 = new ShieldPiece('red', this, [3, 1]);
		let R7 = new ShieldPiece('red', this, [5, 1]);
    let R8 = new ShieldPiece('red', this, [7, 1]);
		// red bomb
		let R9 = new BombPiece('red', this, [0, 2]);
    let R10 = new BombPiece('red', this, [2, 2]);
		let R11 = new BombPiece('red', this, [4, 2]);
    let R12 = new BombPiece('red', this, [6, 2]);

    // blue classic
		let B1 = new Piece('blue', this, [7, 7]);
    let B2 = new Piece('blue', this, [5, 7]);
    let B3 = new Piece('blue', this, [3, 7]);
    let B4 = new Piece('blue', this, [1, 7]);
		// Blue Shields
		let B5 = new ShieldPiece('blue', this, [0, 6]);
    let B6 = new ShieldPiece('blue', this, [2, 6]);
    let B7 = new ShieldPiece('blue', this, [4, 6]);
    let B8 = new ShieldPiece('blue', this, [6, 6]);
		// Blue bomb
		let B9 = new BombPiece('blue', this, [7, 5]);
    let B10 = new BombPiece('blue', this, [5, 5]);
		let B11 = new BombPiece('blue', this, [3, 5]);
    let B12 = new BombPiece('blue', this, [1, 5]);

      // RED SIDE
		grid[0][0] = R1; grid[2][0] = R2; grid[4][0] = R3; grid[6][0] = R4;
		grid[1][1] = R5; grid[3][1] = R6; grid[5][1] = R7; grid[7][1] = R8;
    grid[0][2] = R9; grid[2][2] = R10; grid[4][2] = R11; grid[6][2] = R12;

      // BLUE SIDE
		grid[7][7] = B1; grid[5][7] = B2; grid[3][7] = B3; grid[1][7] = B4;
		grid[0][6] = B5; grid[2][6] = B6; grid[4][6] = B7; grid[6][6] = B8;
		grid[7][5] = B9; grid[5][5] = B10; grid[3][5] = B11; grid[1][5] = B12;

    return grid;
  }

  switchPlayer(){
    if ( this.current_player === 'blue'){
      this.current_player = 'red';
    }else {
      this.current_player = 'blue';
    }
  }

  _isInbound(x, y){
    if ( x >= 0 && x <= 7  && y >= 0 && y <= 7 ) return true;
    return false;
  }
  /*
   Gets the piece at position (x, y) on the board, or null if there is no piece.
   If (x, y) are out of bounds, returns null.
   */
  pieceAt( x, y){
    if (!(this._isInbound(x, y))) return null;
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
  * If the input (x, y) is out of bounds, returns null and prints
  an appropriate message.
  * If there is no piece at (x, y), returns null and prints an
  appropriate message.
   */
  remove( x,  y) {
    if ( !(this._isInbound(x,  y))) return null;
    let piece = this.pieces[x][y];
    this.pieces[x][y] = null;
    return piece;
  }
  /*
   Returns true if the square at (x, y) can be selected.
  - A square with a piece may be selected if it is the
    corresponding player’s turn and one of the following is true:
    * The player has not selected a piece yet.
    * The player has selected a piece, but did not move it.

  - An empty square may be selected if one of the following is true:

    * During this turn, the player has selected a Piece which hasn’t
    moved yet and is selecting an empty spot which is a valid move for
    the previously selected Piece.

    * During this turn, the player has selected a Piece, captured,
    and has selected another valid capture destination. When performing
    multi-captures, you should only select the activepiece once; all
    other selections should be valid destination points.
  */
  canSelect(x, y){
    if (this._isInbound(x,y)){
      let piece = this.pieces[x][y];
      if (piece) {
        //  there is a piece at this location
          if (!this.current_player_has_selected ||
             (this.current_player_has_selected &&
             !this.current_player_has_moved)){

               // can only move your own piece
             if(piece.side === this.current_player){
               return true;
             }
        }
      }else{
        //  there is a NO piece at this location
        // if the
        let pos = this.current_player_piece_pos;
        if(this.current_player_has_selected &&
           !(this.pieces[pos[0]][pos[1]].haskilledthisturn)){
            return this.validFirstMove(pos[0], pos[1], x, y);
        }
        if(this.current_player_has_selected &&
           (this.pieces[pos[0]][pos[1]].haskilledthisturn)){
            return this.validCapturingMove(pos[0], pos[1], x, y);
        }
      }
    }
    return false;
  }

  validFirstMove(intx, inty, finx, finy){
    let deltX = finx - intx;
    let deltY = finy - inty;

    if(Math.abs(deltX) !== 1 || Math.abs(deltY) !== 1){

      // this means the selected place is an attempt to capture
      return this.validCapturingMove(intx, inty, finx, finy);

    }else if(Math.abs(deltX) === 1 && Math.abs(deltY) === 1) {

      // this mean the destination is one step only
      if (intx !== finx && intx !== finy){

        //  this means that the destination is not vert or horz
        let piece = this.pieces[intx][inty];

        if (piece.isKing){
          // this means the piece is a king
          return true;
        }else{

          if (piece.side === 'red' && deltY === 1) return true;
          if (piece.side === 'blue' && deltY === -1) return true;
        }
      }
    }
    return false;
  }

  validCapturingMove(intx, inty, finx, finy){
    let deltX = finx - intx;
    let deltY = finy - inty;
    if(Math.abs(deltX) === 2 && Math.abs(deltY) === 2){
      let piece = this.pieces[intx][inty];
      if (piece.isKing){
        // this means the piece is a king
        return true;
      }else{
        if (piece.side === 'red' && deltY === 2) return true;
        if (piece.side === 'blue' && deltY === -2) return true;
      }
    }
    return false;
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

  select( x, y ){
    let piece = this.pieces[x][y];
    if (piece){
      // there is a piece at that loc... selecting a piece to move
      this.current_player_has_selected = true;
    }else{
      // there is noting at that location and the piece is moveing or capturing
      let [x1 , y1] = this.current_player_piece_pos;
      let movetype =this.move( x1,  y1,  x,  y);
      if (movetype === 'explode' ){
        this.current_player_piece_pos = [x,y];
        return true;
      }
      // get ready for other capturing
    }
    this.current_player_piece_pos = [x,y];
    return false;
  }

  /*
  Assumes Piece p's movement from (x1, y1) to (x2, y2) is valid.
  Moves the piece at (x1, y1), to (x2, y2) capturing any intermediate
  piece if applicable.
  */
  move( x1,  y1,  x2,  y2){
    let piece = this.pieces[x1][y1];
    if (Math.abs(x2 - x1) === 2){
      let xDelete = (x1 + x2) / 2;
      let yDelete = (y1 + y2) / 2;
      this.pieces[xDelete][yDelete] = null;
      this.pieces[x1][y1] = null;
      this.pieces[x2][y2] = piece;
      piece.startCapturing();
      if (piece.Piecetype === 'bomb'){
        this.pieces[x1][y1] = null;
        this.pieces[x2][y2] = piece;
        piece.setPos([x2, y2]);
        this.current_player_has_moved = true;
        return 'explode';
      }
    }
    this.pieces[x1][y1] = null;
    this.pieces[x2][y2] = piece;
    piece.setPos([x2, y2]);
    this.current_player_has_moved = true;
    return null;
  }

  /*
  Returns whether or not the the current player can end their turn.
  To be able to end a turn, a piece must have moved or performed a capture.
  */
  canEndTurn(){
    return this.current_player_has_moved;
  }
  /*
  Called at the end of each turn. Handles switching of players and
  anything else that should happen at the end of a turn.
  */

  endTurn() {
    let [x,y] = this.current_player_piece_pos;
    this.pieces[x][y].finishCapturing();
    this.switchPlayer();
    this.current_player_has_moved = false;
    this.current_player_has_selected = false;
    this.current_player_piece_pos = [];
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
   let countFire = 0;
   let countWater = 0;
   for (let i = 0; i < 8; i++){
     for (let j = 0; j < 8; j++){
       let piece = this.pieces[i][j];
       if(piece){
         if (piece.side === 'red') countFire++;
         if (piece.side === 'blue') countWater++;
        if (countWater > 0 && countFire > 0) return null;
       }
     }
   }
   if (countWater === 0 && countFire === 0) return 'Tie';
   if (countWater === 0 && countFire > 0) return 'Fire';
   if (countWater > 0 && countFire === 0) return 'Water';
   return null;
  }
}

module.exports = Board;
