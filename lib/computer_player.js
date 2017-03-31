class ComputerPlayer {
  constructor(board, side = 'red') {
    this.board = board;
    this.side = side;
    this.Moves = [];
    this.myPieces = [];
    this.optionDelta =[[ 2 , -2], [-2, -2],[ 2 , 2], [-2, 2],
                       [ 1 , -1], [-1, -1],[ 1 , 1], [-1, 1]];
  }

  makeMove(){
    this.SelecePieceToMove();
    let val = this.findAllMoves();
    if (val){
      this.resetValues();
      return val;
    }else{
      if (this.Moves.length >= 2){
        this.resetValues();
        this.board.endTurn();
      }else {
        this.myPieces.shift();
        this.Moves = [];
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
        this.board.select(x,y);
        break;
      }else{
        this.myPieces.shift();
      }
    }
  }

  findAllMoves(){
    let numMoves = this.Moves.length - 1;
    for (let i = 0 ; i < this.optionDelta.length; i++){
      let x = this.Moves[numMoves][0] + this.optionDelta[i][0];
      let y = this.Moves[numMoves][1] + this.optionDelta[i][1];
      if (this.board.canSelect(x, y)
          && this.board.pieces[x]
          && this.board.pieces[x][y] === null){
        this.board.select(x,y);
        this.Moves.push([x,y]);
        let piece = this.board.pieces[x][y];
        if (piece.Piecetype === 'bomb' && piece.haskilledthisturn){
          return 'explode';
        }
      }
    }
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
    this.Moves = [];
    this.myPieces = [];
  }
}

module.exports = ComputerPlayer;
