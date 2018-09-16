//Michele's Frogger V 1.0 
// by James Kuta
// 09/08/2018

// Global Objects

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

//Frog Global Variables
let frog = new Image();
frog.src = "frog_gimp.png";
let frogCanMove = true;
let sx = 0;
let sy = 0;
let swidth = 40;
let sheight = 40;
let x = 265;
let y = 488;
let width = 30;
let height = 30;


//cars variables
let car = new Image();
car.src = "cars_gimp_game.png";
let carX1 = 100;
let carSX1 = 0;
let carY1 = 400;
let carWidth = 60;
let carHeight = 35;

const carRightSpeed = 7;
const carLeftSpeed = 6;

let carX2 = 500;
//let carSX2 = 60;
let carSX2 = 0;
let carY2 = 400;

let carX3 = 460;
//let carSX3 = 120;
let carSX3 = 60;
let carY3 = 355;

let carX4 = 400;
//let carSX4 = 180;
let carSX4 = 0;
let carY4 = 310;

let carX5 = 360;
//let carSX5 = 0;
let carSX5 = 60;
let carY5 = 265;

let carX6 = 60;
//let carSX6 = 120;
let carSX6 = 60;
let carY6 = 355;

let carX7 = 100;
//let carSX7 = 180;
let carSX7 = 0;
let carY7 = 310;

let carX8 = 160;
//let carSX8 = 0;
let carSX8 = 60;
let carY8 = 265;

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
upButton.addEventListener('click', buttonHandler);
downButton.addEventListener('click', buttonHandler);
rightButton.addEventListener('click', buttonHandler);
leftButton.addEventListener('click', buttonHandler);

function buttonHandler() {
    if (event.target.value == "up" && y > 20 && frogCanMove) {
        y = y - 44;
        sx = 0;
    }

    if (event.target.value == "down" && y + height < canvas.height - 80 && frogCanMove) {
        y = y + 44;
        sx = 0;
    }

    if (event.target.value == "right" && x + width < canvas.width - 20 && frogCanMove) {
        x = x + 44;
        sx = 40;
    }

    if (event.target.value == "left" && x > 20 && frogCanMove) {
        x = x - 44;
        sx = 80;
    }
}

function keyDownHandler(e) {
    if (e.keyCode === 39) {
        rightPressed = true;
    }
    if (e.keyCode === 37) {
        leftPressed = true;
    }

    if (e.keyCode === 38) {
        upPressed = true;
    }

    if (e.keyCode === 40) {
        downPressed = true;
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
    if (frogCanMove) {

        if (upPressed === true && up === true && y > 20) {
            y = y - 44;
            up = false;
            sx = 0;
        }

        if (upPressed === false) {
            up = true;
        }

        if (downPressed === true && down === true && y + height < canvas.height - 80) {
            y = y + 44;
            down = false;
            sx = 0;
        }

        if (downPressed === false) {
            down = true;
        }

        if (rightPressed === true && right === true && x + width < canvas.width - 20) {
            x = x + 44;
            right = false;
            sx = 40;
        }

        if (rightPressed === false) {
            right = true;
        }

        if (leftPressed === true && left === true && x > 20) {
            x = x - 44;
            left = false;
            sx = 80;
        }

        if (leftPressed === false) {
            left = true;
        }
    }
}

function drawBackground() {
    // Draw Grass
    ctx.fillStyle = "lime";
    ctx.fillRect(0, 440, 570, 45);
    ctx.fillRect(0, 220, 570, 45);

    // Draw Road

    ctx.beginPath();
    ctx.moveTo(0, 266);
    ctx.lineTo(570, 266);
    ctx.strokeStyle = "yellow";
    ctx.setLineDash([10]);
    ctx.strokeWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, 350);
    ctx.lineTo(570, 350);
    ctx.strokeStyle = "white";
    ctx.setLineDash([10]);
    ctx.strokeWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, 305);
    ctx.lineTo(570, 305);
    ctx.strokeStyle = "yellow";
    ctx.setLineDash([25]);
    ctx.strokeWidth = 4;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, 395);
    ctx.lineTo(570, 395);
    ctx.strokeStyle = "yellow";
    ctx.setLineDash([25]);
    ctx.strokeWidth = 4;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, 439);
    ctx.lineTo(570, 439);
    ctx.strokeStyle = "yellow";
    ctx.setLineDash([10]);
    ctx.strokeWidth = 4;
    ctx.stroke();



    // draw water area
    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, 570, 220);


} // end drawBackground func

