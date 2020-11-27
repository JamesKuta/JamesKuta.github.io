class Menu
{
    constructor(canvas, backgroundImage)
    {
        //reference to self
        let menu = this;

        //Canvas drawing properties
        menu.canvas = canvas;
        menu.context = menu.canvas.getContext("2d");

        //menu properties
        menu.x = null;
        menu.y = null;
        menu.width = null;
        menu.height = null;

        //menu.imageURL = backgroundImage;
        menu.backgroundImage = backgroundImage;

        //menu.LoadImages();
    }

    LoadImages()
    {
        //reference to self
        let menu = this;

        menu.backgroundImg = new Image();
        menu.backgroundImg.onload = function()
        {
            //Code for loading screen
        }
        menu.backgroundImg.src = menu.imageURL;
    }

    Draw()
    {
        //reference to self
        let menu = this;
        //console.log(menu.backgroundImage);

        if(menu.backgroundImage != null)
        {
            menu.context.drawImage(menu.backgroundImage, menu.x, menu.y, menu.width, menu.height);
        }

    }
}