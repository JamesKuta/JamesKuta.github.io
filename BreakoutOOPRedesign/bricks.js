function Brick(width, height, gap, color) 
{
    this.x = 0;
    this.y = 0;
    this.width = width;
    this.height = height;
    this.gap = gap;
    this.color = color;
}

Brick.prototype.draw = function() 
{
    context.fillStyle = this.color;
    context.fillRect(canvas.width * this.x, canvas.height * this.y, 
        canvas.width * this.width - canvas.width * this.gap, 
        canvas.height * this.height - canvas.width * this.gap);
}