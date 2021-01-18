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
            
        }
    }

    Draw()
    {
        let info = this;
        //Draw Menu Area
        info.context.fillStyle = "rgba(0, 0, 100, 0.1)";
        info.context.fillRect(info.x, info.y, info.width, info.height);
    }
}