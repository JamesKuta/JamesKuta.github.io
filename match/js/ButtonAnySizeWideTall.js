class ButtonAnySizeWideTall
{
    constructor(context, drawArea, mouse, btnWideLeftPercent, btnWideRightPercent, btnWideTopPercent, btnWideBottomPercent, btnTallLeftPercent, btnTallRightPercent, btnTallTopPercent, btnTallBottomPercent)
    {
        this.context = context;
        this.drawArea = drawArea;
        this.mouse = mouse;
        this.btnWideLeftPercent = btnWideLeftPercent;
        this.btnWideRightPercent = btnWideRightPercent;
        this.btnWideTopPercent = btnWideTopPercent;
        this.btnWideBottomPercent = btnWideBottomPercent;

        this.btnTallLeftPercent = btnTallLeftPercent;
        this.btnTallRightPercent = btnTallRightPercent;
        this.btnTallTopPercent = btnTallTopPercent;
        this.btnTallBottomPercent = btnTallBottomPercent;

        this.drawBorder = true;
        this.borderColor = "hsla(0, 100%, 0%, 1)"
        this.drawFilledBackground = true;
        this.filledBackgroundColor = "hsla(0, 100%, 100%, 0.50)";
        this.filledBackgroundColorHover = "hsla(0, 100%, 100%, 0.90)";
        this.currentBackgroundColor = this.filledBackgroundColor;

        this.drawImage = false;
        this.image = undefined;

        this.drawText = true;
        this.textColor = "#000";
        this.text = "Button";

        this.hover = false;
        this.wasClicked = false;

        this.buttonID = undefined;

        this.count = 1;

        this.windowPosition = { x: 0, y: 0, width: 0, height: 0, left: 0, right: 0, top: 0, bottom: 0 };
    }

    Update()
    {
        if (this.drawArea.wideAspect)
        {
            this.windowPosition.x = this.drawArea.left + (this.drawArea.width * this.btnWideLeftPercent);
            this.windowPosition.width = this.drawArea.width * this.btnWideRightPercent - this.drawArea.width * this.btnWideLeftPercent;
            this.windowPosition.y = this.drawArea.top + (this.drawArea.height * this.btnWideTopPercent);
            this.windowPosition.height = this.drawArea.height * this.btnWideBottomPercent - this.drawArea.height * this.btnWideTopPercent;
        } else
        {
            this.windowPosition.x = this.drawArea.left + (this.drawArea.width * this.btnTallLeftPercent);
            this.windowPosition.width = this.drawArea.width * this.btnTallRightPercent - this.drawArea.width * this.btnTallLeftPercent;
            this.windowPosition.y = this.drawArea.top + (this.drawArea.height * this.btnTallTopPercent);
            this.windowPosition.height = this.drawArea.height * this.btnTallBottomPercent - this.drawArea.height * this.btnTallTopPercent;
        }

        this.windowPosition.left = this.windowPosition.x;
        this.windowPosition.right = this.windowPosition.width + this.windowPosition.x;
        this.windowPosition.top = this.windowPosition.y;
        this.windowPosition.bottom = this.windowPosition.height + this.windowPosition.y;

        if (this.mouse.x > this.windowPosition.left && this.mouse.x < this.windowPosition.right
            && this.mouse.y > this.windowPosition.top && this.mouse.y < this.windowPosition.bottom)
        {
            this.currentBackgroundColor = this.filledBackgroundColorHover;
            this.hover = true;

            if (!this.mouse.canClick)
            {
                if (this.mouse.btnDown)
                {
                    this.wasClicked = true;
                }
            }
        }
        else
        {
            this.currentBackgroundColor = this.filledBackgroundColor;
            this.hover = false;
        }
    }

    Draw()
    {
        
        if (this.drawFilledBackground)
        {
            this.context.fillStyle = this.currentBackgroundColor;
            this.context.fillRect(this.windowPosition.left, this.windowPosition.top, this.windowPosition.width, this.windowPosition.height);
        }

        if (this.drawBorder)
        {
            this.context.strokeStyle = this.borderColor;
            this.context.strokeRect(this.windowPosition.left, this.windowPosition.top, this.windowPosition.width, this.windowPosition.height);
        }

        if (this.drawImage)
        {
            this.context.drawImage(this.image, this.windowPosition.left, this.windowPosition.top, this.windowPosition.width, this.windowPosition.height);
        }

        if (this.drawText)
        {
            //Center Text in button not greater than width of button.
            let fontSize = this.windowPosition.height * 0.70;
            this.context.font = `${fontSize}px Emilys Candy, cursive`;
            this.context.fillStyle = this.textColor;
            this.context.textAlign = "center";
            this.context.textBaseline = "middle";
            this.context.fillText(this.text, this.windowPosition.right - (this.windowPosition.width / 2), this.windowPosition.bottom - (this.windowPosition.height / 2), this.windowPosition.width - 1);
        }
    }
}