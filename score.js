var ScoreBoard = {
  score: 0,
  update: function (ctx) {
      ctx.font = "50px sans-serif";
      ctx.fillStyle = "black";
      ctx.fillText(Math.floor(this.score), innerWidth/2 + 70, 70);

      ctx.fillText("Score: ", innerWidth/2 - 100, 70);
  }
}