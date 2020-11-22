class Game
{
    constructor(canvas)
    {
        //reference to self
        let game = this;

        //Game States
        game.wideScreen = true;

        game.gameStates =
        {
            loading: 0,
            start: 1,
            running: 2,
            matching: 3
        }

        game.gameState = game.gameStates.loading;

        //Canvas Object
        game.canvas = canvas;
        game.context = game.canvas.getContext("2d");

        //Keep Count of how many images to load
        game.imageCount = 0;

        //Graphics Assets
        game.menuUI = new Image();
        game.backgroundImg = new Image();
        game.blueSwirl = new Image();
        game.redBean = new Image();
        game.yellowDrop = new Image();
        game.greenWrapper = new Image();
        game.purpleFlower = new Image();
        game.cookie = new Image();

        game.explosionBlue1 = new Image();
        game.explosionBlue2 = new Image();
        game.explosionBlue3 = new Image();
        game.explosionBlue4 = new Image();
        game.explosionBlue5 = new Image();

        game.explosionGreen1 = new Image();
        game.explosionGreen2 = new Image();
        game.explosionGreen3 = new Image();
        game.explosionGreen4 = new Image();
        game.explosionGreen5 = new Image();

        game.explosionPink1 = new Image();
        game.explosionPink2 = new Image();
        game.explosionPink3 = new Image();
        game.explosionPink4 = new Image();
        game.explosionPink5 = new Image();

        //TODO Set Up Images in Image list for loading

        //Sound Assets
        // TODO Init Sound Files, load them, just like the graphics
        
        //TODO Set Up Images in Image list for loading

        game.ImagesForCells = [];

        game.ImagesForCells = 
        [
            game.blueSwirl, 
            game.redBean, 
            game.yellowDrop, 
            game.greenWrapper, game.purpleFlower
        ];

        //Set Event Listeners for Game
        game.Events();
    }

    loadImages()
    {
        let game = this;

        let imageList =
            [
                { imgName: game.menuUI, source: "img/menu/score_menu.png" },
                { imgName: game.backgroundImg, source: "img/background/clouds.png" },
                { imgName: game.blueSwirl, source: "img/assets/size3/swirl_blue.png" },
                { imgName: game.redBean, source: "img/assets/size3/bean_red.png" },
                { imgName: game.yellowDrop, source: "img/assets/size3/jelly_yellow.png" },
                { imgName: game.greenWrapper, source: "img/assets/size3/wrappedsolid_green.png" },
                { imgName: game.purpleFlower, source: "img/assets/size3/lollipop_purple.png" },
                { imgName: game.cookie, source: "img/assets/size3/mm_brown.png" }
            ];

        game.imageCount = imageList.length;
        //console.log(imageList.length);

        for (var i = 0; i < imageList.length; i++) 
        {
            game.beginLoadingImage(imageList[i].imgName, imageList[i].source);
        }
    }

    beginLoadingImage(imgName, source)
    {
        let game = this;

        imgName.onload = game.changeGameStateWhenImagesAreLoaded.bind(game);
        imgName.src = source;
    }

    changeGameStateWhenImagesAreLoaded()
    {
        let game = this;
        game.imageCount--;
        //console.log(game.imageCount);
        if (game.imageCount == 0) 
        {
            game.gameState = game.gameStates.start;
        }
    }

    CreateGameObjects()
    {
        //reference to self
        let game = this;

        //Create Objects
        game.background = new Background(game.canvas, game.backgroundImg);
        //game.background = new Background(game.canvas, "img/background/clouds.png");
        game.grid = new Grid(game.canvas, "img/grid/grid_playing_field.png", game.ImagesForCells);
        game.score = new Menu(game.canvas, game.menuUI);
    }

    Events()
    {
        //reference to self
        let game = this;

        //Mouse Movement Event
        game.canvas.addEventListener("mousemove", function (e)
        {
            //console.log(e.clientX);
        })

        // Screen Size Change Event
        window.addEventListener("resize", function (e)
        {
            //update game canvas size Properties
            game.canvas.width = window.innerWidth;
            game.canvas.height = window.innerHeight;

            //set the screen aspect state
            game.wideScreen = (game.canvas.width >= game.canvas.height) ? true : false;
        });
    }

    Start()
    {
        //reference to self
        let game = this;

        //Init Game
        game.Init();

        game.CreateGameObjects();

        game.GameLoop();
    }

    GameLoop()
    {
        //reference to self
        let game = this;

        if (game.gameState == game.gameStates.loading)
        {
            //game.DrawLoadingScreen();
            game.context.fillStyle = "red";
            game.context.fillRect(0, 0, canvas.width, canvas.height);
            game.context.fillStyle = "black";
            game.context.fillText("LOADING....", 100, 100);
        }

        if (game.gameState == game.gameStates.start)
        {
            //Update Game
            game.Update();

            //Draw Game
            game.Draw();
        }

        //Repeat
        window.requestAnimationFrame(function ()
        {
            game.GameLoop();
        });
    }

    Update()
    {
        //reference to self
        let game = this;

        game.UpdateBackground();
        game.UpdateGridPositionOnScreen();
        game.UpdateScoreMenu();
    }

    Draw()
    {
        //reference to self
        let game = this;

        game.DrawBackground();
        game.DrawGrid();
        game.DrawScoreMenu();
    }

    Init()
    {
        let game = this;

        //Update Game Canvas Sizes
        game.canvas.width = window.innerWidth;
        game.canvas.height = window.innerHeight;

        //Set if screen is wide or tall
        game.wideScreen = (game.canvas.width >= game.canvas.height) ? true : false;

        game.ImagesForCells = 
        [
            game.blueSwirl, 
            game.redBean, 
            game.yellowDrop, 
            game.greenWrapper,
            game.purpleFlower
        ];
    }

    UpdateBackground()
    {
        //reference to self
        let game = this;

        //Set properties of background object
        game.background.width = game.canvas.width;
        game.background.height = game.canvas.height;
    }

    //Drawing Functions for Game Screen
    DrawBackground()
    {
        //reference to self
        let game = this;

        //Draw the background object
        game.background.Draw();
    }

    UpdateGridPositionOnScreen()
    {
        let game = this;

        if (game.wideScreen)
        {
            game.PositionGridForWideScreen();
        } else
        {
            game.PositionGridForTallScreen();
        }
    }

    DrawGrid()
    {
        //reference to self
        let game = this;

        //Draw the grid object
        game.grid.Draw();
    }

    UpdateScoreMenu()
    {
        let game = this;

        if (game.wideScreen)
        {
            game.PositionScoreMenuForWideScreen();
        } else
        {
            game.PositionScoreMenuForTallScreen();
        }
    }

    DrawScoreMenu()
    {
        //reference to self
        let game = this;
        game.score.Draw()

        game.context.fillStyle = "white";
        game.context.font = "48px serif";
        game.context.textAlign = "center";
        game.context.textBaseline = "middle";
        game.context.fillText("0", game.score.x + game.score.width / 2, game.score.y + game.score.height / 2);
    }

    PositionGridForWideScreen()
    {
        let game = this;
        //Calculate the placement based on screen size
        //Create Max position to start drawing the top of grid
        let maxPositionGridTop = game.canvas.height * 0.05;
        //Create Max position to start drawing the bottom of grid
        let maxPositionGridBottom = game.canvas.height * 0.95;

        //Create Max position to start drawing the left of grid
        let maxPositionGridLeft = game.canvas.width * 0.30;

        //Create Max position to start drawing the right of grid
        let maxPositionGridRight = game.canvas.width * 0.90;

        let gridWidth = maxPositionGridRight - maxPositionGridLeft;

        let gridHeight = maxPositionGridBottom - maxPositionGridTop;

        //if the Width is greater than the Height, set width to height and center between score menu and right edge of screen
        if (maxPositionGridRight - maxPositionGridLeft > maxPositionGridBottom - maxPositionGridTop)
        {
            gridWidth = gridHeight;
            maxPositionGridLeft = ((game.canvas.width + game.score.x + game.score.width) - gridWidth) / 2;
        }

        //if the Height is greater than the width, set heigh to width and then center on screen
        if (maxPositionGridRight - maxPositionGridLeft < maxPositionGridBottom - maxPositionGridTop)
        {
            gridHeight = gridWidth;
            maxPositionGridTop = Utilities.DifferenceBetweenPoints(game.canvas.height, gridHeight) / 2;
            //maxPositionGridTop = (game.canvas.height - gridHeight) / 2
            maxPositionGridLeft = ((game.canvas.width + game.score.x + game.score.width) - gridWidth) / 2;
        }

        game.grid.x = maxPositionGridLeft;
        game.grid.y = maxPositionGridTop;
        game.grid.width = gridWidth;
        game.grid.height = gridHeight;
    }

    PositionGridForTallScreen()
    {
        let game = this;
        //Calculate the placement based on screen size
        //Create Max position to start drawing the top of grid
        let maxPositionGridTop = game.canvas.height * 0.05;
        //Create Max position to start drawing the bottom of grid
        let maxPositionGridBottom = game.canvas.height * 0.80;

        //Create Max position to start drawing the left of grid
        let maxPositionGridLeft = game.canvas.width * 0.00;

        //Create Max position to start drawing the right of grid
        let maxPositionGridRight = game.canvas.width;

        let gridWidth = maxPositionGridRight - maxPositionGridLeft;

        let gridHeight = maxPositionGridBottom - maxPositionGridTop;

        //if the width is greater than the height, set width to height and then center between score and left of screen
        if (maxPositionGridRight - (maxPositionGridLeft) > maxPositionGridBottom - maxPositionGridTop)
        {
            gridWidth = gridHeight;
            maxPositionGridLeft = (game.canvas.width - gridWidth) / 2
        }

        //if the Height is greater than the width, set heigh to width and then center on screen
        if (maxPositionGridRight - maxPositionGridLeft < maxPositionGridBottom - maxPositionGridTop)
        {
            gridHeight = gridWidth;
            maxPositionGridTop = (game.canvas.height - gridHeight) / 2
        }

        game.grid.x = maxPositionGridLeft;
        game.grid.y = maxPositionGridTop;
        game.grid.width = gridWidth;
        game.grid.height = gridHeight;
    }

    PositionScoreMenuForWideScreen()
    {
        let game = this;
        //Calculate the placement based on screen size
        //Create Max position to start drawing the top of grid
        let maxPositionMenuTop = game.canvas.height * 0.05;
        //Create Max position to start drawing the bottom of grid
        let maxPositionMenuBottom = game.canvas.height * 0.20;

        //Create Max position to start drawing the left of grid
        let maxPositionMenuLeft = game.canvas.width * 0.05;

        //Create Max position to start drawing the right of grid
        let maxPositionMenuRight = game.canvas.width * 0.25;

        //Set score menu draw properties
        game.score.x = maxPositionMenuLeft;
        game.score.y = maxPositionMenuTop;
        game.score.width = maxPositionMenuRight - maxPositionMenuLeft;
        game.score.height = maxPositionMenuBottom - maxPositionMenuTop;
    }

    PositionScoreMenuForTallScreen()
    {
        let game = this;
        //Calculate the placement based on screen size
        //Create Max position to start drawing the top of grid
        let maxPositionMenuTop = game.canvas.height * 0.90;
        //Create Max position to start drawing the bottom of grid
        let maxPositionMenuBottom = game.canvas.height;

        //Create Max position to start drawing the left of grid
        let maxPositionMenuLeft = game.canvas.width * 0.20;

        //Create Max position to start drawing the right of grid
        let maxPositionMenuRight = game.canvas.width * 0.80;

        //Set score menu draw properties
        game.score.x = maxPositionMenuLeft;
        game.score.y = maxPositionMenuTop;
        game.score.width = maxPositionMenuRight - maxPositionMenuLeft;
        game.score.height = maxPositionMenuBottom - maxPositionMenuTop;
    }
}