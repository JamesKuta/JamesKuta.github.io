/////////////////////////////////////
// Michele's Frogger Game          //
// Developed By James Kuta         //
// Project Started on 09/08/2018   //
// Project Finished on             //
/////////////////////////////////////

// Global Objects
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

// Frog object (may turn into class if I want 2 player game)
let frogImage = new Image();
frogImage.src = "frog_gimp.png";

let frog = {
    sx: 0,
    sy: 0,
    swidth: 40,
    sheight: 40,
    x: 265,
    y: 488,
    width: 30,
    height: 30,
    frogCanMove: true
};


//constructor function for the car objects.
function Car(carX, carSX, carY, carWidth, carHeight, carSpeed) {
    this.carX = carX;
    this.carSX = carSX;
    this.carY = carY;
    this.carWidth = carWidth;
    this.carHeight = carHeight;
    this.carSpeed = carSpeed;
}

/*The image loading for the car is outside of the car class, because I can't figure
out how to create an Image object inside of the function constructor.
My way of loading the image works, but it seems like the car images should be
a part of the Car constructor. I tried creating a prototype method and calling it, but that did not work */

Car.carImage = new Image();
Car.carImage.src = "cars_gimp_game.png";

let carArray = [];

/*I should change which car objects share the same carY and carSpeed. car1 and car2
 should go together and so on. The current order is a result of how I tested 
 where the cars were drawing while writing the code. */
let car0 = new Car(100, 0, 400, 60, 35, 5);
carArray.push(car0);
let car1 = new Car(500, 0, 400, 60, 35, 5);
carArray.push(car1);
let car2 = new Car(460, 60, 355, 60, 35, -3);
carArray.push(car2);
let car3 = new Car(400, 0, 310, 60, 35, 2);
carArray.push(car3);
let car4 = new Car(360, 60, 265, 60, 35, -5);
carArray.push(car4);
let car5 = new Car(60, 60, 355, 60, 35, -3);
carArray.push(car5);
let car6 = new Car(100, 0, 310, 60, 35, 2);
carArray.push(car6);
let car7 = new Car(160, 60, 265, 60, 35, -5);
carArray.push(car7);

// log class
function Log(logX, logY, logWidth, logHeight, logSpeed) {
    this.logX = logX;
    this.logY = logY;
    this.logWidth = logWidth;
    this.logHeight = logHeight;
    this.logSpeed = logSpeed;
}

logArray = [];

log0 = new Log(300, 180, 120, 30, 2);
logArray.push(log0);
log1 = new Log(40, 180, 120, 30, 2);
logArray.push(log1);
log2 = new Log(200, 136, 120, 30, 3);
logArray.push(log2);
log3 = new Log(0, 136, 120, 30, 3);
logArray.push(log3);
log4 = new Log(400, 92, 120, 30, -1);
logArray.push(log4);
log5 = new Log(50, 92, 120, 30, -1);
logArray.push(log5);

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
    if (event.target.value == "up" && frog.y > 20 && frog.frogCanMove) {
        frog.y = frog.y - 44;
        sx = 0;
        event.preventDefault();
    }

    if (event.target.value == "down" && frog.y + frog.height < canvas.height - 80 && frog.frogCanMove) {
        frog.y = frog.y + 44;
        frog.sx = 0;
        event.preventDefault();
    }

    if (event.target.value == "right" && frog.x + frog.width < canvas.width - 20 && frog.frogCanMove) {
        frog.x = frog.x + 44;
        frog.sx = 40;
        event.preventDefault();
    }

    if (event.target.value == "left" && frog.x > 20 && frog.frogCanMove) {
        frog.x = frog.x - 44;
        frog.sx = 80;
        event.preventDefault();
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

        if (upPressed === true && up === true && frog.y > 20) {
            frog.y = frog.y - 44;
            up = false;
            frog.sx = 0;
        }

        if (upPressed === false) {
            up = true;
        }

        if (downPressed === true && down === true && frog.y + frog.height < canvas.height - 80) {
            frog.y = frog.y + 44;
            down = false;
            frog.sx = 0;
        }

        if (downPressed === false) {
            down = true;
        }

        if (rightPressed === true && right === true && frog.x + frog.width < canvas.width - 20) {
            frog.x = frog.x + 44;
            right = false;
            frog.sx = 40;
        }

        if (rightPressed === false) {
            right = true;
        }

        if (leftPressed === true && left === true && frog.x > 20) {
            frog.x = frog.x - 44;
            left = false;
            frog.sx = 80;
        }

        if (leftPressed === false) {
            left = true;
        }
    }
    //console.log(frog.y);
}

