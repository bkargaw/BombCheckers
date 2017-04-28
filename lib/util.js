// below this is the logic for the explosion rendering

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

export function _isInbound(x, y){
  if ( x >= 0 && x <= 7  && y >= 0 && y <= 7 ) return true;
  return false;
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
