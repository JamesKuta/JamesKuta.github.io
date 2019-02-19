let Display = function (canvas)
{
    this.bufferCanvas = document.createElement('canvas').getContext('2d');
    this.gameCanvas = canvas;
    this.context = this.gameCanvas.getContext('2d');
    this.gameCanvas.width = document.documentElement.clientWidth - 32;
    this.gameCanvas.height = document.documentElement.clientHeight - 32;
    this.aspectWidth = 90;
    this.aspectHeight = 160;
    this.aspectRatio = this.aspectHeight / this.aspectWidth;
    console.log(this.aspectRatio);
    this.gameCanvas.height = document.documentElement.clientHeight - 32;
    this.gameCanvas.width = document.documentElement.clientWidth - 32;
    console.log(this.bufferCanvas);
    console.log(this.gameCanvas);



//set buffer canvas height and width to aspect height and width
this.bufferCanvas.canvas.height = this.aspectHeight;
this.bufferCanvas.canvas.width = this.aspectWidth;
}

Display.prototype.clear = function ()
{
    this.bufferCanvas.fillStyle = 'black';
    this.bufferCanvas.fillRect(0, 0, this.bufferCanvas.canvas.width, this.bufferCanvas.canvas.height);
};

Display.prototype.resize = function ()
{
    display.render();
};

Display.prototype.drawCircle = function (obj)
{
    this.bufferCanvas.fillStyle = obj.color;
    this.bufferCanvas.beginPath();
    this.bufferCanvas.arc(obj.x, obj.y, obj.radius, 0, 2 * Math.PI);
    this.bufferCanvas.fill();
}

Display.prototype.drawRectangle = function (obj)
{
    this.bufferCanvas.fillStyle = obj.color;
    if (obj.hasOwnProperty('gap'))
    {
        this.bufferCanvas.fillRect(obj.x, obj.y, obj.width - obj.gap, obj.height - obj.gap);
    } else
    {
        this.bufferCanvas.fillRect(obj.x, obj.y, obj.width, obj.height);
    }
}

Display.prototype.writePause = function()
{
    display.bufferCanvas.font = "30px Comic Sans MS";
    display.bufferCanvas.fillStyle = 'white';
    display.bufferCanvas.textAlign = "center";
    display.bufferCanvas.fillText("Paused", display.bufferCanvas.width / 2, display.bufferCanvas.height / 2 );
}

Display.prototype.writeClickToShoot = function()
{
    display.bufferCanvas.font = "30px Comic Sans MS";
    display.bufferCanvas.fillStyle = 'white';
    display.bufferCanvas.textAlign = "center";
    display.bufferCanvas.fillText("Press Mouse Button To Shoot", display.bufferCanvas.width / 2, display.gameCanvas.height / 2 );
}

Display.prototype.render = function()
{
    display.gameCanvas.width = document.documentElement.clientWidth - 32;
    display.gameCanvas.height = document.documentElement.clientHeight - 32;
    if(display.gameCanvas.height / display.gameCanvas.width > display.aspectRatio)
    {
        display.gameCanvas.height = display.gameCanvas.width * display.aspectRatio;
        display.gameCanvas.width = display.gameCanvas.width;
    } else
    {
        display.gameCanvas.height = display.gameCanvas.height;
        display.gameCanvas.width = display.gameCanvas.height / display.aspectRatio;
    }
    display.context.imageSmoothingEnabled = false;
    display.context.drawImage(display.bufferCanvas.canvas, 0, 0, display.gameCanvas.width, display.gameCanvas.height);
}