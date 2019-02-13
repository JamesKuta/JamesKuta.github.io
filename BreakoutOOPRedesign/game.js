let mouse =
{
    x: 0,
    y: 0,
}

let display = new Display(document.getElementById('canvas'));
let ball = new Ball(display.gameCanvas.width / 2, display.gameCanvas.height / 2, 10, 'white');
let level = new Levels;
let brick = new Brick(display.gameCanvas.width / 10, display.gameCanvas.height / 30, 2, 'blue');
let paddle = new Paddle(mouse.x, display.gameCanvas.height * 0.9, display.gameCanvas.width * 0.15, display.gameCanvas.height / 40, 'white');
let count = 0;
let levelBuffer = [];
let levelCounter = 1;

let animate = false;
let readyToShoot = false;

window.onload = function ()
{
    display.clear();
    loadLevel(level);
    requestAnimationFrame(update);
}

function loadLevel(param_level) 
{
    switch (levelCounter)
    {
        case 1:
            {
                levelBuffer = param_level.level1;
                getNumberOfBricksInLevel(levelBuffer);
                levelCounter++;
                console.log(levelCounter);
                break;
            }

        case 2:
            {
                levelBuffer = param_level.level2;
                getNumberOfBricksInLevel(levelBuffer);
                levelCounter++;
                console.log(levelCounter);
                break;
            }
    }

    animate = true;
}

function getNumberOfBricksInLevel(param_levelBuffer)
{
    for (let row = 0; row < param_levelBuffer.rows; row++)
    {
        for (let col = 0; col < param_levelBuffer.columns; col++)
        {
            if (param_levelBuffer.grid[row * param_levelBuffer.columns + col] > 0)
            {
                param_levelBuffer.count++;
            }
        }
    }

    //return param_levelBuffer.count;
}

function resetBallPosition(param_ball)
{

    param_ball.x = paddle.x + paddle.width / 2;
    param_ball.y = paddle.y;
    param_ball.speedX = 3;
    param_ball.speedY = -3;
    animate = false;
    readyToShoot = true;
}

function update()
{
    
    
    if (animate)
    {
        requestAnimationFrame(update);
    }

    

    display.clear();

    worldEdgesCollisionCheck(ball, display);
    ballHitPaddleCollisionCheck(ball, paddle);
    ballHitBrickCollisionCheck(ball, brick, levelBuffer);

    ball.move();

    movePaddle(paddle);

    display.drawCircle(ball);
    display.drawRectangle(paddle);
    //console.log(paddle);

    updateGameGrid(levelBuffer, brick);

    if(animate == false && readyToShoot == false)
    {
        display.writePause();
    }

    if (animate == false && readyToShoot)
    {
        display.writeClickToShoot();
    }

}

function worldEdgesCollisionCheck(param_ball, param_display)
{

    if (param_ball.x - param_ball.radius < 0 && param_ball.speedX < 0 || param_ball.x + param_ball.radius >= param_display.gameCanvas.width && param_ball.speedX > 0)
    {
        param_ball.speedX = -param_ball.speedX;
        count++;
        //console.log(count);

    }

    if (param_ball.y < 0)
    {
        param_ball.speedY *= -1;
        count++;
        //console.log(count);
    }

    if (param_ball.y >= param_display.gameCanvas.height)
    {
        resetBallPosition(param_ball);
    }
}

function ballHitPaddleCollisionCheck(param_ball, param_paddle)
{
    let topOfPaddle = param_paddle.y;
    let bottomOfPaddle = topOfPaddle + param_paddle.height;
    let leftSideOfPaddle = param_paddle.x;
    let rightSideOfPaddle = param_paddle.x + param_paddle.width;
    let centerOfPaddle = leftSideOfPaddle + param_paddle.width / 2;
    let setXSpeedFromCenterOffset = param_ball.x - centerOfPaddle;
    let offsetSpeedChange = .25;

    if (param_ball.x > leftSideOfPaddle &&
        param_ball.x < rightSideOfPaddle &&
        param_ball.y > topOfPaddle &&
        param_ball.y < bottomOfPaddle)
    {
        param_ball.speedY = -param_ball.speedY;
        param_ball.speedX = setXSpeedFromCenterOffset * offsetSpeedChange;
        //console.log(param_ball.speedX);
    }
}

