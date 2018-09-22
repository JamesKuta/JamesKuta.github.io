// Michele's Frogger Game          //
// Developed By James Kuta         //
// Project Started on 09/08/2018   //
// Project Finished on             //


// Global Objects

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

const waitTime = 1000; // used by setTimeOut() after frog death

// scale from 570 x 570 screen size
const screenScaleWidth = 570;
const screenScaleHeight = 570;


/*************Frog Variables*************/

//frog draw variables
let frogX = canvas.width * (265 / screenScaleWidth);
let frogY = canvas.height * (488 / screenScaleHeight);
let frogWidth = canvas.width * (30 / screenScaleWidth);
let frogHeight = canvas.height * (30 / screenScaleHeight);

// how far can frog jump
const frogJump = canvas.height * (44 / screenScaleHeight);

// what is the farthest the frog can move on the screen
const highestFrogCanMove = canvas.height * (20 / screenScaleHeight);
const lowestFrogCanMove = canvas.height * (80 / screenScaleHeight);
const mostRightFrogCanMove = canvas.width * (20 / screenScaleWidth);
const mostLeftFrogCanMove = canvas.width * (20 / screenScaleWidth);

//Load frog sprite sheet
let frogImage = new Image();
frogImage.src = "frog_gimp.png";

// frog sprites pickers

const frogUpSprite = 0;
const frogDownSprite = 0;
const frogRightSprite = 40;
const frogLeftSprite = 80;
const frogSplatSprite = 120;

// Frog object (may turn into class if I want 2 player game)
let frog = {
    sx: 0,
    sy: 0,
    swidth: 40,
    sheight: 40,
    x: frogX,
    y: frogY,
    width: frogWidth,
    height: frogHeight,
    frogJumpDist: frogJump,
    frogCanMove: true
};



/*************Car Variables*************/

//load car sprite sheet
Car.carImage = new Image();
Car.carImage.src = "cars_gimp_game.png";

//draw car how wide and tall variables
const eachCarSpriteWidth = 60;
const eachCarSpriteHeight = 35;

let carWidth = canvas.width * (eachCarSpriteWidth / screenScaleWidth);
let carHeight = canvas.height * (eachCarSpriteHeight /screenScaleHeight);

//horizontal position for each car start
const car0StartPosX = 100;
const car1StartPosX = 300;
const car2StartPosX = 400;
const car3StartPosX = 100;
const car4StartPosX = 700;
const car5StartPosX = 300;
const car6StartPosX = 100;
const car7StartPosX = 400;

// car horizontal position
let car0X = canvas.width * (car0StartPosX / screenScaleWidth);
let car1X = canvas.width * (car1StartPosX / screenScaleWidth);
let car2X = canvas.width * (car2StartPosX / screenScaleWidth);
let car3X = canvas.width * (car3StartPosX / screenScaleWidth);
let car4X = canvas.width * (car4StartPosX / screenScaleWidth);
let car5X = canvas.width * (car5StartPosX / screenScaleWidth);
let car6X = canvas.width * (car6StartPosX / screenScaleWidth);
let car7X = canvas.width * (car7StartPosX / screenScaleWidth);

//vertical postion for each car start (which lane of the road)
const car0StartPosY = 400;
const car1StartPosY = 400;
const car2StartPosY = 355;
const car3StartPosY = 355;
const car4StartPosY = 310;
const car5StartPosY = 310;
const car6StartPosY = 265;
const car7StartPosY = 265;

// car vertical position
let car0Y = canvas.height * (car0StartPosY / screenScaleHeight);
let car1Y = canvas.height * (car1StartPosY / screenScaleHeight);
let car2Y = canvas.height * (car2StartPosY / screenScaleHeight);
let car3Y = canvas.height * (car3StartPosY / screenScaleHeight);
let car4Y = canvas.height * (car4StartPosY / screenScaleHeight);
let car5Y = canvas.height * (car5StartPosY / screenScaleHeight);
let car6Y = canvas.height * (car6StartPosY / screenScaleHeight);
let car7Y = canvas.height * (car7StartPosY / screenScaleHeight);

// car speeds
let slowPoke = 2;
let goodDriver = 3;
let speedDemon = 4;
let deathWish = 5;

