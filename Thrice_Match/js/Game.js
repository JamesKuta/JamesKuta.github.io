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
            loading: 0, // to show loading screen
            start: 1, // to kick off Init
            running: 2, // allow user to select and swap
            matching: 3, // clear matches
            moving: 4 // move the grid and create new cell objects
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

        game.animationImagesForCells = [];

        //Keep Track Of Selected Cell
        game.lastSelectedCellIndex = -1;

        //mouse position
        game.mouse = {x: null, y: null};
        game.dragging = false;
        
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
                { imgName: game.cookie, source: "img/assets/size3/mm_brown.png" },

                { imgName: game.explosionBlue1, source: "img/assets/size3/explosionblue01.png" },
                { imgName: game.explosionBlue2, source: "img/assets/size3/explosionblue02.png" },
                { imgName: game.explosionBlue3, source: "img/assets/size3/explosionblue03.png" },
                { imgName: game.explosionBlue4, source: "img/assets/size3/explosionblue04.png" },
                { imgName: game.explosionBlue5, source: "img/assets/size3/explosionblue05.png" },

                { imgName: game.explosionGreen1, source: "img/assets/size3/explosiongreen01.png" },
                { imgName: game.explosionGreen2, source: "img/assets/size3/explosiongreen02.png" },
                { imgName: game.explosionGreen3, source: "img/assets/size3/explosiongreen03.png" },
                { imgName: game.explosionGreen4, source: "img/assets/size3/explosiongreen04.png" },
                { imgName: game.explosionGreen5, source: "img/assets/size3/explosiongreen05.png" },

                { imgName: game.explosionPink1, source: "img/assets/size3/explosionpink01.png" },
                { imgName: game.explosionPink2, source: "img/assets/size3/explosionpink02.png" },
                { imgName: game.explosionPink3, source: "img/assets/size3/explosionpink03.png" },
                { imgName: game.explosionPink4, source: "img/assets/size3/explosionpink04.png" },
                { imgName: game.explosionPink5, source: "img/assets/size3/explosionpink05.png" }
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
        game.grid = new Grid(game.canvas, "img/grid/grid_playing_field.png", game.ImagesForCells, game.animationImagesForCells);
        game.score = new Menu(game.canvas, game.menuUI);
    }

    Events()
    {
        //reference to self
        let game = this;

        //Mouse Button Down Event
        game.canvas.onmousedown = game.MouseDown.bind(game);

        //Mouse Button Up Event
        game.canvas.onmouseup = game.MouseUp.bind(game);

        //Mouse Movement Event
        game.canvas.onmousemove = game.MousePositionUpdate.bind(game);

        // Screen Size Change Event
        window.onresize = game.ScreenResize.bind(game);
    }

    ScreenResize()
    {
        let game = this;
        
        //update game canvas size Properties
        game.canvas.width = window.innerWidth;
        game.canvas.height = window.innerHeight;

        //set the screen aspect state
        game.wideScreen = (game.canvas.width >= game.canvas.height) ? true : false;
    }

    MouseDown(e)
    {
        let game = this;

        let pointClickedX = game.mouse.x;
        let pointClickedY = game.mouse.y;

        //Is the click within the grid of cells?
        //If it is within the grid figure out the row and column
        if(game.IsPointClickedInsideGrid(pointClickedX, pointClickedY))
        {
            //Figure out the row and col. REMEMBER to subtract grid position as an offset!
            let cellWidth = game.grid.width / game.grid.cols;
            let cellHeight = game.grid.height / game.grid.rows;
            let col = Utilities.GetGridColFromPoint(pointClickedX - game.grid.x, cellWidth);
            let row = Utilities.GetGridRowFromPoint(pointClickedY - game.grid.y, cellHeight);
            
            // select the cell at Col and Row
            let clickedCell = Utilities.GetElementFromRowCol(row, col, game.grid.cols);
            //set the animation state to selected if not already selected.
            //TODO rewrite for selected animation, just testing with matched for now.
            if(game.grid.cells[clickedCell].state == game.grid.cells[clickedCell].states.selected)
            {
               //unselect the cell
               game.grid.cells[clickedCell].state = game.grid.cells[clickedCell].states.notSelected
               game.lastSelectedCellIndex = -1;
               //console.log(game.lastSelectedCellIndex);
            }else
            {
                //select the cell
                if(game.lastSelectedCellIndex != -1)
                {
                    game.grid.cells[game.lastSelectedCellIndex].state = game.grid.cells[game.lastSelectedCellIndex].states.notSelected;
                }
                game.grid.cells[clickedCell].state = game.grid.cells[clickedCell].states.selected;
                game.lastSelectedCellIndex = clickedCell;
                //console.log(game.lastSelectedCellIndex);
            }
        }

        //set the dragging state to true so we can swap if needed.
        game.dragging = true;
    }

    IsPointClickedInsideGrid(x, y)
    {
        let game = this;
        if(game.IsMouseXInGrid(x) && game.IsMouseYInGrid(y))
        {
            return true;
        } else
        {
            return false;
        }
    }

    IsMouseXInGrid(x)
    {
        let game = this;
        //Is the the mouse click point inside of the game grid?
        return (x > game.grid.x && x < game.grid.x + game.grid.width);
    }

    IsMouseYInGrid(y)
    {
        let game = this;

        return (y > game.grid.y && y < (game.grid.y + game.grid.height));
    }

    MouseUp(e)
    {
        let game = this;
        //console.log(e)
        game.dragging = false;
    }

    MousePositionUpdate(e)
    {
        let game = this;
        let rect = game.canvas.getBoundingClientRect();
        game.mouse.x = e.clientX - rect.left;
        game.mouse.y = e.clientY - rect.top;
        //console.log(Math.floor(game.grid.x) + ": " + game.mouse.x + ", " + game.mouse.y);
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
        //game.DrawGrid();
        
        game.DrawGridLines();
        game.DrawCells();
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

        game.InitImages();

    }

    InitImages()
    {
        let game = this;

        // IMPORTANT! Keep order of ImagesForCells
        // and animationImagesForCell the same.

        game.ImagesForCells = 
        [
            game.blueSwirl, 
            game.redBean,
            game.greenWrapper, 
            game.yellowDrop,
            game.purpleFlower,
        ];

        //Keep this in the order that each element matches the type element of ImagesForCells
        game.animationImagesForCells =
        [
            [game.explosionBlue1, game.explosionBlue2, game.explosionBlue3, game.explosionBlue4, game.explosionBlue5],
            [game.explosionPink1, game.explosionPink2, game.explosionPink3, game.explosionPink4, game.explosionPink5],
            [game.explosionGreen1, game.explosionGreen2, game.explosionGreen3, game.explosionGreen4, game.explosionGreen5],
            [game.explosionBlue1, game.explosionBlue2, game.explosionBlue3, game.explosionBlue4, game.explosionBlue5],
            [game.explosionBlue1, game.explosionBlue2, game.explosionBlue3, game.explosionBlue4, game.explosionBlue5]
        ]
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

    DrawCells()
    {
        let game = this;

        //Some constents to use for calculations
        const diffPercentage = 0.50;
        const cellObjectPercentage = 0.80;

        //What is the x and y postions of the grid?
        let gridX = game.grid.x;
        let gridY = game.grid.y;
        
        //What is the width and height of the grid
        let gridWidth = game.grid.width;
        let gridHeight = game.grid.height;

        //How many columns and rows are there in the grid
        let gridCols = game.grid.cols;
        let gridRows = game.grid.rows;

        //What is the width and height of each cell in the grid
        let gridCellWidth = gridWidth / gridCols;
        let gridCellHeight = gridHeight / gridRows;
        
        //Set the Width and Height of the cell object to draw in the grid cell
        let cellObjectWidth = gridCellWidth * cellObjectPercentage; // x% of gridCellWidth
        let cellObjectHeight = gridCellHeight * cellObjectPercentage; // x% of gridCellHeight

        //Get the difference between the gridCellWidth/gricCellHeight and cellObjectWidth/cellObjectHeight
        let gridCellWidthGridObjectWidthDiff = gridCellWidth - cellObjectWidth;
        let gridCellHeightGridObjectHeightDiff = gridCellHeight - cellObjectHeight;

        //Get half of the differences as an offset to center the cellObjects in the gridCells
        let offsetWidth = gridCellWidthGridObjectWidthDiff * diffPercentage;
        let offsetHeight = gridCellHeightGridObjectHeightDiff * diffPercentage;

        // Set the Cell Object Properties for Drawing and draw
        for(let row = 0; row < game.grid.rows; row++)
        {
            for(let col = 0; col < game.grid.cols; col++)
            {
                let currentIndex = Utilities.GetElementFromRowCol(row,col,game.grid.cols);
                game.grid.cells[currentIndex].width = cellObjectWidth; 
                game.grid.cells[currentIndex].height = cellObjectHeight; 
                game.grid.cells[currentIndex].x = (gridX + offsetWidth) + gridCellWidth * col; 
                game.grid.cells[currentIndex].y = (gridY + offsetHeight) + gridCellHeight * row;  
                game.grid.cells[currentIndex].Draw();
            }
        }
    }

    DrawGridLines()
    {
        let game = this;

        //get the x and y point of the grid
        let gridX = game.grid.x;
        let gridY = game.grid.y;

        //get the width and height of the grid
        let gridWidth = game.grid.width;
        let gridHeight = game.grid.height;

        //get the number of columns and rows for the grid
        let cols = game.grid.cols;
        let rows = game.grid.rows;

        //get the cell size for the grid cells
        let gridCellWidth = gridWidth / cols;
        let gridCellHeight = gridHeight / rows;

        //drawAlphaBackground
        game.context.fillStyle = "rgba(0, 0, 100, 0.2)";
        game.context.fillRect(gridX, gridY, gridWidth, gridHeight);

        //draw the grid lines
        for(let row = 0; row <= rows; row++)
        {
            game.context.strokeStyle = "#C0C0C0";
            game.context.lineWidth = 1;
            game.context.beginPath();
            game.context.moveTo(gridX, gridY + gridCellHeight * row);
            game.context.lineTo(gridWidth + gridX, gridY + gridCellHeight * row);
            game.context.stroke();
            
        }

        for(let col = 0; col <= cols; col++)
        {
            //game.context.strokeStyle = "white";
            game.context.beginPath();
            game.context.moveTo(gridX + gridCellWidth * col, gridY);
            game.context.lineTo(gridX + gridCellWidth * col, gridHeight + gridY);
            game.context.stroke();
        }
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