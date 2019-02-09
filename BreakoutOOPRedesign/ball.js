function Ball(x, y, radius, color)
{
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.speedX = 5;
    this.speedY = 5;
}

Ball.prototype.move = function()
{
    this.x += this.speedX;
    this.y += this.speedY;
}