// how fast should each car move
let car0Speed = canvas.width * (slowPoke / screenScaleWidth);
let car1Speed = canvas.width * (slowPoke / screenScaleWidth);
let car2Speed = canvas.width * ((slowPoke / screenScaleWidth) * -1);
let car3Speed = canvas.width * ((slowPoke / screenScaleWidth) * -1);
let car4Speed = canvas.width * (goodDriver / screenScaleWidth);
let car5Speed = canvas.width * (goodDriver / screenScaleWidth);
let car6Speed = canvas.width * ((goodDriver / screenScaleWidth) * -1);
let car7Speed = canvas.width * ((goodDriver / screenScaleWidth) * -1);

//sprite positions
let carSpritePos1 = 0;
let carSpritePos2 = 60;

//constructor function for the car objects.
function Car(carX, carSX, carY, carWidth, carHeight, carSpeed) {
    this.carX = carX;
    this.carSX = carSX;
    this.carY = carY;
    this.carWidth = carWidth;
    this.carHeight = carHeight;
    this.carSpeed = carSpeed;
}

// Array where I create all car objects
let carArray = [
    new Car(car0X, carSpritePos1, car0Y, carWidth, carHeight, car0Speed),
    new Car(car1X, carSpritePos1, car1Y, carWidth, carHeight, car1Speed),
    new Car(car2X, carSpritePos2, car2Y, carWidth, carHeight, car2Speed),
    new Car(car3X, carSpritePos2, car3Y, carWidth, carHeight, car3Speed),
    new Car(car4X, carSpritePos1, car4Y, carWidth, carHeight, car4Speed),
    new Car(car5X, carSpritePos1, car5Y, carWidth, carHeight, car5Speed),
    new Car(car6X, carSpritePos2, car6Y, carWidth, carHeight, car6Speed),
    new Car(car7X, carSpritePos2, car7Y, carWidth, carHeight, car7Speed)
];


/*************Log Variables*************/

//log color
const logColor = 'tan';
//draw log how wide and tall variables
const eachLogSpriteWidthValue = 120;
const eachLogSpriteHeightValue = 30;
const eachLogSpriteWidth = canvas.width * (eachLogSpriteWidthValue / screenScaleWidth);
const eachLogSpriteHeight = canvas.height * (eachLogSpriteHeightValue / screenScaleHeight);

// horizontal positons for each log start
const log0StartPosX = 300;
const log1StartPosX = 40;
const log2StartPosX = 200;
const log3StartPosX = 0;
const log4StartPosX = 400;
const log5StartPosX = 50;

//log horizontal positions
let log0X = canvas.width * (log0StartPosX / screenScaleWidth);
let log1X = canvas.width * (log1StartPosX / screenScaleWidth);
let log2X = canvas.width * (log2StartPosX / screenScaleWidth);
let log3X = canvas.width * (log3StartPosX / screenScaleWidth);
let log4X = canvas.width * (log4StartPosX / screenScaleWidth);
let log5X = canvas.width * (log5StartPosX / screenScaleWidth);

// log speeds
let lazyRiver = 1;
let whiteCaps = 2;
let theRapids = 3;

//vertical positions for each log start
const log0StartPosY = 180;
const log1StartPosY = 180;
const log2StartPosY = 136;
const log3StartPosY = 136;
const log4StartPosY = 92;
const log5StartPosY = 92;

//log vertical positions
let log0Y = canvas.width * (log0StartPosY / screenScaleHeight);
let log1Y = canvas.width * (log1StartPosY / screenScaleHeight);
let log2Y = canvas.width * (log2StartPosY / screenScaleHeight);
let log3Y = canvas.width * (log3StartPosY / screenScaleHeight);
let log4Y = canvas.width * (log4StartPosY / screenScaleHeight);
let log5Y = canvas.width * (log5StartPosY / screenScaleHeight);

// how fast should each log move
let log0Speed = canvas.width * (lazyRiver / screenScaleWidth);
let log1Speed = canvas.width * (lazyRiver / screenScaleWidth);
let log2Speed = canvas.width * ((whiteCaps / screenScaleWidth) * -1);
let log3Speed = canvas.width * ((whiteCaps / screenScaleWidth) * -1);
let log4Speed = canvas.width * (lazyRiver / screenScaleWidth);
let log5Speed = canvas.width * (lazyRiver / screenScaleWidth);

