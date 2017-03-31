# BombCheckers
[BombCheckers live](https://bkargaw.github.io/BombCheckers/)

### Tools Used
  javaScript - front-end coding language
  HTML5 & CSS3 - site styling
  github - online repository
  github pages - live site host

### Features & Implementation

#### UI
  The user interface was implemented using click event listener on the canvas and mapping the pix location of the click to grid index that represents the location of the space on the canvas. From there the game checks game checks it the click event is valid input to the game and changes the state of the game based on the current state of the game. After the change has been made the game will render the changed state or will render and error of the input was not a valid input.


#### explosion animation
  The explosion animation was created spite image overlaying. At the event of an explosion the game will figure out where the explosion should take place by converting grid location to pix values. Then the game will grab the already loaded explosion sprite image and loops over the sequence of explosion images and renders them on the canvas on top off each other at 16.5 frames per second. After that the back ground and pieces are redrawn and regular play continues.

#### computer player
  The current computer player is a crowed implementation of a game ai. It first loops trough all its pieces and select all the ones that can move this turn. Then it sorts them based on which on is the most advanced and tries to see if that piece can capture this turn, if not checks if that piece which directions are possible to move then it choose that move. The allow for the game play agains a computer but it is not ideal. note: further improvements are in the works. 

### Future Directions for the Project
##### objective: allow 2 player mode to be played from different machines
    1. look into firebase in order to implement this feature
##### objective: create a better computer player
    1. use game tree logic in order to better Choose a better turn
    2. guarantee at worst a tie for the computer.
    3. allow the user to choose the level of the computer player
