const Piece = require('./pieces.js');


class BombPiece extends Piece {
  constructor(side,  board, pos) {
	  super(side, board, pos);
	  this.setPiecetype('bomb');
  }

  setKingImage(){
    let kingImage = new Image();
    if(this.side === 'red'){
      kingImage.src = './asset/images/bomb-fire-crowned.png';
    }else{
      kingImage.src =  './asset/images/bomb-water-crowned.png';
    }
    return kingImage;
  }

  setPieceImage(){
    let BombImg =  new Image();
    if(this.side === 'red'){
      BombImg.src = './asset/images/bomb-fire.png';
    }else{
      BombImg.src =  './asset/images/bomb-water.png';
    }
    return BombImg;
  }

  explode( x, y ) {
			  let xmin= x-1;
			  let ymin= y-1;
			  let xmax= x+1;
			  let ymax= y+1;
			  if (x === 0){
				  xmin = x;
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
					  if (this.board.pieces[i][j] !== null){
					      this.board.pieces[i][j].blowUp(i,j);
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
