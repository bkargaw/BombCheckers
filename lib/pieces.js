class Piece {
  constructor(side , board, pos){
    this.side = side;
    this.board = board;
    this.x = pos[0];
    this.y = pos[1];
    this.Piecetype = 'pawn';
    this.isKing = false;
    this.haskilledthisturn = false;
    this.kingImage = this.setKingImage();
    this.pieceImage =  this.setPieceImage();
  }

  setPos(pos){
    this.x = pos[0];
    this.y = pos[1];
  }


  getboard() {
    return this.board;
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


  getImage(){
    if (this.isKing){
      return this.kingImage;
    }else {
      return this.pieceImage;
    }
  }

  setKingImage(){
    let kingImage = new Image();
    if(this.side === 'red'){
      kingImage.src = './asset/images/pawn-fire-crowned.png';
    }else{
      kingImage.src =  './asset/images/pawn-water-crowned.png';
    }
    return kingImage;
  }

  setPieceImage(){
    let PawnImg =  new Image();
    if(this.side === 'red'){
      PawnImg.src = './asset/images/pawn-fire.png';
    }else{
      PawnImg.src =  './asset/images/pawn-water.png';
    }
    return PawnImg;
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
		this.haskilledthisturn = true;
	}

	/**
	 * Resets the Piece for future turns
	 */
  finishCapturing() {
		this.haskilledthisturn = false;
	}
}

module.exports = Piece;
