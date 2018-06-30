//My Breakout Style Game for James
//Created By James Kuta 06/22/2018
//Version 1.0

document.documentElement.style.overflow = 'hidden';
document.body.scroll = 'no';
let canvas = document.getElementById('gameCanvas');
let canvasContext = canvas.getContext('2d');

let screenHeight = getScreenHeight();
console.log(screenHeight);
let screenWidth = Math.round(screenHeight * 0.69);
console.log(screenWidth);

canvas.width = screenWidth;
canvas.height = screenHeight;
str1 = "<p>Alien brick things are hovering in the night sky!<br><br>Fear grips the people of Earth.<br><br>Are they friendly or hostile?<br><br>We can't afford to wait and see.<br><br>You have been sent to blow their brick behinds from the sky!<br><br>Do you have what it takes to save all of humanity?<br><br><br><em>Use the Finger Swipe Area to move your ship.<br>We're all counting on you!</em></p><button type='button' onclick='startGame();'>Start Game</button>";

document.getElementById('menu-text').innerHTML = str1;
//alert(window.innerWidth +' X ' + window.innerHeight);
//alert('Drag a finger left or right inside the Finger Swipe Area to move the paddle');

let jamesImage = new Image();
jamesImage.src = 'cm2.jpg';

let paddleSound;
//paddleSound = document.getElementById("paddle"); 
let brickSound; 
//brickSound= document.getElementById("brick");
let lifeSound; 
//lifeSound= document.getElementById("life");

let ballX = 75;
let ballY = 75;
let ballSpeedX = 10;
let ballSpeedY = 10;

let brickColor =['orange', 'purple', 'pink', 'red'];
let levelColor = 0;
const BRICK_H = screenHeight / 43;
const BRICK_GAP = 2;
const BRICK_COLS = 10;
const BRICK_W = screenWidth / 10;
const BRICK_ROWS = 10;
let brickGrid = new Array(BRICK_COLS * BRICK_ROWS);
let bricksLeft = 0;

const PADDLE_WIDTH = screenWidth / 5;
const PADDLE_THICKNESS = screenHeight / 65;
const PADDLE_DIST_FROM_EDGE = screenHeight /2.6;
let paddleX = (300 / 2) - (PADDLE_THICKNESS / 2);

let mouseX = 0;
let mouseY = 0;

let lives = 2;

//window.onload = function() {
	// canvas = document.getElementById('gameCanvas');
	// canvasContext = canvas.getContext('2d');
	//let framesPerSecond = 60;
	//setInterval(updateAll, 1000/framesPerSecond);
	//window.addEventListener('resize', canvasSize);
	
	function getScreenHeight(){
		if (window.innerHeight > 1300){
			return 1300;
		} else {
			return window.innerHeight;
		}
	}
	
	function startGame() {
	
	paddleSound = document.getElementById("paddle");
	brickSound= document.getElementById("brick");
	lifeSound= document.getElementById("life");
	lifeSound.play();
	//lifeSound.stop();
	paddleSound.play();
	//paddleSound.stop();
	brickSound.play();
	//brickSound.stop();
	document.getElementById('menu-text').style.visibility = 'hidden';
	document.getElementById('menu-text').style.visibility = 'hidden';

	canvas.addEventListener('mousemove', updateMousePos);
	canvas.addEventListener('touchmove', updateTouchPosition);

	//canvasSize();
	//drawAll();
	brickReset();
	ballReset();
	requestAnimationFrame(updateAll);
}

// function canvasSize(){
// 	//screenWidth = window.innerWidth - 5;
// 	//screenHeight = window.innerHeight - 5;
// 	canvasContext.canvas.width;
// 	canvasContext.canvas.height;
	
	
// }

function updateMousePos(evt) {
	let rect = canvas.getBoundingClientRect();
	let root = document.documentElement;

	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;

	paddleX = mouseX - PADDLE_WIDTH/2;

	// cheat / hack to test ball in any position
	/*ballX = mouseX;
	ballY = mouseY;
	ballSpeedX = 4;
	ballSpeedY = -4;*/
}

