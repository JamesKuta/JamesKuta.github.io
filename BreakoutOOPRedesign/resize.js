
//create buffer canvas (not shown on screen) set 2d context
let buffer = document.createElement("canvas").getContext('2d')

//grap real canvas element
let canvas = document.getElementById('canvas');
//set the 2d context for real canvas
let context = canvas.getContext('2d');



//use as height and width of buffer canvas and for aspect ratio for resize to real canvas
let height = 90;
let width = 160;

let aspectRatio = height/width;

context.canvas.height = document.documentElement.clientHeight - 32;
context.canvas.width = document.documentElement.clientWidth - 32;
console.log(context.canvas);



//set buffer canvas height and width to aspect height and width
buffer.canvas.height = height;
buffer.canvas.width = width;

console.log(buffer);
console.log(buffer.canvas);

function mainLoop()
{
    requestAnimationFrame(mainLoop);
    update();
    render();
}

function update()
{
    buffer.fillStyle = 'black';
    buffer.fillRect(0,0, buffer.canvas.width, buffer.canvas.height);
    buffer.fillStyle = 'red';
    buffer.fillRect(Math.floor(20), Math.floor(20), 10, 10);
}

function render()
{
    
    canvas.width = document.documentElement.clientWidth - 32;
    canvas.height = document.documentElement.clientHeight - 32;
    if(canvas.height / canvas.width > aspectRatio)
    {
        canvas.height = canvas.width * aspectRatio;
        canvas.width = canvas.width;
    } else
    {
        canvas.height = canvas.height;
        canvas.width = canvas.height / aspectRatio;
    }
    context.imageSmoothingEnabled = false;
    context.drawImage(buffer.canvas, 0, 0, canvas.width, canvas.height);
    
}

function resize()
{
    // canvas.width = document.documentElement.clientWidth - 32;
    // canvas.height = document.documentElement.clientHeight - 32;
    // if(canvas.height / canvas.width > aspectRatio)
    // {
    //     canvas.height = canvas.width * aspectRatio;
    //     canvas.width = canvas.width;
    // } else
    // {
    //     canvas.height = canvas.height;
    //     canvas.width = canvas.height / aspectRatio;
    // }
    render();
}

window.addEventListener('resize', resize);



mainLoop();