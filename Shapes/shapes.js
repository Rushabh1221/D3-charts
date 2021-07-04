const draw = () => {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "green";
    // Rectangle and Square
    ctx.fillRect(10, 10, 60, 60);
    ctx.fillRect(100, 10, 90, 60);
    // Circle
    ctx.beginPath();
    ctx.arc(250, 40, 32, 0, 2 * Math.PI);
    ctx.fill();
    // Triangle
    ctx.beginPath();
    ctx.moveTo(10, 160);
    ctx.lineTo(90, 160);
    ctx.lineTo(50, 110);
    ctx.closePath();
    ctx.fill();
    // Oval
    ctx.save();
    ctx.scale(2, 1);
    ctx.beginPath();
    ctx.arc(72, 130, 25, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
    // Semi-circle
    ctx.beginPath();
    ctx.arc(250, 120, 40, 0, Math.PI);
    ctx.fill();
};
  