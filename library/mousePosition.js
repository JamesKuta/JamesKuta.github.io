let mouseX = 0;
let mouseY = 0;
function updateMousePos(evt) {
    let rect = canvas.getBoundingClientRect();
    let root = document.documentElement;
    mouseX = evt.clientX - rect.left - root.scrollLeft;
    mouseY = evt.clientY - rect.top - root.scrollTop;
    //paddleXPos = mouseX - paddleWidth / 2;
}