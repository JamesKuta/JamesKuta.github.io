class Background
{
    constructor(canvas, images)
    {
        // reference to self
        let background = this;
        
        //properties
        background.context = canvas.getContext("2d");

        background.images = images;
        background.background1 = 
        {
            img: background.images[0],
            x: 0,
            y: 0,
            width: 0,
            height: 0
        }

        background.background2 = 
        {
            img: background.images[1],
            x: 0,
            y: 0,
            width: 0,
            height: 0
        }

        background.SetBackgroundSizeAndPosition();
    }

    SetBackgroundSizeAndPosition()
    {
        let background = this;
        //Set the left most side of background
        background.background1.x = 0;
        background.background1.y = 0;
        background.background1.width = background.context.canvas.width;
        background.background1.height = background.context.canvas.height;

        //Set the right most side of background
        background.background2.x = background.context.canvas.width;
        background.background2.y = 0;
        background.background2.width = background.context.canvas.width;
        background.background2.height = background.context.canvas.height;
    }

    Update(dt)
    {
        let background = this;
        const velocity =  (background.context.canvas.width * 0.01) * (dt/2000); //move 1% of screen width every 2 seconds;

        if(Math.abs(background.background1.x) > background.context.canvas.width)
        {
            background.background1.x = background.background2.x + background.background2.width;
        }

        if(Math.abs(background.background2.x) > background.context.canvas.width)
        {
            background.background2.x = background.background1.x + background.background1.width;
        }

        background.background1.x -= velocity;
        background.background2.x -= velocity;
    }

    Draw()
    {
        // reference to self
        let background = this;
        background.context.drawImage(background.background1.img, background.background1.x, background.background1.y, background.background1.width, background.background1.height);
        background.context.drawImage(background.background2.img, background.background2.x, background.background2.y, background.background2.width, background.background2.height);
        
    }
}