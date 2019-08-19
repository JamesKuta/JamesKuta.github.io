/*
This is a template for the Main loop of a tile based canvas game.
World.js is a dependency
Created By James Kuta
08/18/2019
*/


//create new world
let world = new World(16, 9);
let level = new Levels(world.canvas.width / 20, world.canvas.height / 20);
let currentLevel = 0;
//add world to html body
document.body.appendChild(world.canvas);

//Mouse object
let mouse =
{
    x: 0,
    y: 0,
};

//image array
let images = new Images();
let imageLoaded = false;

let highSky = new Image();
let midSky = new Image();
let unicorn = new Image();

// used to pause game.
let pause = false;

// used to control animation loop
let animate = false;

window.onload = function()
{
    highSky.onload = function()
    {
        imageLoaded = true;
    }
    highSky.src = 'img/highsky.png';

    midSky.onload = function()
    {
        imageLoaded = true;
    }
    midSky.src = 'img/midSky.png';

    unicorn.onload = function()
    {
        imageLoaded = true;
    }
    unicorn.src = 'img/unicorn.png';
    
    world.resize();
    level.tileWidth = world.canvas.width / 20;
    level.tileHeight = world.canvas.height / 20;

}

images.assignTile(highSky, 0, 0, 32, 32);
images.assignTile(midSky, 0, 0, 32, 32);


// main loop
function main()
{
    render();
    window.requestAnimationFrame(main);
}

function update()
{
    if(!pause)
    {
        // update code goes here
    }

}

//render each frame
function render()
{
    world.clearScreen();
    if (imageLoaded)
    {
        level.draw(world.context, level.levelList[currentLevel]);
    }
}



// EVENT LISTENSERS //

// what to do if the screen is resized
window.addEventListener('resize', function()
{
    world.resize()
    level.tileWidth = world.canvas.width / 20;
    level.tileHeight = world.canvas.height / 20;
    render();
});

document.addEventListener('mousemove', function (event)
{
    let rect = world.canvas.getBoundingClientRect();
    mouse.x = event.clientX - rect.left;
    mouse.y = event.clientY - rect.top;
});

window.addEventListener("touchmove", function(event)
{
    event.preventDefault();
    let rect = world.canvas.getBoundingClientRect();
    mouse.x = event.touches[0].clientX - rect.left;
    mouse.y = event.clientY - rect.top - rect.top;
});

window.addEventListener('keydown', function (event)
{
    event.preventDefault();
    if (event.key == 'Escape')
    {
        if (!pause)
        {
            pause = true;
        } else
        {
            pause = false;
        }
    }
});


//start main loop
main();