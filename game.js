var groupEnemies = [];
var Game = {
  canvas: undefined,
  ctx: undefined,
  fps: 60,
  scoreBoard: undefined,
  
  start: function (canvadId) {
    this.canvas = document.getElementById(canvadId);
    this.ctx = this.canvas.getContext("2d");
    this.fps = 60;
    
    this.drawAll(this.ctx)
    
  },

  drawBackground: function(newCtx){
    var backgroundImg = new Image();
    backgroundImg.src = ("img/background.png");
    newCtx.drawImage(backgroundImg, background.posX, background.posY, background.width, background.height);
  },
  
  
  drawPlayer: function(newCtx){
    var cowboy = new Image();
    cowboy.src = ("img/vaquero1.png");
    newCtx.drawImage(cowboy, player1.posX, player1.posY, player1.width, player1.height);
  },

  drawEnemy: function (newCtx,i){
    var enemy = new Image();
    enemy.src = ("img/gorro.png");
    newCtx.drawImage(enemy, groupEnemies[i].posX, groupEnemies[i].posY, groupEnemies[i].width, groupEnemies[i].height);
  },


  drawAll: function (newCtx) {
    var IntervalID = setInterval(function(){

    console.log(player1.background);

    newCtx.clearRect(0,0,1000,600);
    Game.drawBackground(newCtx);
    Game.drawPlayer(newCtx);
    enemiesMovement(newCtx);
    },1000)
  }
};


