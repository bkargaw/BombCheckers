const Board = require('./board.js');
const Util = require("./util");
const DrawUtil = require("./draw_utils");


let board;



$(()=>{
  Util.setupCanvas(board);
  DrawUtil.CreateBackgroundOptionCanvases();
  Util.draw(ctx, c, color1, color2, board);
  document.body.onkeyup = function(e){
    if(e.keyCode === 32 || e.keyCode === 13) endTurn();
  };
  Util.addEventListener(c,ctx,  stopExplosion, music, board);
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
