function Food(gridSize, image)
{
    this.xPos = 0;
    this.yPos = 0;
    this.gridSize = gridSize
    this.foodImage = new Image();
    this.foodImage.src = image;

    this.createNewFood = function ()
    {

        this.xPos = Math.floor(Math.random() * 20 + 2) * this.gridSize;
        this.yPos = Math.floor(Math.random() * 17 + 5) * this.gridSize;
    }

    this.draw = function ()
    {
        if (!gameOver)
        {
            context.drawImage(this.foodImage, 0, 0, this.gridSize, this.gridSize, this.xPos, this.yPos, this.gridSize, this.gridSize)
        }
    }
}
