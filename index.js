window.onload = function() {
  Game.start("canvas");
  

  document.onkeydown = function(e) {
    switch(e.keyCode){
      case 38:
      player1.moveUp();
      console.log("arriba")
      break; 
      case 40:
      player1.moveDown();
      console.log("abajo")
      break;
    }
  }
};


function setCanvasDimensions() {
  var canvasDOMElement = document.querySelector('canvas');
  canvasDOMElement.setAttribute("height", window.innerHeight);
  canvasDOMElement.setAttribute("width", window.innerWidth);
}