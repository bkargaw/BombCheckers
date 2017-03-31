# BombCheckers
  [BombCheckers live](https://bkargaw.github.io/BombCheckers/)

## Background
  BombCheckers is inspired by the classic game of checkers but with a twist. The game will be played by one player. the twist on the classic game is that there will be three different piece types on each player's side.  

### piece types
  1. classic checkers piece
  2. bomb checkers piece
  3. shield checkers piece

  The back row will have the *classic* checker pieces. The second row will contain
  *shield* piece which will move  and behave like classic piece but will be impervious to any explosion.The last pice type will be a *bomb* pieces that move and behave like classic checker pieces but will explode when it captures the other players piece; during the aforementioned explosion any piece within one gird space from the explosion except shield pieces on any player's side will die form the explosion.

## Functionality & MVP

  BombCheckers will allow the use  to:

  * Start, and reset the game board
  * Play the game and have it behave as described above
  * Will be able to pause and play music as needed
  * add ai

  In addition, this project will include:

  * An About modal describing the background and rules of the game
  * A production Readme


## Wireframes
  The app will be a single page app the will allow the user to interact with the game as well as allow them to style the board, toggle music on and off, and toggle the game rules modal on and off. The page will also have a link to a video that show the basic game play that will serve as an alternative or supplementary to the game rules modal.

![alt text](https://github.com/bkargaw/BombCheckers/blob/master/docs/wireframes/BombChecker.png)

## Architecture and Technologies
  * js for game logic
  * p5.js for creating graphics(p5.dom) and hosting audio(p5.sound)
##### Main scripts in the app
  * game.js  - This script will be responsible to organizing the turns and making high level decisions like check if the game is over, who whose turn it is  and getting the user input.
  * board.js - This will be responsible on hosting all the pieces, creating the board layout and style, and handeling logic like move a piece, check if a move is valid and so on...
  * pieces.js - this will be the default piece object class and will hold all the properties of a classic checkers piece and will act like the super class to the other piece classes
  * bombpiece.js - this will be a class that holds properties and functions that only apply to bomb pieces (sub-class of piece)
  * shieldpiece.js - this will be a class that holds properties and functions that only apply to shield piece (sub-class of piece)

## Implementation Timeline

### day 1
    * learn how to use the canvas element from HTML5
    * learn the p5 Library and find important method that will aid in the creation of the game, sound and modals  
      1. how to place images
      2. how to create a board
      3. how to host music and allow for easy user control
    * find out how to get a 2d explosion animation
    * create a basic board and place it on the canvas
    * create the skeleton needed to create all the classes needed to run the game

### day 2
    * write the board class which will
      1. create the default placing of the pieces
      2. define all the methods that check game logics
    * write the piece class that will be the super class of bomb and shield pieces
    * write the bomb and shield classes overwriting the needed methods
### day 3
    * finished any unfinished classes
    * create and add modal that explains the game rules
    * start adding audio to the game
### day 4
    * debug and test any edge cases
    * finish adding audio
    * create multiple board color schemes and add them to the page as buttons to toggle between different styles
    * style the page for the end product
    * create a demo video

# Bonus features
  * Choose from different styling of the board (color of squares)
  * enable both single and multiple player modes
  * be able to play from different machines (look at firebase)
