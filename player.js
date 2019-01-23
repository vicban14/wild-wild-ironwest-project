//todo: avoid unused variables and/or parameters
function Player(ctx, x, y, w, h) {

  this.width = 100,
  this.height = 120,

  this.posY = 410,
  this.posX = 20,
  
  this.ctx = ctx,

  this.vel = [];
  
  this.setListener()

  this.bullets = [];
  
  this.playerImg = new Image();
  this.playerImg.src = ("img/vaquero1.png");

  this.drunk = false;
  this.doubleVelocity = false;

  this.counterLife = 3;
  
};
  
  Player.prototype.draw = function() {
    this.ctx.drawImage(this.playerImg, this.posX, this.posY, this.width, this.height);
  
    this.bullets.forEach(function(bullet) {
      bullet.draw();
      bullet.move();
    });
  }

  Player.prototype.functionDrunk = function() {
    this.drunk = true;
    setTimeout(() => {
      this.drunk = false;
    }, 3000)
  }

  Player.prototype.faster = function() {
    this.doubleVelocity = true;
    setTimeout(() => {
      this.doubleVelocity = false;
    }, 5000)
  }


  Player.prototype.moveUp = function(){
    if (this.posY > 50) {
      if (!this.velocity){
        this.posY -= 100;
      } else {
        this.posY -= 200;
      }
    }
  },

  Player.prototype.moveDown = function(){
    if (this.posY < 700) {
    this.posY += 100;
    }
  },

  Player.prototype.moveRight = function(){
    if (this.posX > 0) {
      this.posX += 100;
    }
    if (this.posX > 1600) {
      this.posX = 1580;
    }
  }

  Player.prototype.moveLeft = function(){
    if (this.posX < 1600) {
      if (!this.doubleVelocity){
        this.posX -= 100;
      } else {
        this.posX -= 200;
      }
    }
    if (this.posX < 0) {
      this.posX = 20;
    }
  }

  
  Player.prototype.setListener = function(){
    document.onkeydown = function(e) {
      switch(e.keyCode){
        case 38:
        //todo: consider that by having an if-else statement here you are constrained to only two types of situations
        if (!this.drunk) {
          this.moveUp();
        } else {
          this.moveDown();
        }
        break;

        case 40:
        if (!this.drunk) {
          this.moveDown();
        } else {
          this.moveUp();
        }
        break;

        case 32:
        this.shoot();
        break;

        case 39:
        if (!this.drunk) {
          this.moveRight();
        } else {
          this.moveLeft();
        }
        break;

        case 37:
        if (!this.drunk) {
          this.moveLeft();
        } else {
          this.moveRight();
        }
        break;
      }
    }.bind(this)

  // Player.prototype.setListener = function(){
  //   document.onkeydown = function(e) {
  //     switch(e.keyCode){
  //       case 38:
  //         this.moveUp();
  //       break;

  //       case 40:
  //         this.moveDown();
  //       break;

  //       case 32:
  //       this.shoot();
  //       break;

  //       case 39:
  //       this.moveRight();
  //       break;

  //       case 37:
  //         this.moveLeft();
  //       break;
  //     }
  //   }.bind(this)


  Player.prototype.shoot = function(){
    var bullet = new Bullet(this.ctx, this.posX + this.width, this.posY + this.height / 2);
    this.bullets.push(bullet);
  }

  }