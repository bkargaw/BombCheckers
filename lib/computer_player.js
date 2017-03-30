
class ComputerPlayer {
  constructor(board, side = 'red') {
    this.board = board;
    this.side = side;
    this.Moves = [];
    this.myPieces = [];
    this.optionDelta =[[ 2 , 2], [-2, 2],[ 2 , -2], [-2, -2],
                       [ 1 , 1], [-1, 1], [ 1 , -1], [-1, -1]];
  }

  makeMove(){
    if(this.Move.length){
      this.findAllMoves();
    }else {
      this.SelecePieceToMove();
      if (this.moves.length > 2){
        this.returnMoves();
      }else {
        this.Move = [];
        this.myPieces.shift();
        this.makeMove();
      }
    }
  }

  SelecePieceToMove(){
    if (!this.myPieces.length)  this.myPieces = this.getMyPieces();
    this.myPieces.sort(this.compare);
    for(let i = 0; i < this.myPieces.length; i++){
      let x = this.myPieces[i].x;
      let y = this.myPieces[i].y;
      if (this.board.canSelect(x, y)){
        this.Moves.push([x,y]);
        break;
      }else{
        this.myPieces.shift();
      }
    }
  }

  findAllMoves(){
    let numMoves = this.Move.lenght - 1;
    for (let i = 0 ; i < this.optionDelta.length; i++){
      let x = this.Move[numMoves][0] + this.optionDelta[i][0];
      let y = this.Move[numMoves][1] + this.optionDelta[i][1];
      if (this.board.canSelect(x, y)){
        this.Move.push([x,y]);
        this.findAllMoves();
      }
    }
    this.myPieces.shift();
    // this.optionDelta = [[ 2 , 2], [-2, 2],[ 2 , -2], [-2, -2],
    //                     [ 1 , 1], [-1, 1], [ 1 , -1], [-1, -1]];
  }

  returnMoves(){
    this.Moves.forEach((move) => this.board.select(...move));
    this.board.endTurn();
    this.resetValues();
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

  compare(a, b) {
   if (a.y > b.y) {
     return -1;
   }
   if (a.y < b.y) {
     return 1;
   }
   return 0;
 }


  resetValues(){
    this.Move = [];
    this.myPieces = [];
    // this.optionDelta =[[ 2 , 2], [-2, 2],[ 2 , -2], [-2, -2],
    //                    [ 1 , 1], [-1, 1], [ 1 , -1], [-1, -1]];
  }
}

module.exports = ComputerPlayer;
