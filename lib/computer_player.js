
class ComputerPlayer {
  constructor(board, side = 'red') {
    this.board = board;
    this.side = side;
    this.firstMove = [];
    this.myPieces = [];
  }

  makeMove(){
    if(this.firstMove.length){
      return this.makeSecondMove();
    }else {
      this.firstMove = [];
      return this.makeFirstMove();
    }
  }

  makeFirstMove(){
    if (!this.myPieces.length)  this.myPieces = this.getMyPieces();
    this.myPieces.sort(compare);
    function compare(a, b) {
      if (a.y > b.y) {
        return -1;
      }
      if (a.y < b.y) {
        return 1;
      }
      return 0;
    }
    for(let i = 0; i < this.myPieces.length; i++){
      let x = this.myPieces[i].x;
      let y = this.myPieces[i].y;
      if (this.board.canSelect(x, y)){
        this.firstMove = [x,y];
        return [x, y];
      }else{
        this.myPieces.shift();
      }
    }
    return null;
  }

  makeSecondMove(){
    let optionDelta = [[ 2 , 2], [-2, 2],
                       [ 1 , 1], [-1, 1]];
    // let optionDelta = [[ 2 , 2], [-2, 2],[ 2 , -2], [-2, -2],
    //                    [ 1 , 1], [-1, 1], [ 1 , -1], [-1, -1]];
    for (let i = 0 ; i < optionDelta.length; i++){
      let x = this.firstMove[0] + optionDelta[i][0];
      let y = this.firstMove[1] + optionDelta[i][1];
      if (this.board.canSelect(x, y)){
        this.firstMove = [x,y];
        return [x, y];
      }
    }
    this.myPieces.shift();
    this.firstMove = [];
    return 'recallFirstMove';
  }

  getMyPieces(){
    let myPieces = [];
    for(let i = 0; i < 8; i++ ){
      for(let j = 0; j < 8; j++){
        let piece = this.board.pieces[i][j];
        if (piece && piece.side === this.side) myPieces.push(piece);
      }
    }
    return myPieces;
  }

  resetValues(){
    this.firstMove = [];
    this.myPieces = [];
  }
}

module.exports = ComputerPlayer;
