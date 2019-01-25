//todo: avoid unused variables and/or parameters
function Enemy(ctx, x) {
  
  this.width = 100,
  this.height = 120,
  this.frames = 0,
  this.posY = Math.random()*700,
  this.posX = x,

  this.ctx = ctx,

  this.enemyBullets = [],

  this.enemy = new Image(),
  this.enemy.src = ("img/enemy.png")

}

Enemy.prototype.move = function(){
  this.posX -= 3;
  this.draw();
}

Enemy.prototype.draw = function() {

  this.frames ++
  this.ctx.drawImage(this.enemy, this.posX, this.posY, this.width, this.height);

  var enemyBullet = new EnemyBullet(this.ctx, this.posX + this.width, this.posY + this.height / 2);
  
  if (this.frames % 110 === 0) {
    this.enemyBullets.push(enemyBullet);
    this.shootSong = new Audio("audio/Gun+357+Magnum.mp3");
    this.shootSong.play();
  }

  this.enemyBullets.forEach(function(enemyBullet) {
    enemyBullet.draw();
    enemyBullet.move();
  });
}