function Background(ctx, x, y, w, h) {

  this.width = 1600,
  this.height = 800,
  this.posX = 0,
  this.posY = 0,

  this.ctx = ctx,

  this.backgroundImg = new Image();
  this.backgroundImg.src = ("img/background.png");
  
}

Background.prototype.draw = function() {
  this.ctx.drawImage(this.backgroundImg, this.posX, this.posY, this.width, this.height);
}

;