function displayGameScreenBackground() {
    // Draw Grass
    ctx.fillStyle = "rgb(100, 150, 50)";
    ctx.fillRect(0, 440, 570, 45);
    ctx.fillRect(0, 220, 570, 45);

    // Draw Road
    ctx.beginPath();
    ctx.moveTo(0, 266);
    ctx.lineTo(570, 266);
    ctx.strokeStyle = "white";
    ctx.setLineDash([0]);
    ctx.strokeWidth = 4;
    ctx.lineWidth = 5;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, 350);
    ctx.lineTo(570, 350);
    ctx.strokeStyle = "white";
    ctx.setLineDash([10]);
    ctx.strokeWidth = 2;
    ctx.lineWidth = 2;
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
    ctx.strokeStyle = "white";
    ctx.setLineDash([0]);
    ctx.strokeWidth = 4;
    ctx.lineWidth = 5;
    ctx.stroke();

    // draw water area
    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, 570, 220);


} // end displayGameScreenBackground func

function displayFrog() {
    ctx.drawImage(frogImage, frog.sx, frog.sy, frog.swidth,
        frog.sheight, frog.x, frog.y, frog.width, frog.height);
}

//this function works with my carArray for loop.
function displayCars() {
    for (let i = 0; i < carArray.length; i++) {
        ctx.drawImage(Car.carImage, carArray[i].carSX, 0, 60, 35, carArray[i].carX, carArray[i].carY, carArray[i].carWidth, carArray[i].carHeight);
        //console.log(carArray[i].carX);
    }

}//end displayCars func

/* this function works, but it seems like I should be able to use a carArray for loop to shorten this function.
But I am not figuring out how. I want to write cleaner code and all the if statements and checking
object names seems wrong to me for some reason. Like I am missing a better way. */
function carsMove() {

    if (car0.carX < canvas.width + 100) {
        car0.carX += car0.carSpeed;
    } else {
        car0.carX = (Math.floor(Math.random() * 200) + 200) * -1
    }

    if (car1.carX < canvas.width + 100) {
        car1.carX += car1.carSpeed;
    } else if (car0.carX < canvas.width && car0.carX > 100) {
        car1.carX = (Math.floor(Math.random() * 100) + 100) * -1
    }


    if (car2.carX > -100) {
        car2.carX += car2.carSpeed;
    } else {
        car2.carX = canvas.width + (Math.floor(Math.random() * 100) + 100);
    }

    if (car3.carX < canvas.width + 100) {
        car3.carX += car3.carSpeed;
    } else if (car6.carX < canvas.width && car6.carX > 40) {
        car3.carX = (Math.floor(Math.random() * 100) + 100) * -1
    }

    if (car4.carX > -100) {
        car4.carX += car4.carSpeed;
    } else {
        car4.carX = 570;
    }

    if (car5.carX > -100) {
        car5.carX += car5.carSpeed;
    } else if (car2.carX < canvas.width && car2.carX > 30) {
        car5.carX = canvas.width + (Math.floor(Math.random() * 200) + 100);
    }

    if (car6.carX < canvas.width + 100) {
        car6.carX += car6.carSpeed;
    } else {
        car6.carX = (Math.floor(Math.random() * 200) + 200) * -1

    }

    if (car7.carX > -100) {
        car7.carX += car7.carSpeed;
    } else if (car4.carX < canvas.width && car4.carX > 60) {
        car7.carX = canvas.width + (Math.floor(Math.random()) + 100);
    }
}// end carsMove func

// this function works with my carArray for loop.
function frogGotRunOverRealGood() {
    for (let i = 0; i < carArray.length; i++) {
        if (carArray[i].carX <= frog.x + frog.width && carArray[i].carX + carArray[i].carWidth >= frog.x &&
            carArray[i].carY + carArray[i].carHeight >= frog.y && carArray[i].carY <= frog.y + frog.height) {
            frog.sx = 120;
            frog.frogCanMove = false;
            setTimeout(frogReset, 1000);
        }
    }
}// end frogGotRunOverRealGood func

