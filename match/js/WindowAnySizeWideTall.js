//Horizontal Percentages are from Left edge of viewing area.
//Vertical Percentages are from Top edge of viewing area.

class WindowAnySizeWideTall
{
    constructor(context, drawArea, mouse, wideLeftPercent, wideRightPercent, wideTopPercent, wideBottomPercent, tallLeftPercent, tallRightPercent, tallTopPercent, tallBottomPercent)
    {
        this.context = context;
        this.drawArea = drawArea;
        this.mouse = mouse;
        this.wideLeftPercent = wideLeftPercent;
        this.wideRightPercent = wideRightPercent;
        this.wideTopPercent = wideTopPercent;
        this.wideBottomPercent = wideBottomPercent;

        this.tallLeftPercent = tallLeftPercent;
        this.tallRightPercent = tallRightPercent;
        this.tallTopPercent = tallTopPercent;
        this.tallBottomPercent = tallBottomPercent;

        this.drawBorder = true;
        this.borderColor = "hsla(0, 100%, 0%, 1)"
        this.drawFilledBackground = true;
        this.filledBackgroundColor = "hsla(0, 100%, 100%, 1)"

        this.drawImage = false;
        this.image = undefined;
        
        this.windowPosition = {x:0,y:0,width:0,height:0,left:0,right:0,top:0,bottom:0};
    }

    Update()
    {
        if (this.drawArea.wideAspect)
        {
            this.windowPosition.x = this.drawArea.left + (this.drawArea.width * this.wideLeftPercent);
            this.windowPosition.width = this.drawArea.width * this.wideRightPercent - this.drawArea.width * this.wideLeftPercent;
            this.windowPosition.y = this.drawArea.top + (this.drawArea.height * this.wideTopPercent);
            this.windowPosition.height = this.drawArea.height * this.wideBottomPercent - this.drawArea.height * this.wideTopPercent;
        } else
        {
            this.windowPosition.x = this.drawArea.left + (this.drawArea.width * this.tallLeftPercent);
            this.windowPosition.width = this.drawArea.width * this.tallRightPercent - this.drawArea.width * this.tallLeftPercent;
            this.windowPosition.y = this.drawArea.top + (this.drawArea.height * this.tallTopPercent);
            this.windowPosition.height = this.drawArea.height * this.tallBottomPercent - this.drawArea.height * this.tallTopPercent;
        }

        this.windowPosition.left = this.windowPosition.x;
        this.windowPosition.right = this.windowPosition.width + this.windowPosition.x;
        this.windowPosition.top = this.windowPosition.y;
        this.windowPosition.bottom = this.windowPosition.height + this.windowPosition.y;
    }

    Draw()
    {
        if(this.drawFilledBackground)
        {
            this.context.fillStyle = this.filledBackgroundColor;
            this.context.fillRect(this.windowPosition.left, this.windowPosition.top, this.windowPosition.width, this.windowPosition.height);
        }
        
        if(this.drawBorder)
        {
            this.context.strokeStyle = this.borderColor;
            this.context.strokeRect(this.windowPosition.left, this.windowPosition.top, this.windowPosition.width, this.windowPosition.height);
        }

        if(this.drawImage)
        {
            this.context.drawImage(this.image, this.windowPosition.left, this.windowPosition.top, this.windowPosition.width, this.windowPosition.height)
        }
    }
}