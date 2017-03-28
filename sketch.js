var cnv;
var waterBomb;
function preload() {
waterBomb = loadImage("asset/images/bomb-water.png");
}
function setup() {
cnv = createCanvas(601, 601);
centerCanvas();
cnv.parent('GAME-holder');
image(waterBomb, 0, 0);
}

function createColorForGrid(color1 = (254), color2 = (0)){
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


function draw() {
rect(0, 0, 600, 600);
let colors = this.createColorForGrid();
for (let i = 0 ; i < 8; i++){
  for (let j = 0 ; j < 8; j++){
    stroke(0);
    fill(colors[i][j]);
    let x = i * 75 ;
    let y = j * 75;
    rect(x, y, 75, 75);
  }
  }
}

function centerCanvas() {
var x = (windowWidth - width) / 2;
var y = (windowHeight - height) / 2;
cnv.position(x, y);
}

function windowResized() {
centerCanvas();
}
