// Michele's Frogger Game          //
// Developed By James Kuta         //
// Project Started on 09/08/2018   //
// Project Finished on             //


// Global Objects
let startButton = document.getElementById('start-game');

let canvas = document.getElementById('canvas');

let ctx = canvas.getContext('2d');

let startScreenImageLoaded = false;

let jesusFrog = false;

let animateGame = false;

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
// let frogImage = new Image();
// frogImage.src = "frog_gimp.png";

let frogImage = new Image();
frogImage.src = 'frog_gimp.png';
let startScreenImage = new Image();



// frog sprites pickers

const frogUpSprite = 0;
const frogDownSprite = 0;
const frogRightSprite = 40;
const frogLeftSprite = 80;
const frogSplatSprite = 120;
const frogGoalSprite = 160;
const frogSplashSprite = 240;
const frogHitTopSprite = 200;

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
    frogCanMove: true,
    lives: 3,
    deathFlag: true
};

/*************Car Variables*************/

//load car sprite sheet
Car.carImage = new Image();
Car.carImage.src = "cars_gimp_game.png";

//draw car how wide and tall variables
const eachCarSpriteWidth = 60;
const eachCarSpriteHeight = 35;

let carWidth = canvas.width * (eachCarSpriteWidth / screenScaleWidth);
let carHeight = canvas.height * (eachCarSpriteHeight / screenScaleHeight);

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

// which side of the screen should cars appear
// let car0SideToAppear = carWidth * -1;
// let car1SideToAppear = carWidth * -1;
// let car2SideToAppear = canvas.width;
// let car3SideToAppear = canvas.width;
// let car4SideToAppear = carWidth * -1;
// let car5SideToAppear = carWidth * -1;
// let car6SideToAppear = canvas.width;
// let car7SideToAppear = canvas.width;

//check for which side did the car exit the screen
// let car0ScreenExit = canvas.width;
// let car1ScreenExit = canvas.width;
// let car2ScreenExit = carWidth;
// let car3ScreenExit = carWidth;
// let car4ScreenExit = canvas.width;
// let car5ScreenExit = canvas.width;
// let car6ScreenExit = carWidth;
// let car7ScreenExit = carWidth;

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

Car.prototype.carMovement = function () {
    if (this == carArray[0]) {
        if (this.carX < canvas.width) {
            this.carX += this.carSpeed;
            return;
        } else {
            this.carX = -carWidth;
            return;
        }//end else
    }// end if

    if (this == carArray[1]) {
        if (this.carX < canvas.width) {
            this.carX += this.carSpeed;
            return;
        } else {
            this.carX = -carWidth;
            return;
        }//end else
    }// end if

    if (this == carArray[2]) {
        if (this.carX > -carWidth) {
            this.carX += this.carSpeed;
            return;
        } else {
            this.carX = canvas.width;
            return;
        }//end else
    }// end if

    if (this == carArray[3]) {
        if (this.carX > -carWidth) {
            this.carX += this.carSpeed;
            return;
        } else {
            this.carX = canvas.width;
            return;
        }//end else
    }// end if

    if (this == carArray[4]) {
        if (this.carX < canvas.width) {
            this.carX += this.carSpeed;
            return;
        } else {
            this.carX = -carWidth;
            return;
        }//end else
    }// end if

    if (this == carArray[5]) {
        if (this.carX < canvas.width) {
            this.carX += this.carSpeed;
            return;
        } else {
            this.carX = -carWidth;
            return;
        }//end else
    }// end if

    if (this == carArray[6]) {
        if (this.carX > -carWidth) {
            this.carX += this.carSpeed;
            return;
        } else {
            this.carX = canvas.width;
            return;
        }//end else
    }// end if

    if (this == carArray[7]) {
        if (this.carX > -carWidth) {
            this.carX += this.carSpeed;
            return;
        } else {
            this.carX = canvas.width;
            return;
        }//end else
    }// end if
}; // end checkScrenEdge Func

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
const log6StartPosX = 500;
const log7StartPosX = 250;

