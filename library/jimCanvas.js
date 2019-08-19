function JimCanvasClass(width, height, color)
{
    /** CONSTRUCTOR **/

    //Properties of Class
    this.width = width;
    this.height = height;
    this.color = color;
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.canvas.setAttribute("style", 'background-color: ' + this.color + ';');

    //Add Canvas to HTML Body
    document.body.appendChild(this.canvas);
}

/** METHODS **/

//Draw a filled rectangle
JimCanvasClass.prototype.fRect = function(posX, posY, width, height, strColor)
{
    this.ctx.fillStyle = strColor;
    this.ctx.fillRect(posX, posY, width, height);
    this.ctx.fill();
};

//Draw a non filled rectangle
JimCanvasClass.prototype.sRect = function(posX, posY, width, height, strColor, boarderWidth = 1)
{   
    this.ctx.save(); 
    this.ctx.strokeStyle = strColor;
    this.ctx.lineWidth = boarderWidth;
    this.ctx.beginPath();
    this.ctx.strokeRect(posX, posY, width, height);
    this.ctx.closePath();
    this.ctx.stroke();
    this.ctx.restore();
    
};

//Clear a rectangle area
JimCanvasClass.prototype.cRect = function(posX, posY, width, height)
{
    this.ctx.clearRect(posX, posY, width, height);
};

//Draw a filled circle
JimCanvasClass.prototype.fCircle = function(posX, posY, radius, strColor)
{
    this.fillStyle = strColor;
    this.ctx.arc(posX, posY, radius, 0, 2 * Math.PI);
    this.ctx.fill();
};

// Draw a non filled circle that keeps radius regardless of line width
JimCanvasClass.prototype.sCircle = function(posX, posY, radius, strColor, boarderWidth = 1)
{
    this.ctx.save();    
    this.ctx.strokeStyle = strColor;
    this.ctx.lineWidth = boarderWidth;
    this.ctx.beginPath();
    this.ctx.arc(posX, posY, radius - (boarderWidth / 2), 0, 2 * Math.PI);
    this.ctx.closePath();
    this.ctx.stroke();
    this.ctx.restore();
    
};

