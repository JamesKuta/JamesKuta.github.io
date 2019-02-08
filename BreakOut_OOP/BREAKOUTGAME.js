window.onload = function ()
{

    GAMEWORLD.startGame();
    BRICKS.resetBricks();
    BALL.reset();

};

const BREAKOUTGAME =
{
    updateAll: function () 
    {
        requestAnimationFrame(BREAKOUTGAME.updateAll);
        GAMEWORLD.clear();

        BALL.moveBall();
        BALL.hitWorldEdges();
        BALL.hitBricks();
        BALL.drawBall();
        BRICKS.drawBricks();
        PLAYER.drawPlayer();
        GAMEWORLD.showMouseCoordinates();
        BALL.hitPlayer();
    },
};

