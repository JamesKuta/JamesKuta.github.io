class Mouse
{
    constructor(canvas)
    {
        this.canvas = canvas;
        this.pos = {x:0, y:0};
        this.btnDown = false;
        this.canClick = true;
        this.CreateEventListenters();
    }

    CreateEventListenters()
    {
        let mouse = this;
        this.canvas.onmousemove = function(event)
        {
            let rect = mouse.canvas.getBoundingClientRect();
            mouse.pos.x = event.clientX - rect.left;
            mouse.pos.y = event.clientY - rect.top;
        };

        this.canvas.onmousedown = function()
        {
            if(mouse.canClick)
            {
                mouse.btnDown = true;
                mouse.canClick = false;
            }
            
        };

        this.canvas.onmouseup = function()
        {
            mouse.btnDown = false;
            mouse.canClick = true;
        };
    }

    IsMouseButtonDown()
    {
        return this.btnDown;
    }

    GetMouseCoordinates()
    {
        return this.pos;
    }
}