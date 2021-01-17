class Explosion
{
    constructor(canvas, x, y, width, height, images)
    {
        let explosion = this;

        explosion.canvas = canvas;
        explosion.context = explosion.canvas.getContext("2d");
        explosion.x = x;
        explosion.y = y;
        explosion.width = width;
        explosion.height = height;
        explosion.images = images;
        explosion.image = explosion.images[0];
        explosion.animFrame = 0;
        explosion.animCounter = 0;
        explosion.animInterval = 5;
        explosion.active = true;
    }

    Update()
    {
        if(explosion.active)
        {
            if(explosion.animCounter % explosion.animInterval == 0)
            {
                if(explosion.animFrame < explosion.images.length)
                {
                    explosion.animFrame++;
                } else
                {
                    explosion.active = false;
                }
            }
        }
        explosion.animCounter++;
    }

    Draw()
    {
        explosion.context.drawImage(image, explosion.x, explosion.y, explosion.width, explosion.height);
    }
}