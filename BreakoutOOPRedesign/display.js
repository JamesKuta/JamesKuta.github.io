let Display = function (canvas)
{
    this.gameCanvas = canvas;
    this.context = this.gameCanvas.getContext('2d');
    this.gameCanvas.width = window.innerWidth - 32;
    this.gameCanvas.height = window.innerHeight - 32;
}

Display.prototype.clear = function ()
{
    this.context.fillStyle = 'black';
    this.context.fillRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
};

Display.prototype.resize = function ()
{
    canvas.width = window.innerWidth - 32;
    canvas.height = window.innerHeight - 32;
};

Display.prototype.drawCircle = function (obj)
{
    this.context.fillStyle = obj.color;
    this.context.beginPath();
    this.context.arc(obj.x, obj.y, obj.radius, 0, 2 * Math.PI);
    this.context.fill();
}

Display.prototype.drawRectangle = function (obj)
{
    this.context.fillStyle = obj.color;
    if (obj.hasOwnProperty('gap'))
    {
        this.context.fillRect(obj.x, obj.y, obj.width - obj.gap, obj.height - obj.gap);
    } else
    {
        this.context.fillRect(obj.x, obj.y, obj.width, obj.height);
    }
}

Display.prototype.writePause = function()
{
    display.context.font = "30px Comic Sans MS";
    display.context.fillStyle = 'white';
    display.context.textAlign = "center";
    display.context.fillText("Paused", display.gameCanvas.width / 2, display.gameCanvas.height / 2 );
}

Display.prototype.writeReadyToShoot = function()
{
    display.context.font = "30px Comic Sans MS";
    display.context.fillStyle = 'white';
    display.context.textAlign = "center";
    display.context.fillText("Press Mouse Button to Shoot", display.gameCanvas.width / 2, display.gameCanvas.height / 2 );
}