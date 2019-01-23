function Bullet(ctx, x, y) {

  this.posX = x,
  this.posY = y,

  this.height = 5,
  this.width = 5,

  this.r = 5,

  this.vx = 10,
  this.vy = 1,

  this.ctx = ctx

}

Bullet.prototype.draw = function() {
  this.ctx.beginPath();
  this.ctx.fillStyle = "black";
  this.ctx.arc(this.posX, this.posY, this.r, 0, Math.PI * 2);
  this.ctx.fill();
  this.ctx.closePath();
}

Bullet.prototype.move = function() {
  this.posX += this.vx;
};