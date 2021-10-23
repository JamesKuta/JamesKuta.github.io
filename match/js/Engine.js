// James Kuta Game Engine Version 1.0.
// Initialize Game Engine in Game Class.
// Pass Game Object to Engine.
// Engine expects an Update() and Draw() Method in Game Object.

class Engine
{
    constructor(game)
    {
        
        this.game = game;

        //properties for timing
        this.currentTime = 0;
        this.deltaTime = 0;
        this.accumulatedTime = 0;
        this.doDraw = false;
        this.timeStep = 1000/60;
        
        this.Start();
    }

    gameLoop(timestamp)
    {
        //console.log(timestamp);
        this.deltaTime = timestamp - this.currentTime;
        this.accumulatedTime += this.deltaTime;
        this.currentTime = timestamp;
        this.doDraw = false;
        //console.log(timestamp);

        if(this.accumulatedTime > 60)
        {
            this.accumulatedTime = 0;
        }

        while(this.accumulatedTime >= this.timeStep)
        {
            this.game.Update(this.deltaTime);
            this.doDraw = true;
            this.accumulatedTime -= this.timeStep;
        }
        
        if(this.doDraw)
        {
            this.game.Draw();
        }

        window.requestAnimationFrame(this.gameLoop.bind(this));
    }

    Start()
    {
        this.gameLoop(0);
    }
}