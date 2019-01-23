//todo: avoid unused variables and/or parameters
function Weapon(ctx, x, y, w, h) {
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

  this.effect = Math.floor(Math.random() * 2)

  if (this.effect === 0) {
    this.weaponImg.src = "img/clipart1815275.png"
  } else if (this.effect === 1){
    this.weaponImg.src = "img/whiskey-bottle.png"
  } else if (this.effect === 2){
    this.weaponImg.src = "img/coeur-pixel.png"
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


