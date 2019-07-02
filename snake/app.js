let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

canvas.height = 768;
canvas.width = 768;
let gridSize = 32;

let easyButton = document.getElementById('easy-mode');
let easyMode = false;

let gameSpeed = 125;  //125

let world = new World(canvas.width, canvas.height, gridSize, 'images/background.png')
let food = new Food(/*'images/food.png'*/ gridSize);
let snake = new Snake(gridSize, null);

//let currentDirection;

let animate = true;
let pause = false;

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
    snake.move(snake.currentDirection);
    collisionCheck();
    snake.draw();
    //snake.didSnakeEatFood(food.xPos, food.yPos);
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
    if (snake.body[0].x == food.xPos && snake.body[0].y == food.yPos)
    {
        snake.grow = true;
        score++;
        needNewFood = true;
        
        //Snake ran into wall
        //     if(!easyMode)
        //     {
        //         if(snake[0].x <= 0 || snake[0].x === 23 * gridSize)
        //         {
        //             animate = false;
        //         }

        //         if(snake[0].y === gridSize * 2 || snake[0].y === 23 * gridSize)
        //         {
        //             animate = false;
        //         }
        //     }

        //     if(easyMode)
        //     {
        //         //Update Code
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