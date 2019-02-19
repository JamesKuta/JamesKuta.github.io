function Paddle(x, y, width, height, color)
{
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
}

Paddle.prototype.move = function(mouseX)
{
    
    this.x = mouseX - canvas.width * this.width / 2;
    
}

Paddle.prototype.draw = function()
{
    context.fillStyle = this.color;
    context.fillRect(this.x, canvas.height * this.y, canvas.width * this.width, canvas.height * this.height);
    
}

