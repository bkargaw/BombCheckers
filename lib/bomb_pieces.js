const Piece = require('./pieces.js');

class BombPiece extends Piece {

  BombPiece( side,  board) {
	  super(side, board);
	  this.setPiecetype('bomb');
  }

  explode( x, y) {
			  let xmin= x-1;
			  let ymin= y-1;
			  let xmax= x+1;
			  let ymax= y+1;
			  if (x === 0){
				  xmin=x;
			  }
			  if (y === 0){
				  ymin = y;
			  }
			  if (x === 7){
				  xmax = x;
						  }
			  if (y === 7){
				  ymax = y;
			  }
			  for (let i = xmin; i <= xmax; i++){
				  for (let j = ymin; j <= ymax; j++){
					  let b = this.getboard();
					  if (b.getMyPieces()[i][j] !== null){
					      b.getMyPieces()[i][j].blowUp(i,j);
					  }
				  }
			  }
		}

  startCapturing() {
     // since they explode and can't capture again...
		this.setHaskilledthisturn(false);
		}
	}
  module.exports = BombPiece;
