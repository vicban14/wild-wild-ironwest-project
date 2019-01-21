window.onload = function() {
  
  Game.start("canvas");
};


function setCanvasDimensions() {
  var canvasDOMElement = document.querySelector('canvas');
  canvasDOMElement.setAttribute("height", window.innerHeight);
  canvasDOMElement.setAttribute("width", window.innerWidth);
}