

// WORK ON WHAT HAPPENS WHEN PLAYER LOSES A LIFE!

// ********** Set Global Variables ***********

//use for testing the size of windows on phones. Remove before release!
//alert(window.innerWidth +' X ' + window.innerHeight);

//James' Image File loads


//Drawing Canvas Variables
let canvas = document.getElementById('canvas');
let canvasContext = canvas.getContext('2d');
let animationState = true;
let startGame = document.getElementById("StartGame");
let jamesImage = new Image();
jamesImage.src = "cm2.jpg";
let jamesImage1 = new Image();
jamesImage1.src = "cm3.jpg";


//Game Level Variables
let levelIndex = 0; // What level is the player on? Increase by one at end of each level.
let activeLevel = new Array(); //Copy current level here to be used during the game
let currentLevel = new Array(); //the template for the active level
let brickCount = 0; // number of visible bricks in each level. Use to calculate when all bricks have been destroyed in a level.

//Brick Variables
let brickWidth = 80;
let brickHeight = 20;
let brickColumns = 10;
let brickRows = 10;
let brickGap = 2;

//TEXT Drawning Const
const BOTTOM_LINE_HEIGHT = canvas.height * .65;
const TEXT_VERTICAL_POS = canvas.height * .70;

//Ball Variables
let ballXPos = 400;
let ballYPos = 500;
let ballRadius = 7;
let ballXSpeed = 3;
let ballYSpeed = -3;

let bounceCount = 0;
const INCREASE_SPEED_FACTOR = 10;
const BALL_Y_START_SPEED = -3;

//Mouse Movement Variables
let mouseX = 0;
let mouseY = 0;

// Paddle Variables

let paddleYPos = canvas.height * .60;
let paddleWidth = 160;
let paddleHeight = 10;
let paddleXPos = 0;

//Player Lives Variables
let lives = 3;

//Game Score varialbes
let score = 0;

//event listeners for Mouse, Touch and Keyboard commands
canvas.addEventListener('mousemove', updateMousePos);
canvas.addEventListener('touchmove', updateTouchPos);




// ********** Mouse, Keyboard and Touch Controls Section ***********

function updateMousePos(evt) {
    let rect = canvas.getBoundingClientRect();
    let root = document.documentElement;

    mouseX = evt.clientX - rect.left - root.scrollLeft;
    mouseY = evt.clientY - rect.top - root.scrollTop;
    paddleXPos = mouseX - paddleWidth / 2;

    //just to make testing easier. Will be commented out before final
    ballXPos = mouseX;
    ballYPos = mouseY;
}

function updateTouchPos(evt) {
	let rect = canvas.getBoundingClientRect();
	let root = document.documentElement;

	mouseX = evt.changedTouches[0].clientX - rect.left - root.scrollLeft;
	mouseY = evt.changedTouches[0].clientY - rect.top - root.scrollTop;
	evt.preventDefault();

    paddleXPos = mouseX - paddleWidth / 2;
}


// ********** Level Layout Section ***********

