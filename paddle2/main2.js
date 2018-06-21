document.documentElement.style.overflow = 'hidden';
document.body.scroll = 'no';
let canvas = document.getElementById('gameCanvas');
let canvasContext = canvas.getContext('2d');

alert(window.innerWidth +' X ' + window.innerHeight);

let ballX = 75;
let ballY = 75;
let ballSpeedX = 1;
let ballSpeedY = 2;


const BRICK_H = 30;
const BRICK_GAP = 2;
const BRICK_COLS = 10;
const BRICK_W = 90;
const BRICK_ROWS = 10;
let brickGrid = new Array(BRICK_COLS * BRICK_ROWS);
let bricksLeft = 0;

const PADDLE_WIDTH = 160;
const PADDLE_THICKNESS = 20;
const PADDLE_DIST_FROM_EDGE = 200;
let paddleX = (300 / 2) - (PADDLE_THICKNESS / 2);

let mouseX = 0;
let mouseY = 0;

window.onload = function() {
	// canvas = document.getElementById('gameCanvas');
	// canvasContext = canvas.getContext('2d');




	let framesPerSecond = 60;
	setInterval(updateAll, 1000/framesPerSecond);

	//window.addEventListener('resize', canvasSize);
	canvas.addEventListener('mousemove', updateMousePos);
	canvas.addEventListener('touchmove', updateTouchPosition);

	//canvasSize();
	//drawAll();
	brickReset();
	ballReset();
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
	// ballX = mouseX;
	// ballY = mouseY;
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
		brickGrid[i] = true;
		bricksLeft++;
	} // end of for each brick
} // end of brickReset func

function updateAll() {
	moveAll();
	drawAll();
}

function ballReset() {
	ballX = canvas.width/2;
	ballY = (canvas.height - PADDLE_DIST_FROM_EDGE) - 20;
	console.log('ballY: ', ballY);

	ballSpeedX = Math.floor(Math.random() * 10);
	ballSpeedY = -3;
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
	if(ballY > canvas.height - 100) {
		console.log('Padlle: ', PADDLE_DIST_FROM_EDGE);
console.log('ball: ', ballY); // bottom
		ballReset();
		brickReset();
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
				}
			}
			if(prevBrickRow != ballBrickRow) {
				if(isBrickAtColRow(ballBrickCol, prevBrickRow) == false) {
					ballSpeedY *= -1;
					bothTestsFailed = false;
				}
			}

			if(bothTestsFailed) { // armpit case, prevents ball from going through
				ballSpeedX *= -1;
				ballSpeedY *= -1;
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

		let centerOfPaddleX = paddleX+PADDLE_WIDTH/2;
		let ballDistFromPaddleCenterX = ballX - centerOfPaddleX;
		ballSpeedX = ballDistFromPaddleCenterX * 0.25;

		if(bricksLeft == 0) {
			brickReset();
		} // out of bricks
	} // ball center inside paddle
} // end of ballPaddleHandling

function moveAll() {
	ballMove();
	
	ballBrickHandling();
	
	ballPaddleHandling();
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
					BRICK_W-BRICK_GAP,BRICK_H-BRICK_GAP, 'orange');
			} // end of is this brick here
		} // end of for each brick
	} // end of for each row

} // end of drawBricks func

function drawAll() {
	colorRect(0,0, canvas.width,canvas.height, '#000000'); // clear screen


	colorText('Lives: 10', 800,50, 'white');
	
	colorCircle(ballX,ballY, 10, 'white'); // draw ball

	colorRect(0, canvas.height - 100, canvas.width, 20, 'red');

	colorRect(paddleX, canvas.height-PADDLE_DIST_FROM_EDGE,
				PADDLE_WIDTH, PADDLE_THICKNESS, 'blue');


	drawBricks();
}

function colorRect(topLeftX,topLeftY, boxWidth,boxHeight, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.fillRect(topLeftX,topLeftY, boxWidth,boxHeight);
}

function colorCircle(centerX,centerY, radius, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.beginPath();
	canvasContext.arc(centerX,centerY, radius, 0,Math.PI*2, true);
	canvasContext.fill();
}

function colorText(showWords, textX,textY, fillColor) {
	
	canvasContext.fillStyle = fillColor;
	canvasContext.fillText(showWords, textX, textY);
}