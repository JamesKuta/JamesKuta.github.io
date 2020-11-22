class Background
{
    constructor(canvas, imageURL)
    {
        // reference to self
        let background = this;
        
        //properties
        background.canvas = canvas;
        background.context = background.canvas.getContext("2d");
        background.x = background.canvas.width - background.canvas.width;
        background.y = background.canvas.height - background.canvas.height;
        background.width = background.canvas.width;
        background.height = background.canvas.height;
        background.color = "#2f2f2f2f";
        //background.imageURL = imageURL;
        background.backgroundImg = imageURL;
    }

    Draw()
    {
        // reference to self
        let background = this;

        if(background.backgroundImg != null)
        {
            background.context.drawImage(background.backgroundImg, background.x, background.y, background.width, background.height);
        }

        // background.context.fillStyle = background.color;
        // background.context.fillRect(background.x, background.y, background.width, background.height);
    }
}