function updateTouchPosition(evt) {
	let rect = canvas.getBoundingClientRect();
	let root = document.documentElement;

	mouseX = evt.changedTouches[0].clientX - rect.left - root.scrollLeft;
	mouseY = evt.changedTouches[0].clientY - rect.top - root.scrollTop;
	evt.preventDefault();

	paddleX = mouseX - PADDLE_WIDTH/2;

	// cheat / hack to test ball in any position
	 //ballX = mouseX;
	 //ballY = mouseY;
	// ballSpeedX = 4;
	// ballSpeedY = -4;
}

function brickReset() {
	bricksLeft = 0;
	let i;
	for(i=0; i< 3*BRICK_COLS; i++) {
		brickGrid[i] = false;
	}
	for(; i<BRICK_COLS * BRICK_ROWS; i++) {
		let trueFalseFactor = 0.25;
		if (Math.random() > trueFalseFactor){
		brickGrid[i] = true;
		bricksLeft++;
		} else {
			brickGrid[i] = false;
			//bricksLeft++;
		} //end of random brick assignment
	}
} 
 

function updateAll() {
	moveAll();
	drawAll();
	requestAnimationFrame(updateAll);
}

function ballReset() {
	ballX = canvas.width/2;
	ballY = (canvas.height - PADDLE_DIST_FROM_EDGE) - 20;
	console.log('ballY: ', ballY);

	ballSpeedX = Math.floor(Math.random() * 10);
	ballSpeedY = -5;
}

function ballMove() {
	ballX += ballSpeedX;
	ballY += ballSpeedY;

	if(ballX < 0 && ballSpeedX < 0.0) { //left
		ballSpeedX *= -1;
	}
	if(ballX > canvas.width && ballSpeedX > 0.0) { // right
		ballSpeedX *= -1;
	}
	if(ballY < 0 && ballSpeedY < 0.0) { // top
		ballSpeedY *= -1;
	}
	if(ballY > canvas.height - (screenHeight / 3.25)) {
		console.log('ball: ', ballY); // bottom
		lifeSound.play();
		ballReset();
		lives--
		if (lives === -1){
		alert('You were unable to defend the earth from the swarm of attacking alien brick things! Everyone you know is now enslaved! Good thing for all of us this is just a game! Go ahead and try again. The people of the Earth need you!');
		lives = 2;
		levelColor = 0;
		brickReset();
		}
	}
}

function isBrickAtColRow(col, row) {
	if(col >= 0 && col < BRICK_COLS &&
		row >= 0 && row < BRICK_ROWS) {
		 let brickIndexUnderCoord = rowColToArrayIndex(col, row);
		 return brickGrid[brickIndexUnderCoord];
	} else {
		return false;
	}
}

function ballBrickHandling() {
	let ballBrickCol = Math.floor(ballX / BRICK_W);
	let ballBrickRow = Math.floor(ballY / BRICK_H);
	let brickIndexUnderBall = rowColToArrayIndex(ballBrickCol, ballBrickRow);

	if(ballBrickCol >= 0 && ballBrickCol < BRICK_COLS &&
		ballBrickRow >= 0 && ballBrickRow < BRICK_ROWS) {

		if(isBrickAtColRow( ballBrickCol,ballBrickRow )) {
			brickGrid[brickIndexUnderBall] = false;
			bricksLeft--;
			brickSound.play();
			if(bricksLeft == 0) {
				alert('The alien brick things are defeated! Many songs will be sung of your deeds this day! Oh no! The aliens sent reinforcements! You must defend the Earth once again!');
				if(levelColor < 3){
				levelColor++
				}else {
					levelColor = 0;
				}
				brickReset();
				ballReset();
				
			} else { // out of bricks
			//console.log(bricksLeft);

			let prevBallX = ballX - ballSpeedX;
			let prevBallY = ballY - ballSpeedY;
			let prevBrickCol = Math.floor(prevBallX / BRICK_W);
			let prevBrickRow = Math.floor(prevBallY / BRICK_H);

			let bothTestsFailed = true;

			if(prevBrickCol != ballBrickCol) {
				if(isBrickAtColRow(prevBrickCol, ballBrickRow) == false) {
					ballSpeedX *= -1;
					bothTestsFailed = false;
					brickSound.play();
				}
			}
			if(prevBrickRow != ballBrickRow) {
				if(isBrickAtColRow(ballBrickCol, prevBrickRow) == false) {
					ballSpeedY *= -1;
					bothTestsFailed = false;
					brickSound.play();
				}
			}

			if(bothTestsFailed) { // armpit case, prevents ball from going through
				ballSpeedX *= -1;
				ballSpeedY *= -1;
				brickSound.play();
			}
			}

		} // end of brick found
	} // end of valid col and row
} // end of ballBrickHandling func

