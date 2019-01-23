var Game = {
  canvas: undefined,
  ctx: undefined,
  fps: 60,
  scoreBoard: 0,
  groupEnemies: [],
  player: undefined,
  background: undefined,
  framesCounter: 0,
  weapon: undefined,
  groupWeapons: [],


  start: function (canvadId) {

    this.canvas = document.getElementById(canvadId);
    this.ctx = this.canvas.getContext("2d");
    this.fps = 60;

    this.player = new Player(this.ctx);

    this.createBackground();
    this.createNewWeapon();

    // this.score += 10


    this.repeat()

  },

  createEnemy: function(x,y) {
    this.groupEnemies.push(new Enemy(this.ctx, x, y))
  },

  createBackground: function() {
    this.background = new Background(this.ctx);
  },

  createNewWeapon: function() {
    this.groupWeapons.push(new Weapon(this.ctx))
  },

  //todo: consider removing functions not adding extra value to the code
  //call this.background.draw() instead of drawBackground as it adds no extra value
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

  drawWeapons: function (){
    this.groupWeapons.forEach(function(weapon, i){
      weapon.draw();
    })
  },

  // consider using object literals for strings that are used in several places or often
  // CollisionTypes = {
  //   bulletEnemy : "bullet-enemy",
  //   bulletPlayer : "bullet-player"
  // }

  //todo: consider adding meaningful parameter to every function
  collision: function(arg1,arg2, keyarg1, keyarg2, type, index){

        if (arg1.posX < arg2.posX + arg2.width &&
            arg1.posX + arg1.width > arg2.posX &&
            arg1.posY < arg2.posY + arg2.height &&
            arg1.height + arg1.posY > arg2.posY) {
            
            //todo: consider using here an object literal as in CollisionTypes.bulletEnemy
            if (type === "bullet-enemy"){
              this.player.bullets.splice(keyarg1, 1);
              this.groupEnemies.splice(keyarg2, 1);

            } else if (type === "bullet-player"){
              this.groupEnemies[index].enemyBullets.splice(keyarg2, 1);
              this.player.counterLife--;

                if (this.player.counterLife === 0){
                  delete this.player;
              }
            
            } else {
              if (type === 0){
                this.groupEnemies = [];
              }
              if (type === 1){
                this.player.functionDrunk()
              }
              // if (type === 2){
              //   this.player.liveUp()
              // }
              this.groupWeapons.splice(keyarg2, 1)
            }
            

          }
  },
  
  
  

  clearEnemies: function () {
        this.groupEnemies = this.groupEnemies.filter(function (enemy) {
          return enemy.posX > 0;
    });
},

  clearBullets: function(){
    this.player.bullets = this.player.bullets.filter(function (bullet) {
    return bullet.posX < 1600;
      })
  },

  repeat: function (){
    var IntervalID = setInterval(()=>{
      this.ctx.clearRect(0,0,1600,800);
        this.drawBackground();
        this.drawPlayer();
        this.drawEnemy();
        this.drawWeapons();
        this.clearEnemies();
        this.clearBullets();
        this.player.bullets.forEach(function(bullet, bulletKey) {
          this.groupEnemies.forEach(function(enemy, enemyKey){
            Game.collision(bullet, enemy, bulletKey, enemyKey, "bullet-enemy")
          })
        }.bind(this));
  
          this.groupWeapons.forEach(function(weapon, weaponKey){
            this.collision(this.player, weapon, undefined, weaponKey, weapon.effect)
          }.bind(this));
          

          this.groupEnemies.forEach((enemy, enemyIndex) =>{
            enemy.enemyBullets.forEach(function(bullet, bulletKey){
                this.collision(this.player, bullet, undefined, bulletKey, "bullet-player", enemyIndex)
              }.bind(this));
              if (enemy.enemyBullets = enemy.enemyBullets.filter(function (bullet) {
                return bullet.posX > 0;
                  })){
              }
          })
  


        this.framesCounter++;

    if (this.framesCounter > 10000) {
      this.framesCounter = 0;
    }

    //todo: consider adding config variables to avoid values like 200
    //   if (this.framesCounter % GameConfig.framesUpdateLimit === 0) { instead of    if (this.framesCounter % 200 === 0) {
    if (this.framesCounter % 200 === 0) {
      this.createEnemy(1400, 700);
    }

    if (this.framesCounter % 100 === 0) {
      this.createNewWeapon();

    }

  
      },1000/this.fps)
  }


};


