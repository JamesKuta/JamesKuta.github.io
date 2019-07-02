function Snake(gridSize, currentDirection)
{
    this.gridSize = gridSize;
    this.currentDirection = currentDirection;
    this.grow = false;

    this.body =
        [
            {
                x: ((canvas.width / this.gridSize) / 2) * this.gridSize,
                y: ((canvas.height / this.gridSize) / 2) * this.gridSize
            }
        ];

    this.draw = function ()
    {
        for (let i = 0; i < this.body.length; i++)
        {
            let color = context.fillStyle = (i == 0) ? "#022107" : "#ccf3bc";
            drawRect(this.body[i].x, this.body[i].y, this.gridSize, this.gridSize, color);
        }
    }

    this.move = function () 
    {
        if (this.currentDirection === 'left')
        {
            //get head of snake and remember it
            let snakeHead =
            {
                x: this.body[0].x - gridSize,
                y: this.body[0].y
            };

            this.body.unshift(snakeHead);
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

        if (this.currentDirection === 'right')
        {
            //get head of snake and remember it
            let snakeHead =
            {
                x: this.body[0].x + gridSize,
                y: this.body[0].y
            };

            this.body.unshift(snakeHead);
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

        if (this.currentDirection === 'up')
        {
            //get head of snake and remember it
            let snakeHead =
            {
                x: this.body[0].x,
                y: this.body[0].y - gridSize
            };

            this.body.unshift(snakeHead);
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

        if (this.currentDirection === 'down')
        {
            //get head of snake and remember it
            let snakeHead =
            {
                x: this.body[0].x,
                y: this.body[0].y + gridSize
            };

            this.body.unshift(snakeHead);
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

    this.didSnakeEatFood = function (foodX, foodY)
    {
        if (this.body[0].x == foodX && this.body[0].y == foodY)
        {
            this.grow = true;
            if (this.currentDirection === 'left')
            {
                //get head of snake and remember it
                let snakeHead =
                {
                    x: this.body[0].x - gridSize,
                    y: this.body[0].y
                };

                this.body.unshift(snakeHead);
                score++;
                needNewFood = true;
            }

            if (this.currentDirection === 'right')
            {
                //get head of snake and remember it
                let snakeHead =
                {
                    x: this.body[0].x + gridSize,
                    y: this.body[0].y
                };

                this.body.unshift(snakeHead);
                score++;
                needNewFood = true;
            }

            if (this.currentDirection === 'up')
            {
                //get head of snake and remember it
                let snakeHead =
                {
                    x: this.body[0].x,
                    y: this.body[0].y - gridSize
                };

                this.body.unshift(snakeHead);
                score++;
                needNewFood = true;
            }

            if (this.currentDirection === 'down')
            {
                //get head of snake and remember it
                let snakeHead =
                {
                    x: this.body[0].x,
                    y: this.body[0].y + gridSize
                };

                this.body.unshift(snakeHead);
                score++;
                needNewFood = true;
            }
        }
    }

}