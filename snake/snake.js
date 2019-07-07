function Snake(gridSize, currentDirection, image)
{
    this.gridSize = gridSize;
    this.currentDirection = currentDirection;
    this.grow = false;
    this.snakeImage = new Image();
    this.snakeImage.src = image;

    this.body =
        [
            {
                x: ((canvas.width / this.gridSize) / 2) * this.gridSize,
                y: ((canvas.height / this.gridSize) / 2) * this.gridSize,
            }
        ];

    // this.headOneMoveAgo =

    //     {
    //         x: this.body[0].x,
    //         y: this.body[0].y,
    //     };

    this.newSnakeHead =
        {
            x: this.body[0].x,
            y: this.body[0].y,
        };
    
        this.move = function () 
        {
            //move head to new position
            if (!gameOver)
            {
                if (this.currentDirection === 'left')
                {
                    this.newSnakeHead =
                        {
                            x: this.body[0].x - gridSize,
                            y: this.body[0].y
                        };
                }
    
                if (this.currentDirection === 'right')
                {
                    //get head of snake and remember it
                    this.newSnakeHead =
                        {
                            x: this.body[0].x + gridSize,
                            y: this.body[0].y
                        };
                }
    
                if (this.currentDirection === 'up')
                {
                    //get head of snake and remember it
                    this.newSnakeHead =
                        {
                            x: this.body[0].x,
                            y: this.body[0].y - gridSize
                        };
                }
    
                if (this.currentDirection === 'down')
                {
                    //get head of snake and remember it
                    this.newSnakeHead =
                        {
                            x: this.body[0].x,
                            y: this.body[0].y + gridSize
                        };
                }
            }
        }

    this.draw = function ()
    {
        if (!collision)
        {
            this.animateSnake();
        }

        for (let i = 0; i < this.body.length; i++)
        {
            if (i == 0)
            {

                if (this.currentDirection == 'right' || this.currentDirection == 'start')
                {
                    context.drawImage(this.snakeImage, 0, 0, this.gridSize, this.gridSize, this.body[0].x, this.body[0].y, this.gridSize, this.gridSize);
                }

                if (this.currentDirection == 'left')
                {
                    context.drawImage(this.snakeImage, 96, 0, this.gridSize, this.gridSize, this.body[0].x, this.body[0].y, this.gridSize, this.gridSize);
                }

                if (this.currentDirection == 'up')
                {
                    context.drawImage(this.snakeImage, 32, 0, this.gridSize, this.gridSize, this.body[0].x, this.body[0].y, this.gridSize, this.gridSize);
                }

                if (this.currentDirection == 'down')
                {
                    context.drawImage(this.snakeImage, 64, 0, this.gridSize, this.gridSize, this.body[0].x, this.body[0].y, this.gridSize, this.gridSize);
                }

            } else if (i == this.body.length - 1)
            {
                context.drawImage(this.snakeImage, 160, 0, this.gridSize, this.gridSize, this.body[i].x, this.body[i].y, this.gridSize, this.gridSize);
            } else
            {
                context.drawImage(this.snakeImage, 128, 0, this.gridSize, this.gridSize, this.body[i].x, this.body[i].y, this.gridSize, this.gridSize);
            }
        }
    }

    this.animateSnake = function ()
    {
        this.body.unshift(this.newSnakeHead);
        if (!this.grow)
        {
            this.body.pop();
            return;
        } else
        {
            this.grow = false;
            return;
        }
    }
}