function ballPaddleHandling() {
	let paddleTopEdgeY = canvas.height-PADDLE_DIST_FROM_EDGE;
	let paddleBottomEdgeY = paddleTopEdgeY + PADDLE_THICKNESS;
	let paddleLeftEdgeX = paddleX;
	let paddleRightEdgeX = paddleLeftEdgeX + PADDLE_WIDTH;
	if( ballY > paddleTopEdgeY && // below the top of paddle
		ballY < paddleBottomEdgeY && // above bottom of paddle
		ballX > paddleLeftEdgeX && // right of the left side of paddle
		ballX < paddleRightEdgeX) { // left of the left side of paddle
		
		ballSpeedY *= -1;
		paddleSound.play();

		let centerOfPaddleX = paddleX+PADDLE_WIDTH/2;
		let ballDistFromPaddleCenterX = ballX - centerOfPaddleX;
		ballSpeedX = ballDistFromPaddleCenterX * 0.30;

		if(bricksLeft == 0) {
			alert('The alien brick things are defeated! Many songs will be sung of your deeds this day! Oh no! The aliens sent reinforcements! You must defend the Earth once again!');
			if(levelColor < 3){
			levelColor++
			}else {
				levelColor = 0;
			}
			brickReset();
			ballReset(); //leave this just in case random spans no bricks!
		} // out of bricks
	} // ball center inside paddle
} // end of ballPaddleHandling

function moveAll() {
	ballMove();
	
	ballBrickHandling();
	
	ballPaddleHandling();

	console.log('paddlePos: ', PADDLE_DIST_FROM_EDGE);
	
}

function rowColToArrayIndex(col, row) {
	return col + BRICK_COLS * row;
}

function drawBricks() {

	for(let eachRow=0;eachRow<BRICK_ROWS;eachRow++) {
		for(let eachCol=0;eachCol<BRICK_COLS;eachCol++) {

			let arrayIndex = rowColToArrayIndex(eachCol, eachRow); 

			if(brickGrid[arrayIndex]) {
				colorRect(BRICK_W*eachCol,BRICK_H*eachRow,
					BRICK_W-BRICK_GAP,BRICK_H-BRICK_GAP, brickColor[levelColor]);
			} // end of is this brick here
		} // end of for each brick
	} // end of for each row

} // end of drawBricks func

function drawAll() {
	colorRect(0,0, canvas.width,canvas.height, '#000000'); // clear screen

	//starMovement();
	canvasContext.drawImage(jamesImage, canvas.width /2 - jamesImage.width/2, canvas.height / 2
							-jamesImage.height/2 - 100);

	colorText('Finger Swipe Area', canvas.width / 2-200, canvas.height / 1.18, 'white', 
				'50px Arial');	
	colorText('Lives Remaining : ' + lives, screenWidth / 1.44, screenHeight / 26, 'white', '25px Arial');
	
	colorCircle(ballX,ballY, screenWidth /90, 'white'); // draw ball

	colorRect(0, canvas.height / 1.44, canvas.width, 20, 'red');

	colorRect(paddleX, canvas.height-PADDLE_DIST_FROM_EDGE,
				PADDLE_WIDTH, PADDLE_THICKNESS, 'blue');


	drawBricks();
}

function colorRect(topLeftX,topLeftY, boxWidth,boxHeight, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.fillRect(topLeftX,topLeftY, boxWidth,boxHeight);
}

function colorCircle(centerX,centerY, radius, fillColor,) {
	canvasContext.fillStyle = fillColor;
	canvasContext.beginPath();
	canvasContext.arc(centerX,centerY, radius, 0,Math.PI*2, true);
	canvasContext.fill();
}

function colorText(showWords, textX,textY, fillColor, fontStyle) {
	canvasContext.save();
	canvasContext.font = fontStyle;
	canvasContext.fillStyle = fillColor;
	canvasContext.fillText(showWords, textX, textY);
	canvasContext.restore();
}