function Food(/*image*/gridSize)
{
    this.xPos = 0;
    this.yPos = 0;
    this.gridSize = gridSize
    // this.image = new Image();
    // this.image.src = this.image;

    this.createNewFood = function()
    {
        
        this.xPos = Math.floor(Math.random() * 20 + 2) * this.gridSize;
        this.yPos = Math.floor(Math.random() * 17 + 5) * this.gridSize;
    }

    this.draw = function()
    {
        context.fillStyle = '#de0d14';
        drawRect(this.xPos, this.yPos, this.gridSize, this.gridSize);
    }
}
