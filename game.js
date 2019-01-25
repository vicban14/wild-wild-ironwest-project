var Game = {

  canvas: undefined,
  ctx: undefined,
  fps: 60,
  scoreBoard: ScoreBoard,
  groupEnemies: [],
  player: undefined,
  background: undefined,
  framesCounter: 0,
  weapon: undefined,
  groupWeapons: [],
  stopGame: false,
  initialGame: true,
  imgStart: new Image(),
  imgGameOver: new Image(),
  intervalID: undefined,
  
  
  


  start: function (canvadId) {

    this.canvas = document.getElementById(canvadId);
    this.ctx = this.canvas.getContext("2d");
    this.fps = 60;
    this.setCanvasDimensions();
    this.player = new Player(this);
    this.imgGameOver.src = "./img/game-over.png";
    this.imgStart.src = "./img/initial-scene.png";
    this.createBackground();
    this.createNewWeapon();



    this.repeat()


  },

  reset: function () {

    this.groupEnemies = [];
    this.groupWeapons = [];
    this.player = new Player(this);
    this.scoreBoard.score = 0;
    

    this.start()

  },

  setCanvasDimensions: function() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
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
      enemy.move();
      if (enemy.posX === 20){
        this.player.counterLife--;
        this.player.heart.frameIndex++;     
      }
    }.bind(this))
  },

  drawWeapons: function (){
    this.groupWeapons.forEach(function(weapon, i){
      weapon.draw();
    })
  },

  drawCounterLife: function (){
    this.player.drawLife()
  },

  gameOver: function (){
    if (this.player.counterLife === 0){

        this.ctx.clearRect(0,0,window.innerWidth, window.innerHeight);
        this.ctx.drawImage(this.imgGameOver, 0, 0, window.innerWidth, window.innerHeight);
        this.deadSong = new Audio("audio/dead.mp3");
        this.deadSong.play();
        this.gameSong.pause();
        this.stopGame = true;
        clearInterval(this.intervalID)
        this.reset();
    }
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
              this.victorySong = new Audio("audio/allright.mp3");
              this.victorySong.play();
              this.scoreBoard.score++
              

            } else if (type === "bullet-player"){
              this.groupEnemies[index].enemyBullets.splice(keyarg2, 1);
              this.player.counterLife--;
              this.player.heart.frameIndex++;
              
              this.screamDeath = new Audio ("audio/grito-wilhelm.mp3"),
              this.screamDeath.play();
              

              //   if (this.player.counterLife === 0){
              //     delete this.player;
              // }             
            } else {
              if (type === 0){
                this.groupEnemies = [];
                this.explosionSong = new Audio("audio/Explosion+2.mp3");
                this.explosionSong.play();
              }
              if (type === 1){
                this.player.functionDrunk()
                this.drunkSong = new Audio("audio/eructo_de_barney_gumble.mp3");
                this.drunkSong.play();
              }
              if (type === 2){
                this.healthSong = new Audio("audio/Hans Topo - Dabuten colegas.mp3");
                this.healthSong.play();
                if (this.player.counterLife < 3){

                  this.player.counterLife++;
                  this.player.heart.frameIndex--;
                }
              }
              if (type === 3){
                this.moneySong = new Audio("audio/coin.wav");
                this.moneySong.play();
                this.scoreBoard.score += 10;
              }
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
    return bullet.posX < window.innerWidth;
      })
  },

  repeat: function (){
    this.intervalID = setInterval(()=>{

      this.ctx.clearRect(0,0,window.innerWidth,window.innerHeight);

      if (this.initialGame) {
        this.ctx.drawImage(this.imgStart, 0, 0, window.innerWidth, window.innerHeight);
      } else {

        this.ctx.clearRect(0,0,window.innerWidth,window.innerHeight);

        this.drawBackground();
        this.drawPlayer();
        this.drawEnemy();
        this.drawWeapons();
        this.clearEnemies();
        this.clearBullets();
        this.drawCounterLife();

        this.scoreBoard.update(this.ctx)
        
        //collisions
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

    if (this.framesCounter > 30000) {
      this.framesCounter = 0;
    }

    if (this.framesCounter === 1){
      this.gameSong = new Audio("audio/TOY STORY HAY UN AMIGO EN MÍ (CANCIÓN ORIGINAL ESPAÑOL) CON LETRA.mp3");
      this.gameSong.play();
    }

    //todo: consider adding config variables to avoid values like 200
    //   if (this.framesCounter % GameConfig.framesUpdateLimit === 0) { instead of    if (this.framesCounter % 200 === 0) {
    if (this.framesCounter % 100 === 0) {
      this.createEnemy(window.innerWidth, 700);
    }

    if (this.framesCounter % 300 === 0) {
      this.createNewWeapon();
    }

    if (this.framesCounter % 400 === 0) {
      this.randomSong = new Audio("audio/hay-una-serpiente-en-mi-bota.mp3");
      this.randomSong.play();
    }

    this.gameOver();


      }
  
      },1000/this.fps)
  },

  
  // reset: function () {
  //   this.scoreBoard = ScoreBoard
  //   this.framesCounter = 0;
  // }

}
