/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

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
    if( this.board.pieces[x][y] !== null) {
      this.board.remove(x,y);
    }
	}

  // only applies to bomb pieces
  // explode( x, y) {
  //  }
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


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Piece = __webpack_require__(0);
const BombPiece = __webpack_require__(2);
const ShieldPiece = __webpack_require__(4);
const ComputerPlayer = __webpack_require__(3);

class Board {
  constructor(ctx, color1, color2) {
    this.pieces = this.setBoardUp();
    this.current_player = 'blue';
    this.current_player_has_moved = false;
    this.current_player_has_selected = false;
    this.current_player_piece_pos = [];
    this.cp = new ComputerPlayer(this);
    this.ctx = ctx;
    this.color1 = color1;
    this.color2 = color2;
  }

  resetBackgroundColor(color1, color2){
    this.color1 = color1;
    this.color2 = color2;
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
           !(this.pieces[pos[0]][pos[1]].haskilledthisturn) &&
            !(this.current_player_has_moved)){
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
      let xjumped = intx + deltX/2;
      let yjumped = inty + deltY/2;
      let killPiece = this.pieces[xjumped][yjumped];
      if(killPiece && killPiece.side !== this.current_player){
        if (piece.isKing){
          // this means the piece is a king
          return true;
        }else{
          if (piece.side === 'red' && deltY === 2) return true;
          if (piece.side === 'blue' && deltY === -2) return true;
        }
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
    // make the thing a king when y is 7 for red and 0 for blue
    let piece = this.pieces[x1][y1];
    if (y2 === 7 && piece.side === 'red'){
      piece.setKing(true);
    }else if(y2 === 0 && piece.side === 'blue'){
      piece.setKing(true);

    }
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
        this.drawBackGround();
        this.drawThePieces();
        return 'explode';
      }
    }
    this.pieces[x1][y1] = null;
    this.pieces[x2][y2] = piece;
    piece.setPos([x2, y2]);
    this.current_player_has_moved = true;
    this.drawBackGround();
    this.drawThePieces();
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
    if(this.current_player === 'red' && this.current_player_has_selected){
      this.runComputersTurn();
    }
  }

  runComputersTurn(){
    this.cp.makeMove();
  }

  drawBackGround() {
    let colors = this._createColorForGrid();
    for (let i = 0 ; i < 8; i++){
      for (let j = 0 ; j < 8; j++){
        let x = i * 75 ;
        let y = j * 75;
        this.ctx.beginPath();
        this.ctx.rect(x, y, 75, 75);
        this.ctx.fillStyle = colors[i][j];
        this.ctx.fill();
      }
    }
  }

  _createColorForGrid(){
    let colorGrid = new Array(8);
    let fillbox = true;
    for (let i = 0 ; i < 8; i++) {
      colorGrid[i] = new Array(8);
      for (let j = 0 ; j < 8; j++) {
        if (fillbox){
          colorGrid[i][j] = this.color1;
        }else{
          colorGrid[i][j] = this.color2;
        }
        fillbox = !fillbox;
      }
      fillbox = !fillbox;
    }
    return colorGrid;
  }



  drawThePieces(){
    let piece;
    let scale = 75;
    for (let i = 0; i < 8 ; i++){
      for(let j = 0; j < 8 ; j++){
        piece = this.pieces[i][j];
        if( piece ){
          let scaledX = piece.x;
          let scaledY = piece.y;
          let img = piece.getImage();
          if(img.complete) { //check if image was already loaded by the browser
            this.drawAPiece(img, piece.x , piece.y, scale);
          }else {
            img.onload = ()=> this.drawAPiece(img, scaledX , scaledY, scale);
          }
        }
      }
    }
  }

  drawAPiece(baseImage, x , y, scale){
    this.ctx.drawImage(baseImage, x * scale , y * scale, 75, 75 );
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


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Piece = __webpack_require__(0);


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


/***/ }),
/* 3 */
/***/ (function(module, exports) {


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
    this.findAllMoves();
    if (this.Moves.length >= 2){
      this.resetValues();
      this.board.endTurn();
    }else {
      this.myPieces.shift();
      this.Moves = [];
      this.makeMove();
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


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const Piece = __webpack_require__(0);

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


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "drawBackGround", function() { return drawBackGround; });
const Board = __webpack_require__(1);

let c;
let color1;
let color2;
let ctx;
let board;
let cBackGround1;
let cBackGround1Ctx1;

let cBackGround2;
let cBackGround2Ctx2;

let cBackGroundOriginal;
let cBackGroundOriginalCtx;

let highlightColor = 'white';

let explosionSprite = new Image();
explosionSprite.src = 'asset/images/explosion-sprite-sheet.png';
var explosionSound = new Audio("asset/audio/Bomb_Exploding.mp3");
$( ()=>{
  c = document.getElementById("canvas");
  c.width  = 600;
  c.height = 600;
  ctx = c.getContext("2d");


  //default board colors
  color1 = 'gray';
  color2 = 'red';
  board = new Board(ctx, color1, color2);

  // background option canvas 2
  cBackGround2 = document.getElementById("background2");
  cBackGround2.width  = 100;
  cBackGround2.height = 100;
  cBackGround2Ctx2 = cBackGround2.getContext("2d");
  cBackGround2.addEventListener('click',
        ChengeBackgroundColor('rgb(249, 189, 129)', 'rgb(255, 55, 0)'));

  // background option canvas 1
  cBackGround1 = document.getElementById("background1");
  cBackGround1.width  = 100;
  cBackGround1.height = 100;
  cBackGround1Ctx1 = cBackGround1.getContext("2d");
  cBackGround1.addEventListener('click',
        ChengeBackgroundColor('rgb(68, 62, 62)', 'white'));
  // background option canvas original
  cBackGroundOriginal = document.getElementById("backgroundOrignal");
  cBackGroundOriginal.width  = 100;
  cBackGroundOriginal.height = 100;
  cBackGroundOriginalCtx = cBackGroundOriginal.getContext("2d");
  cBackGroundOriginal.addEventListener('click',
        ChengeBackgroundColor('gray', 'red'));
  draw();
  c.addEventListener('click', handleClickFromUser);
  document.body.onkeyup = function(e){
    if(e.keyCode === 32 || e.keyCode === 13) endTurn();
  };
  let reset = document.getElementById("resetGame");
  reset.addEventListener('click', resetGame);
  drawTheBackgroundOptions();
});

function resetGame() {
  board = new Board(ctx, color1, color2);
  drawBackGround();
  drawThePieces();
}

function ChengeBackgroundColor(col1, col2){
  return () => {
    if(col1 === 'rgb(68, 62, 62)'){
      // change highlighter if the board is black and white
      highlightColor = 'rgb(210, 103, 224)';
    }else {
        highlightColor = 'white';
    }
    color1 = col1;
    color2 = col2;
    board.resetBackgroundColor(color1, color2);
    drawBackGround();
    drawThePieces();
  };
}


  function draw() {
    drawBackGround();
    drawThePieces();
  }

  function drawTheBackgroundOptions() {
    let background1Image = new Image();
    background1Image.onload = ()=> cBackGround1Ctx1.drawImage(
      background1Image, 0, 0, 100, 100);
    background1Image.src = 'asset/images/white & black.png';

    let background2Image = new Image();
    background2Image.onload = ()=> cBackGround2Ctx2.drawImage(
      background2Image, 0, 0, 100, 100);
    background2Image.src = 'asset/images/wood.png';

    let backgroundOriginalImage = new Image();
    backgroundOriginalImage.onload = ()=> cBackGroundOriginalCtx.drawImage(
      backgroundOriginalImage, 0, 0, 100, 100);
    backgroundOriginalImage.src = 'asset/images/red and gray.png';
  }

  function drawBackGround() {
    ctx.clearRect(0,0,c.width, c.height);
    let colors = _createColorForGrid();
    for (let i = 0 ; i < 8; i++){
      for (let j = 0 ; j < 8; j++){
        let x = i * 75 ;
        let y = j * 75;
        ctx.beginPath();
        ctx.rect(x, y, 75, 75);
        ctx.fillStyle = colors[i][j];
        ctx.fill();
      }
    }
  }

  function drawThePieces(){
    let piece;
    let scale = 75;
    for (let i = 0; i < 8 ; i++){
      for(let j = 0; j < 8 ; j++){
        piece = board.pieces[i][j];
        if( piece ){
          let scaledX = piece.x;
          let scaledY = piece.y;
          let img = piece.getImage();
          if(img.complete) { //check if image was already loaded by the browser
            drawAPiece(img, piece.x , piece.y, scale);
          }else {
            img.onload = ()=> drawAPiece(img, scaledX , scaledY, scale);
          }
        }
      }
    }
  }

  function highlightPos(i, j){
    let x = i * 75 ;
    let y = j * 75;
    ctx.beginPath();
    ctx.rect(x, y, 75, 75);
    ctx.fillStyle = highlightColor;
    ctx.fill();
  }

function drawAPiece(baseImage, x , y, scale){
  ctx.drawImage(baseImage, x * scale , y * scale, 75, 75 );
}

function _createColorForGrid(){
  let colorGrid = new Array(8);
  let fillbox = true;
  for (let i = 0 ; i < 8; i++) {
    colorGrid[i] = new Array(8);
    for (let j = 0 ; j < 8; j++) {
      if (fillbox){
        colorGrid[i][j] = color1;
      }else{
        colorGrid[i][j] = color2;
      }
      fillbox = !fillbox;
    }
    fillbox = !fillbox;
  }
  return colorGrid;
}

function _isInbound(x, y){
  if ( x >= 0 && x <= 7  && y >= 0 && y <= 7 ) return true;
  return false;
}

function handleClickFromUser(event){
  let x = Math.floor(event.layerX/ 75);
  let y = Math.floor(event.layerY/ 75);
  if (_isInbound(x,y)){
    if(board.canSelect(x,y)){
      if (board.select(x,y)){
        let bombPiece = board.pieces[x][y];
        board.endTurn();
        let clearDeadPieces = () => bombPiece.explode(x,y);
        let moveComputer = () => board.runComputersTurn();
        startAnim((x * 75) - 90 , (y * 75) - 90, clearDeadPieces, moveComputer);
      }else {
        drawBackGround();
        highlightPos(x, y);
        drawThePieces();
      }

    }else {
      console.log('can not select that space');
      console.log([x,y]);
    }
  }
}

function endTurn(){
  if (board.canEndTurn()){
    let winner = board.winner();
    if (winner){
      // add a dialog on the page that tells the user the game is over
      console.log(`the winner is ${winner}`);
    }else{
      board.endTurn();
      drawBackGround();
      drawThePieces();
      board.runComputersTurn();
    }
  }
}


// below this is the logic for the explosion rendering

var Xs = 0;
var Ys = 0;
var w = 240;
var h = 240;
var frameCnt = 25;
var idx = 0;
var intval;
function startAnim(locx, locy, clearDeadPieces, moveComputer) {
  drawBackGround();
  drawThePieces();
  explosionSound.play();
	clearInterval(intval);
	Xs = 0;
	Ys = 0;
	idx= 0;
intval = setInterval(function(){drawFrame(locx, locy,
  clearDeadPieces, moveComputer);},60);
}

function drawFrame(locx, locy, clearDeadPieces,moveComputer) {
	ctx.drawImage(explosionSprite, Xs, Ys , 64, 64, locx, locy, w, h);
	Xs += 64;
	idx++;
	if(idx % 5 === 0) {
		Xs = 0;
		Ys += 64;
	}
	if(idx > frameCnt){
    clearInterval(intval);
    clearDeadPieces();
    drawBackGround();
    drawThePieces();
    moveComputer();
  }
}

// create modal containt
// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};




/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map