// level tile grids
function loadLevel() {

    animationState = true; //start drawing the animation frames

    if (levelIndex === 0) {
        currentLevel = [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 2, 1, 0, 0, 0, 0,
            0, 0, 0, 2, 1, 2, 1, 0, 0, 0,
            0, 0, 2, 1, 2, 1, 2, 1, 0, 0,
            0, 5, 1, 2, 1, 2, 1, 2, 5, 0,
            5, 4, 4, 4, 4, 4, 4, 4, 4, 5,
            0, 5, 3, 3, 3, 3, 3, 3, 5, 0,
            0, 0, 3, 3, 3, 3, 3, 3, 0, 0,
            0, 0, 0, 3, 3, 3, 3, 0, 0, 0,
            0, 0, 0, 0, 3, 3, 0, 0, 0, 0,

        ];

    } // end level 0

    if (levelIndex === 1) {
        currentLevel = [
            0, 2, 0, 0, 0, 0, 0, 0, 2, 0,
            0, 0, 2, 0, 1, 1, 0, 2, 0, 0,
            1, 1, 0, 2, 1, 1, 2, 0, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 0, 0, 0, 1, 1, 0, 0, 0, 1,
            1, 0, 3, 0, 1, 1, 0, 3, 0, 1,
            1, 0, 0, 0, 4, 4, 0, 0, 0, 1,
            1, 1, 1, 1, 0, 0, 1, 1, 1, 1,
            0, 1, 1, 1, 0, 0, 1, 1, 1, 0,
            0, 0, 1, 1, 1, 1, 1, 1, 0, 0,

        ];

    } // end level 1

    if (levelIndex === 2) {
        currentLevel = [
            1, 0, 3, 0, 5, 0, 2, 0, 4, 0,
            0, 2, 0, 4, 0, 1, 0, 3, 0, 5,
            4, 0, 2, 0, 5, 0, 3, 0, 1, 0,
            0, 3, 0, 1, 0, 4, 0, 2, 0, 0,
            5, 0, 2, 0, 4, 0, 1, 0, 3, 0,
            0, 1, 0, 3, 0, 5, 0, 2, 0, 4,
            3, 0, 1, 0, 4, 0, 2, 0, 5, 0,
            0, 2, 0, 5, 0, 3, 0, 1, 0, 0,
            4, 0, 1, 0, 3, 0, 5, 0, 2, 0,
            0, 5, 0, 2, 0, 4, 0, 1, 0, 3,

        ];

    } // end level 2

    if (levelIndex === 3) {
        currentLevel = [
            1, 0, 0, 0, 0, 0, 0, 0, 0, 2,
            0, 1, 0, 0, 0, 0, 0, 0, 2, 0,
            0, 0, 1, 0, 0, 0, 0, 2, 0, 0,
            0, 0, 0, 1, 0, 0, 2, 0, 0, 0,
            0, 0, 0, 0, 1, 2, 0, 0, 0, 0,
            0, 0, 0, 0, 2, 1, 0, 0, 0, 0,
            0, 0, 0, 2, 0, 0, 1, 0, 0, 0,
            0, 0, 2, 0, 0, 0, 0, 1, 0, 0,
            0, 2, 0, 0, 0, 0, 0, 0, 1, 0,
            2, 0, 0, 0, 0, 0, 0, 0, 0, 1,

        ];

    } // end level 3

    if (levelIndex === 4) {
        currentLevel = [
            1, 1, 0, 0, 0, 0, 0, 0, 1, 1,
            1, 1, 0, 0, 0, 0, 0, 0, 1, 1,
            0, 0, 0, 0, 2, 2, 0, 0, 0, 0,
            0, 0, 0, 0, 2, 2, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 3, 3, 0, 0, 3, 3, 0, 0,
            0, 0, 3, 3, 0, 0, 3, 3, 0, 0,
            0, 0, 0, 0, 4, 4, 0, 0, 0, 0,
            5, 5, 0, 0, 4, 4, 0, 0, 5, 5,
            5, 5, 0, 0, 0, 0, 0, 0, 5, 5,

        ];

    } // end level 4

    copyCurrentLevelToActiveLevel(); // copy the template grid to an active grid for use during the game

    /* This is here to make creating new grids easier

    if (levelIndex === 0) {
        currentLevel = [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,

        ];

    }

*/

} // end loadLevel func

// set the tile grid from currenLevel to be the activeLevel we can use to play the level.
function copyCurrentLevelToActiveLevel() {

    activeLevel = currentLevel;

    //Set the brickCount for current level

    brickCount = 0; // reset brickCount for new level

    //get the brick count for current level
    for (let i = 0; i < activeLevel.length; i++) {
        if (activeLevel[i]) {
            brickCount++;

        }//end if not 0 add to brickCount
    }// end for loop to set brickCount variable
}// end copyCurrentLevelToActiveLeve func


// ********** Draw Everything Section ***********

