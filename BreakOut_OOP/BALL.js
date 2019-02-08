const BALL =
{
    ballX: 0,
    ballSpeedX: 5,
    ballY: 0,
    ballSpeedY: 5,

    radius: 10,

    hitWorldEdges: function ()
    {
        if (BALL.ballX + BALL.radius > GAMEWORLD.canvas.width && BALL.ballSpeedX > 0.0 || BALL.ballX - BALL.radius < 0 && BALL.ballSpeedX < 0.0)
        {
            BALL.ballSpeedX = -BALL.ballSpeedX;
        }

        if (BALL.ballY + BALL.radius > GAMEWORLD.canvas.height)
        {
            BALL.reset();
        }
        if (BALL.ballY - BALL.radius < 0)
        {
            BALL.ballSpeedY = -BALL.ballSpeedY;
        }
    },

    hitPlayer: function ()
    {
        let playerTop = GAMEWORLD.canvas.height - PLAYER.playerDistanceFromEdge;
        let playerBottom = playerTop + PLAYER.height;
        let playerLeft = GAMEWORLD.mouseX - PLAYER.width / 2;
        let playerRight = GAMEWORLD.mouseX + PLAYER.width;

        if (BALL.ballY + BALL.radius > playerTop &&
            BALL.ballY + BALL.radius < playerBottom &&
            BALL.ballX + BALL.radius > playerLeft &&
            BALL.ballX - BALL.radius < playerRight)
        {
            let playerCenter = playerLeft + PLAYER.width / 2;
            let offsetFromPlayerCenter = BALL.ballX - playerCenter;
            let speedDampener = .3;
            BALL.ballSpeedX = offsetFromPlayerCenter * speedDampener;
            BALL.ballSpeedY = -BALL.ballSpeedY;

            if (BRICKS.bricksRemaining == 0)
            {
                BRICKS.resetBricks();
            }
        }
    },

    hitBricks: function () //Note to self: Something is wrong if ball hits bottom row. Fix this!
    {
        let ballHitBrickColumn = Math.floor(BALL.ballX / BRICKS.width);
        let ballHitBrickRow = Math.floor(BALL.ballY / BRICKS.height);
        let brickArrayIndexAtBall = BRICKS.getBrickArrayIndexNumber(ballHitBrickColumn, ballHitBrickRow);

        if (brickArrayIndexAtBall >= 0 && brickArrayIndexAtBall < BRICKS.columns * BRICKS.rows)
        {
            if (BRICKS.brickBoundsCheck(ballHitBrickColumn, ballHitBrickRow)) 
            {
                BRICKS.brickArray[brickArrayIndexAtBall] = false;
                BRICKS.bricksRemaining--;
                console.log(BRICKS.bricksRemaining);

                let locationOfBallXLastFrame = BALL.ballX - BALL.ballSpeedX;
                let locationOfBallYLastFrame = BALL.ballY - BALL.ballSpeedY;
                let columnOfLastFrameBallX = Math.floor(locationOfBallXLastFrame / BRICKS.width);
                let rowOfLastFrameBallY = Math.floor(locationOfBallYLastFrame / BRICKS.height);

                let hitArmpit = true;

                if (columnOfLastFrameBallX != ballHitBrickColumn)
                {
                    if (BRICKS.brickBoundsCheck(locationOfBallXLastFrame, ballHitBrickRow) == false)
                    {
                        BALL.ballSpeedX = -BALL.ballSpeedX;
                        hitArmpit = false;
                    }
                }

                if (rowOfLastFrameBallY != ballHitBrickRow)
                {
                    if (BRICKS.brickBoundsCheck(ballHitBrickColumn, locationOfBallYLastFrame) == false)
                    {
                        BALL.ballSpeedY = -BALL.ballSpeedY;
                        hitArmpit = false;
                    }
                }

                if (hitArmpit)
                {
                    BALL.ballSpeedX = -BALL.ballSpeedX;
                    BALL.ballSpeedY = -BALL.ballSpeedY;
                }
            }
        }
    },

    moveBall: function ()
    {
        BALL.ballX += BALL.ballSpeedX;
        BALL.ballY += BALL.ballSpeedY;
    },

    drawBall: function ()
    {
        GAMEWORLD.draw.circle(BALL.ballX, BALL.ballY, BALL.radius, 'white');
    },

    reset: function ()
    {
        GAMEWORLD.flashWorld();
        BALL.ballX = GAMEWORLD.canvas.width / 2;
        BALL.ballY = GAMEWORLD.canvas.height / 2;
    }
};