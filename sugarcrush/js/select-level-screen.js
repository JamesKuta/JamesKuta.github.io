class SelectLevelScreen extends WindowAnySizeWideTall
{
    constructor(context, drawArea, mouse, wideLeftPercent, wideRightPercent, wideTopPercent, wideBottomPercent, tallLeftPercent, tallRightPercent, tallTopPercent, tallBottomPercent, image, levelData)
    {
        super(context, drawArea, mouse, wideLeftPercent, wideRightPercent, wideTopPercent, wideBottomPercent, tallLeftPercent, tallRightPercent, tallTopPercent, tallBottomPercent);
        
        this.image = image;
        this.levelData = levelData;
        this.alphaCount = 0;
        this.alphaCountIncrease = 0.03;
    }

    Update()
    {
        super.Update();
    }

    Draw()
    {
        super.Draw();
        
        if (this.alphaCount < 1)
        {
            this.context.globalAlpha = this.alphaCount;
            this.alphaCount += this.alphaCountIncrease;
        }
    }
}