function drawLevel() {
    
    //Redraw Canvas Background to clear screen each frame
    canvasContext.fillStyle = 'black';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);

    canvasContext.drawImage(jamesImage1, canvas.width /2 - jamesImage1.width/2, canvas.height / 2 - jamesImage1.height/2 - 100);

    // All Ball Draws

    canvasContext.beginPath();
    canvasContext.arc(ballXPos, ballYPos, ballRadius, 0, 2 * Math.PI);
    canvasContext.fillStyle = 'white';
    canvasContext.fill();
    //canvasContext.lineWidth = 1;
    //canvasContext.strokeStyle = 'red';
    //canvasContext.stroke();

    // All Paddle Draws
    canvasContext.fillStyle = 'purple'
    canvasContext.fillRect(paddleXPos, paddleYPos, paddleWidth, paddleHeight);

    //All Brick Draws
    
    
    for (let row = 0; row < brickRows; row++) {

        for (let col = 0; col < brickColumns; col++) { //loop through level array


            if (activeLevel[brickIndex(row, col)] === 0) {
                continue;
            }

            if (activeLevel[brickIndex(row, col)] === 1) { // Only draw the 1 elements Green
                canvasContext.fillStyle = 'green';
            }

            if (activeLevel[brickIndex(row, col)] === 2) { // Only draw the 2 elements blue
                canvasContext.fillStyle = 'blue';
            }

            if (activeLevel[brickIndex(row, col)] === 3) { // Only draw the 3 elements Red
                canvasContext.fillStyle = 'red';
            }

            if (activeLevel[brickIndex(row, col)] === 4) { // Only draw the 4 elements grey
                canvasContext.fillStyle = 'grey';
            }

            if (activeLevel[brickIndex(row, col)] === 5) { // Only draw the 5 elements orange
                canvasContext.fillStyle = 'orange';
            }

            canvasContext.fillRect(brickWidth * col, brickHeight * row, brickWidth - brickGap, brickHeight - brickGap);

        }
    }// end loop through array for drawing the bricks 

    //calculate the index position of each brick


    //Mouse Coordinate Draws
    // let mouseBrickCol = Math.floor(mouseX / brickWidth);
    // let mouseBrickRow = Math.floor(mouseY / brickHeight);
    // let brickIndexUnderMouse = brickIndex(mouseBrickRow, mouseBrickCol);
    // canvasContext.font = "10px Arial";
    // canvasContext.fillStyle = 'white';
    // canvasContext.fillText(mouseBrickCol + ', ' + mouseBrickRow + ', ' + brickIndexUnderMouse, mouseX, mouseY);

    //Test brick removal under mouse. This is for testing and will be commented out later.
    // if(brickIndexUnderMouse >= 0 && brickIndexUnderMouse < brickColumns * brickRows){
    //     activeLevel[brickIndexUnderMouse] = 0;
    // }

    //Draw End Line
    canvasContext.fillStyle = 'grey'
    canvasContext.fillRect(0, BOTTOM_LINE_HEIGHT, canvas.width, brickHeight);

    //Draw Player Lives
    canvasContext.font = "30px Arial";
    canvasContext.fillStyle = 'white';
    canvasContext.textAlign = 'left';
    canvasContext.fillText('Lives Remaining: ' + lives, 0, TEXT_VERTICAL_POS);

    //Draw Game Score
    canvasContext.font = "30px Arial";
    canvasContext.fillStyle = 'white';
    canvasContext.textAlign = 'right';
    canvasContext.fillText('Score: ' + score, canvas.width, TEXT_VERTICAL_POS);


    //What to do if the brickCount hits 0
    //I put this here because I want the last brick to go away before pausing
    if (brickCount === 0) {
        goToNextLevel();
    } // end brickCount check

} // end drawLevel func

// get the index number at brick position used by draw and collision functions
function brickIndex(loopRow, loopCol) {
    return (loopRow * brickColumns) + loopCol;
}

