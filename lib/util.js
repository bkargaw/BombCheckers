// below this is the logic for the explosion rendering
const DrawUtil = require("./draw_utils");

let c ;
let color1;
let color2;
let ctx;
let towPlayer = false;

export function setupCanvas(board) {
  c = $("#canvas")[0];
  c.width  = 600;
  c.height = 600;
  ctx = c.getContext("2d");

  //default board colors
  color1 = 'rgb(249, 189, 129)';
  color2 = 'rgb(255, 55, 0)';

  board = new Board(ctx, color1, color2, towPlayer);
}


export function draw() {
  DrawUtil.draw(ctx, c, color1, color2, board);
}


export function _isInbound(x, y){
  if ( x >= 0 && x <= 7  && y >= 0 && y <= 7 ) return true;
  return false;
}

function handleClickFromUser(){
  return (event)=>{
    let x = Math.floor(event.layerX / 75);
    let y = Math.floor(event.layerY / 75);
    if (_isInbound(x,y)){
      if(board.canSelect(x,y)){
        if (board.select(x,y)){
          let bombPiece = board.pieces[x][y];
          board.endTurn();
          let clearDeadPieces = () => bombPiece.explode(x,y);
          let moveComputer = () => board.runComputersTurn();
          startAnim((x * 75) - 90 , (y * 75) - 90, clearDeadPieces, moveComputer);
        }else {
          DrawUtil.drawBackGround(ctx, c, color1, color);
          DrawUtil.highlightPos(ctx, x, y, highlightColor);
          DrawUtil.drawThePieces(ctx, board);
        }

      }else {
        tellUserError('Invalid move',200,300);
      }
    }
  }
}


export function addEventListener(c, ctx, stopExplosion, music, board) {
  c.addEventListener('click', handleClickFromUser(board));

  let reset = $("#resetGame")[0];
  reset.addEventListener('click', resetGame);

  let stopbomb = $("#StopBombAduio")[0];
  stopbomb.addEventListener('click',()=> pleaseStopExplosion(stopbomb, stopExplosion));

  let stopMusic = $("#StopMusic")[0];
  stopMusic.addEventListener('click', () => pleaseStopmusic(stopMusic, music));

  let makeToPlayer = $("#twoplayerMode")[0];
  makeToPlayer.addEventListener('click', ()=> board.makeTowPlayer(makeToPlayer));
}

function resetGame() {
  board = new Board(ctx, color1, color2);
  DrawUtil.draw();
}

function pleaseStopExplosion(stopbomb, stopExplosion) {
  stopExplosion = !stopExplosion;
  if (stopExplosion){
    stopbomb.innerText = 'off';
  }else{
    stopbomb.innerText = 'on';
  }
}

function pleaseStopmusic(stopMusic, music) {
  if (!music.paused){
    music.pause();
    stopMusic.innerText= 'off'
  }else {
    music.play();
    stopMusic.innerText= 'on'
  }
}



export function addModal (){
  // create modal containt
  // Get the modal
  var gameRuleModal =$('#myModal')[0];
  var gameOptionModal =$('#optionsModal')[0];

  // Get the button that opens the Modal
  var btn =$("#myBtn")[0];
  var optionsBtn =$("#optionsBtn")[0];

  // Get the <span> element that closes the Modal
  var spanOption = $(".close")[0];
  var spanRule = $(".close")[1];

  // When the user clicks the button, open the Modal
  btn.onclick = () => {
      gameRuleModal.style.display = "block";
  };
  optionsBtn.onclick = () => {
      gameOptionModal.style.display = "block";
  };

  // When the user clicks on <span> (x), close the Modal
  spanRule.onclick = () => {
    gameRuleModal.style.display = "none";
  };
  spanOption.onclick = () => {
    gameOptionModal.style.display = "none";
  };

  // When the user clicks anywhere outside of the gameRuleModal, close it
  window.onclick = (event) =>{
      if (event.target == gameRuleModal) {
          gameRuleModal.style.display = "none";
      }else if (event.target == gameOptionModal) {
          gameOptionModal.style.display = "none";
      }
  };

}
