const Board = require('./board.js');

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

export {drawBackGround};
