let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

let easyButton = document.getElementById('easy-mode');
let easyMode = false;

let gameSpeed = 125;

let background = new Image();
background.src = 'images/background.png';

let foodImg = new Image();
foodImg.src = 'images/food.png';


canvas.height = 768;
canvas.width = 768;

let currentDirection;

let gridSize = 32;

let animate = true;
let pause = false;

let needNewFood = true;

setLimiter = 0;
deltaLimiter = 0;

let score;

let snake =
    [
        {
            x: 0,
            y: 0,
        },

    ];

let food =
    [
        {
            x: 3 * gridSize,
            y: 6 * gridSize
        }
    ];

window.onload = function ()
{
    //resize();
    init();
    mainLoop();
}

function init()
{
    score = 0;
    snake[0].x = 12 * gridSize;
    snake[0].y = 12 * gridSize;
    draw();
}

function mainLoop(timeStamp)
{
    if (animate)
    {
        requestAnimationFrame(mainLoop);

    }

    if (!pause)
    {
        if ((timeStamp - setLimiter) > gameSpeed)
        {
            draw();
            setLimiter = timeStamp;
        }
    }
}

function draw()
{
    drawBackground();
    createFood();
    drawFood();
    moveSnake();
    
    
    collisionCheck();
}

function drawBackground()
{

    let jamesTextLine1 = 'SNAKE GAME';
    let jamesTextLine2 = 'A game for James. It was an old game. It was 100 years ago!'
    
    //Main Field
    context.drawImage(background, 0, 0);

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
    context.fillRect(gridSize, 2 * gridSize, gridSize, gridSize);
    context.strokeStyle = 'red';
    context.strokeRect(0, 0, canvas.width, canvas.height);

    //Score Text
    context.font = "900 38px Comic Sans MS";
    context.fillStyle = '#022107';
    context.textAlign = 'left';
    context.fillText(score, 2 * gridSize + 4, 3 * gridSize - 2);

    //draw Snake

}

function drawRect(x, y, w, h, color)
{
    context.fillStyle = color;
    context.fillRect(x, y, w, h);
    context.strokeStyle = '#000000';
    context.strokeRect(x, y, w, h);
}

function createFood()
{
    if (needNewFood)
    {
        let xPos = Math.floor(Math.random() * 20 + 2) * gridSize;
        let yPos = Math.floor(Math.random() * 17 + 5) * gridSize;
        let newFood =

        {
            x: xPos,
            y: yPos
        };

        food.pop()
        food.unshift(newFood);
        needNewFood = false;
    }
}

function moveSnake()
{
    if (currentDirection === 'left')
    {
        //get head of snake and remember it
        let snakeHead =
        {
            x: snake[0].x - gridSize,
            y: snake[0].y
        };

        snake.unshift(snakeHead);
        snake.pop();
    }

    if (currentDirection === 'right')
    {
        //get head of snake and remember it
        let snakeHead =
        {
            x: snake[0].x + gridSize,
            y: snake[0].y
        };

        snake.unshift(snakeHead);
        snake.pop();
    }

    if (currentDirection === 'up')
    {
        //get head of snake and remember it
        let snakeHead =
        {
            x: snake[0].x,
            y: snake[0].y - gridSize
        };

        snake.unshift(snakeHead);
        snake.pop();
    }

    if (currentDirection === 'down')
    {
        //get head of snake and remember it
        let snakeHead =
        {
            x: snake[0].x,
            y: snake[0].y + gridSize
        };

        snake.unshift(snakeHead);
        snake.pop();
    }

    for (let i = 0; i < snake.length; i++)
    {
        let color = context.fillStyle = (i == 0) ? "#022107" : "#ccf3bc";
        drawRect(snake[i].x, snake[i].y, gridSize, gridSize, color);
    }

}

function drawFood()
{
    context.fillStyle = '#de0d14';
    drawRect(food[0].x, food[0].y, gridSize, gridSize);
}

function collisionCheck()
{
    //Snake ate food?
    if (snake[0].x == food[0].x && snake[0].y == food[0].y)
    {
        if (currentDirection === 'left')
        {
            //get head of snake and remember it
            let snakeHead =
            {
                x: snake[0].x - gridSize,
                y: snake[0].y
            };

            snake.unshift(snakeHead);
            score++;
            needNewFood = true;
        }

        if (currentDirection === 'right')
        {
            //get head of snake and remember it
            let snakeHead =
            {
                x: snake[0].x + gridSize,
                y: snake[0].y
            };

            snake.unshift(snakeHead);
            score++;
            needNewFood = true;
        }

        if (currentDirection === 'up')
        {
            //get head of snake and remember it
            let snakeHead =
            {
                x: snake[0].x,
                y: snake[0].y - gridSize
            };

            snake.unshift(snakeHead);
            score++;
            needNewFood = true;
        }

        if (currentDirection === 'down')
        {
            //get head of snake and remember it
            let snakeHead =
            {
                x: snake[0].x,
                y: snake[0].y + gridSize
            };

            snake.unshift(snakeHead);
            score++;
            needNewFood = true;
        }
    }

    //Snake ran into itself?
    for(let i = 1; i < snake.length; i++)
    {
        if(snake[0].x === snake[i].x && snake[0].y === snake[i].y)
        {
            animate = false;
        }
    }

    //Snake ran into wall
    if(!easyMode)
    {
        if(snake[0].x <= 0 || snake[0].x === 23 * gridSize)
        {
            animate = false;
        }

        if(snake[0].y === gridSize * 2 || snake[0].y === 23 * gridSize)
        {
            animate = false;
        }
    }

    if(easyMode)
    {
        //Update Code
    }
}

document.onkeydown = function (e)
{
    //console.log(e.keyCode);
    switch (e.keyCode)
    {
        case 37:
            if (currentDirection != 'right')
            {
                currentDirection = 'left';
            }
            break;

        case 38:
            if (currentDirection != 'down')
            {
                currentDirection = 'up';
            }
            break;

        case 39:
            if (currentDirection != 'left')
            {
                currentDirection = 'right';
            }
            break;

        case 40:
            if (currentDirection != 'up')
            {
                currentDirection = 'down';
            }
            break;
    }
};

function easyModeSelect() 
{
    if(!easyMode)
    {
        easyMode = true;
        if(easyButton.classList.contains('btn-danger'))
        {
            easyButton.classList.remove('btn-danger');
            easyButton.classList.add('btn-success');
        }
        easyButton.innerHTML = 'ON';
    } else
    {
        easyMode = false;
        if(easyButton.classList.contains('btn-success'))
        {
            easyButton.classList.remove('btn-success');
            easyButton.classList.add('btn-danger');
        }
        easyButton.innerHTML ='OFF';
    }
}

easyButton.addEventListener('click', easyModeSelect);