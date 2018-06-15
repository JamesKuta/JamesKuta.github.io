let ballX = 75;
let ballY = 75;
let ballSpeedX = 5;
let ballSpeedY = 7;
const BALL_RADIUS = 10;

const BRICK_W = 100;
const BRICK_H = 50;
const BRICK_COUNT = 4;
let brick0 = true;
let brick1 = true;
let brick2 = false;
let brick3 = true;

const PADDLE_WIDTH = 100;
const PADDLE_THICKNESS = 10;
const PADDLE_DIST_FROM_EDGE = 60;
let paddleX = 400;

let canvas, canvasContext;

let mouseX = 0;
let mouseY = 0;

function updateMousePos(evt) {
	let rect = canvas.getBoundingClientRect();
	let root = document.documentElement;

	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;

    paddleX = mouseX - PADDLE_WIDTH/2;
    
}

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	let framesPerSecond = 30;
	setInterval(updateAll, 1000/framesPerSecond);

	canvas.addEventListener('mousemove', updateMousePos);
}

function updateAll() {
    moveAll();
	drawAll();
}

function ballReset() {
	ballX = canvas.width/2;
	ballY = canvas.height/2;
}

function moveAll() {
	ballX += ballSpeedX;
	ballY += ballSpeedY;

	if(ballX - BALL_RADIUS < 0) { //left
		ballSpeedX *= -1;
	}
	if(ballX + BALL_RADIUS > canvas.width) { // right
		ballSpeedX *= -1;
	}
	if(ballY - BALL_RADIUS < 0) { // top
		ballSpeedY *= -1;
	}
	if(ballY + BALL_RADIUS > canvas.height) { // bottom
		ballReset();
	}

	let paddleTopEdgeY = canvas.height-PADDLE_DIST_FROM_EDGE;
	let paddleBottomEdgeY = paddleTopEdgeY + PADDLE_THICKNESS;
	let paddleLeftEdgeX = paddleX;
	let paddleRightEdgeX = paddleLeftEdgeX + PADDLE_WIDTH;
	if( ballY + BALL_RADIUS > paddleTopEdgeY && // below the top of paddle
		ballY - BALL_RADIUS < paddleBottomEdgeY && // above bottom of paddle
		ballX + BALL_RADIUS > paddleLeftEdgeX && // right of the left side of paddle
		ballX - BALL_RADIUS < paddleRightEdgeX) { // left of the left side of paddle
		
		ballSpeedY *= -1;

		let centerOfPaddleX = paddleX+PADDLE_WIDTH/2;
		let ballDistFromPaddleCenterX = ballX - centerOfPaddleX;
		ballSpeedX = ballDistFromPaddleCenterX * 0.35;
	}
}

function drawBricks() {
	if(brick0) {
	colorRect(BRICK_W * 0, 0, BRICK_W - 2, BRICK_H, 'blue');
	}
	if(brick1){
	colorRect(BRICK_W * 1, 0, BRICK_W - 2, BRICK_H, 'blue');
	}
	if(brick2){
	colorRect(BRICK_W * 2, 0, BRICK_W - 2, BRICK_H, 'blue');
	}
	if(brick3) {
	colorRect(BRICK_W * 3, 0, BRICK_W - 2, BRICK_H, 'blue');
	}
}

function drawAll() {
	colorRect(0,0, canvas.width,canvas.height, 'black'); // clear screen

	colorCircle(ballX,ballY, BALL_RADIUS, 'white'); // draw ball

	colorRect(paddleX, canvas.height-PADDLE_DIST_FROM_EDGE,
				PADDLE_WIDTH, PADDLE_THICKNESS, 'white');

	drawBricks();

	

	colorText(mouseX+","+mouseY, mouseX, mouseY, 'yellow');
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