//log horizontal positions
let log0X = canvas.width * (log0StartPosX / screenScaleWidth);
let log1X = canvas.width * (log1StartPosX / screenScaleWidth);
let log2X = canvas.width * (log2StartPosX / screenScaleWidth);
let log3X = canvas.width * (log3StartPosX / screenScaleWidth);
let log4X = canvas.width * (log4StartPosX / screenScaleWidth);
let log5X = canvas.width * (log5StartPosX / screenScaleWidth);
let log6X = canvas.width * (log6StartPosX / screenScaleWidth);
let log7X = canvas.width * (log7StartPosX / screenScaleWidth);

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
const log6StartPosY = 48;
const log7StartPosY = 48;

//log vertical positions
let log0Y = canvas.height * (log0StartPosY / screenScaleHeight);
let log1Y = canvas.height * (log1StartPosY / screenScaleHeight);
let log2Y = canvas.height * (log2StartPosY / screenScaleHeight);
let log3Y = canvas.height * (log3StartPosY / screenScaleHeight);
let log4Y = canvas.height * (log4StartPosY / screenScaleHeight);
let log5Y = canvas.height * (log5StartPosY / screenScaleHeight);
let log6Y = canvas.height * (log6StartPosY / screenScaleHeight);
let log7Y = canvas.height * (log7StartPosY / screenScaleHeight);

// how fast should each log move
let log0Speed = canvas.width * (lazyRiver / screenScaleWidth);
let log1Speed = canvas.width * (lazyRiver / screenScaleWidth);
let log2Speed = canvas.width * ((whiteCaps / screenScaleWidth) * -1);
let log3Speed = canvas.width * ((whiteCaps / screenScaleWidth) * -1);
let log4Speed = canvas.width * (whiteCaps / screenScaleWidth);
let log5Speed = canvas.width * (whiteCaps / screenScaleWidth);
let log6Speed = canvas.width * ((lazyRiver / screenScaleWidth) * -1);
let log7Speed = canvas.width * ((lazyRiver / screenScaleWidth) * -1);

let logSpritPosX = 0;

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
    new Log(log5X, logSpritPosX, log5Y, eachLogSpriteWidth, eachLogSpriteHeight, log5Speed),
    new Log(log6X, logSpritPosX, log6Y, eachLogSpriteWidth, eachLogSpriteHeight, log6Speed),
    new Log(log7X, logSpritPosX, log7Y, eachLogSpriteWidth, eachLogSpriteHeight, log7Speed)
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
const goalGrassScreenPosY = 0; // new

const grassHeight = 45;

let grassStripWidth = canvas.width;
let grassStripHeight = canvas.height * (grassHeight / screenScaleHeight);

let grassStrip1X = canvas.width * (leftGrassScreenPosX / screenScaleWidth);
let grassStrip2X = canvas.width * (rightGrassScreenPosX / screenScaleWidth);
let grassStrip3X = canvas.width * (leftGrassScreenPosX / screenScaleWidth); // new

let grassStrip1Y = canvas.height * (bottomGrassScreenPosY / screenScaleHeight);
let grassStrip2Y = canvas.height * (topGrassScreenPosY / screenScaleHeight); // new
let grassStrip3Y = canvas.height * (goalGrassScreenPosY / screenScaleHeight); // new

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

// new
//Frog Goal Variables
let goal1 = false;
let goal2 = false;
let goal3 = false;
let goal4 = false;
let goal5 = false;

let goalHeightAndWidth = 41;
let goalHeightValue = 4;
let goalYPos = canvas.height * (goalHeightValue / screenScaleHeight); // where are goals are

let goalWidth = canvas.width * (goalHeightAndWidth / screenScaleWidth);
let goalHeight = canvas.height * (goalHeightAndWidth / screenScaleHeight);

let goal1XPos = (canvas.width * .1) - goalWidth / 2;
let goal2XPos = (canvas.width * .3) - goalWidth / 2;
let goal3XPos = (canvas.width * .5) - goalWidth / 2;
let goal4XPos = (canvas.width * .7) - goalWidth / 2;
let goal5XPos = (canvas.width * .9) - goalWidth / 2;

// just want to know what the position of these are. Remove before release.
console.log('\n', 'x1: ', goal1XPos, '\n', 'xw1: ', (goal1XPos + goalWidth));
console.log('\n', 'x2: ', goal2XPos, '\n', 'xw2: ', (goal2XPos + goalWidth));
console.log('\n', 'x3: ', goal3XPos, '\n', 'xw3: ', (goal3XPos + goalWidth));
console.log('\n', 'x4: ', goal4XPos, '\n', 'xw4: ', (goal4XPos + goalWidth));
console.log('\n', 'x5: ', goal5XPos, '\n', 'xw5: ', (goal5XPos + goalWidth));

