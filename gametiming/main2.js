let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let width;
let height;

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
    z: .05
  },
  rotation: 0,
  pressedKeys: {
    left: false,
    right: false,
    up: false,
    down: false
  }
};

function update(progress) {
  let p = progress / 16;

  updateRotation(p)
  updateMovement(p)
  updatePosition(p)
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
    x: p * 0.2 * Math.cos((state.rotation - 90) * (Math.PI / 180)),
    y: p * 0.2 * Math.sin((state.rotation - 90) * (Math.PI / 180))
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
    state.movement.y -= state.movement.z;
  }

  if (state.movement.y < 0) {
    state.movement.y += state.movement.z;
  }

  if (state.movement.x > 0) {
    state.movement.x -= state.movement.z;
  }

  if (state.movement.x < 0) {
    state.movement.x += state.movement.z;
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
}

function draw() {
  ctx.clearRect(0, 0, width, height)

  ctx.save()
  ctx.translate(state.position.x, state.position.y)
  ctx.rotate((Math.PI / 180) * state.rotation)

  ctx.strokeStyle = 'white';
  ctx.lineWidth = 5;
  ctx.beginPath()
  ctx.moveTo(0, -20)
  ctx.lineTo(10, 20)
  ctx.lineTo(-10, 20)
  ctx.lineTo(0, -20)
  //ctx.lineTo(10, 20)
  //ctx.lineTo(0, 20)
  //ctx.lineTo(-10, 20)
  //ctx.lineTo(0, 0)
  ctx.closePath()
  ctx.stroke()
  if (state.pressedKeys.up) {
    ctx.strokeStyle = 'red';
    ctx.beginPath()
    ctx.moveTo(6, 20)
    ctx.lineTo(6, 40)
    ctx.moveTo(-6, 20)
    ctx.lineTo(-6, 40)
    ctx.stroke()
    ctx.closePath()
  }

  if (state.pressedKeys.down) {
    ctx.strokeStyle = 'red';
    ctx.beginPath()
    ctx.moveTo(9, 5)
    ctx.lineTo(9, -15)
    ctx.moveTo(-9, 5)
    ctx.lineTo(-9, -15)
    ctx.closePath()
  }

  if (state.pressedKeys.right) {
    ctx.strokeStyle = 'red';
    ctx.beginPath()
    ctx.moveTo(-4, -15)
    ctx.lineTo(-14, -15)
    ctx.moveTo(9, 15)
    ctx.lineTo(19, 15)
    ctx.closePath()

  }

  if (state.pressedKeys.left) {
    ctx.strokeStyle = 'red';
    ctx.beginPath()
    ctx.moveTo(4, -15)
    ctx.lineTo(14, -20)
    ctx.moveTo(-9, 15)
    ctx.lineTo(-19, 20)
    ctx.closePath()

  }

  ctx.stroke()
  ctx.restore()
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
  32: 'fire'
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