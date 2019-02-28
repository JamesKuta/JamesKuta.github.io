function Ball(x, y, radius, color)
{
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.speedX = 0;
    this.speedY = 0;
    this.shadowBlur = this.radius * canvas.width;
    this.offsetX = 0;
    this.offsetY = 0;
    this.count = 0;
    
}

Ball.prototype.move = function()
{
    this.x += this.speedX;
    this.y += this.speedY;
}

Ball.prototype.drop = function()
{
    if (this.radius * canvas.width >= 5)
    {
    
    this.radius = this.radius - .0025;
    this.shadowBlur = (this.radius * canvas.width);
    this.offsetX = this.radius * canvas.width -5 ;
    this.offsetY = this.radius * canvas.width -5;
    } 
    else
    {
        this.shatter();
    }
}

Ball.prototype.draw = function()
{
    let radian = Math.PI / 180;
    
    context.beginPath();
    context.fillStyle = this.color;
    context.shadowColor = 'black';
    context.shadowOffsetX = this.offsetX;
    context.shadowOffsetY = this.offsetY;
    context.shadowBlur = this.shadowBlur;
    context.arc(canvas.width * this.x, canvas.height * this.y, canvas.width * this.radius, 0 * radian, 360 * radian);
    context.fill();
}

Ball.prototype.shatter = function()
{
    
    dropArray.shift();
    //console.log("shatter");

}