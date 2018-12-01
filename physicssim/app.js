/* James Kuta */

// Get the Canvas Element
let canvas = document.getElementById("canvas");
// Set the Context of the Canvas for drawing 2d objects
let c = canvas.getContext("2d");
// Create a background color for the canvas
canvas.style.backgroundColor = "black";

// Get Input elements
let setUserXVelocity = document.getElementById("user-velocity-x");
let setUserYVelocity = document.getElementById("user-velocity-y");
let setUserBallRadius = document.getElementById("user-ball-radius");
let setUserGravity = document.getElementById("user-gravity");
let setUserbounciness = document.getElementById("user-bounciness");

let createBallButton = document.getElementById("create");
let resetButton = document.getElementById("reset");

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
let userbounciness;
let groundFriction;

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
  groundFriction = .99;

 setUserXVelocity.value = 0;
 setUserYVelocity.value = 10;
 setUserBallRadius.value = 50;
 setUserGravity.value = 1;
 setUserbounciness.value = .8;

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
  return `X-velocity = ${userXVelocity}`;
}

function getUserYVelocityText() {
  userYVelocity = parseInt(setUserYVelocity.value);
  return `Y-velocity = ${userYVelocity}`;
}

function getGravityText() {
  userGravity = parseFloat(setUserGravity.value,);
  return `Gravity = ${userGravity}`;
}

function getbouncinessText() {
    userbounciness = parseFloat(setUserbounciness.value);
    return `Bounciness = ${userbounciness}`;
}

function createBall() {
    balls.push(new Ball(screenWidth /2, 0, userBallRadius, userGravity, userbounciness, userXVelocity, userYVelocity));
    console.log(balls);
}

//--Objects--//

function Ball(x, y, radius, gravity, bounciness, velocityX, velocityY) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = '#00FFFF';
  this.gravity = gravity;
  this.bounciness = bounciness;
  this.velocityX = velocityX;
  this.velocityY = velocityY;
  this.friction = .98;
  this.timeToLive = 0;
  this.lastTimeToLive = 0;
  this.lastX = 0;
  this.lastY = 0;
}

Ball.prototype.update = function() {
  this.draw();

  if(this.y + this.radius + this.velocityY >= canvas.height){
    this.velocityY = -this.velocityY  * this.bounciness * this.friction;
  } else {
    this.velocityY += this.gravity;
  }

  if(this.x - this.radius + this.velocityX <= 0 || this.x + this.radius + this.velocityX > canvas.width){
    this.velocityX = -(this.velocityX  * this.bounciness) * this.friction;
  } 

    this.x += this.velocityX;
    this.y += this.velocityY;
    this.timeToLive++;

    //this.lastX = this.x;
    //this.lastY = this.y;
    
};

Ball.prototype.draw = function() {
    c.beginPath();
    c.fillStyle = this.color;
    c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    c.fill();

    if(parseFloat(this.x).toFixed(2) == parseFloat(this.lastX).toFixed(2) && parseFloat(this.y).toFixed(3) == parseFloat(this.lastY).toFixed(3)){
      balls.splice(this, 1);
      
    }

    if(this.y == this.lastY && this.timeToLive > 10){
      this.velocityX *= this.friction; //groundFriction;
    }

    this.lastY = this.y;
    //make the balls go away if they are not moving
    this.lastX = this.x;
    this.lastY = this.y;

    //console.log(`currentX: ${parseFloat(this.x).toFixed(2)} lastX: ${parseFloat(this.lastX).toFixed(2)} currentY: ${parseFloat(this.y).toFixed(3)} lastY: ${parseFloat(this.lastY).toFixed(3)}`);
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
  c.fillText(getbouncinessText(), 0, ySpacing + 80);
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

createBallButton.addEventListener('click', createBall);
resetButton.addEventListener('click', init);

//

init();
main();
