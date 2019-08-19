function circleFill(xPos, yPos, radius, colorString) {
    canvasContext.fillStyle = colorString;
    canvasContext.beginPath();
    canvasContext.arc(xPos, yPos, radius, 0, 2 * Math.PI);
    canvasContext.fill();
}

function circleStroke(xPos, yPos, radius, colorString){
    canvasContext.strokeStyle = colorString;
    canvasContext.beginPath();
    canvasContext.arc(xPos, yPos, radius, 0, 2 * Math.PI);
    canvasContext.stroke();
}

function rectangleFill(xPos, yPos, width, height, colorString) {
    canvasContext.fillStyle = colorString;
    canvasContext.fillRect(xPos, yPos, width, height);
}

function rectangleStroke(xPos, yPos, width, height, colorString) {
    canvasContext.strokeStyle = colorString;
    canvasContext.strokeRect(xPos, yPos, width, height);
}

function textStroke(textString, xPos, yPos, fontString, colorString){
    canvasContext.font = fontString;
    canvasContext.strokeStyle = colorString;
    canvasContext.strokeText(textString, xPos, yPos);
}

function textFill(textString, xPos, yPos, fontString, colorString){
    canvasContext.font = fontString;
    canvasContext.fillStyle = colorString;
    canvasContext.fillText(textString, xPos, yPos);
}

