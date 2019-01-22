
var Game = {
  canvas: undefined,
  ctx: undefined,
  fps: 60,
  scoreBoard: undefined,
  groupEnemies: [],
  player: undefined,
  background: undefined,
  framesCounter: 0,

  start: function (canvadId) {

    this.canvas = document.getElementById(canvadId);
    this.ctx = this.canvas.getContext("2d");
    this.fps = 60;

    this.player = new Player(this.ctx);

    this.createBackground()

    

    // this.score += 10


    this.repeat()

  },

  createEnemy: function(x,y) {
    this.groupEnemies.push(new Enemy(this.ctx, x, y))
  },

  createBackground: function() {
    this.background = new Background(this.ctx);
  },

  drawBackground: function(){
      this.background.draw()
  },
  
  drawPlayer: function(){
      this.player.draw()
  },

  drawEnemy: function (){
    this.groupEnemies.forEach(function(enemy, i) {
      enemy.move()
    })
  },

  clearEnemies: function () {
      
        for (var b = 0; b < this.player.bullets.length; b++){
          for (var e = 0; e < this.groupEnemies.length; e++){
            if (this.player.bullets[b].posX < this.groupEnemies[e].posX + this.groupEnemies[e].width &&
              this.player.bullets[b].posX + this.player.bullets[b].width > this.groupEnemies[e].posX &&
              this.player.bullets[b].posY < this.groupEnemies[e].posY + this.groupEnemies[e].height &&
              this.player.bullets[b].height + this.player.bullets[b].posY > this.groupEnemies[e].posY) {
               console.log("hit!!")
              this.groupEnemies.splice(e, 1);
              this.player.bullets.splice(b, 1);
          }
              

          }
        }
        this.groupEnemies = this.groupEnemies.filter(function (enemy) {
        return enemy.posX > 0;
    });
  },

  repeat: function (){
    var IntervalID = setInterval(()=>{
      this.ctx.clearRect(0,0,1600,800);
        Game.drawBackground();
        Game.drawPlayer();
        Game.drawEnemy();
        Game.clearEnemies();
        


        this.framesCounter++;

    if (this.framesCounter > 10000) {
      this.framesCounter = 0;
    }

    if (this.framesCounter % 150 === 0) {
      this.createEnemy(1400, 700);
    }

      
  
      },1000/this.fps)
  }


};


