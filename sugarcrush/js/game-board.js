class GameBoard extends WindowAnySizeWideTall
{
    constructor(context, drawArea, mouse, wideLeftPercent, wideRightPercent, wideTopPercent, wideBottomPercent, tallLeftPercent, tallRightPercent, tallTopPercent, tallBottomPercent)
    {
        super(context, drawArea, mouse, wideLeftPercent, wideRightPercent, wideTopPercent, wideBottomPercent, tallLeftPercent, tallRightPercent, tallTopPercent, tallBottomPercent);
        this.grid = {rows:9, cols:9};
        this.gridColor = "hsla(239, 15%, 75%, 1)";
        this.drawBorder = true;
        this.borderColor = "hsla(239, 15%, 75%, 1)";
        this.filledBackgroundColor = "hsla(239, 15%, 75%, 0.5)";
        this.drawGrid = true;
        this.drawFilledBackground = true;

        this.count = 0;
    }

    Draw()
    {
        super.Draw();
        this.DrawGrid();
    }

    DrawGrid()
    {
        this.context.strokeStyle = this.gridColor;

        let rowSpacing = this.windowPosition.height / this.grid.rows;
        let colSpacing = this.windowPosition.width / this.grid.cols;

        for(let i = 1; i < this.grid.rows; i++)
        {
            this.context.beginPath();
            this.context.moveTo(this.windowPosition.left, this.windowPosition.top + rowSpacing * i);
            this.context.lineTo(this.windowPosition.right, this.windowPosition.top + rowSpacing * i);
            this.context.stroke();
        }

        for(let i = 1; i < this.grid.cols; i++)
        {
            this.context.beginPath();
            this.context.moveTo(this.windowPosition.left + colSpacing * i, this.windowPosition.top);
            this.context.lineTo(this.windowPosition.left + colSpacing * i, this.windowPosition.bottom);
            this.context.stroke();
        }
    }
}