const GAMEWORLD = 
{
    canvas: document.getElementById('gameCanvas'),

    mouseX: 0,
    mouseY: 0,
    
    startGame: function ()
    {
        GAMEWORLD.context = GAMEWORLD.canvas.getContext('2d');
        GAMEWORLD.canvas.addEventListener('mousemove', GAMEWORLD.mouseLocation);
        BREAKOUTGAME.updateAll();
    },

    mouseLocation: function (event) 
    {
        let pagePosition = GAMEWORLD.canvas.getBoundingClientRect();
        let root = document.documentElement;
        GAMEWORLD.mouseX = event.clientX - pagePosition.left - root.scrollLeft;
        GAMEWORLD.mouseY = event.clientY - pagePosition.top - root.scrollTop;

        //Don't forget to Remove. This is just for testing!!!
        BALL.ballX = GAMEWORLD.mouseX;
        BALL.ballY = GAMEWORLD.mouseY;
        BALL.ballSpeedX = 3;
        BALL.ballSpeedY = -3;
        //Remove above!!!
    },
    
    
    clear: function ()
    {
        GAMEWORLD.draw.rectangle(0,0, GAMEWORLD.canvas.width, GAMEWORLD.canvas.height, "black");
    },

    flashWorld: function ()
    {
        GAMEWORLD.draw.rectangle(0,0, GAMEWORLD.canvas.width, GAMEWORLD.canvas.height, "white");
    },

    showMouseCoordinates: function ()
    {
        let indexCoordX = Math.floor(GAMEWORLD.mouseX / BRICKS.width);
        let indexCoordY = Math.floor(GAMEWORLD.mouseY / BRICKS.height);
        let brickArrayIndex = BRICKS.getBrickArrayIndexNumber(indexCoordX, indexCoordY); 
        
        //for testing Remove START!!!!
        // if(brickArrayIndex >= 0 && brickArrayIndex < BRICKS.columns * BRICKS.rows)
        // {
        //     BRICKS.brickArray[brickArrayIndex] = false;
        // }
        //for testing Remove END!!!!
        
        GAMEWORLD.draw.text("col: " + indexCoordX + ", " + "row: " + indexCoordY + ", "
         + "index: " + brickArrayIndex, GAMEWORLD.mouseX, GAMEWORLD.mouseY, "yellow");
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

        text: function (words, textX,textY, fillColor)  
        {
            GAMEWORLD.context.fillStyle = fillColor;
            GAMEWORLD.context.fillText(words, textX,textY,);
            
        },

    },


};