function moveBall() {
    ballXPos += ballXSpeed;
    ballYPos += ballYSpeed;

    // Did the ball hit the sides of the screen? Make sure ball is going in the correct direction to bounce off or it may get stuck in the wall!
    if (ballXSpeed > 0 && ballXPos > canvas.width || ballXSpeed < 0 && ballXPos < 0) {
        ballXSpeed *= -1;
    }

    //Did the ball hit the top or the bottom of the screen? Make sure ball is going in the correct direction to bouce off or it may get stuck in the top
    if (ballYSpeed < 0 && ballYPos < 0) {
        ballYSpeed *= -1
    }

    if (ballYPos > BOTTOM_LINE_HEIGHT){
        //only play life lost sound if lives are not 0
        if (lives > 0){
            lifeSound.play();
        } else {
            gameOverSound.play();
        }
        loseALife();
        
    }
}

function loseALife () {
    lives--;
    if (lives < 0) {
        endGame();
    } else {
    ballStart();
    }
    
}

function ballStart() {
    ballXPos = 400;
    ballYPos = 500;
    ballYSpeed = -5;
}

function endGame() {
    animationState = false;
    canvasContext.fillStyle = 'black';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);

    canvasContext.font = "100px Comic Sans MS";
    canvasContext.fillStyle = 'red';
    canvasContext.textAlign = 'center';
    canvasContext.fillText("Game Over!", canvas.width / 2, canvas.height/2);
    setTimeout(initializeGame, 5000);
}

function whatDidBallHit() {

    // ball hits paddle detection
    let paddleTop = paddleYPos;
    let paddleBottom = paddleYPos + paddleHeight;
    let paddleLeftEdge = paddleXPos;
    let paddleRightEdge = paddleXPos + paddleWidth;

    let paddleCenter = (paddleXPos + paddleRightEdge) / 2;

    if (ballYSpeed > 0 && ballYPos > paddleTop && ballYPos < paddleBottom && ballXPos > paddleLeftEdge && ballXPos < paddleRightEdge) {
        ballYSpeed *= -1;
        paddleSound.play();

        // figure out what X direction and speed to send the ball based on center offset 
        let ballHitFromCenterOfPaddle = ballXPos - paddleCenter;
        ballXSpeed = ballHitFromCenterOfPaddle * .10;

        //increase bounceCount after X bounces off paddle increase speed of ball
        bounceCount++;
        if (bounceCount % INCREASE_SPEED_FACTOR === 0) {
            //ballXSpeed--;
            ballYSpeed--;
        }// bounceCount
    } // end Ball Paddle Collision

    // ball hits the bricks
    let ballBrickCol = Math.floor(ballXPos / brickWidth); // compute column number ball is in
    let ballBrickRow = Math.floor(ballYPos / brickHeight); // compute row number ball is in
    let brickIndexUnderBall = brickIndex(ballBrickRow, ballBrickCol); // compute index number of brick ball is on

    if (ballBrickCol >= 0 && ballBrickCol < brickColumns &&
        ballBrickRow >= 0 && ballBrickRow < brickRows) {

        if (activeLevel[brickIndexUnderBall]) { // only do anything when index is not 0
            activeLevel[brickIndexUnderBall] = 0; // Disappear the hit brick
            brickCount--; //Remove one brick from our count. 
            score += 10;
            brickSound.play();

            // what side did I hit the brick from?

            let ballColOneFrameAgo = ballXPos - ballXSpeed; //what was X position of the ball
            let ballRowOneFrameAgo = ballYPos - ballYSpeed; //what was Y position of the ball
            let brickColOneFrameAgo = Math.floor(ballColOneFrameAgo / brickWidth); // what was the column number
            let brickRowOneFrameAgo = Math.floor(ballRowOneFrameAgo / brickHeight); // what was the row number

            // if the ball was not in the same column one frame before it hit the brick flip the X speed of the ball. It hit the side.
            if (brickColOneFrameAgo != ballBrickCol) {
                ballXSpeed *= -1;
            }

            // if the ball was not in the same row one frame before it hit the brick, flip the Y speed of the ball. It hit the bottom or the top.
            if (brickRowOneFrameAgo != ballBrickRow) {
                ballYSpeed *= -1;
            }

            // If the ball hits a corner, the above two if statements will fire and flip the x and y speed of the ball.
        }// end what to do when ball hits the brick
    }// collision detection statements
}// end of whatDidBallHit func

