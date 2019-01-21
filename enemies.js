function Enemies() {
  this.width = 90,
  this.height = 75,

  this.posY = 0,
  this.posX = 1500,

  Enemies.prototype.move = function(){
    
  }

  Enemies.prototype.shoot = function(){

  }
}

function createEnemies(){
  var badEnemy = new Enemies();
  badEnemy.posY += Math.random()*800;
  groupEnemies.push(badEnemy);
  };

function enemiesMovement(newCtx){
    setInterval(function(){
      newCtx.clearRect(0,0,1600,800);
      Game.drawBackground(newCtx);
      Game.drawPlayer(newCtx);
      for(var i = 0; i < groupEnemies.length; i++){
        Game.drawEnemy(newCtx,i)
        groupEnemies[i].posX--
      }
    },1000/60);

    setInterval(function(){
      createEnemies();
    },3000)
  };




  
// var enemies = {
//   width: 90,
//   height: 75,
//   posY: 200,
//   posX: 1500,

//   enemyMove: function(){

//   },

//   enemyShoot: function(){

//   }
// };
// Obstacle.prototype.draw = function() {
//   this.game.ctx.fillStyle = "black";
//   this.game.ctx.fillRect(this.x, this.y, this.w, this.h);
// };

// Obstacle.prototype.move = function() {
//   this.x -= this.dx;
// };
