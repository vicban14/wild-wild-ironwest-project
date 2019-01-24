//todo: avoid unused variables and/or parameters
function Weapon(ctx) {
    this.width = 50,
    this.height = 50,
    this.posX = Math.random() * 800,
    this.posY = Math.random() * 700,
    this.ctx = ctx,
    this.effect = undefined;
    this.weaponImg = new Image();
    this.chooseImageWeapon();

    this.groupWeapons = [];

}

Weapon.prototype.chooseImageWeapon = function() {

  this.effect = Math.floor(Math.random() * 4)

  if (this.effect === 0) {
    this.weaponImg.src = "img/tnt.png"
  } else if (this.effect === 1){
    this.weaponImg.src = "img/whiskey-bottle2.png"
    this.width = 35;
    this.height = 70;
  } else if (this.effect === 2){
    this.weaponImg.src = "img/coeur-pixel.png"
  } else {
    this.weaponImg.src = "img/coin.png"
  }
}

Weapon.prototype.draw = function() {

    this.ctx.drawImage(
      this.weaponImg,
      this.posX,
      this.posY,
      this.width,
      this.height
    );
};


