class SelectLevelScreen extends WindowAnySizeWideTall
{
    constructor(context, drawArea, mouse, wideLeftPercent, wideRightPercent, wideTopPercent, wideBottomPercent, tallLeftPercent, tallRightPercent, tallTopPercent, tallBottomPercent, image, levelData)
    {
        super(context, drawArea, mouse, wideLeftPercent, wideRightPercent, wideTopPercent, wideBottomPercent, tallLeftPercent, tallRightPercent, tallTopPercent, tallBottomPercent);
        
        this.image = image.images.background.img;
        this.levelData = levelData;
        this.alphaCount = 0;
        this.alphaCountIncrease = 0.03;

        this.backBtn = new ButtonAnySizeWideTall(this.context, this.drawArea, this.mouse, 0.02, 0.12, 0.78, 0.98, 0.02, 0.22, 0.89, 0.99);
        this.backBtn.buttonID = "back";
        this.backBtn.image = image.images.exit.img;
        this.backBtn.drawImage = true;
        this.backBtn.drawFilledBackground = false;
        this.backBtn.drawBorder = false;
        this.backBtn.text = "";
        // this.aboutTextAndButtons.push(this.backBtn);
        // this.infoTextAndButtons.push(this.backBtn);

        this.backToMenu = false;
    }

    Update()
    {
        super.Update();
        this.backBtn.Update();
    }

    Draw()
    {
        super.Draw();
        this.backBtn.Draw();
        
        if (this.alphaCount < 1)
        {
            this.context.globalAlpha = this.alphaCount;
            this.alphaCount += this.alphaCountIncrease;
        }
    }
}