let logSpritPosX = 0;

/// WORKING LOGS
function Log(logX, logSX, logY, logWidth, logHeight, logSpeed) {
    this.logX = logX;
    this.logSX = logSX;
    this.logY = logY;
    this.logWidth = logWidth;
    this.logHeight = logHeight;
    this.logSpeed = logSpeed;
}

Log.logImage = new Image();
Log.logImage.src = "logImage.png";

// array of all my log objects
logArray = [
    new Log(log0X, logSpritPosX, log0Y, eachLogSpriteWidth, eachLogSpriteHeight, log0Speed),
    new Log(log1X, logSpritPosX, log1Y, eachLogSpriteWidth, eachLogSpriteHeight, log1Speed),
    new Log(log2X, logSpritPosX, log2Y, eachLogSpriteWidth, eachLogSpriteHeight, log2Speed),
    new Log(log3X, logSpritPosX, log3Y, eachLogSpriteWidth, eachLogSpriteHeight, log3Speed),
    new Log(log4X, logSpritPosX, log4Y, eachLogSpriteWidth, eachLogSpriteHeight, log4Speed),
    new Log(log5X, logSpritPosX, log5Y, eachLogSpriteWidth, eachLogSpriteHeight, log5Speed)
];

Log.logImage = new Image();
Log.logImage.src = "logImage.png";


/*************Background Variables*************/

//grass variables

const grassColor = "rgb(100, 150, 50)";
const leftGrassScreenPosX = 0;
const rightGrassScreenPosX = 0;

const bottomGrassScreenPosY = 440;
const topGrassScreenPosY = 215;

const grassHeight = 45;

let grassStripWidth = canvas.width;
let grassStripHeight = canvas.height * (grassHeight / screenScaleHeight);

let grassStrip1X = canvas.width * (leftGrassScreenPosX / screenScaleWidth);
let grassStrip2X = canvas.width * (rightGrassScreenPosX / screenScaleWidth);

let grassStrip1Y = canvas.height * (bottomGrassScreenPosY / screenScaleHeight);
let grassStrip2Y = canvas.height * (topGrassScreenPosY / screenScaleHeight);

//road variables
const roadEdgeColor = "white";
const roadMiddleLineColor = "yellow";
const roadLineWidthValue = 2;
const roadLineWidth = canvas.width * (roadLineWidthValue / screenScaleWidth);

const yellowLineDash = 15;
const whiteLineDash = 5;

let yellowLineDashWidth = canvas.width * (yellowLineDash / screenScaleWidth);
let whiteLineDashWidth = canvas.width * (whiteLineDash / screenScaleWidth);

//Road is in 5 lines. 5 is top line moving down in order

//road line 5
const leftXPosLine5 = 0;
const rightXPosLine5 = canvas.width;
const Line5YPos = 260
const Line5Y = canvas.height * (Line5YPos / screenScaleHeight);

//road line 4
const leftXPosLine4 = 0;
const rightXPosLine4 = canvas.width;
const Line4YPos = 350;
const Line4Y = canvas.height * (Line4YPos / screenScaleHeight);

//road line 3
const leftXPosLine3 = 0;
const rightXPosLine3 = canvas.width;
const Line3YPos = 305;
const Line3Y = canvas.height * (Line3YPos / screenScaleHeight);

//road line 2
const leftXPosLine2 = 0;
const rightXPosLine2 = canvas.width;
const Line2YPos = 395;
const Line2Y = canvas.height * (Line2YPos / screenScaleHeight);

//road line 1
const leftXPosLine1 = 0;
const rightXPosLine1 = canvas.width;
const Line1YPos = 439;
const Line1Y = canvas.height * (Line1YPos / screenScaleHeight);

//water area
const waterColor = "blue";
const waterScreenPosX = 0;
const waterScreenPosY = 0;
const waterWidthXValue = 570;
const waterHeightYValue = 220;
let waterWidth = canvas.width * (waterWidthXValue / screenScaleWidth);
let waterHeight = canvas.height * (waterHeightYValue / screenScaleHeight); 


