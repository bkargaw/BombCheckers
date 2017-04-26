# BombCheckers
[BombCheckers live](https://bkargaw.github.io/BombCheckers/)

BombCheckers is a javaScript game inspired by the classic game of checkers but with a twist. The twist is that there will be three different piece types on each player's side. Each side will have four *classic* checker pieces in the back rank. The second rank will contain *shield* piece which will move  and behave like classic piece but will be impervious to any explosion. The last piece type will be a *bomb* pieces that move and behave like classic checker pieces but will explode when it captures the other players piece; during the aforementioned explosion any piece within one gird space from the explosion except shield pieces on any player's side will die form the explosion. The game can be played in one or two player mode.

![alt text](https://github.com/bkargaw/BombCheckers/blob/master/docs/Live_Pics/initial_board.png)


### Tools Used
  javaScript - front-end coding language
  HTML5 & CSS3 - site structure and styling
  jQuery - to manipulate the DOM
  Github - online repository
  Github Pages - live site host

### Features & Implementation

#### UI
  The user interface was implemented using click event listener on the canvas and mapping the pix location of the click to grid index that represents the location of the space on the canvas. From there the game checks game checks it the click event is valid input to the game and changes the state of the game based on the current state of the game. After the change has been made the game will render the changed state or will render and error of the input was not a valid input.

  ```js
  c.addEventListener('click', handleClickFromUser);

  function handleClickFromUser(event){
    let x = Math.floor(event.layerX / 75);
    let y = Math.floor(event.layerY / 75);
    if (_isInbound(x,y)){
      if(board.canSelect(x,y)){
        if (board.select(x,y)){
          // move the piece
          let bombPiece = board.pieces[x][y];
          board.endTurn();
          let clearDeadPieces = () => bombPiece.explode(x,y);
          let moveComputer = () => board.runComputersTurn();
          startAnim((x * 75) - 90 , (y * 75) - 90, clearDeadPieces, moveComputer);
        }else {
          // select the piece to move
          drawBackGround();
          highlightPos(x, y);
          drawThePieces();
        }
      }else {
        // error for invalid selection
        tellUserError('Invalid move',200,300);
      }
    }
  }
  ```


#### Explosion Animation
  The explosion animation was created using sprite image overlaying. At the event of an explosion the game will figure out where the explosion should take place by converting grid location to pix values. Then the game will grab the already loaded explosion sprite image and loops over the sequence of explosion images and renders them on the canvas on top off each other at 16.5 frames per second. After that the back ground and pieces are redrawn and regular play continues.

  ```js
  // call to draw one image from explosion sprite 16 frame per second
  intval = setInterval(function(){drawFrame(locx, locy,
    clearDeadPieces, moveComputer);},60);

  // The function that draw the image @x,y
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
      drawBackGround();
      drawThePieces();
      moveComputer();
    }
  }
  ```

###### Before Capturing With a Bomb

  ![alt text](https://github.com/bkargaw/BombCheckers/blob/master/docs/Live_Pics/before_explosion.png)

###### During Capturing With a Bomb
  ![alt text](https://github.com/bkargaw/BombCheckers/blob/master/docs/Live_Pics/after_explosion.png)

#### Computer Player
  The current computer player is a basic implementation of a game ai. It first loops trough all its pieces and select all the ones that can move this turn. Then it sorts them based on which on is the most advanced and tries to see if that piece can capture this turn, if not checks if that piece which directions are possible to move then it choose that move. The allow for the game play agains a computer but it is not ideal. note: further improvements are in the works.

### Future Directions for the Project
##### objective: allow 2 player mode to be played from different machines
    1. look into firebase in order to implement this feature
##### objective: create a better computer player
    1. use game tree logic in order to better choose a better move
    2. allow the user to choose the level of the computer player (changes how deep the game three will be)
    3. guarantee at worst a tie for the computer when the level is at max.