function getBallRow(param_ballY, param_brickHeight) 
{

    return Math.floor(param_ballY / param_brickHeight);
}

function getBallColumn(param_ballX, param_brickWidth)
{

    return Math.floor(param_ballX / param_brickWidth);
}

function levelArrayIndexAtRowAndColumnOfBall(param_ball, param_brick, param_levelBuffer) 
{
    let getCurrentBallRow = getBallRow(param_ball.y, param_brick.height);
    let getCurrentBallColomn = getBallColumn(param_ball.x, param_brick.width);

    if (getCurrentBallRow >= 0 && getCurrentBallRow < param_levelBuffer.rows &&
        getCurrentBallColomn >= 0 && getCurrentBallColomn < param_levelBuffer.columns) // fix edge wrap
    {
        return getCurrentBallRow * param_levelBuffer.columns + getCurrentBallColomn;
    }
}

function ballHitBrickCollisionCheck(param_ball, param_brick, param_levelBuffer)
{
    let getCurrentLevelArrayIndexAtBall = levelArrayIndexAtRowAndColumnOfBall(param_ball, param_brick, param_levelBuffer);

    if (param_levelBuffer.grid[getCurrentLevelArrayIndexAtBall] <= param_levelBuffer.columns * param_levelBuffer.rows &&
        param_levelBuffer.grid[getCurrentLevelArrayIndexAtBall] > 0) //Is the index where a brick could be and is there a brick there
    {
        let ballRowNow = getBallRow(param_ball.y, param_brick.height);
        //console.log(ballRowNow);
        let ballColumnNow = getBallRow(param_ball.x, param_brick.width);
        let ballRowLastFrame = getBallRow(param_ball.y - param_ball.speedY, param_brick.height);
        //console.log(ballRowLastFrame);
        let ballColumnLastFrame = getBallColumn(param_ball.x - param_ball.speedX, param_brick.width);

        if (ballRowLastFrame != ballRowNow)
        {
            param_ball.speedY = -param_ball.speedY;
        }

        if (ballColumnLastFrame != ballColumnNow)
        {
            param_ball.speedX = -param_ball.speedX
        }

        param_levelBuffer.grid[getCurrentLevelArrayIndexAtBall] = 0;

    }
}

function updateGameGrid(param_levelBuffer, param_brick)
{
    for (let row = 0; row < param_levelBuffer.rows; row++)
    {
        for (let col = 0; col < param_levelBuffer.columns; col++)
        {
            if (param_levelBuffer.grid[row * param_levelBuffer.columns + col] == 1)
            {
                param_brick.x = col * param_brick.width;
                param_brick.y = row * param_brick.height;
                //console.log(param_brick);

                display.drawRectangle(param_brick);
            }
        }
    }
}

function movePaddle(param_paddle)
{
    param_paddle.x = mouse.x - param_paddle.width / 2;
}

function onMouseMove(event)
{
    let rect = display.gameCanvas.getBoundingClientRect();
    mouse.x = event.clientX - rect.left;
    mouse.y = event.clientY - rect.top;
}



window.addEventListener('resize', display.resize);
window.addEventListener('mousemove', onMouseMove);
window.addEventListener('click', function()
{
    if(readyToShoot == true)
    {
        readyToShoot = false;
        animate = true;
        update();
    }
});

window.addEventListener('keydown', function (event)
{
    if (event.key == 'Escape')
    {
        if (animate && readyToShoot == false)
        {
            animate = false;
        } else
        {
            animate = true;
            update();
        }
    }
});
//console.log(brick);

