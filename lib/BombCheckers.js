
let ctx;
$( ()=>{
  let c = document.getElementById("canvas");
  c.width  = 600;
  c.height = 600;
  ctx = c.getContext("2d");
  draw();
});


function draw() {
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
  drawImges();
}

function drawImges(){
  let baseImage = new Image();
  baseImage.src = './asset/images/bomb-fire.png';
  baseImage.onload = function(){
  ctx.drawImage(baseImage, 0 , 0, 75, 75 );
};
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