console.log('\n', 'frogX: ', frog.x, '\n', 'frogXW: ', frog.x + frog.width);

// new

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
let jesusModeButton = document.getElementById('jesusfrog');

// Event Listeners
document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);
upButton.addEventListener('mousedown', buttonHandler);
downButton.addEventListener('mousedown', buttonHandler);
rightButton.addEventListener('mousedown', buttonHandler);
leftButton.addEventListener('mousedown', buttonHandler);
jesusModeButton.addEventListener('click', function () {
    if (!jesusFrog) {
        jesusFrog = true;
        jesusfrog.style.backgroundColor = 'green';
    } else {
        jesusFrog = false;
        jesusfrog.style.backgroundColor = 'azure';
    }
});

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

    //draw goal area
    ctx.fillStyle = grassColor;
    ctx.fillRect(grassStrip3X, grassStrip3Y, grassStripWidth, grassStripHeight);

    ctx.fillStyle = 'black';
    ctx.fillRect(goal1XPos, goalYPos, goalWidth, goalHeight);

    ctx.fillStyle = 'black';
    ctx.fillRect(goal2XPos, goalYPos, goalWidth, goalHeight);

    ctx.fillStyle = 'black';
    ctx.fillRect(goal3XPos, goalYPos, goalWidth, goalHeight);

    ctx.fillStyle = 'black';
    ctx.fillRect(goal4XPos, goalYPos, goalWidth, goalHeight);

    ctx.fillStyle = 'black';
    ctx.fillRect(goal5XPos, goalYPos, goalWidth, goalHeight);


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

function displayLives() {
    let displayLivesPosValue = 565;
    let displayLivesPos = canvas.height * (displayLivesPosValue / screenScaleHeight);


    ctx.font = "30px Comic Sans MS";
    ctx.fillStyle = 'white';
    ctx.textAlign = 'start'
    ctx.fillText('LIVES: ' + frog.lives, 10, displayLivesPos);

}
let displayLivesPosValue = 500;
let displayLivesPos = canvas.height * (displayLivesPosValue / screenScaleHeight);

function carsMove() {
    for (i = 0; i < carArray.length; i++) {
        carArray[i].carMovement();
        //console.log(i);
    }
}

function frogGotRunOverRealGood() {
    if (!jesusFrog) {
        for (let i = 0; i < carArray.length; i++) {
            if (carArray[i].carX <= frog.x + frog.width && carArray[i].carX + carArray[i].carWidth >= frog.x &&
                carArray[i].carY + carArray[i].carHeight >= frog.y && carArray[i].carY <= frog.y + frog.height) {
                frog.sx = frogSplatSprite;
                frog.frogCanMove = false;
                setTimeout(frogReset, waitTime);
            }
        }
    }
}// end frogGotRunOverRealGood func

function frogReset() {
    
    if (!frog.frogCanMove) {
        frog.y = frogY;
        frog.x = frogX;
        frog.sx = frogUpSprite;
        frog.frogCanMove = true;
        
        if (frog.deathFlag) {
            frog.lives--;
        }
        frog.deathFlag = true;
    }

    if (frog.lives === 0) {
        animateGame = false;
        gameOver();
        setTimeout(initializeGame, 4000);
    }
}

function gameOver() {
    ctx.font = "130px Comic Sans MS"
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", canvas.width /2, canvas.height /2);
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

    if (logArray[6].logX + logArray[6].logWidth > 0) {
        logArray[6].logX += logArray[6].logSpeed;
    }
    else {
        logArray[6].logX = canvas.width;
    }

    if (logArray[7].logX + logArray[7].logWidth > 0) {
        logArray[7].logX += logArray[7].logSpeed;
    }
    else {
        logArray[7].logX = canvas.width;
    }

}// end logsMove func

