let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

canvas.height = 768;
canvas.width = 768;
let gridSize = 32;
let gameOver = false;

let easyButton = document.getElementById('easy-mode');
let easyMode = false;

let gameSpeed = 155;  //125

let world = new World(canvas.width, canvas.height, gridSize, 'images/background.png')
let food = new Food(/*'images/food.png'*/ gridSize);
let snake = new Snake(gridSize, null, 'images/headSprite.png');

let animate = true;
let pause = false;
let collision = false;

let needNewFood = true;

setLimiter = 0;
deltaLimiter = 0;

let score;

window.onload = function ()
{
    //resize();
    init();
    mainLoop();
}

function init()
{
    score = 0;
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
    if (needNewFood)
    {
        food.createNewFood();
        needNewFood = false;
    }
    food.draw();
    snake.move();
    collisionCheck();    
    snake.draw();
}

function drawRect(x, y, w, h, color)
{
    context.fillStyle = color;
    context.fillRect(x, y, w, h);
    context.strokeStyle = '#000000';
    context.strokeRect(x, y, w, h);
}



function collisionCheck()
{
    //Snake ate food?
    if (snake.newSnakeHead.x == food.xPos && snake.newSnakeHead.y == food.yPos)
    {
        snake.grow = true;
        score++;
        if(score % 5 == 0 && gameSpeed != 15)
        {
            gameSpeed -= 10;
        }
        needNewFood = true;
    }

    //Snake ran into wall
    if (!easyMode)
    {
        if (snake.newSnakeHead.x < world.gridSize || snake.newSnakeHead.x > 22 * world.gridSize)
        {
            gameOver = true;
            collision = true;
            //gameOverKill();
            //animate = false;
        }

        if (snake.newSnakeHead.y < world.gridSize * 3 || snake.newSnakeHead.y > 22 * world.gridSize)
        {
            gameOver = true;
            collision = true;
            //gameOverKill();
            //animate = false;
        }
    }

    if (easyMode)
    {
        //James wants an option to go through walls.
    }

    
    //Snake hit itself
    for(let i = 1; i < snake.body.length; i++)
    {
        if(snake.newSnakeHead.x == snake.body[i].x && snake.newSnakeHead.y == snake.body[i].y)
        {
            gameOver = true;
            collision = true;

            //animate = false;
        }
    }
}

function gameOverKill()
{
    for(let i = 0; i < snake.body.length; i++)
    {
        snake.body.pop();
    }
}

document.onkeydown = function (e)
{
    //console.log(e.keyCode);
    switch (e.keyCode)
    {
        case 37:
            if (snake.currentDirection != 'right')
            {
                snake.currentDirection = 'left';
            }
            break;

        case 38:
            if (snake.currentDirection != 'down')
            {
                snake.currentDirection = 'up';
            }
            break;

        case 39:
            if (snake.currentDirection != 'left')
            {
                snake.currentDirection = 'right';
            }
            break;

        case 40:
            if (snake.currentDirection != 'up')
            {
                snake.currentDirection = 'down';
            }
            break;
    }
};

function easyModeSelect() 
{
    if (!easyMode)
    {
        easyMode = true;
        if (easyButton.classList.contains('btn-danger'))
        {
            easyButton.classList.remove('btn-danger');
            easyButton.classList.add('btn-success');
        }
        easyButton.innerHTML = 'ON';
    } else
    {
        easyMode = false;
        if (easyButton.classList.contains('btn-success'))
        {
            easyButton.classList.remove('btn-success');
            easyButton.classList.add('btn-danger');
        }
        easyButton.innerHTML = 'OFF';
    }
}

easyButton.addEventListener('click', easyModeSelect);