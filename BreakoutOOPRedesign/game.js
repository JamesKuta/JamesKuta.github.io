let mouse = 
{
    x: 0,
    y: 0,
}

let display = new Display(document.getElementById('canvas'));
let ball = new Ball(canvas.width / 2, canvas.height / 2, 10, 'white');
let level = new Levels;
let brick = new Brick(display.gameCanvas.width / 10, display.gameCanvas.height /30, 2, 'blue');
let paddle = new Paddle(mouse.x, display.gameCanvas.height * 0.9, display.gameCanvas.width * 0.15, display.gameCanvas.height / 40, 'white');
let count = 0;
let levelBuffer = [];
let levelCounter = 1;


window.onload = function()
{
    display.clear();
    loadLevel(level);
    requestAnimationFrame(update);
}

function loadLevel(obj) 
{
    switch(levelCounter)
    {
        case 1:
        {
            levelBuffer = obj.level1
            break;
        }

        case 2:
        {
            levelBuffer = obj.level2
            break;
        }
    }
}

function update()
{
    requestAnimationFrame(update);
    
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
    
}

// function checkCollisions(obj1, obj2 ) //worldRight, worldBottom, ballX, ballY 
// {
    
//     worldEdgesCollisionCheck(obj1, obj2);
//     //ballHitPaddleCollisionCheck(obj1, obj2);
    


// }

function worldEdgesCollisionCheck(obj1, obj2){
    
    if((obj1.x - obj1.radius) + obj1.speedX < 0 || (obj1.x + obj1.radius) + obj1.speedX >= obj2.gameCanvas.width) {
        obj1.speedX = -obj1.speedX;
        count++;
        //console.log(count);
        
    }

    if(obj1.y < 0 || obj1.y >= obj2.gameCanvas.height) {
        obj1.speedY *= -1;
        count++;
        //console.log(count);
        
    }
}

function ballHitPaddleCollisionCheck(obj1, obj2)
{
    let topOfPaddle = obj2.y;
    let leftSideOfPaddle = obj2.x;
    let rightSideOfPaddle = obj2.x + obj2.width;
    let centerOfPaddle = leftSideOfPaddle + obj2.width / 2;
    let setXSpeedFromCenterOffset = obj1.x - centerOfPaddle;
    let offsetSpeedChange = .25;

    if(obj1.x > leftSideOfPaddle &&
        obj1.x < rightSideOfPaddle&&
        obj1.y > topOfPaddle)
        
    {
        obj1.speedY = -obj1.speedY;
        obj1.speedX = setXSpeedFromCenterOffset * offsetSpeedChange;
        //console.log(obj1.speedX);
    }
}

function currentLevelArrayIndexAtRowAndColumnOfBall(obj1, obj2, obj3) 
{
    let getCurrentBallRow = Math.floor(obj1.y / obj2.height);
    let getCurrentBallColomn = Math.floor(obj1.x / obj2.width);
    if(getCurrentBallColomn < 0)
    {
    console.log("col: " + getCurrentBallColomn + "row: " + getCurrentBallRow);
    }
    return getCurrentBallRow * obj3.columns + getCurrentBallColomn;

}

function ballHitBrickCollisionCheck(obj1, obj2, obj3)
{
    let getCurrentLevelArrayIndexAtBall = currentLevelArrayIndexAtRowAndColumnOfBall(obj1, obj2, obj3);
    
    if(obj3.grid[getCurrentLevelArrayIndexAtBall] <= obj3.columns * obj3.rows &&
        obj3.grid[getCurrentLevelArrayIndexAtBall] > 0)
    {
        obj3.grid[getCurrentLevelArrayIndexAtBall] = 0;
        obj1.speedY = - obj1.speedY;
    }
    
}

function updateGameGrid(obj1, obj2)
{
    for(let row = 0; row < obj1.rows; row++)
    {
        for(let col = 0; col < obj1.columns; col++)
        {
            if(obj1.grid[row * obj1.columns + col] == 1)
            {
                obj2.x = col * obj2.width;
                obj2.y = row * obj2.height;
                //console.log(obj2);

                display.drawRectangle(obj2);
            }
        }

    }
}

function movePaddle(obj)
{
    obj.x = mouse.x - obj.width / 2;
    
}

function onMouseMove(event)
{
    let rect = display.gameCanvas.getBoundingClientRect();
    mouse.x = event.clientX - rect.left;
    mouse.y = event.clientY - rect.top;

}

window.addEventListener('resize', display.resize);
window.addEventListener('mousemove', onMouseMove);
//console.log(brick);

    