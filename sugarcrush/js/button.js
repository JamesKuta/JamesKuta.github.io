class Button
{
    constructor(context, drawRect, hPosPerc, vPosPerc, widthPerc, heightPerc = undefined, text = undefined, txtColor = undefined, backColor = undefined, img = undefined, justify = "center")
    {
        this.context = context;
        this.drawRect = drawRect;
        this.hPosPerc = hPosPerc;
        this.vPosPerc = vPosPerc;
        this.widthPerc = widthPerc;
        this.heightPerc = heightPerc;
        this.text = text;
        this.txtColor = txtColor;
        this.backColor = backColor;
        this.justify = justify;
        this.img = img;
        this.buttonPos = { x: 0, y: 0, width: 0, height: 0 };
        this.textPos = { x: 0, y: 0, fontSize: 0, align: "center", baseline: "middle" };
        this.count = 0;
        this.alpha = 0.2;
        this.hover = false;
        //this.Update();
    }

    Update(colliding)
    {
        this.alpha = (colliding) ? 0.5 : 0.2;

        if (this.drawRect.wideAspect)
        {
            this.SetButtonSize();
            this.SetTextSize();
            
        }

        if (!this.drawRect.wideAspect)
        {
            this.SetButtonSize();
            this.SetTextSize();
            
        }
    }

    Draw()
    {
        this.context.fillStyle = `hsla(50, 10%, 10%, ${this.alpha})`;
        this.context.fillRect(this.buttonPos.x, this.buttonPos.y, this.buttonPos.width, this.buttonPos.height);

        this.context.fillStyle = "#fff";
        this.context.font = `${this.textPos.fontSize}px sans-serif`;
        this.context.textAlign = this.textPos.align;
        this.context.textBaseline = this.textPos.baseline;
        this.context.fillText(this.text, this.textPos.x, this.textPos.y);


    }

    SetButtonSize()
    {
        let wRatioFromAspect = 16 / 9;
        let hRatioFromAspect = 9 / 16;

        if (this.justify == "center")
        {
            this.buttonPos.width = (this.widthPerc * this.drawRect.width);
            this.buttonPos.height = this.buttonPos.width * hRatioFromAspect;
            this.buttonPos.x = (this.hPosPerc * this.drawRect.width) + this.drawRect.left - this.buttonPos.width / 2;
            this.buttonPos.y = (this.vPosPerc * this.drawRect.height) + this.drawRect.top - this.buttonPos.height;
            return;
        }


        if (this.justify == "left")
        {
            this.buttonPos.width = (this.widthPerc * this.drawRect.width);
            this.buttonPos.height = this.buttonPos.width * hRatioFromAspect;
            this.buttonPos.x = (this.hPosPerc * this.drawRect.width) + this.drawRect.left;
            this.buttonPos.y = (this.vPosPerc * this.drawRect.height) + this.drawRect.top - this.buttonPos.height;
            return;
        }

        if (this.justify == "right")
        {
            this.buttonPos.width = (this.widthPerc * this.drawRect.width);
            this.buttonPos.height = this.buttonPos.width * hRatioFromAspect;
            this.buttonPos.x = (this.hPosPerc * this.drawRect.width) + this.drawRect.left - this.buttonPos.width;
            this.buttonPos.y = (this.vPosPerc * this.drawRect.height) + this.drawRect.top - this.buttonPos.height;
            return;
        }
    }

    SetTextSize()
    {
        this.textPos.fontSize = this.buttonPos.height * 0.30;
        this.textPos.x = this.buttonPos.x + this.buttonPos.width / 2;
        this.textPos.y = this.buttonPos.y + this.buttonPos.height / 2;
    }
}