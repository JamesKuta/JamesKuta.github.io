let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

canvas.height = 768;
canvas.width = 768;
let gridSize = 32;

let easyButton = document.getElementById('easy-mode');
let easyMode = false;

let gameSpeed = 125;

let world = new World(canvas.width, canvas.height, gridSize, 'images/background.png')
let food = new Food(/*'images/food.png'*/ gridSize);

let currentDirection;

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

window.onload = function ()
{
    //resize();
    init();
    mainLoop();
}

function init()
{
    score = 0;
    snake[0].x = ((canvas.width / gridSize) / 2) * gridSize;
    snake[0].y = ((canvas.height / gridSize) / 2) * gridSize;
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
    world.draw();
    if(needNewFood)
    {
        food.createNewFood();
        needNewFood = false;
    }
    food.draw();
    moveSnake();
    
    
    //collisionCheck();
}

function drawRect(x, y, w, h, color)
{
    context.fillStyle = color;
    context.fillRect(x, y, w, h);
    context.strokeStyle = '#000000';
    context.strokeRect(x, y, w, h);
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