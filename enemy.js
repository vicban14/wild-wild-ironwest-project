function Enemy(ctx, x, y, w, h) {
  
  this.width = 100,
  this.height = 120,

  this.posY = Math.random()*700,
  this.posX = x,

  this.ctx = ctx,

  this.enemy = new Image(),
  this.enemy.src = ("img/enemy.png")

}

Enemy.prototype.move = function(){
  this.posX -= 5;
  this.draw();
}

Enemy.prototype.draw = function() {
  this.ctx.drawImage(this.enemy, this.posX, this.posY, this.width, this.height);
}

Enemy.prototype.shoot = function(){

}