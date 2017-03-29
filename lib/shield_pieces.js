const Piece = require('./pieces.js');

class ShieldPiece extends Piece {
  constructor( side, board, pos){
	  super(side, board, pos);
	  this.setPiecetype('shield');
  }

  setKingImage(){
    let kingImage = new Image();
    if(this.side === 'red'){
      kingImage.src = './asset/images/shield-fire-crowned.png';
    }else{
      kingImage.src =  './asset/images/shield-water-crowned.png';
    }
    return kingImage;
  }

  setPieceImage(){
    let WaterImg =  new Image();
    if(this.side === 'red'){
      WaterImg.src = './asset/images/shield-fire.png';
    }else{
      WaterImg.src =  './asset/images/shield-water.png';
    }
    return WaterImg;
  }

  blowUp(x, y) {
    // does not blow up!!!
	}

}

module.exports = ShieldPiece;
