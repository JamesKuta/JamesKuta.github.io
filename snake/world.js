function World(width, height, gridSize, image)
{
    this.width = width;
    this.height = height;
    this.gridSize = gridSize;
    this.background = new Image();
    this.background.src = image;

    this.draw = function ()
    {
        context.drawImage(this.background, 0, 0);

        let jamesTextLine1 = 'SNAKE GAME';
        let jamesTextLine2 = 'A game for James. It was an old game. It was 100 years ago!'

        //Game Name Text line 1
        context.font = "900 40px Comic Sans MS";
        context.fillStyle = '#022107'; //#7BF300
        context.textAlign = 'center';
        context.fillText(jamesTextLine1, canvas.width / 2, 40);

        //Game Name Text line 2
        context.font = "900 20px Comic Sans MS";
        context.fillStyle = '#022107'; //#7BF300
        context.textAlign = 'center';
        context.fillText(jamesTextLine2, canvas.width / 2, 758);

        //Score Fruit
        context.fillStyle = '#de0d14';
        context.fillRect(this.gridSize, 2 * this.gridSize, this.gridSize, this.gridSize);
        context.strokeStyle = 'red';
        context.strokeRect(0, 0, canvas.width, canvas.height);

        //Score Text
        context.font = "900 38px Comic Sans MS";
        context.fillStyle = '#022107';
        context.textAlign = 'left';
        context.fillText(score, 2 * this.gridSize + 4, 3 * this.gridSize - 2);
    }
}