function frogFloatOnLog() {
    if (!jesusFrog) {

        if (logArray[0].logX <= frog.x + frog.width &&
            logArray[0].logX + logArray[0].logWidth >= frog.x &&
            logArray[0].logY + logArray[0].logHeight >= frog.y &&
            logArray[0].logY <= frog.y + frog.height) {
            if (frog.x + frog.width < canvas.width && frog.frogCanMove) {
                frog.x = frog.x + logArray[1].logSpeed;
            }
            return;
        }

        if (logArray[1].logX <= frog.x + frog.width &&
            logArray[1].logX + logArray[1].logWidth >= frog.x &&
            logArray[1].logY + logArray[1].logHeight >= frog.y &&
            logArray[1].logY <= frog.y + frog.height) {
            if (frog.x + frog.width < canvas.width && frog.frogCanMove) {
                frog.x = frog.x + logArray[1].logSpeed;
            }
            return;
        }

        if (logArray[2].logX <= frog.x + frog.width &&
            logArray[2].logX + logArray[2].logWidth >= frog.x &&
            logArray[2].logY + logArray[2].logHeight >= frog.y &&
            logArray[2].logY <= frog.y + frog.height) {
            if (frog.x > 0 && frog.frogCanMove) {
                frog.x = frog.x + logArray[2].logSpeed;
            }
            return;
        }

        if (logArray[3].logX <= frog.x + frog.width &&
            logArray[3].logX + logArray[3].logWidth >= frog.x &&
            logArray[3].logY + logArray[3].logHeight >= frog.y &&
            logArray[3].logY <= frog.y + frog.height) {
            if (frog.x > 0 && frog.frogCanMove) {
                frog.x = frog.x + logArray[3].logSpeed;
            }
            return;
        }

        if (logArray[4].logX <= frog.x + frog.width &&
            logArray[4].logX + logArray[4].logWidth >= frog.x &&
            logArray[4].logY + logArray[4].logHeight >= frog.y &&
            logArray[4].logY <= frog.y + frog.height) {
            if (frog.x + frog.width < canvas.width && frog.frogCanMove) {
                frog.x = frog.x + logArray[4].logSpeed;
            }
            return;
        }

        if (logArray[5].logX <= frog.x + frog.width &&
            logArray[5].logX + logArray[5].logWidth >= frog.x &&
            logArray[5].logY + logArray[5].logHeight >= frog.y &&
            logArray[5].logY <= frog.y + frog.height) {
            if (frog.x + frog.width < canvas.width && frog.frogCanMove) {
                frog.x = frog.x + logArray[5].logSpeed;
            }
            return;
        }

        if (logArray[6].logX <= frog.x + frog.width &&
            logArray[6].logX + logArray[6].logWidth >= frog.x &&
            logArray[6].logY + logArray[6].logHeight >= frog.y &&
            logArray[6].logY <= frog.y + frog.height) {
            if (frog.x > 0 && frog.frogCanMove) {
                frog.x = frog.x + logArray[6].logSpeed;
            }
            return;
        }

        if (logArray[7].logX <= frog.x + frog.width &&
            logArray[7].logX + logArray[7].logWidth >= frog.x &&
            logArray[7].logY + logArray[7].logHeight >= frog.y &&
            logArray[7].logY <= frog.y + frog.height) {
            if (frog.x > 0 && frog.frogCanMove) {
                frog.x = frog.x + logArray[7].logSpeed;
            }
            return;
        }

        if (frog.y < waterHeight && frog.y > goalYPos + goalHeight) {
            frog.sx = frogSplashSprite;
            frog.frogCanMove = false;
            setTimeout(frogReset, waitTime);
        }
    } // end Jesus Frog Check
} // end frogFloatOnLog func