function drawFrog() {
    ctx.drawImage(frog, sx, sy, swidth, sheight, x, y, width, height);
}

function drawCars() {
    let carsSX = [carSX1, carSX2, carSX3, carSX4, carSX5, carSX6, carSX7, carSX8];
    let carsX = [carX1, carX2, carX3, carX4, carX5, carX6, carX7, carX8];
    let carsY = [carY1, carY2, carY3, carY4, carY5, carY6, carY7, carY8];

    for (let i = 0; i < carsX.length; i++) {
        ctx.drawImage(car, carsSX[i], 0, 60, 35, carsX[i], carsY[i], carWidth, carHeight);
    }
}//end drawCars func

function moveCars() {
    // if (carX1 < canvas.width + 100) {
    //     carX1 += 3;
    // } else {
    //     carX1 = -100;
    //     carSX1 = (Math.floor(Math.random() * 2)) * 60;
    // }

    if (carX1 < canvas.width + 100) {
        carX1 += carRightSpeed;
    } else {
        carX1 = (Math.floor(Math.random() * 200) + 200) * -1
        //carX1 = -100;
    }

    if (carX2 < canvas.width + 100) {
        carX2 += carRightSpeed;
    } else {
        carX2 = (Math.floor(Math.random() * 100) + 100) * -1
        //carX2 = -100;
        //carSX2 = (Math.floor(Math.random() * 2)) * 60;
    }

    if (carX3 > -100) {
        carX3 -= carLeftSpeed;
    } else {
        carX3 = canvas.width + (Math.floor(Math.random() * 100) + 100);
        //carSX3 = (Math.floor(Math.random() * 2)) * 60;
    }

    if (carX4 < canvas.width + 100) {
        carX4 += carRightSpeed;
    } else {
        carX4 = (Math.floor(Math.random() * 100) + 100) * -1
        //carSX4 = (Math.floor(Math.random() * 2)) * 60;
    }

    if (carX5 > -100) {
        carX5 -= carLeftSpeed;
    } else {
        //carX5 = canvas.width + 100;
        carX5 = canvas.width + (Math.floor(Math.random() * 100) + 200);

        //carSX5 = (Math.floor(Math.random() * 2)) * 60;
    }

    if (carX6 > -100) {
        carX6 -= carLeftSpeed;
    } else {
        carX6 = canvas.width + (Math.floor(Math.random() * 200) + 100);
        //carSX6 = (Math.floor(Math.random() * 2)) * 60;
    }

    if (carX7 < canvas.width + 100) {
        carX7 += carRightSpeed;
    } else {
        carX7 = (Math.floor(Math.random() * 200) + 200) * -1
        //carX7 = -100;
        //carSX7 = (Math.floor(Math.random() * 2)) * 60;
    }

    if (carX8 > -100) {
        carX8 -= carLeftSpeed;
    } else {
        carX8 = canvas.width + (Math.floor(Math.random() * 200) + 200);
        //carSX8 = (Math.floor(Math.random() * 2)) * 60;
    }



}

function runOver() {
    let carsX = [carX1, carX2, carX3, carX4, carX5, carX6, carX7, carX8];
    let carsY = [carY1, carY2, carY3, carY4, carY5, carY6, carY7, carY8];
    for (let i = 0; i < carsX.length; i++) {
        if (carsX[i] <= x + width && carsX[i] + carWidth >= x &&
            carsY[i] + carHeight >= y && carsY[i] <= y + height) {
            sx = 120;
            frogCanMove = false;
            setTimeout(resetFrog, 1000);
        }
    }
}// end runOver func

function resetFrog() {
    if (!frogCanMove) {
        y = 488;
        x = 265;
        sx = 0;
        frogCanMove = true;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    drawFrog();
    frogMove();
    drawCars();
    moveCars();
    runOver();

    requestAnimationFrame(draw);
}

draw();