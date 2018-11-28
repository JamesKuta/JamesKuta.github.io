// Get the Canvas Element
let canvas = document.getElementById("canvas");
// Set the Context of the Canvas for drawing 2d objects
let c = canvas.getContext("2d");
// Create a background color for the canvas
canvas.style.backgroundColor = "red";

// Get Input elements
let setUserXVelocity = document.getElementById("user-velocity-x");
let setUserYVelocity = document.getElementById("user-velocity-y");
let setUserBallRadius = document.getElementById("user-ball-radius");
let setUserGravity = document.getElementById("user-gravity");
let setUserFriction = document.getElementById("user-friction");

let createBallButton = document.getElementById("create");
//--Global Variables--//

//Screen Size Variables
let screenWidth = window.innerWidth;
let screenHeight = window.innerHeight;
let screenLeftEdge = 0;

//User Input Variables
let userXVelocity;
let userYVelocity;
let userBallRadius;
let userGravity;
let userFriction;

// set initial state of simulation and objects
function init() {
  screenWidth = window.innerWidth;
  screenHeight = window.innerHeight;
  canvas.width = screenWidth - 4;
  canvas.height = screenHeight - 100;
  userXVelocity = 0;
  userYVelocity = 0;
  userXVelocityText = `X Velocity = ${userXVelocity}`;
  userYVelocityText = `Y Velocity = ${userYVelocity}`;

 setUserXVelocity.value = 0;
 setUserYVelocity.value = 10;
 setUserBallRadius.value = 50;
 setUserGravity.value = 1;
 setUserFriction.value = .8;

 balls = [];
}

//ball array
let balls;

function getBallRadiusText() {
  userBallRadius = parseInt(setUserBallRadius.value);
  return `Ball radius = ${userBallRadius}`;
}

function getUserXVelocityText() {
  userXVelocity = parseInt(setUserXVelocity.value);
  return `X velocity = ${userXVelocity}`;
}

function getUserYVelocityText() {
  userYVelocity = parseInt(setUserYVelocity.value);
  return `Y velocity = ${userYVelocity}`;
}

function getGravityText() {
  userGravity = parseFloat(setUserGravity.value,);
  return `Gravity = ${userGravity}`;
}

function getFrictionText() {
    userFriction = parseFloat(setUserFriction.value);
    return `Friction = ${userFriction}`;
}

function createBall() {
    balls.push(new Ball(screenWidth /2, 0, userBallRadius, userGravity, userFriction, userXVelocity, userYVelocity));
    console.log(balls);
}

//--Objects--//

function Ball(x, y, radius, gravity, friction, velocityX, velocityY) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = '#00FFFF';
  this.gravity = gravity;
  this.friction = friction;
  this.velocityX = velocityX;
  this.velocityY = velocityY;
  this.damp = .9;
  this.timeToLive = 0;
  this.lastTimeToLive = 0;
  //this.lastX = 0;
  this.lastY = 0;
}

Ball.prototype.update = function() {
  this.draw();

  if(this.y + this.radius + this.velocityY > canvas.height){
    this.velocityY = -this.velocityY  * this.friction * this.damp;
  } else {
    this.velocityY += this.gravity;
  }

  if(this.x - this.radius + this.velocityX <= 0 || this.x + this.radius + this.velocityX > canvas.width){
    this.velocityX = -this.velocityX  * this.friction;
  }

  if(this.lastY == this.y){

  }
  
    this.x += this.velocityX;
    this.y += this.velocityY;

    //this.lastX = this.x;
    //this.lastY = this.y;

    
};

Ball.prototype.draw = function() {
    c.beginPath();
    c.fillStyle = this.color;
    c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    c.fill();
};

function drawUserSettings() {
let font = "15px Arial";
let fontColor = 'white';
let ySpacing = 20;
  c.save();
  c.font = font;
  c.fillStyle = fontColor;
  c.fillText(getBallRadiusText(), 0, ySpacing);
  c.restore();

  c.save();
  c.font = font;
  c.fillStyle = fontColor;
  c.fillText(getUserXVelocityText(), 0, ySpacing + 20);
  c.restore();

  c.save();
  c.font = font;
  c.fillStyle = fontColor;
  c.fillText(getUserYVelocityText(), 0, ySpacing + 40);
  c.restore();

  c.save();
  c.font = font;
  c.fillStyle = fontColor;
  c.fillText(getGravityText(),0, ySpacing + 60);
  c.restore();

  c.save();
  c.font = font;
  c.fillStyle = fontColor;
  c.fillText(getFrictionText(), 0, ySpacing + 80);
  c.restore();
}

function drawBalls(){

}

function main() {
  requestAnimationFrame(main);
  c.clearRect(0, 0, screenWidth, screenHeight);

  drawUserSettings();
  
  for(let i = 0; i < balls.length; i++){
    balls[i].update();
  }
  
}

//listeners
window.addEventListener("resize", init);

createBallButton.addEventListener('click', createBall)

//

init();
main();
