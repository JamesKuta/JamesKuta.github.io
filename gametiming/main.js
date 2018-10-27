let box = document.getElementById('box'); // get the box
let boxPos = 10; // set box position
let boxVelocity = 0.08; //set the box movement speed
let delta = 0; // amount of time passed between rendering frames
let timeStep = 1000 / 60; // use to simulate 60 frames per second every time we run update()
let limit = 300; // how far the box can move right

let lastFrameTimeMs = 0; // the last time the loop was run
let maxFPS = 60; // the maximum FPS we will allow

function draw() {
    box.style.left = boxPos + 'px'; // draw the box from the left corner in pixles
}

function update(delta) { // update the game state
    boxPos += boxVelocity * delta; // set velocity based on amount of time that's past since last render
    if (boxPos >= limit || boxPos <= 0) {
        boxVelocity = -boxVelocity;
    }
}

function gameLoop(timestamp) {

    // timestamp is passed into gameLoop by requestAnimationFrame.
    // if the timestamp is less than the lastFrameTime plus our FPS
    // requestAnimationFrame returns to the top of the gameLoop. update and draw don't run.
    // it is only after timestamp is greater than the time interval set by 1000 / maxFPS that
    // we reset the lastFrameTime to be the current timestamp and then update and draw.
    // the result is control over how many frames per second are drawn.
    // maxFPS = 1 would be 1000 ms or 1 second.

    if (timestamp < lastFrameTimeMs + (1000 / maxFPS)) {
        requestAnimationFrame(gameLoop);
        return; // break back to the top of the loop
    }
    delta += timestamp - lastFrameTimeMs; // how much time passed since last frame
    lastFrameTimeMs = timestamp; // set the lastFrameTime to be the current timestamp
    console.log(lastFrameTimeMs);

    // simulate the total time elapsed in fixed-size chunks to pass to update();
    while (delta >= timeStep) {
        update(timeStep); // update the game state
        delta = delta - timeStep;
    }

    //update(delta); // update the game state
    draw(); // draw the game state
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop); //call once to get things going.

