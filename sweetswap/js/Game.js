class Game
{
    constructor(canvas)
    {
        let game = this;

        //game screen drawing area properties
        game.canvas = canvas;
        game.context = game.canvas.getContext("2d");
        
        game.screen = document.documentElement;
        game.wideScreen = true;

        //Fixed Time Step for Game Update and Drawing
        game.timeStep = 1000/60;
        game.accumTime = 0;
        game.elapsedTime = 0;
        game.doDraw = false;

        

        //game states
        game.states = {loading: 0, playing: 1, gameOver: 2};
        game.state = 0;

        //Timing
        game.fLastFrameTime = 0;

        
        game.CreateEvents();
        game.ScreenResize();

        game.loadingScreen = new LoadingScreen(game.canvas);
        game.images = new ImageLoader();
        game.board = null;
        
        game.GameLoop();
    }

    CreateEvents()
    {
        let game = this;
        //reference to self
        

        //Mouse Button Down Event
        game.canvas.onmousedown = game.MouseDown.bind(game);

        //Mouse Button Up Event
        game.canvas.onmouseup = game.MouseUp.bind(game);

        //Mouse Movement Event
        //game.canvas.onmousemove = game.MousePositionUpdate.bind(game);

        // Screen Size Change Event
        window.onresize = game.ScreenResize.bind(game);

        //Mobile orientation change
        window.onorientationchange = game.ScreenResize.bind(game);
    }

    MouseDown(e)
    {
        let game = this;
        game.board.MouseDown(e);
    }

    MouseUp(e)
    {
        let game = this;
        game.board.MouseUp(e);
    }

    ScreenResize()
    {
        let game = this;
        game.canvas.width = game.screen.clientWidth;//window.innerWidth;
        game.canvas.height = game.screen.clientHeight;//window.innerHeight;
       
        //set the screen aspect state
        game.wideScreen = (game.canvas.width >= game.canvas.height) ? true : false;
        
        if(game.board != undefined)
        {
            game.board.SetBoardSize(game.wideScreen);
        }

        if(game.background != undefined)
        {
            game.background.SetBackgroundSizeAndPosition();
        }

        if(game.info != undefined)
        {
            game.info.SetInfoSize(game.wideScreen);
        }
    }

    Update(fDeltaTime)
    {
        let game = this;
        

        if(game.images.bDoneLoading == true && game.state == game.states.playing)
        {
            game.background.Update(fDeltaTime);
            game.board.Update(fDeltaTime);
            game.info.Update(game.board.currentScore);
            return;
        }

        if(game.images.bDoneLoading == false && game.state == game.states.loading)
        {
            game.loadingScreen.Update(fDeltaTime);
        }

        if(game.images.bDoneLoading == true && game.state == game.states.gameOver)
        {
            //TODO Game Over Screen
            //game.loadingScreen.Update(fDeltaTime);
        }

        if(game.images.bDoneLoading == true && game.state == game.states.loading)
        {
            game.Init();
            game.state = 1;
        }
    }

    Draw()
    {
        let game = this;

        if(game.images.bDoneLoading == true)
        {
            game.ClearScreen();
            game.background.Draw();
            game.board.Draw();
            game.info.Draw();
            return;
        }

        if(game.images.bDoneLoading == false)
        {
            game.loadingScreen.Draw();
        }   
    }

    Init()
    {
        let game = this;
        game.board = new Board(game.canvas, game.images.imagesForCells, game.images.imagesForExplosions);
        game.info = new InfoPane(game.canvas);
        game.background = new Background(game.canvas, game.images.imagesForBackground);
        game.mainMenuBtn = new MenuUI(game.canvas, "/index.html");
        game.ScreenResize();

    }

    ClearScreen()
    {
        let game = this;
        game.context.clearRect(0,0,game.canvas.width,game.canvas.height);
        //console.log("here");
    }

    GameLoop(fFrameTime)
    {
        let game = this;
        let fDeltaTime = 0;
        if(game.fLastFrameTime > 0)
        {
            fDeltaTime = fFrameTime - game.fLastFrameTime
        }
        game.fLastFrameTime = fFrameTime;
        game.Update(fDeltaTime);
        game.Draw();
        window.requestAnimationFrame(game.GameLoop.bind(game));
    }
}