function frogHitsGoal() {
    let goalBuffer = 20; // used to make sure a good part of frog is in the goal.
    if (goal1XPos + (goal3XPos + goalWidth) / goalBuffer < frog.x + frog.width && goalYPos + goalHeight > frog.y &&
        goal1XPos + goalWidth - (goal3XPos + goalWidth) / goalBuffer > frog.x && goal1 !== true) {
        goal1 = true;
        frog.frogCanMove = false;
        frog.deathFlag = false;
        drawGoalFrogs();
        frogReset();
    }

    if (goal2XPos + (goal3XPos + goalWidth) / goalBuffer < frog.x + frog.width && goalYPos + goalHeight > frog.y &&
        goal2XPos + goalWidth - (goal3XPos + goalWidth) / goalBuffer > frog.x && goal2 !== true) {
        goal2 = true;
        frog.frogCanMove = false;
        frog.deathFlag = false;
        drawGoalFrogs();
        frogReset();
    }

    if (goal3XPos + (goal3XPos + goalWidth) / goalBuffer < frog.x + frog.width && goalYPos + goalHeight > frog.y &&
        goal3XPos + goalWidth - (goal3XPos + goalWidth) / goalBuffer > frog.x && goal3 !== true) {
        goal3 = true;
        frog.frogCanMove = false;
        frog.deathFlag = false;
        drawGoalFrogs();
        frogReset();
    }

    if (goal4XPos + (goal3XPos + goalWidth) / goalBuffer < frog.x + frog.width && goalYPos + goalHeight > frog.y &&
        goal4XPos + goalWidth - (goal3XPos + goalWidth) / goalBuffer > frog.x && goal4 !== true) {
        goal4 = true;
        frog.frogCanMove = false;
        frog.deathFlag = false;
        drawGoalFrogs();
        frogReset();
    }

    if (goal5XPos + (goal3XPos + goalWidth) / goalBuffer < frog.x + frog.width && goalYPos + goalHeight > frog.y &&
        goal5XPos + goalWidth - (goal3XPos + goalWidth) / goalBuffer > frog.x && goal5 !== true) {
        goal5 = true;
        frog.frogCanMove = false;
        frog.deathFlag = false;
        drawGoalFrogs();
        frogReset();
    }

    else if (frog.y < goalYPos + goalHeight && !jesusFrog) {
        frog.sx = frogHitTopSprite;
        frog.frogCanMove = false;
        setTimeout(frogReset, waitTime);
    }
}

function drawGoalFrogs() {
    if (goal1) {
        ctx.drawImage(frogImage, frogGoalSprite, frogUpSprite, frog.swidth,
            frog.sheight, goal1XPos + (frog.width / 2 - goalWidth / 4), goalYPos + frog.height / 5, frog.width, frog.height);
    }

    if (goal2) {
        ctx.drawImage(frogImage, frogGoalSprite, frogUpSprite, frog.swidth,
            frog.sheight, goal2XPos + (frog.width / 2 - goalWidth / 4), goalYPos + frog.height / 5, frog.width, frog.height);
    }

    if (goal3) {
        ctx.drawImage(frogImage, frogGoalSprite, frogUpSprite, frog.swidth,
            frog.sheight, goal3XPos + (frog.width / 2 - goalWidth / 4), goalYPos + frog.height / 5, frog.width, frog.height);
    }

    if (goal4) {
        ctx.drawImage(frogImage, frogGoalSprite, frogUpSprite, frog.swidth,
            frog.sheight, goal4XPos + (frog.width / 2 - goalWidth / 4), goalYPos + frog.height / 5, frog.width, frog.height);
    }

    if (goal5) {
        ctx.drawImage(frogImage, frogGoalSprite, frogUpSprite, frog.swidth,
            frog.sheight, goal5XPos + (frog.width / 2 - goalWidth / 4), goalYPos + frog.height / 5, frog.width, frog.height);
    }

    if (goal1 && goal2 && goal3 && goal4 && goal5) {
        goal1 = false;
        goal2 = false;
        goal3 = false;
        goal4 = false;
        goal5 = false;
    }
} // end drawGoalFrogs func

function clearScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function gameLoop() {
    clearScreen();
    displayGameScreenBackground();
    displayLogs();
    displayFrog();
    logsMove();
    frogMove();
    displayCars();
    carsMove();
    frogGotRunOverRealGood();
    frogFloatOnLog();
    frogHitsGoal();
    drawGoalFrogs();
    displayLives();
    if (animateGame) {
        requestAnimationFrame(gameLoop);
    }
}

function initializeGame() {
    frog.lives = 3;
    level = 1;
    if (!startScreenImageLoaded) {
        startScreenImage.src = "start_screen.png";
        startScreenImage.onload = function () { // wait for the frog image to load.
            startScreenImageLoaded = true;
            loadLevel();
        }
    } else {
        loadLevel();
    }
}// end initialzeGame func

function loadLevel() {
    goal1 = false;
    goal2 = false;
    goal3 = false;
    goal4 = false;
    goal5 = false;
    startButton.style.display = 'inline';
    ctx.drawImage(startScreenImage, 0, 0, canvas.width, canvas.height);

    if (level === 1) {
    }
}

function startGame() {
    startButton.style.display = 'none';
    animateGame = true;
    gameLoop();
}

initializeGame();


