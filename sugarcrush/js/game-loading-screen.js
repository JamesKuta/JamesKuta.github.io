class GameLoadingScreen extends WindowAnySizeWideTall
{
    constructor(context, drawArea, mouse, wideLeftPercent, wideRightPercent, wideTopPercent, wideBottomPercent, tallLeftPercent, tallRightPercent, tallTopPercent, tallBottomPercent)
    {
        super(context, drawArea, mouse, wideLeftPercent, wideRightPercent, wideTopPercent, wideBottomPercent, tallLeftPercent, tallRightPercent, tallTopPercent, tallBottomPercent);

        this.screenTextColor = "hsla(280, 100%, 25%, 1)";
        this.titleText = new ButtonAnySizeWideTall(this.context, this.drawArea, this.mouse, 0.10, 0.90, 0.05, 0.25, 0.10, 0.90, 0.05, 0.15);
        this.titleText.text = "SUGAR CRUSH";
        this.titleText.textColor = this.screenTextColor;
        this.titleText.drawFilledBackground = false;
        this.titleText.drawBorder = false;

        this.loadingText = new ButtonAnySizeWideTall(this.context, this.drawArea, this.mouse, 0.40, 0.60, 0.45, 0.55, 0.30, 0.70, 0.45, 0.50);
        this.loadingText.text = "Loading...";
        this.loadingText.textColor = this.screenTextColor;
        this.loadingText.drawFilledBackground = false;
        this.loadingText.drawBorder = false;

        this.loadingBarArea = new ButtonAnySizeWideTall(this.context, this.drawArea, this.mouse, 0, 1, 0.90, 1, 0, 1, 0.95, 1);
        this.loadingBarArea.drawFilledBackground = false;
        this.loadingBarArea.drawBorder = false;
        this.loadingBarArea.text = "";

        this.loadingBarColor = "hsla(280, 100%, 25%, 0.5)";
        this.barPercent;
    }

    Update(loadedCount, totalCount)
    {
        super.Update();
        this.UpdateLoadBarProgress(loadedCount, totalCount);
        this.titleText.Update();
        this.loadingText.Update();
        this.loadingBarArea.Update();
    }

    Draw()
    {
        super.Draw();
        this.titleText.Draw();
        this.loadingText.Draw();
        this.loadingBarArea.Draw();
        this.DrawLoadingBar();
    }

    UpdateLoadBarProgress(loadedCount, totalCount)
    {
        this.barPercent = loadedCount / totalCount;
    }

    DrawLoadingBar()
    {
        this.context.fillStyle = this.loadingBarColor;
        this.context.fillRect(this.loadingBarArea.windowPosition.left, this.loadingBarArea.windowPosition.top, this.loadingBarArea.windowPosition.width * this.barPercent, this.loadingBarArea.windowPosition.height);
    }
}