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

    if (this.x <= 0)
    {
        this.x = 0;
    }

    if (this.x + canvas.width * this.width >= canvas.width)
    {
        this.x = canvas.width - canvas.width * this.width;
    }
    
}

Paddle.prototype.draw = function()
{
    context.fillStyle = this.color;
    context.fillRect(this.x, canvas.height * this.y, canvas.width * this.width, canvas.height * this.height);
    
}

