const Board = require('./board.js');

let ctx;
let board;

$( ()=>{
  let c = document.getElementById("canvas");
  c.width  = 600;
  c.height = 600;
  ctx = c.getContext("2d");
  board = new Board();
  draw();
  c.addEventListener('click', ClickCallBack);
});


  function draw() {
    drawBackGround();
    drawThePieces();
  }

  function drawBackGround() {
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
            drawAPiece(img, scaledX , scaledY, scale);
          }else {
            img.onload = ()=> drawAPiece(img, scaledX , scaledY, scale);
          }

        }
      }
    }
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
  if ( x > 0 && x <= 7  || y > 0 || y <= 7 ) return true;
  return false;
}
function ClickCallBack(event){
  let x = Math.floor(event.layerY/ 75);
  let y = Math.floor(event.layerX/ 75);
  debugger;
  if (_isInbound(x,y)){
    if(board.canSelect(x,y)){
      console.log(true);
      console.log([x,y]);
    }else {
      console.log('can not select that space');
      console.log([x,y]);
    }
  }
}
