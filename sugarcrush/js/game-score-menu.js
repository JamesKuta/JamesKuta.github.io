class GameScoreMenu extends WindowAnySizeWideTall
{
    constructor(context, drawArea, wideLeftPercent, wideRightPercent, wideTopPercent, wideBottomPercent, tallLeftPercent, tallRightPercent, tallTopPercent, tallBottomPercent)
    {
        super(context, drawArea, mouse, wideLeftPercent, wideRightPercent, wideTopPercent, wideBottomPercent, tallLeftPercent, tallRightPercent, tallTopPercent, tallBottomPercent);
        this.drawFilledBackground = false;
    }
}