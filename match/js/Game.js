class Game
{
    constructor()
    {
        this.canvas = document.getElementById("canvas");
        this.context = this.canvas.getContext("2d");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        this.engine = new Engine(this);

        this.gameViewLayer = undefined;
        this.gameMenuScreen = undefined;
        this.selectLevelScreen = undefined;

        this.loadingScreen = undefined;
        
        this.mouse = { x: undefined, y: undefined, btnDown: false, canClick: true };

        this.states = { load: 0, menu: 1, levelSelect: 2, play: 3, pause: 4, gameover: 5 };
        this.state = this.states.load;
        this.loadScreenReady = false;
        this.showLevelSelectScreen = false;

        this.assets = undefined;
        this.levels = undefined;

        this.FPS = 0;

        this.Events();
        this.FetchJsonData("./json/game-assets.json");
    }

    FetchJsonData(path)
    {
        let requestURL = path;
        let request = new XMLHttpRequest();
        request.open("GET", requestURL);

        let game = this;

        request.onload = function ()
        {
            game.assets = request.response;
            game.CreateLoadScreen();
        }

        request.responseType = "json";
        request.send();
    }

    Events()
    {
        let game = this;

        window.onresize = function ()
        {
            game.canvas.width = window.innerWidth;
            game.canvas.height = window.innerHeight;

            if (game.gameViewLayer)
            {
                game.gameViewLayer.Update();
            }
            
            if (game.gameMenuScreen)
            {
                game.gameMenuScreen.Update();
            }
        };

        game.canvas.onmousemove = function (event)
        {
            let rect = game.canvas.getBoundingClientRect();
            game.mouse.x = event.clientX - rect.left;
            game.mouse.y = event.clientY - rect.top;
        };

        game.canvas.onmousedown = function (event)
        {
            if (game.mouse.canClick)
            {
                game.mouse.btnDown = true;
                game.mouse.canClick = false;
            }
        };

        game.canvas.onmouseup = function (event)
        {
            game.mouse.btnDown = false;
            game.mouse.canClick = true;
        };

        game.canvas.ontouchstart = function(event)
        {
            let rect = game.canvas.getBoundingClientRect();
            game.mouse.x = event.touches[0].clientX - rect.left;
            game.mouse.y = event.touches[0].clientY - rect.top;
            if (game.mouse.canClick)
            {
                game.mouse.btnDown = true;
                game.mouse.canClick = false;
            }
            event.preventDefault();
        };

        game.canvas.ontouchmove = function(event)
        {
            let rect = game.canvas.getBoundingClientRect();
            game.mouse.x = event.touches[0].clientX - rect.left;
            game.mouse.y = event.touches[0].clientY - rect.top;
            event.preventDefault();
        };

        game.canvas.ontouchend = function(event)
        {
            game.mouse.btnDown = false;
            game.mouse.canClick = true;
            event.preventDefault();
        };
    }

    Init()
    {

    }

    Update(dt)
    {
        this.UpdateFPS(dt);
        switch (this.GetState())
        {
            case this.states.play:
            {
                break;
            }

            case this.states.levelSelect:
            {
                if(!this.selectLevelScreen)
                {
                    this.selectLevelScreen = new SelectLevelScreen(this.context, this.gameViewLayer.rect, this.mouse, 0,1,0,1,0,1,0,1,this.assets);
                    this.selectLevelScreen.drawImage = true;
                    this.selectLevelScreen.drawFilledBackground = false;
                    this.selectLevelScreen.drawBorder = false;
                }else
                {
                    this.selectLevelScreen.Update();
                }
                break;
            }

            case this.states.menu:
            {
                this.gameMenuScreen.Update(dt);
                if(this.gameMenuScreen.playSelected)
                {
                    this.SetState("levelSelect");
                }
                break;
            }

            case this.states.load:
            {
                if(this.LoadScreenReady)
                {
                    this.loadingScreen.Update(this.assetLoader.GetLoadedCount(), this.assetLoader.GetTotalCount());

                    if (this.assetLoader.GetReadyState())
                    {
                        this.gameMenuScreen = new MainMenuScreen(this.context, this.gameViewLayer.GetGameViewRect(), this.mouse, 0,1,0,1,0,1,0,1, this.assets);//this.assets.images.background.img);
                        this.SetState("menu");
                    }
                }
                break;
            }

            default:
            {
                console.log("State Error!");
                break;
            }
        }
    }

    Draw()
    {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        if (this.state == this.states.load && this.LoadScreenReady)
        {
            this.loadingScreen.Draw();
            //return;
        }

        if (this.state == this.states.menu)
        {
            this.gameMenuScreen.Draw();
            //return;
        }

        if (this.state == this.states.levelSelect)
        {
            if(this.selectLevelScreen)
            {
                this.selectLevelScreen.Draw();
            }
        }

        this.DrawFPS();
    }

    CreateLoadScreen()
    {
        this.background = new Image();
        let game = this;
        this.background.onload = function ()
        {
            game.gameViewLayer = new GameViewLayer(game.context,);
            game.loadingScreen = new GameLoadingScreen(game.context, game.gameViewLayer.rect, game.mouse, 0,1,0,1,0,1,0,1);
            game.loadingScreen.image = game.background;
            game.loadingScreen.drawFilledBackground = false;
            game.loadingScreen.drawImage = true;
            game.LoadScreenReady = true;
            game.assetLoader = new AssetLoader(game.assets.images);
        }
        this.background.src = "./img/assets/sky.png";
    }

    SetState(newState)
    {
        if(this.states.hasOwnProperty(newState))
        {
            this.state = this.states[newState];
        }
    }

    GetState()
    {
        return this.state;
    }

    UpdateFPS(dt)
    {
        this.FPS =  Math.round((1 / dt) * 1000);
    }

    DrawFPS()
    {
        //console.log(this.FPS);
        if(this.gameViewLayer)
        {
            let size = 0.02;
            let fontSize = (this.gameViewLayer.rect.wideAspect) ? this.gameViewLayer.height * size : this.gameViewLayer.width * size;
            this.context.font = `${fontSize}px Emilys Candy, cursive`;
            this.context.textAlign = "left";
            this.context.textBaseline = "top";
            this.context.fillText("FPS: " + this.FPS, this.gameViewLayer.rect.left, this.gameViewLayer.rect.top);
        }
    }
}