function goToNextLevel() {
    levelIndex++;

   //What if we run out of levels?
    if (levelIndex > 2) { // change based on the number of levels available 0 based index
        levelIndex = 0;
    }

    levelStartText();

    animationState = false; // pause the animation frame requests
    ballStart(); // reset the ball position
    setTimeout(loadGame, 5000); // wait 5 seconds and then start the new level
}

function levelStartText(){

    canvasContext.fillStyle = 'black';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);

    if (levelIndex === 0){
        canvasContext.font = "45px Comic Sans MS";
        canvasContext.strokeStyle = 'white';
        canvasContext.textAlign = 'center';
        canvasContext.strokeText("Level 1: The Alien Ship is Here!", canvas.width / 2, canvas.height/2);
        
    }
    
    if (levelIndex === 1){
        canvasContext.font = "50px Comic Sans MS";
        canvasContext.strokeStyle = 'white';
        canvasContext.textAlign = 'center';
        canvasContext.strokeText("Level 2: The Face of the Enemy!", canvas.width / 2, canvas.height/2);
        
    }

    if (levelIndex === 2){
        canvasContext.font = "45px Comic Sans MS";
        canvasContext.strokeStyle = 'white';
        canvasContext.textAlign = 'center';
        canvasContext.strokeText("Level 3: Destroy Their Energy Shield!", canvas.width / 2, canvas.height/2);
        
    }
}// end levelStart func


function playGame() {
    drawLevel();
    moveBall();
    whatDidBallHit();

    // use to pause the game.
    if (animationState) {
        requestAnimationFrame(playGame);
    } 
}

function loadGame() {
    paddleSound = document.getElementById("paddle");
	brickSound= document.getElementById("brick");
    lifeSound= document.getElementById("life");
    gameOverSound = document.getElementById("over");
    gameStartSound = document.getElementById("start");
	lifeSound.play();
	lifeSound.pause();
	paddleSound.play();
	paddleSound.pause();
    brickSound.play();
    brickSound.pause();
    gameOverSound.play();
    gameOverSound.pause();
    gameStartSound.play();

	

    startGame.style.display = 'none';
    loadLevel();
    playGame();

}

function initializeGame() {
    //Redraw Canvas Background to clear screen
    canvasContext.fillStyle = 'black';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    //set the ball variables
    ballXPos = 400;
    ballYPos = 500;
    ballYSpeed = -5;
    ballXSpeed = 3;

    //set the levelIndex to 0 to start the game
    levelIndex = 0;

    //set the number of lives
    lives = 2;

    //set the score to 0
    score = 0;

    //Display Start Game Message and then load the game
    canvasContext.font = "60px arial sans-serif";
    canvasContext.strokeStyle = 'white';
    canvasContext.textAlign = 'center';
    canvasContext.strokeText("James' Breakout Style Game", canvas.width / 2, canvas.height * .10);
    
    canvasContext.font = "30px Comic Sans MS";
    canvasContext.fillStyle = 'white';
    canvasContext.textAlign = 'center';
    canvasContext.fillText("Are You Ready to Fight The Alien Things?", canvas.width / 2, canvas.height/2);
    //startGame.style.display = 'inline';
    startGame.style.display = 'inline';

    canvasContext.drawImage(jamesImage, canvas.width/2 - 200, canvas.height *.12, canvas.width /2, canvas.height/3);
    //canvasContext.drawImage(jamesImage, 100, 400, 100, 400);
}
//goToNextLevel();
initializeGame();
//loadGame();
