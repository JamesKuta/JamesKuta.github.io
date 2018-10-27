let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let width;
let height;
let bulletArray =[];

let resize = function () {
  width = window.innerWidth * 2;
  height = window.innerHeight * 2;
  canvas.width = width;
  canvas.height = height;
}
window.onresize = resize;
resize()

let state = {
  position: {
    x: (width / 2),
    y: (height / 2)
  },
  movement: {
    x: 0,
    y: 0,
    friction: .02
  },
  rotation: 0,
  pressedKeys: {
    left: false,
    right: false,
    up: false,
    down: false,
    space: false
  }
};

function Bullets(xPos, yPos, initialSpeedX, initialSpeedY) {
  this.xPos = xPos;
  this.yPos = yPos;
  this.initialSpeedX = initialSpeedX;
  this.initialSpeedY = initialSpeedY;
}

function createBullets() {
  if(state.pressedKeys.space) {
    bulletArray.push(new Bullets(state.position.x, state.position.y, state.movement.x, state.movement.y));
    state.pressedKeys.space = false;
  }
}

function update(progress) {
  let p = progress / 16;

  updateRotation(p)
  updateMovement(p)
  updatePosition(p)
  createBullets()
}


function updateRotation(p) {
  if (state.pressedKeys.left) {
    state.rotation -= p * 5;
  }
  else if (state.pressedKeys.right) {
    state.rotation += p * 5;
  }
}

function updateMovement(p) {
  // Behold! Mathematics for mapping a rotation to it's x, y components
  let accelerationVector = {
    x: p * 0.3 * Math.cos((state.rotation - 90) * (Math.PI / 180)),
    y: p * 0.3 * Math.sin((state.rotation - 90) * (Math.PI / 180))
  };
  //console.log(accelerationVector.x, ' ', accelerationVector.y);

  if (state.pressedKeys.up) {
    state.movement.x += accelerationVector.x;
    state.movement.y += accelerationVector.y;

  }
  else if (state.pressedKeys.down) {
    state.movement.x -= accelerationVector.x;
    state.movement.y -= accelerationVector.y;
  }

  // Limit movement speed
  if (state.movement.x > 40) {
    state.movement.x = 40;
  }
  else if (state.movement.x < -40) {
    state.movement.x = -40;
  }
  if (state.movement.y > 40) {
    state.movement.y = 40;
  }
  else if (state.movement.y < -40) {
    state.movement.y = -40;
  }

  if (state.movement.y > 0) {
    state.movement.y -= state.movement.friction;
  }

  if (state.movement.y < 0) {
    state.movement.y += state.movement.friction;
  }

  if (state.movement.x > 0) {
    state.movement.x -= state.movement.friction;
  }

  if (state.movement.x < 0) {
    state.movement.x += state.movement.friction;
  }

}

function updatePosition(p) {
  state.position.x += state.movement.x;
  state.position.y += state.movement.y;

  // Detect boundaries
  if (state.position.x > width) {
    state.position.x -= width;
  }
  else if (state.position.x < 0) {
    state.position.x += width;
  }
  if (state.position.y > height) {
    state.position.y -= height;
  }
  else if (state.position.y < 0) {
    state.position.y += height;
  }

  //update bullet positions
  let accelerationVector = {
    x: p * 10 * Math.cos((state.rotation - 90) * (Math.PI / 180)),
    y: p * 10 * Math.sin((state.rotation - 90) * (Math.PI / 180))
  };
  for(let i=0; i < bulletArray.length; i++){
    bulletArray[i].xPos; 
    bulletArray[i].yPos;  
  }
}//end updatePostion()

function draw() {
  ctx.clearRect(0, 0, width, height)

  ctx.save()
  //set the draw origin to be where the ship is
  ctx.translate(state.position.x, state.position.y)

  //rotate the ship if needed
  ctx.rotate((Math.PI / 180) * state.rotation)
  

  //draw ship body
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 5;
  ctx.beginPath()
  //right side of ship
  ctx.moveTo(0, -40)
  ctx.lineTo(5, -30)
  ctx.lineTo(10, -20)
  ctx.lineTo(5, -10)
  ctx.lineTo(20, 0)
  ctx.lineTo(25, 10)
  ctx.lineTo(30, 20)
  ctx.lineTo(35, 30)
  ctx.lineTo(40, 40)

  //bottom of ship

  ctx.lineTo(20, 40)
  ctx.lineTo(0, 20)
  ctx.lineTo(-20, 40)
  ctx.lineTo(-40, 40)

  // //left side of ship
  ctx.lineTo(-35, 30)
  ctx.lineTo(-30, 20)
  ctx.lineTo(-25, 10)
  ctx.lineTo(-20, 0)
  ctx.lineTo(-5, -10)
  ctx.lineTo(-10, -20)



  ctx.closePath()
  ctx.stroke()

  // draw the thrusters
  if (state.pressedKeys.up) {
    ctx.strokeStyle = 'red';
    ctx.beginPath()
    ctx.moveTo(0, 20)
    ctx.lineTo(0, 40)
    ctx.moveTo(20, 40)
    ctx.lineTo(20, 60)
    ctx.moveTo(-20, 40)
    ctx.lineTo(-20, 60)
    ctx.stroke()
    ctx.closePath()
  }

  if (state.pressedKeys.down) {
    ctx.strokeStyle = 'red';
    ctx.beginPath()
    ctx.moveTo(20, 0)
    ctx.lineTo(20, -20)
    ctx.moveTo(-20, -0)
    ctx.lineTo(-20, -20)
    ctx.closePath()
  }

  if (state.pressedKeys.right) {
    ctx.strokeStyle = 'red';
    ctx.beginPath()
    ctx.moveTo(0, -40)
    ctx.lineTo(-20, -40)
    ctx.moveTo(40, 40)
    ctx.lineTo(60, 40)
    ctx.closePath()

  }

  if (state.pressedKeys.left) {
    ctx.strokeStyle = 'red';
    ctx.beginPath()
    ctx.moveTo(0, -40)
    ctx.lineTo(20, -40)
    ctx.moveTo(-40, 40)
    ctx.lineTo(-60, 40)
    ctx.closePath()
  }

  

  ctx.stroke()
  ctx.restore()
  drawBullets()
}

function drawBullets(){
  //ship weapons

  for(let i = 0; i < bulletArray.length; i++){
    ctx.beginPath()
    ctx.fillStyle = 'blue';
    ctx.rect(bulletArray[i].xPos, bulletArray[i].yPos, 10, 10);
    ctx.fill()
    ctx.closePath()

  }
  

}

function loop(timestamp) {
  let progress = timestamp - lastRender;

  update(progress)
  draw()

  lastRender = timestamp; //last render is timestamp of last loop
  window.requestAnimationFrame(loop)
} // end loop()

let lastRender = 0; // there has been no lastrender when app starts
window.requestAnimationFrame(loop) // call to get loop started

let keyMap = {
  68: 'right',
  65: 'left',
  87: 'up',
  83: 'down',
  32: 'space'
}
function keydown(event) {
  let key = keyMap[event.keyCode];
  state.pressedKeys[key] = true;
}
function keyup(event) {
  let key = keyMap[event.keyCode];
  state.pressedKeys[key] = false;
}

window.addEventListener("keydown", keydown, false)
window.addEventListener("keyup", keyup, false)