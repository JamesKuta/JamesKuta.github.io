function Ball(x, y, radius, color)
{
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.speedX = .005;
    this.speedY = -.005;
}

Ball.prototype.move = function()
{
    this.x += this.speedX;
    this.y += this.speedY;
}

Ball.prototype.draw = function()
{
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(canvas.width * this.x, canvas.height * this.y, canvas.width * this.radius, 0, 2 * Math.PI);
    context.fill();
}