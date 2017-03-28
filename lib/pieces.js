class Piece {
  constructor(side , board){
    this.side = side;
    this.board = board;
    this.Piecetype = 'pawn';
    this.isKing=false;
    this.haskilledthisturn = false;
  }

  getSide() {
		return this.side;

	}

  getboard() {
    return this.board;
	}

  getPiecetype() {
    return this.Piecetype;
	}

  getHaskilledthisturn() {
		return this.haskilledthisturn;
	}

  setHaskilledthisturn(haskilledthisturn) {
		this.haskilledthisturn = haskilledthisturn;
  }

  setKing(isKing) {
		this.isKing = isKing;
	}

  setPiecetype(Piecetype) {
		this.Piecetype = Piecetype;
	}

  side() {
		return this.side;
	}

  isKing() {
    return this.isKing;
	}


	blowUp(x, y) {
    if( this.board.grid()[x][y] !== null) {
      this.board.remove(x,y);
    }
	}

  // only applies to bomb pieces
  explode( x, y) {

   }
	/**
	 * Signals that this Piece has begun to capture (as in it captured a Piece)
	 */
  startCapturing() {
		this.haskilledthisturn=true;
	}

	/**
	 * Returns whether or not this piece has captured this turn
	 */
  hasCaptured() {
		return this.haskilledthisturn;
	}

	/**
	 * Resets the Piece for future turns
	 */

  finishCapturing() {
		this.haskilledthisturn = true;
	}
}

module.exports = Piece;
