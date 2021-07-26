class BackgroundViewLayer
{
    constructor(context, strColor = undefined, img = undefined)
    {
        this.context = context;
        this.img = img;
        this.strColor = strColor;
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.Update();
    }

    Update()
    {
        this.width = this.context.canvas.width;
        this.height = this.context.canvas.height;
    }

    Draw()
    {
        this.context.clearRect(this.x, this.y, this.width, this.height);
        if(this.strColor)
        {
            this.context.fillStyle = this.strColor;
            this.context.fillRect(this.x, this.y, this.width, this.height);
        }

        if(this.img)
        {
            this.context.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
    }
}