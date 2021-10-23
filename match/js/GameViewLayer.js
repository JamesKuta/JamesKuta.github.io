class GameViewLayer
{
    constructor(context) // img = undefined, strColor = undefined)
    {
        this.context = context;
        //this.img = img;
        //this.strColor = strColor;
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.rect = {left:0, right:0, top:0, bottom:0, width:0, height:0, wideAspect:true};
        this.Update();
    }

    Update()
    {
        let screen = {w: this.context.canvas.width, h: this.context.canvas.height};
        let wRatioFromAspect = 16/9;
        let hRatioFromApect = 9/16;
        //Check if the screen width is greater than the height
        if(screen.w >= screen.h)
        {
            //set that screen is wide.
            //this.view.wide = true;

            //find width by 16/9 aspect ration from height
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
            this.rect.wideAspect = true;

            //No need to check if screen is not wide.
            return;
        }

        //check if the screen height is greater than the width
        if(screen.w < screen.h)
        {
            //set that screen is not wide
            //this.view.wide = false;

            //find the height by 9/16 aspect ratio from width
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
            this.rect.wideAspect = false;
        }
    }

    GetGameViewRect()
    {
        return this.rect;
    }
}