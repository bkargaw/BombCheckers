const Piece = require('./pieces.js');

class ShieldPiece extends Piece {

  ShieldPiece( side,  board){
	  super(side, board);
	  this.setPiecetype('shield');
  }

  blowUp( x, y) {
    // does not blow up!!!
	}

}

module.exports = ShieldPiece;