// keypress Variables
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;

let up = true;
let down = true;
let right = true;
let left = true;

let upButton = document.getElementById('up');
let downButton = document.getElementById('down');
let rightButton = document.getElementById('right');
let leftButton = document.getElementById('left');

// Event Listeners
document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);
upButton.addEventListener('mousedown', buttonHandler);
downButton.addEventListener('click', buttonHandler);
rightButton.addEventListener('click', buttonHandler);
leftButton.addEventListener('click', buttonHandler);

function buttonHandler() {
    if (event.target.value == "up" && frog.y > highestFrogCanMove && frog.frogCanMove) {
        frog.y = frog.y - frog.frogJumpDist;
        frog.sx = frogUpSprite;
        event.preventDefault();
        event.stopPropagation();
    }

    if (event.target.value == "down" && frog.y + frog.height < canvas.height - lowestFrogCanMove && frog.frogCanMove) {
        frog.y = frog.y + frog.frogJumpDist;
        frog.sx = frogDownSprite;
        event.preventDefault();
        event.stopPropagation();
    }

    if (event.target.value == "right" && frog.x + frog.width < canvas.width - mostRightFrogCanMove && frog.frogCanMove) {
        frog.x = frog.x + frog.frogJumpDist;
        frog.sx = frogRightSprite;
        event.preventDefault();
        event.stopPropagation();
    }

    if (event.target.value == "left" && frog.x > mostLeftFrogCanMove && frog.frogCanMove) {
        frog.x = frog.x - frog.frogJumpDist;
        frog.sx = frogLeftSprite;
        event.preventDefault();
        event.stopPropagation();
    }
}

function keyDownHandler(e) {
    if (e.keyCode === 39) {
        rightPressed = true;
        event.preventDefault();
    }
    if (e.keyCode === 37) {
        leftPressed = true;
        event.preventDefault();
    }

    if (e.keyCode === 38) {
        upPressed = true;
        event.preventDefault();
    }

    if (e.keyCode === 40) {
        downPressed = true;
        event.preventDefault();
    }
}// end keyDownHandler func

function keyUpHandler(e) {
    if (e.keyCode === 39) {
        rightPressed = false;
    }
    if (e.keyCode === 37) {
        leftPressed = false;
    }

    if (e.keyCode === 38) {
        upPressed = false;
    }

    if (e.keyCode === 40) {
        downPressed = false;
    }
}// end keyUpHandler func

function frogMove() {
    if (frog.frogCanMove) {

        if (upPressed === true && up === true && frog.y > highestFrogCanMove) {
            frog.y = frog.y - frog.frogJumpDist;
            up = false;
            frog.sx = frogUpSprite;
        }

        if (upPressed === false) {
            up = true;
        }

        if (downPressed === true && down === true && frog.y + frog.height < canvas.height - lowestFrogCanMove) {
            frog.y = frog.y + frog.frogJumpDist;
            down = false;
            frog.sx = frogDownSprite;
        }

        if (downPressed === false) {
            down = true;
        }

        if (rightPressed === true && right === true && frog.x + frog.width < canvas.width - mostRightFrogCanMove) {
            frog.x = frog.x + frog.frogJumpDist;
            right = false;
            frog.sx = frogRightSprite;
        }

        if (rightPressed === false) {
            right = true;
        }

        if (leftPressed === true && left === true && frog.x > mostLeftFrogCanMove) {
            frog.x = frog.x - frog.frogJumpDist;
            left = false;
            frog.sx = frogLeftSprite;
        }

        if (leftPressed === false) {
            left = true;
        }
    }
}

