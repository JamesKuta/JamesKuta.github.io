class LoadingScreen
{
    constructor(canvas)
    {
        let loadingScreen = this;
        loadingScreen.context = canvas.getContext("2d");
        loadingScreen.x = 0;
        loadingScreen.y = 0;
        loadingScreen.width = 0;
        loadingScreen.height = 0;
        loadingScreen.text = 
        {
            text: "LOADING",
            x: 20,
            y: 100,
            font: `${loadingScreen.context.canvas.width * 0.10}px sans-serif`
        };

        loadingScreen.box =
        {
            x: 0,
            y: 0,
            width: 0,
            height: 0
        };
    }

    Update(dt)
    {
        let loadingScreen = this;
        loadingScreen.width = loadingScreen.context.canvas.width;
        loadingScreen.height = loadingScreen.context.canvas.height;

        loadingScreen.box.x += 0.1 * dt;
        loadingScreen.box.y = loadingScreen.height * 0.70;
        loadingScreen.box.width = loadingScreen.width * 0.10;
        loadingScreen.box.height = loadingScreen.box.width;

        
    }

    Draw()
    {
        let loadingScreen = this;
        loadingScreen.context.fillStyle = "#2d2d2d";
        loadingScreen.context.fillRect(0,0, loadingScreen.context.canvas.width, loadingScreen.context.canvas.height);

        loadingScreen.context.fillStyle = "#FFFFFF";
        loadingScreen.context.font = loadingScreen.text.font;
        loadingScreen.context.fillText(loadingScreen.text.text, loadingScreen.text.x, loadingScreen.text.y);

        loadingScreen.context.fillStyle = "#FFFFFF";
        loadingScreen.context.fillRect(loadingScreen.box.x, loadingScreen.box.y, loadingScreen.box.width, loadingScreen.box.height);
    }
}