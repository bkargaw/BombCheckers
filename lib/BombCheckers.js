const Board = require('./board.js');
const Util = require("./util");
const DrawUtil = require("./draw_utils");

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

let towPlayer = false;

let explosionSprite = new Image();
explosionSprite.src = 'asset/images/explosion-sprite-sheet.png';
var explosionSound = new Audio("asset/audio/Bomb_Exploding.mp3");
var music = new Audio("asset/audio/music.mp3");
var stopExplosion = false;

// below this is the logic for the explosion rendering

var Xs = 0;
var Ys = 0;
var w = 240;
var h = 240;
var frameCnt = 25;
var idx = 0;
var intval;
function startAnim(locx, locy, clearDeadPieces, moveComputer) {
  draw();
  if(!stopExplosion) explosionSound.play();
	clearInterval(intval);
	Xs = 0;
	Ys = 0;
	idx= 0;
intval = setInterval(function(){drawFrame(locx, locy,
  clearDeadPieces, moveComputer);},60);
}

function drawFrame(locx, locy, clearDeadPieces,moveComputer) {
  	ctx.drawImage(explosionSprite, Xs, Ys, 64, 64, locx, locy, w, h);
	Xs += 64;
	idx++;
	if(idx % 5 === 0) {
		Xs = 0;
		Ys += 64;
	}
	if(idx > frameCnt){
    clearInterval(intval);
    clearDeadPieces();
    draw();
    moveComputer();
  }
}


function pleaseStopExplosion(stopbomb) {
  stopExplosion = !stopExplosion;
  if (stopExplosion){
    stopbomb.innerText = 'off';
  }else{
    stopbomb.innerText = 'on';
  }
}

function pleaseStopmusic(stopMusic) {
  if (!music.paused){
    music.pause();
    stopMusic.innerText= 'off'
  }else {
    music.play();
    stopMusic.innerText= 'on'
  }
}

$(()=>{
  c = $("#canvas")[0];
  c.width  = 600;
  c.height = 600;
  ctx = c.getContext("2d");

  //default board colors
  color1 = 'rgb(249, 189, 129)';
  color2 = 'rgb(255, 55, 0)';
  board = new Board(ctx, color1, color2, startAnim, drawFrame, towPlayer);

  // background option canvas 2
  cBackGround2 = $("#background2")[0];
  cBackGround2.width  = 100;
  cBackGround2.height = 100;
  cBackGround2Ctx2 = cBackGround2.getContext("2d");
  cBackGround2.addEventListener('click',
        ChengeBackgroundColor('rgb(249, 189, 129)', 'rgb(255, 55, 0)'));

  // background option canvas 1
  cBackGround1 = $("#background1")[0];
  cBackGround1.width  = 100;
  cBackGround1.height = 100;
  cBackGround1Ctx1 = cBackGround1.getContext("2d");
  cBackGround1.addEventListener('click',
        ChengeBackgroundColor('rgb(68, 62, 62)', 'white'));

  // background option canvas original
  cBackGroundOriginal = $("#backgroundOrignal")[0];
  cBackGroundOriginal.width  = 100;
  cBackGroundOriginal.height = 100;
  cBackGroundOriginalCtx = cBackGroundOriginal.getContext("2d");
  cBackGroundOriginal.addEventListener('click',
        ChengeBackgroundColor('rgb(173, 168, 168)', 'red'));
  draw();

  c.addEventListener('click', handleClickFromUser);

  document.body.onkeyup = function(e){
    if(e.keyCode === 32 || e.keyCode === 13) endTurn();
  };
  let reset = $("#resetGame")[0];
  reset.addEventListener('click', resetGame);
  drawTheBackgroundOptions();

  let stopbomb = $("#StopBombAduio")[0];
  stopbomb.addEventListener('click',()=> pleaseStopExplosion(stopbomb));

  let stopMusic = $("#StopMusic")[0];
  stopMusic.addEventListener('click', () => pleaseStopmusic(stopMusic));

  let makeToPlayer = $("#twoplayerMode")[0];
  makeToPlayer.addEventListener('click', ()=> board.makeTowPlayer(makeToPlayer));
  drawTheBackgroundOptions();
  board.upDateCurrentUserInfor();

  // add modals
  Util.addModal();
});

function resetGame() {
  board = new Board(ctx, color1, color2);
  draw();
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
    draw();
  };

}

  function draw() {
    drawBackGround();
    DrawUtil.drawThePieces(ctx, board);
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
    let colors = Util._createColorForGrid(color1, color2);
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

function handleClickFromUser(event){
  let x = Math.floor(event.layerX / 75);
  let y = Math.floor(event.layerY / 75);
  if (Util._isInbound(x,y)){
    if(board.canSelect(x,y)){
      if (board.select(x,y)){
        let bombPiece = board.pieces[x][y];
        board.endTurn();
        let clearDeadPieces = () => bombPiece.explode(x,y);
        let moveComputer = () => board.runComputersTurn();
        startAnim((x * 75) - 90 , (y * 75) - 90, clearDeadPieces, moveComputer);
      }else {
        drawBackGround();
        DrawUtil.highlightPos(ctx, x, y, highlightColor);
        DrawUtil.drawThePieces(ctx, board);
      }

    }else {
      tellUserError('Invalid move',200,300);
    }
  }
}

function endTurn(){
  if (board.canEndTurn()){
    let winner = board.winner();
    if (winner){
      // add a dialog on the page that tells the user the game is over
      ctx.font = "30px Arial";
      tellUserError(`the winner is ${winner}`,150, 300,10000);
    }else{
      board.endTurn();
      drawBackGround();
      DrawUtil.drawThePieces(ctx, board);
      board.runComputersTurn();

    }
  }else{
    tellUserError('Please make a move first',140,300);
  }
}

function tellUserError(msg ,x, y, time = 1000) {
  if (!towPlayer || board.current_player === 'blue' ){
    var gradient=ctx.createLinearGradient(0,0,c.width,0);
    gradient.addColorStop("0","purple");
    gradient.addColorStop("0.5","black");
    gradient.addColorStop("1.0","purple");

    ctx.font = "30px Arial";
    ctx.fillStyle=gradient;
    ctx.fillText(msg,x,y);
    setTimeout(function(){
      drawBackGround();
      DrawUtil.drawThePieces(ctx, board);
    }, time);
  }
}
