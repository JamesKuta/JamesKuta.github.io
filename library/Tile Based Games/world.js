/* 
    This is a class for creating Tile based game worlds.
    The canvas created will fill the entire screen width and height.
    The constructor takes a width and height to create the aspect ration.
    Example: 16 x 9.

    Created by James Kuta
    08/18/2019
*/

function World(screenWidthRatio, screenHeightRatio)
{
    //set the aspect ratio for the world
    this.screenWidthRatio = screenWidthRatio;
    this.screenHeightRatio = screenHeightRatio;
    this.aspectRatio = screenHeightRatio / screenWidthRatio;

    //create canvas element
    this.canvas = document.createElement('canvas');
    this.canvas.setAttribute('id', 'canvas');
    this.context = this.canvas.getContext('2d');

    //set canvas starting height and width
    this.canvas.width = document.documentElement.clientWidth;
    this.canvas.height = document.documentElement.clientHeight;
}

World.prototype.clearScreen = function ()
{
    this.context.fillStyle = 'black';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
}

World.prototype.resize = function ()
{
    this.canvas.width = document.documentElement.clientWidth;
    this.canvas.height = document.documentElement.clientHeight;
    if (this.canvas.height / this.canvas.width > this.aspectRatio)
    {
        this.canvas.height = this.canvas.width * this.aspectRatio;
        this.canvas.width = this.canvas.width;
    } else
    {
        this.canvas.height = this.canvas.height;
        this.canvas.width = this.canvas.height / this.aspectRatio;
    }
};

World.prototype.getRow = function (someObject, tileHeight)
{
    return Math.floor(someObject / tileHeight);
};

World.prototype.getColumn = function (someObject, tileWidth)
{
    return Math.floor(someObject / tileWidth);
};

World.prototype.getIndexAtRowAndColumn = function (someObjectX, someObjectY, tileH, tileW, levelRows, levelCols)
{
    let getCurrentRow = this.getRow(this.canvas.height * someObjectY, this.canvas.height * tileH);
    let getCurrentColomn = this.getColumn(this.canvas.width * someObjectX, this.canvas.width * tileW);

    if (getCurrentRow >= 0 && getCurrentRow < levelRows &&
        getCurrentColomn >= 0 && getCurrentColomn < levelCols) // fix edge wrap
    {
        return getCurrentRow * levelCols + getCurrentColomn;
    }
};

World.prototype.randomRange = function(min, max)
{
    return Math.random() * (max - min) + min;
};


