//todo: avoid unused variables and/or parameters
function Background(ctx) {

  this.width = window.innerWidth,
  this.height = window.innerHeight,
  this.posX = 0,
  this.posY = 0,

  this.ctx = ctx,

  this.backgroundImg = new Image();
  //todo: this image filename could come from the gameconfig file, e.g. you could rteplace "img/background.png" with gameConfig.backgroundImageName
  this.backgroundImg.src = ("img/background.png");
  
};

Background.prototype.draw = function() {
  this.ctx.drawImage(this.backgroundImg, this.posX, this.posY, this.width, this.height);
};