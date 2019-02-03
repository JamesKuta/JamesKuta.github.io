const PLAYER = 
{
    width: 100,
    height: 10,

    playerX: 400,
    playerDistanceFromEdge: 60,

    movePlayer: function (event)
    {
        let pagePosition = GAMEWORLD.canvas.getBoundingClientRect();
        let root = document.documentElement;
        let mouseX = event.clientX - pagePosition.left - root.scrollLeft;
        //let mouseY = event.clientY - pagePosition.top - root.scrollTop;

        PLAYER.playerX = mouseX - PLAYER.width / 2;
    },

    drawPlayer: function ()
    {
        GAMEWORLD.draw.rectangle(PLAYER.playerX, 
            GAMEWORLD.canvas.height-PLAYER.playerDistanceFromEdge, 
            PLAYER.width, PLAYER.height, 'white');
    },

};