function displayGameScreenBackground() {
    // Draw Grass
    ctx.fillStyle = grassColor;
    ctx.fillRect(grassStrip1X, grassStrip1Y, grassStripWidth, grassStripHeight);
    ctx.fillRect(grassStrip2X, grassStrip2Y, grassStripWidth, grassStripHeight);

    // Draw Road
    ctx.beginPath();
    ctx.moveTo(leftXPosLine5, Line5Y);
    ctx.lineTo(rightXPosLine5, Line5Y);
    ctx.strokeStyle = roadEdgeColor;
    ctx.setLineDash([0]);
    //ctx.strokeWidth = 4;
    ctx.lineWidth = roadLineWidth;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(leftXPosLine4, Line4Y);
    ctx.lineTo(rightXPosLine4, Line4Y);
    ctx.strokeStyle = roadEdgeColor;
    ctx.setLineDash([whiteLineDashWidth]);
    //ctx.strokeWidth = 2;
    ctx.lineWidth = roadLineWidth;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(leftXPosLine3, Line3Y);
    ctx.lineTo(rightXPosLine3, Line3Y);
    ctx.strokeStyle = roadMiddleLineColor;
    ctx.setLineDash([yellowLineDashWidth]);
    ctx.strokeWidth = roadLineWidth;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(leftXPosLine2, Line2Y);
    ctx.lineTo(rightXPosLine2, Line2Y);
    ctx.strokeStyle = roadMiddleLineColor;
    ctx.setLineDash([yellowLineDashWidth]);
    ctx.strokeWidth = roadLineWidth;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(leftXPosLine1, Line1Y);
    ctx.lineTo(rightXPosLine1, Line1Y);
    ctx.strokeStyle = roadEdgeColor;
    ctx.setLineDash([0]);
    //ctx.strokeWidth = 4;
    ctx.lineWidth = roadLineWidth;
    ctx.stroke();

     //draw water area
     ctx.fillStyle = waterColor;
     ctx.fillRect(waterScreenPosX, waterScreenPosY, waterWidth, waterHeight);


} // end displayGameScreenBackground func

function displayFrog() {
    ctx.drawImage(frogImage, frog.sx, frog.sy, frog.swidth,
        frog.sheight, frog.x, frog.y, frog.width, frog.height);
}

function displayCars() {
    for (let i = 0; i < carArray.length; i++) {
        ctx.drawImage(Car.carImage, carArray[i].carSX, 0, eachCarSpriteWidth, eachCarSpriteHeight, carArray[i].carX, carArray[i].carY, carArray[i].carWidth, carArray[i].carHeight);
        //console.log(carArray[i].carX);
    }

}//end displayCars func

function carsMove() {

    if (carArray[0].carX < canvas.width) {
        carArray[0].carX += carArray[0].carSpeed;
    } else {
        carArray[0].carX = -carWidth;
    }

    if (carArray[1].carX < canvas.width) {
        carArray[1].carX += carArray[1].carSpeed;
    } else {
        carArray[1].carX = -carWidth;
    }

    if (carArray[2].carX + carWidth > 0) {
        carArray[2].carX += carArray[2].carSpeed;
    } else {
        carArray[2].carX = canvas.width;
    }

    if (carArray[3].carX + carWidth > 0) {
        carArray[3].carX += carArray[3].carSpeed;
    } else {
        carArray[3].carX = canvas.width;
    }

    if (carArray[4].carX < canvas.width) {
        carArray[4].carX += carArray[4].carSpeed;
    } else {
        carArray[4].carX = -carWidth;
    }

    if (carArray[5].carX < canvas.width) {
        carArray[5].carX += carArray[5].carSpeed;
    } else {
        carArray[5].carX = -carWidth;
    }

    if (carArray[6].carX + carWidth > 0) {
        carArray[6].carX += carArray[6].carSpeed;
    } else {
        carArray[6].carX = canvas.width;
    }

    if (carArray[7].carX + carWidth > 0) {
        carArray[7].carX += carArray[7].carSpeed;
    } else {
        carArray[7].carX = canvas.width;
    }
}// end carsMove func

function frogGotRunOverRealGood() {
    for (let i = 0; i < carArray.length; i++) {
        if (carArray[i].carX <= frog.x + frog.width && carArray[i].carX + carArray[i].carWidth >= frog.x &&
            carArray[i].carY + carArray[i].carHeight >= frog.y && carArray[i].carY <= frog.y + frog.height) {
            frog.sx = frogSplatSprite;
            frog.frogCanMove = false;
            setTimeout(frogReset, waitTime);
        }
    }
}// end frogGotRunOverRealGood func

function frogReset() {
    if (!frog.frogCanMove) {
        frog.y = frogY;
        frog.x = frogX;
        frog.sx = frogUpSprite;
        frog.frogCanMove = true;
    }
}

