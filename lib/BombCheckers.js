let canvas = document.getElementById('canvas');

var context = canvas.getContext('2d');

function createColorForGrid(color1 =(254), color2 = (0)){
  var colorGrid = new Array(8);
  var fillbox = true;
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

function setup(){
  
}

function drawBoard(){
  context.rect(0, 0, 600, 600);
  context.stroke();
  let colors = createColorForGrid();
  for (let i = 0 ; i < 8; i++){
    for (let j = 0 ; j < 8; j++){
      context.stroke(0);
      context.fill(colors[i][j]);
      let x = i * 75 ;
      let y = j * 75;
      context.rect(x, y, 75, 75);
    }
  }
}

drawBoard();
