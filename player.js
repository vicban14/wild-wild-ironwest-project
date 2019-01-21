function Player(ctx, x, y, w, h) {

  this.width = 100,
  this.height = 120,

  this.posY = 410,
  this.posX = 20,
  
  this.ctx = ctx,
  
  this.setListener()
  this.bullets = [];
  
  this.playerImg = new Image();
  this.playerImg.src = ("img/vaquero1.png");
  
 
};
  
  Player.prototype.draw = function() {
    this.ctx.drawImage(this.playerImg, this.posX, this.posY, this.width, this.height);


    // this.bullets = this.bullets.filter(function(bullet) {
    //   return bullet.x < this.game.canvas.width;
    // }.bind(this));
  
    this.bullets.forEach(function(bullet) {
      bullet.draw();
      bullet.move();
    });
  }

  Player.prototype.moveUp = function(){
    if (this.posY > 50) {
      this.posY -= 100;
    }
  },

  Player.prototype.moveDown = function(){
    if (this.posY < 700) {
    this.posY += 100;
    }
  },

  
  Player.prototype.setListener = function(){
    document.onkeydown = function(e) {
      switch(e.keyCode){
        case 38:
        this.moveUp();
        console.log("arriba")
        break; 
        case 40:
        this.moveDown();
        console.log("abajo")
        break
        case 32:
        this.shoot();
        console.log("boom")
        break;
      }
    }.bind(this)

  Player.prototype.shoot = function(){
    var bullet = new Bullet(this.ctx, this.posX + this.width, this.posY + this.height / 2);
    this.bullets.push(bullet);
  }

  }