function displayLogs() {
    for (let i = 0; i < logArray.length; i++) {
        ctx.drawImage(Log.logImage, logArray[i].logSX, 0, eachLogSpriteWidthValue, eachLogSpriteHeightValue, logArray[i].logX, logArray[i].logY, logArray[i].logWidth, logArray[i].logHeight);
        
    }

}

function logsMove() {
    if (logArray[0].logX < canvas.width) {
        logArray[0].logX += logArray[0].logSpeed;
    }
    else {
        logArray[0].logX = -logArray[0].logWidth;
    }

    if (logArray[1].logX < canvas.width) {
        logArray[1].logX += logArray[1].logSpeed;
    }
    else {
        logArray[1].logX = -logArray[1].logWidth;
    }

    if (logArray[2].logX + logArray[2].logWidth > 0) {
        logArray[2].logX += logArray[2].logSpeed;
    }
    else {
        logArray[2].logX = canvas.width;
    }

    if (logArray[3].logX + logArray[3].logWidth > 0) {
        logArray[3].logX += logArray[3].logSpeed;
    }
    else {
        logArray[3].logX = canvas.width;
    }

    if (logArray[4].logX < canvas.width) {
        logArray[4].logX += logArray[4].logSpeed;
    }
    else {
        logArray[4].logX = -logArray[4].logWidth;
    }

    if (logArray[5].logX < canvas.width) {
        logArray[5].logX += logArray[5].logSpeed;
    }
    else {
        logArray[5].logX = -logArray[5].logWidth;
    }
}// end logsMove func

function frogFloatOnLog() {
    if (logArray[0].logX <= frog.x + frog.width &&
        logArray[0].logX + logArray[0].logWidth >= frog.x &&
        logArray[0].logY + logArray[0].logHeight >= frog.y &&
        logArray[0].logY <= frog.y + frog.height) {
        if (frog.x + frog.width < canvas.width) { 
            frog.x = frog.x + logArray[0].logSpeed;
        }
        
    }
    if (logArray[1].logX <= frog.x + frog.width &&
        logArray[1].logX + logArray[1].logWidth >= frog.x &&
        logArray[1].logY + logArray[1].logHeight >= frog.y &&
        logArray[1].logY <= frog.y + frog.height) {
        if (frog.x + frog.width < canvas.width){
            frog.x = frog.x + logArray[1].logSpeed;
        }
    }

    if (logArray[2].logX <= frog.x + frog.width &&
        logArray[2].logX + logArray[2].logWidth >= frog.x &&
        logArray[2].logY + logArray[2].logHeight >= frog.y &&
        logArray[2].logY <= frog.y + frog.height) {
        if (frog.x > 0)
            frog.x = frog.x + logArray[2].logSpeed;
    }

    if (logArray[3].logX <= frog.x + frog.width &&
        logArray[3].logX + logArray[3].logWidth >= frog.x &&
        logArray[3].logY + logArray[3].logHeight >= frog.y &&
        logArray[3].logY <= frog.y + frog.height) {
        if (frog.x > 0)
            frog.x = frog.x + logArray[3].logSpeed;
    }

    if (logArray[4].logX <= frog.x + frog.width &&
        logArray[4].logX + logArray[4].logWidth >= frog.x &&
        logArray[4].logY + logArray[4].logHeight >= frog.y &&
        logArray[4].logY <= frog.y + frog.height) {
        if (frog.x + frog.width < canvas.width)
            frog.x = frog.x + logArray[4].logSpeed;
    }

    if (logArray[5].logX <= frog.x + frog.width &&
        logArray[5].logX + logArray[5].logWidth >= frog.x &&
        logArray[5].logY + logArray[5].logHeight >= frog.y &&
        logArray[5].logY <= frog.y + frog.height) {
        if (frog.x + frog.width < canvas.width)
            frog.x = frog.x + logArray[5].logSpeed;
    }

}// frogFloatOnLog func

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    displayGameScreenBackground();
    displayLogs();
    displayFrog();
    logsMove();
    frogMove();
    displayCars();
    carsMove();
    frogGotRunOverRealGood();
    frogFloatOnLog();

    requestAnimationFrame(gameLoop);
}

gameLoop();