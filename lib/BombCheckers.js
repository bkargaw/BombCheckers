const Board = require('./board.js');

let c;
let ctx;
let board;
let explosionSprite = new Image();
var explosionSound = new Audio("asset/audio/Bomb_Exploding.mp3");
explosionSprite.src = 'asset/images/explosion-sprite-sheet.png';
$( ()=>{
  c = document.getElementById("canvas");
  c.width  = 600;
  c.height = 600;
  ctx = c.getContext("2d");
  board = new Board();
  draw();
  c.addEventListener('click', ClickCallBack);
  document.body.onkeyup = function(e){
    if(e.keyCode == 32) endTurn();
  };
});


  function draw() {
    drawBackGround();
    drawThePieces();
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
    ctx.fillStyle = 'white';
    ctx.fill();
  }

function drawAPiece(baseImage, x , y, scale){
  ctx.drawImage(baseImage, x * scale , y * scale, 75, 75 );
}

function _createColorForGrid(color1 ='gray', color2 = 'red'){
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

function ClickCallBack(event){
  let x = Math.floor(event.layerX/ 75);
  let y = Math.floor(event.layerY/ 75);
  if (_isInbound(x,y)){
    if(board.canSelect(x,y)){
      // ctx.clearRect(0,0,c.width, c.height);
      if (board.select(x,y)){
        let bombPiece= board.pieces[x][y];
        board.endTurn();
        let clearDeadPieces = () => bombPiece.explode(x,y);
        startAnim((x * 75) - 75 , (y * 75) - 75, clearDeadPieces);
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
    board.endTurn();
    drawBackGround();
    drawThePieces();
  }
}


// below this is the logic for the explosion rendering

var Xs = 0;
var Ys = 0;
var w = 225;
var h = 225;
var frameCnt = 25;
var idx = 0;
var intval;
function startAnim(locx, locy, clearDeadPieces) {
  drawBackGround();
  drawThePieces();
  explosionSound.play();
	clearInterval(intval);
	Xs = 0;
	Ys = 0;
	idx= 0;
	intval = setInterval(function(){drawFrame(locx, locy, clearDeadPieces);},50);
}

function drawFrame(locx, locy, clearDeadPieces) {
	ctx.drawImage(explosionSprite, Xs, Ys , 64, 64, locx, locy, w, h);
	Xs += 64;
	idx++;
	if(idx % 5 === 0) {
		Xs = 0;
    clearDeadPieces();
		Ys += 64;
	}
	if(idx > frameCnt){
    clearInterval(intval);
    drawBackGround();
    drawThePieces();
  }
}
