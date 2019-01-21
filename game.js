
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
      console.log(player)
        for (var b = 0; b < Player.bullets.length; b++){
          for (var e = 0; e < this.groupEnemies.length; e++){
            if(bullets[b].posX + bullets[b].width > groupEnemies[e].posX && groupEnemies[e].posX + groupEnemies[e].width > bullets[b].posX && bullets[b].posY + bullets[b].height > groupEnemies[e].posY && groupEnemies[e].posY + groupEnemies[e].height > bullets[b].posY){
              groupEnemies.splice[e, 1];
              player.bullets.splice[b, 1];
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
        
        

      // this.player.bullets.forEach(function(bullet){
      // })


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


