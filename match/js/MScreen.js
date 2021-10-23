/**
 * Creates a canvas that fills browser window and resizes.
 */
class MScreen
{
    /**
     * Set aspect ratio for game screen area. Default is 16 X 9
     * @param aspectWidth set the aspect ratio for width. Default 16
     * @param aspectHeight set the aspect ratio for height. Default 9
     */
    constructor(aspectWidth = 16, aspectHeight = 9,)
    {
        this.canvas = this.CreateCanvas();
        this.context = this.SetContext();
        //this.context = context;
        //this.img = img;
        //this.strColor = strColor;
        this.aspectWidth = aspectWidth;
        this.aspectHeight = aspectHeight;
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.rect = {left:0, right:0, top:0, bottom:0, width:0, height:0, wide:true};
        this.Update();
        this.CreateEvents();
    }

    CreateCanvas()
    {
        let canvas = document.createElement("canvas");
        document.body.appendChild(canvas);
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        return canvas;
    }

    SetContext()
    {
        return this.canvas.getContext("2d");
    }

    Update()
    {
        let screen = {w: window.innerWidth, h: window.innerHeight};
        let wRatioFromAspect = this.aspectWidth / this.aspectHeight;
        let hRatioFromApect = 1 / (this.aspectWidth / this.aspectHeight); 

        //Check if the screen width is greater than the height
        if(screen.w >= screen.h)
        {
            //set that screen is wide.
            //this.view.wide = true;

            //find width by aspect ratio from height
            this.width = screen.h * wRatioFromAspect;

            //Check if width is going to be greater than screen width
            if(this.width >= screen.w)
            {
                //make view width screen width and adjust height to fit aspect
                this.width = screen.w;
                this.height = screen.w * hRatioFromApect;

                //center view vertically
                this.y = (screen.h - this.height) / 2;
                this.x = 0;
            }
            else
            {
                //make view height same as screen and leave the width
                this.height = screen.h;

                //center view horizontally
                this.x = (screen.w - this.width) / 2;
                this.y = 0;
            }

            this.rect.left = this.x;
            this.rect.right = this.x + this.width;
            this.rect.top = this.y;
            this.rect.bottom = this.y + this.height;
            this.rect.width = this.rect.right - this.rect.left;
            this.rect.height = this.rect.bottom - this.rect.top;
            this.rect.wide = true;
            //No need to check if screen is not wide.;
            return;
        }

        //check if the screen height is greater than the width
        if(screen.w < screen.h)
        {
            //set that screen is not wide
            //this.view.wide = false;

            //find the height by aspect ratio from width
            this.height = screen.w * wRatioFromAspect;
            
            //check if the height is going to be greater than the screen height
            if(this.height >= screen.h)
            {
                //make the view height screen heigh and adjust width to fit aspect
                this.height = screen.h;
                this.width = screen.h * hRatioFromApect;

                //center view horizontally
                this.x = (screen.w - this.width) / 2;
                this.y = 0;
            }
            else
            {
                //make the view width the screen with and leave the height
                this.width = screen.w;

                //center view vertically
                this.y = (screen.h - this.height) / 2;
                this.x = 0;
            }

            this.rect.left = this.x;
            this.rect.right = this.x + this.width;
            this.rect.top = this.y;
            this.rect.bottom = this.y + this.height;
            this.rect.width = this.rect.right - this.rect.left;
            this.rect.height = this.rect.bottom - this.rect.top;
            this.rect.wide = false;
        }
    }

    // Draw()
    // {
    //     this.context.fillStyle = "hsla(0,0%,0%,1)"
    //     this.context.fillRect(this.rect.left, this.rect.top, this.rect.width, this.rect.height);
    // }

    CreateEvents()
    {
        let self = this;
        window.onresize = function()
        {
            self.canvas.width = window.innerWidth;
            self.canvas.height = window.innerHeight;
            self.Update();
        }
    }
    

    GetGameViewRect()
    {
        return this.rect;
    }
}