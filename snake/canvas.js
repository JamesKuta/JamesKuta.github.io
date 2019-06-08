/*
** James Kuta
** Drop simulation
** 02-26-19
**
*/


let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');


let height = 160;
let width = 160;
let aspectRatio = height / width;

canvas.height = document.documentElement.clientHeight;
canvas.width = document.documentElement.clientWidth;

let mouse =
{
    x: 0,
    y: 0,
};

let animate = true;
let pause = false;

let dropArray = [];

window.onload = function ()
{
    resize();
    mainLoop();
}

function mainLoop()
{
    if (animate)
    {
        requestAnimationFrame(mainLoop);
    }

    if (!pause)
    {
        update();
    }

    render();
}

function update()
{
    if (dropArray.length > 0)
    {
        for (let i = 0; i < dropArray.length; i++)
        {
            dropArray[i].drop();
        }
    }
    //console.log('animate');
}

function render()
{

    clearScreen();
    if (dropArray.length > 0)
    {
        for (let i = 0; i < dropArray.length; i++)
        {
            dropArray[i].draw();
        }
    }



}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

function createDrop()
{

    dropArray.push(new Ball(getRandomArbitrary(.1, .90), getRandomArbitrary(.1, .90), .15, 'white'));
}

function clearScreen()
{
    context.fillStyle = 'silver';
    context.fillRect(0, 0, canvas.width, canvas.height);
}


function resize()
{
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;
    if (canvas.height / canvas.width > aspectRatio)
    {
        canvas.height = canvas.width * aspectRatio;
        canvas.width = canvas.width;
    } else
    {
        canvas.height = canvas.height;
        canvas.width = canvas.height / aspectRatio;
    }
    render();
}

window.addEventListener('resize', resize);

document.addEventListener('mousemove', function (event)
{
    let rect = canvas.getBoundingClientRect();
    mouse.x = event.clientX - rect.left;
    mouse.y = event.clientY - rect.top;
});

document.addEventListener('click', createDrop);