function frogReset() {
    if (!frog.frogCanMove) {
        frog.y = 488;
        frog.x = 265;
        frog.sx = 0;
        frog.frogCanMove = true;
    }
}

function displayLogs() {
    ctx.fillStyle = 'tan';
    for (let i = 0; i < logArray.length; i++) {
        ctx.fillRect(logArray[i].logX, logArray[i].logY, logArray[i].logWidth, logArray[i].logHeight);
    }
}

function logsMove() {
    if (log0.logX < canvas.width + 100) {
        log0.logX += log0.logSpeed;
    }
    else {
        log0.logX = -100;
    }

    if (log1.logX < canvas.width + 100) {
        log1.logX += log1.logSpeed;
    }
    else {
        log1.logX = -100;
    }

    if (log2.logX < canvas.width + 100) {
        log2.logX += log2.logSpeed;
    }
    else {
        log2.logX = -100;
    }

    if (log3.logX < canvas.width + 100) {
        log3.logX += log3.logSpeed;
    }
    else {
        log3.logX = -100;
    }

    if (log4.logX > log4.logWidth * -1) {
        log4.logX += log4.logSpeed;
    }
    else {
        log4.logX = 670;
    }

    if (log5.logX > log5.logWidth * -1) {
        log5.logX += log5.logSpeed;
    }
    else {
        log5.logX = 670;
    }
}// end logsMove func

/* collision detection between log and frog. I used the logArray elements here 
instead of typing the log object names just to practice working with array elements
for loop does not work here because logArray[i] would all point to the same element 
each iteration of the loop. Is ther a better way than all of these if statements? */
function frogFloatOnLog() {
    if (logArray[0].logX <= frog.x + frog.width &&
        logArray[0].logX + logArray[0].logWidth >= frog.x &&
        logArray[0].logY + logArray[0].logHeight >= frog.y &&
        logArray[0].logY <= frog.y + frog.height) {
        if (frog.x < canvas.width - 30)
            frog.x = frog.x + logArray[0].logSpeed;
    }
    if (logArray[1].logX <= frog.x + frog.width &&
        logArray[1].logX + logArray[1].logWidth >= frog.x &&
        logArray[1].logY + logArray[1].logHeight >= frog.y &&
        logArray[1].logY <= frog.y + frog.height) {
        if (frog.x < canvas.width - 30)
            frog.x = frog.x + logArray[1].logSpeed;
    }

    if (logArray[2].logX <= frog.x + frog.width &&
        logArray[2].logX + logArray[2].logWidth >= frog.x &&
        logArray[2].logY + logArray[2].logHeight >= frog.y &&
        logArray[2].logY <= frog.y + frog.height) {
        if (frog.x < canvas.width - 30)
            frog.x = frog.x + logArray[2].logSpeed;
    }

    if (logArray[3].logX <= frog.x + frog.width &&
        logArray[3].logX + logArray[3].logWidth >= frog.x &&
        logArray[3].logY + logArray[3].logHeight >= frog.y &&
        logArray[3].logY <= frog.y + frog.height) {
        if (frog.x < canvas.width - 30)
            frog.x = frog.x + logArray[3].logSpeed;
    }

    if (logArray[4].logX <= frog.x + frog.width &&
        logArray[4].logX + logArray[4].logWidth >= frog.x &&
        logArray[4].logY + logArray[4].logHeight >= frog.y &&
        logArray[4].logY <= frog.y + frog.height) {
        if (frog.x > 0)
            frog.x = frog.x + logArray[4].logSpeed;
    }

    if (logArray[5].logX <= frog.x + frog.width &&
        logArray[5].logX + logArray[5].logWidth >= frog.x &&
        logArray[5].logY + logArray[5].logHeight >= frog.y &&
        logArray[5].logY <= frog.y + frog.height) {
        if (frog.x > 0)
            frog.x = frog.x + logArray[5].logSpeed;
    }

}// frogFloatOnLog func

function draw() {
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

    requestAnimationFrame(draw);
}

draw();