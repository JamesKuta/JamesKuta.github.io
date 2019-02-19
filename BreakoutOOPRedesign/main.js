let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');


let height = 160;
let width = 120;
let aspectRatio = height / width;

canvas.height = document.documentElement.clientHeight;
canvas.width = document.documentElement.clientWidth;

let mouse =
{
    x: 0,
    y: 0,
};

let levelCounter = 1;
let levelBuffer = [];

let paddle = new Paddle(mouse.x, .9, .15, .01, 'white');
let ball = new Ball(.5, .2, .010, 'white');
let brick = new Brick(.1, .03, .001, 'blue');
let level = new Levels;

let animate = false;
let pause = false;
let readyToShoot = false;
let paddleSizeCount = 0;

let lives = 3;
let score = 0;

window.onload = function ()
{
    resize();
    loadLevel(level);
    resetBallPosition();
    mainLoop();
}

function mainLoop()
{
    if (animate)
    {
        requestAnimationFrame(mainLoop);
    }

    if (!pause)
    {
        update();
    }

    render();
}

function update()
{
    if (!readyToShoot)
    {
        ball.move();
    }

    paddle.move(mouse.x);
    worldEdgesCollisionCheck();
    ballHitPaddleCollisionCheck();
    ballHitBrickCollisionCheck();
}

function render()
{

    clearScreen();

    ball.draw();

    paddle.draw();

    updateGameGrid();

    if (pause)
    {
        writePause();
    }

    if (readyToShoot)
    {
        writeClickToShoot();
    }
}

function writeClickToShoot()
{
    context.font = "15px Comic Sans MS";
    context.fillStyle = 'white';
    context.textAlign = "center";
    context.fillText("Press Mouse Button To Shoot", canvas.width / 2, canvas.height / 2);
}

function loadLevel(level)
{
    switch (levelCounter)
    {
        case 1:
            {
                levelBuffer = level.level1;
                getNumberOfBricksInLevel(levelBuffer);
                levelCounter++;

                break;
            }

        case 2:
            {
                levelBuffer = level.level2;
                getNumberOfBricksInLevel(levelBuffer);
                levelCounter++;

                break;
            }

        case 3:
            {
                levelBuffer = level.level3;
                getNumberOfBricksInLevel(levelBuffer);
                levelCounter++;

                break;
            }
    }

    animate = true;
}

function getNumberOfBricksInLevel(levelBuffer)
{
    for (let row = 0; row < levelBuffer.rows; row++)
    {
        for (let col = 0; col < levelBuffer.columns; col++)
        {
            if (levelBuffer.grid[row * levelBuffer.columns + col] > 0)
            {
                levelBuffer.count++;
            }
        }
    }
}

function updateGameGrid()
{
    for (let row = 0; row < levelBuffer.rows; row++)
    {
        for (let col = 0; col < levelBuffer.columns; col++)
        {
            if (levelBuffer.grid[row * levelBuffer.columns + col] == 1)
            {
                brick.x = col * brick.width;
                brick.y = row * brick.height;
                brick.draw(brick);
            }
        }
    }
}

function getBallRow(ballY, brickHeight) 
{

    return Math.floor(ballY / brickHeight);
}

function getBallColumn(ballX, brickWidth)
{

    return Math.floor(ballX / brickWidth);
}

function levelArrayIndexAtRowAndColumnOfBall() 
{
    let getCurrentBallRow = getBallRow(canvas.height * ball.y, canvas.height * brick.height);
    let getCurrentBallColomn = getBallColumn(canvas.width * ball.x, canvas.width * brick.width);

    if (getCurrentBallRow >= 0 && getCurrentBallRow < levelBuffer.rows &&
        getCurrentBallColomn >= 0 && getCurrentBallColomn < levelBuffer.columns) // fix edge wrap
    {
        return getCurrentBallRow * levelBuffer.columns + getCurrentBallColomn;
    }
}

