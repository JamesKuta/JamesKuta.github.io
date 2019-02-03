const GAMEWORLD = 
{
    canvas: document.getElementById('gameCanvas'),
    
    startGame: function ()
    {
        GAMEWORLD.context = GAMEWORLD.canvas.getContext('2d');
        GAMEWORLD.canvas.addEventListener('mousemove', PLAYER.movePlayer)
        
        BREAKOUTGAME.updateAll();
    },
    

    clear: function ()
    {
        GAMEWORLD.draw.rectangle(0,0, GAMEWORLD.canvas.width, GAMEWORLD.canvas.height, "black");
        // GAMEWORLD.context.fillStyle = 'black';
        // GAMEWORLD.context.fillRect(0, 0, GAMEWORLD.canvas.width, GAMEWORLD.canvas.height);
    },

    flashWorld: function ()
    {
        GAMEWORLD.draw.rectangle(0,0, GAMEWORLD.canvas.width, GAMEWORLD.canvas.height, "white");
    },

    draw: 
    {
        rectangle: function (topLeftX,topLeftY, boxWidth,boxHeight, fillColor)
        {
            GAMEWORLD.context.fillStyle = fillColor
            GAMEWORLD.context.fillRect(topLeftX,topLeftY, boxWidth, boxHeight);
        },

        circle: function (centerX,centerY, radius, fillColor)
        {
            GAMEWORLD.context.fillStyle = fillColor;
            GAMEWORLD.context.beginPath();
            GAMEWORLD.context.arc(centerX,centerY, radius, 0, Math.PI * 2, true);
            GAMEWORLD.context.fill();
        },

    },


};