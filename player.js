var player1 = {
  posY: 410,
  posX: 0,
  width: 80,
  height: 100,

  moveUp: function(){
    if (this.posY > 50) {
      this.posY -= 100;
    }
  },

  moveDown: function(){
    if (this.posY < 700) {
      this.posY += 100;
    }
  },

  shoot: function(){

  }
};

if (player1.posY > window.innerHeight || player1.posY < 0) {
  console.log(hola)
  player1.posY *= -1;
};