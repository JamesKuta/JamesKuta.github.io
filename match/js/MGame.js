class MGame
{
    constructor()
    {
        this.count = 0;
        //Create a canvas and drawing context
        this.MScreen = new MScreen();

        //Create the states that Game can have.
        this.GameStates = ["load", "menu", "level", "play", "pause"];
        this.States = new MStateManager(this.GameStates);

        //Property names for the different game screen objects
        this.LoadingScreen = undefined;
        this.MainMenuScreen = undefined;

        this.audioContext = new window.AudioContext();

        //this.Assets gets created in Update() after Background Image is ready for loading screen.
        this.Assets = undefined;
        // To do make the changes needed to separate images and audio.
        this.Sprites = undefined;
        this.Audio = undefined;

        //Create the engine that controls the game loop timing
        this.Engine = new MEngine(this);

        this.count = 1;
        
        this.LoadingScreen = new MLoadingScreen(this.MScreen);
        
        this.Init();
    }

    Init()
    {
        let self = this;
        this.MScreen.canvas.onclick = function()
        {
            self.Assets.sounds.menu1a.aud.volume = 0.5;
            //self.Assets.sounds.menu1a.aud.loop = true;
            self.Assets.sounds.menu1a.aud.play();
        };   
    }

    Update(dt)
    {
        if(this.States.GetState() == "load")
        {
            
            if(this.Assets)
            {
                let percentageLoaded = 0;
                percentageLoaded = this.Assets.loadedCount / this.Assets.totalCountToLoad;
                this.LoadingScreen.Update(percentageLoaded);
                
                if(this.LoadingScreen.bDoneLoading)
                {
                    //this.States.SetState("menu");
                    if(this.count == 0)
                    {
                        this.Assets.sounds.menu.aud.play();
                        this.count++;
                    }   
                }
            }
            
            if(this.LoadingScreen.backgroundImage.bReady && this.Assets == undefined)
            {
                this.Assets = new MImageAndAudioAssetLoader("./json/game-assets.json", true);
            }

            return;
        }
    }

    Draw()
    {
        this.MScreen.context.clearRect(0,0,this.MScreen.canvas.width, this.MScreen.canvas.height);
        if(this.States.GetState() == "load")
        {
            this.LoadingScreen.Draw();
        }
    }


}