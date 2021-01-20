class InfoPane
{
    constructor(canvas)
    {
        let info = this;

        info.context = canvas.getContext("2d");
        info.x = 0;
        info.y = 0;
        info.width = 0;
        info.height = 0;
        info.score = 0;
        info.scoreFontSize = 10;
        info.scoreX = 0;
        info.scoreY = 0;
    }

    SetInfoSize(bWideScreen)
    {
        let info = this;
        if(bWideScreen)
        {
            //Set area
            let fromTop = info.context.canvas.height * 0.02;
            let fromLeft = info.context.canvas.width * 0.05;
            let fromRight = info.context.canvas.width * 0.25;
            let frombottom = info.context.canvas.height * 0.40;

            info.x = fromLeft;
            info.y = fromTop;
            info.width = fromRight - fromLeft;
            info.height = frombottom - fromTop;

            //Set text properties
            info.scoreFont = info.height * 0.10;
            info.scoreX = info.width + info.x - info.width / 2;
            info.scoreY = info.height + info.y - info.height * 0.10;
            
        }
    }

    Update(gameScore = 0)
    {
        let info = this;
        //info.score = gameScore;
        info.score = gameScore;
    }

    Draw()
    {
        let info = this;
        //Draw Menu Area
        info.context.fillStyle = "rgba(0, 0, 100, 0.1)";
        info.context.fillRect(info.x, info.y, info.width, info.height);

        //Draw The Score
        info.context.save();
        info.context.strokeStyle = "rgba(255,255,255, 1.0)";
        info.context.font = `${info.scoreFont}px serif`;
        info.context.textAlign = "center";
        info.context.textBaseline = "top";
        info.context.strokeText(info.score, info.scoreX, info.scoreY)
        info.context.restore();
    }
}