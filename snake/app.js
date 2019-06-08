let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

let easyButton = document.getElementById('easy-mode');
let easyMode = false;

let gameSpeed = 125;

let background = new Image();
background.src = 'images/background.png';

let foodImg = new Image();
foodImg.src = 'images/food.png';


//let height = 4;
//let width = 4;
//let aspectRatio = height / width;

let jamesTextLine1 = 'ROKU SNAKE GAME';
let jamesTextLine2 = 'A game for James. It was an old game. It was 100 years ago!'
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

        {
            x: 13 * gridSize,
            y: 12 * gridSize,
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
    render();
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
            render();
            setLimiter = timeStamp;
        }
    }
}

function update()
{

}

function render()
{
    draw();
}

function draw()
{
    //clearScreen();
    drawBackground();
    moveSnake();
    createFood();
    drawFood();
    collisionCheck();
}

function clearScreen()
{
    context.fillStyle = 'silver';
    context.fillRect(0, 0, canvas.width, canvas.height);
}

function drawBackground()
{
    //Main Field
    // context.fillStyle = '#679933';
    // context.fillRect(0, 0, canvas.width, canvas.height);
    // context.strokeStyle = 'red';
    // context.strokeRect(0, 0, canvas.width, canvas.height);
    context.drawImage(background, 0, 0);

    //Score area
    // context.fillStyle = '#20241c';
    // context.fillRect(0, 0, canvas.width, 3 * gridSize);

    //Game Name Text line 1
    context.font = "20px Comic Sans MS";
    context.fillStyle = '#7BF300'; //#7BF300
    context.textAlign = 'center';
    context.fillText(jamesTextLine1, canvas.width / 2, 20);

    //Game Name Text line 2
    context.font = "20px Comic Sans MS";
    context.fillStyle = '#7BF300'; //#7BF300
    context.textAlign = 'center';
    context.fillText(jamesTextLine2, canvas.width / 2, 40);

    //Score Fruit
    context.fillStyle = '#b9e1b6';
    context.fillRect(0, 1 * gridSize, gridSize, gridSize);
    context.strokeStyle = 'red';
    context.strokeRect(0, 0, canvas.width, canvas.height);

    //Score Text
    context.font = "38px Comic Sans MS";
    context.fillStyle = '#7BF300';
    context.textAlign = 'left';
    context.fillText(score, gridSize +4, 2 * gridSize - 2);

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
        let color = context.fillStyle = (i == 0) ? "#87ff0d" : "#ffffff";
        drawRect(snake[i].x, snake[i].y, gridSize, gridSize, color);
    }

}

function drawFood()
{
    context.fillStyle = '#b9e1b6';
    drawRect(food[0].x, food[0].y, gridSize, gridSize);
    //context.drawImage(foodImg, food[0].x, food[0].y);
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
    console.log('test');
}

easyButton.addEventListener('click', easyModeSelect);

// function resize()
// {
//     canvas.width = document.documentElement.clientWidth;
//     canvas.height = document.documentElement.clientHeight;
//     if (canvas.height / canvas.width > aspectRatio)
//     {
//         canvas.height = canvas.width * aspectRatio;
//         canvas.width = canvas.width;
//     } else
//     {
//         canvas.height = canvas.height;
//         canvas.width = canvas.height / aspectRatio;
//     }
//     init();
//     render();
// }

//window.addEventListener('resize', resize);

// function getRandomArbitrary(min, max) 
// {
//     return Math.random() * (max - min) + min;
// }