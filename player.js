//todo: avoid unused variables and/or parameters
function Player(game) {

  this.width = 100,
  this.height = 120,

  this.posY = 410,
  this.posX = 20,
  
  this.game = game,

  this.vel = [];
  
  this.setListener()

  this.bullets = [];
  
  this.playerImg = new Image();
  this.playerImg.src = ("img/vaquero1.png");

  this.drunk = false;

  this.counterLife = 3;
  
  this.heart = new Image();
  this.heart.src = ("img/lifeCounter.png");
  this.heart.frames = 3;
  this.heart.frameIndex = 0;
};
  
  Player.prototype.draw = function() {
    this.game.ctx.drawImage(this.playerImg, this.posX, this.posY, this.width, this.height);
  
    this.bullets.forEach(function(bullet) {
      bullet.draw();
      bullet.move();
    });
    this.drawLife();
    
  }

  Player.prototype.drawLife = function(){
    this.game.ctx.drawImage(
      this.heart,
      0,
      this.heart.frameIndex * Math.floor(this.heart.height / this.heart.frames),
      this.heart.width,
      this.heart.height / this.heart.frames,
      20,
      20,
      100,
      40
      )
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

        case 13:
        this.game.initialGame = false;
        if (this.game.stopGame) {
          this.game.ctx.clearRect(0,0,window.innerWidth, window.innerHeight);
          this.game.repeat();
          this.game.stopGame = false;
        }
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


  Player.prototype.shoot = function(){
    var bullet = new Bullet(this.game.ctx, this.posX + this.width, this.posY + this.height / 2);
    this.bullets.push(bullet);
    this.shootSong = new Audio("audio/Gun+357+Magnum.mp3");
    this.shootSong.play();
  }

  }