function ballHitBrickCollisionCheck()
{
    let getCurrentLevelArrayIndexAtBall = levelArrayIndexAtRowAndColumnOfBall();

    if (levelBuffer.grid[getCurrentLevelArrayIndexAtBall] <= levelBuffer.columns * levelBuffer.rows &&
        levelBuffer.grid[getCurrentLevelArrayIndexAtBall] > 0) //Is the index where a brick could be and is there a brick there
    {
        let ballRowNow = getBallRow(ball.y, brick.height);
        let ballColumnNow = getBallRow(ball.x, brick.width);
        let ballRowLastFrame = getBallRow(ball.y - ball.speedY, brick.height);
        let ballColumnLastFrame = getBallColumn(ball.x - ball.speedX, brick.width);

        if (ballRowLastFrame != ballRowNow)
        {
            ball.speedY = -ball.speedY;
        }

        if (ballColumnLastFrame != ballColumnNow)
        {
            ball.speedX = -ball.speedX
        }

        levelBuffer.grid[getCurrentLevelArrayIndexAtBall] = 0;
        levelBuffer.count--;
        paddleSizeCount++;
        if (paddleSizeCount % 2 == 0)
        {
            paddle.width += .05;
        }
        if (levelBuffer.count == 0)
        {
            nextLevel();
        }

    }
}

function nextLevel()
{
    resetBallPosition();
    readyToShoot = true;
    loadLevel(level);
}

function worldEdgesCollisionCheck()
{

    if (canvas.width * ball.x - canvas.width * ball.radius < 0 && ball.speedX < 0 || canvas.width * ball.x + canvas.width * ball.radius >= canvas.width && ball.speedX > 0)
    {
        ball.speedX = -ball.speedX;
        //count++;
    }

    if (canvas.height * ball.y < 0)
    {
        ball.speedY = -ball.speedY;
        //count++;
    }

    if (canvas.height * ball.y >= canvas.height)
    {
        resetBallPosition();
        readyToShoot = true;
    }
}

function ballHitPaddleCollisionCheck()
{
    let topOfPaddle = canvas.height * paddle.y;
    let bottomOfPaddle = topOfPaddle + canvas.height * paddle.height;
    let leftSideOfPaddle = paddle.x;



    let rightSideOfPaddle = paddle.x + canvas.width * paddle.width;

    let centerOfPaddle = leftSideOfPaddle + canvas.width * paddle.width / 2;

    let setXSpeedFromCenterOffset = canvas.width * ball.x - centerOfPaddle;

    let offsetSpeedChange = .0006;


    if (canvas.width * ball.x > leftSideOfPaddle &&
        canvas.width * ball.x < rightSideOfPaddle &&
        canvas.height * ball.y > topOfPaddle &&
        canvas.height * ball.y < bottomOfPaddle)
    {
        ball.speedY = -ball.speedY;
        ball.speedX = setXSpeedFromCenterOffset * offsetSpeedChange;
    }
}

function resetBallPosition()
{
    ball.x = .5;
    ball.y = .8;
    ball.speedX = .005;
    ball.speedY = -.005;
    readyToShoot = true;
}

function clearScreen()
{
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);
}

function writePause()
{
    context.font = "30px Comic Sans MS";
    context.fillStyle = 'white';
    context.textAlign = "center";
    context.fillText("Paused", canvas.width / 2, canvas.height / 2);
}


function resize()
{
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;
    if (canvas.height / canvas.width > aspectRatio)
    {
        canvas.height = canvas.width * aspectRatio;
        canvas.width = canvas.width;
    } else
    {
        canvas.height = canvas.height;
        canvas.width = canvas.height / aspectRatio;
    }
    render();
}

window.addEventListener('resize', resize);

window.addEventListener('mousemove', function (event)
{
    let rect = canvas.getBoundingClientRect();
    mouse.x = event.clientX - rect.left;
    mouse.y = event.clientY - rect.top;
});

window.addEventListener('keydown', function (event)
{
    if (event.key == 'Escape')
    {
        if (!pause)
        {
            pause = true;
            //mainLoop();
        } else
        {
            pause = false;

        }
    }
});

window.addEventListener('click', function ()
{
    if (readyToShoot == true)
    {
        readyToShoot = false;
    }
});
