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
