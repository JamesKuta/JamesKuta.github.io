window.onload = function ()
{
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
        PLAYER.drawPlayer();
        BALL.hitPlayer();
    },
};

