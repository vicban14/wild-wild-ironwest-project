var ScoreBoard = {
  update: function (score, ctx) {
      ctx.font = "30px sans-serif";
      ctx.fillStyle = "green";
      //todo: please avoid hardcoded values
      ctx.fillText(Math.floor(score), 50, 50);
  }
};