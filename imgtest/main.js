let canvas = document.createElement('canvas');
canvas.width = 400;
canvas.height = 400;
let context = canvas.getContext('2d');
document.body.appendChild(canvas);
context.fillRect(0,0, 50, 50);

loadImage('tileSheet.png', function(image)
{
    let sprites = new SpriteSheet(image, 16, 16);
    sprites.define('ground', 0, 0);
    sprites.define('sky', 3, 23);
    sprites.draw('ground', context, 0, 34);
    sprites.draw('sky', context, 0, 0);
    console.log(sprites);
});
