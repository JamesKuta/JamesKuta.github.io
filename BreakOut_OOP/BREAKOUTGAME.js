window.onload = function ()
{
    BRICKS.resetBricks();
    GAMEWORLD.startGame();
};

const BREAKOUTGAME =  
{
    updateAll: function () 
    {
        requestAnimationFrame(BREAKOUTGAME.updateAll);
        GAMEWORLD.clear();
        
        BALL.moveBall();
        BALL.hitWorldEdges();
        BALL.drawBall();
        BRICKS.drawBricks();
        PLAYER.drawPlayer();
        GAMEWORLD.showMouseCoordinates();
        BALL.hitPlayer();
    },
};

