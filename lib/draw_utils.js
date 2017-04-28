      export function drawThePieces(ctx, board){
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
              drawAPiece(ctx, img, piece.x , piece.y, scale);
            }else {
              img.onload = ()=> drawAPiece(ctx, img, scaledX , scaledY, scale);
            }
          }
        }
      }
    }

    function drawAPiece(ctx, baseImage, x , y, scale){
      ctx.drawImage(baseImage, x * scale , y * scale, 75, 75 );
    }

    export function highlightPos(ctx, i, j, highlightColor){
      let x = i * 75 ;
      let y = j * 75;
      ctx.beginPath();
      ctx.rect(x, y, 75, 75);
      ctx.fillStyle = highlightColor;
      ctx.fill();
    }

    export function ChengeBackgroundColor(board, col1, col2){
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
    export function _createColorForGrid(color1, color2){
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

    export function draw() {
      drawBackGround(ctx, c, color1, color);
      drawThePieces(ctx, board);
    }

    export function drawBackGround(ctx, c, color1, color2 ) {
      ctx.clearRect(0,0,c.width, c.height);
      let colors = _createColorForGrid(color1, color2);
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

  export function CreateBackgroundOptionCanvases() {
    // background option canvas 2
    cBackGround2 = $("#background2")[0];
    cBackGround2.width  = 100;
    cBackGround2.height = 100;
    cBackGround2Ctx2 = cBackGround2.getContext("2d");
    cBackGround2.addEventListener('click',
          DrawUtil.ChengeBackgroundColor('rgb(249, 189, 129)', 'rgb(255, 55, 0)'));

    // background option canvas 1
    cBackGround1 = $("#background1")[0];
    cBackGround1.width  = 100;
    cBackGround1.height = 100;
    cBackGround1Ctx1 = cBackGround1.getContext("2d");
    cBackGround1.addEventListener('click',
          DrawUtil.ChengeBackgroundColor('rgb(68, 62, 62)', 'white'));

    // background option canvas original
    cBackGroundOriginal = $("#backgroundOrignal")[0];
    cBackGroundOriginal.width  = 100;
    cBackGroundOriginal.height = 100;
    cBackGroundOriginalCtx = cBackGroundOriginal.getContext("2d");
    cBackGroundOriginal.addEventListener('click',
          DrawUtil.ChengeBackgroundColor('rgb(173, 168, 168)', 'red'));
  }

  export function drawTheBackgroundOptions() {
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
