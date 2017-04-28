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
  DrawUtil.draw();
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
    DrawUtil.draw();
    moveComputer();
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

  DrawUtil.CreateBackgroundOptionCanvases();

  DrawUtil.draw();


  document.body.onkeyup = function(e){
    if(e.keyCode === 32 || e.keyCode === 13) endTurn();
  };

  Util.addEventListener(c,  stopExplosion, music, board, makeToPlayer);
  // c.addEventListener('click', handleClickFromUser);

  DrawUtil.drawTheBackgroundOptions();

  board.upDateCurrentUserInfor();

  // add modals
  Util.addModal();
});


function endTurn(){
  if (board.canEndTurn()){
    let winner = board.winner();
    if (winner){
      // add a dialog on the page that tells the user the game is over
      ctx.font = "30px Arial";
      tellUserError(`the winner is ${winner}`,150, 300,10000);
    }else{
      board.endTurn();
      DrawUtil.drawBackGround(ctx, c, color1, color);
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
      DrawUtil.drawBackGround(ctx, c, color1, color);
      DrawUtil.drawThePieces(ctx, board);
    }, time);
  }
}
