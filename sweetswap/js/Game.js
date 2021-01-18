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

        game.animationStates =
        {
            waiting: 0,
            swap: 1,
            explode: 2,
            move: 3,
        }

        game.animationState = game.animationStates.waiting;

        game.explodeTimer = 5;
        game.swapTimer = 5;
        game.moveTimer = 5;
        game.frameCount = 0;

        //Canvas Object
        game.canvas = canvas;
        game.context = game.canvas.getContext("2d");

        //Keep Count of how many images to load
        game.imageCount = 0;

        //Graphics Assets
        game.menuUI = new Image();
        game.backgroundImg = new Image();
        game.backgroundImg2 = new Image();
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

        game.selectedRowCol = {row: -1, col: -1};

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
                { imgName: game.backgroundImg2, source: "img/background/clouds-mirror.png" },
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
        game.background1 = new Background(game.canvas, game.backgroundImg);
        game.background2 = new Background(game.canvas, game.backgroundImg2);
        game.background2.x = game.canvas.width;
        //game.background2.y = game.canvas.width;
        //game.background = new Background(game.canvas, "img/background/clouds.png");
        game.grid = new Grid(game.canvas, game.ImagesForCells, game.animationImagesForCells);
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

        //Mobile orientation change
        window.onorientationchange = game.ScreenResize.bind(game);
    }

    ScreenResize()
    {
        let game = this;
        
        //update game canvas size and position
        //I should create a function for this or figure out
        //how to make it part of the background objects.
        game.canvas.width = window.innerWidth;
        game.canvas.height = window.innerHeight;

        game.background1.width = game.canvas.width;
        game.background1.height = game.canvas.height;
        game.background2.width = game.canvas.width;
        game.background2.height = game.canvas.height;

        game.background1.x = game.canvas.width - game.canvas.width;
        game.background2.x = game.background1.width;

        //set the screen aspect state
        game.wideScreen = (game.canvas.width >= game.canvas.height) ? true : false;
    }

    MouseDown(e)
    {
        let game = this;

        let pointClickedX = game.mouse.x;
        let pointClickedY = game.mouse.y;

        //Is the click within the grid figure out the row and column
        if(game.IsPointClickedInsideGrid(pointClickedX, pointClickedY))
        {
            //point clicked is inside the grid so act on it
            game.ActOnCellAtPointClicked(pointClickedX, pointClickedY);
            
        }

        //set the dragging state to true so we can swap if needed.
        game.dragging = true;
    }

    MouseUp(e)
    {
        let game = this;
        let pointClickedX = game.mouse.x;
        let pointClickedY = game.mouse.y;

        let cellWidth = game.grid.width / game.grid.cols;
        let cellHeight = game.grid.height / game.grid.rows;

        let row = Utilities.GetGridRowFromPoint(pointClickedY - game.grid.y, cellHeight);
        let col = Utilities.GetGridColFromPoint(pointClickedX - game.grid.x, cellWidth);

        //Is the click within the grid figure out the row and column
        if(game.selectedRowCol.row != - 1 && game.selectedRowCol.col != -1)
        {
            if(game.dragging = true && 
                game.IsPointClickedInsideGrid(pointClickedX, pointClickedY) && 
                game.grid.cells[row][col] != game.grid.cells[game.selectedRowCol.row][game.selectedRowCol.col])
            {
                //point clicked is inside the grid so act on it
                game.ActOnCellAtPointClicked(pointClickedX, pointClickedY);
            } 
        }
        
        game.dragging = false;
    }

    ActOnCellAtPointClicked(pointClickedX, pointClickedY)
    {
        let game = this;
        
        //Figure out the row and col. REMEMBER to subtract grid position as an offset!
        let cellWidth = game.grid.width / game.grid.cols;
        let cellHeight = game.grid.height / game.grid.rows;
        let row = Utilities.GetGridRowFromPoint(pointClickedY - game.grid.y, cellHeight);
        let col = Utilities.GetGridColFromPoint(pointClickedX - game.grid.x, cellWidth);
        
        
        // select the cell at Col and Row
        let clickedCell = game.grid.cells[row][col];
        
        //set the animation state to selected if not already selected.
        if(game.IsCellSelected(row, col))
        {
            //game.UnSelectCell(row, col);
        }else
        {
            game.SelectCell(row, col);
        }
        
    }

    SelectCell(row, col)
    {
        let game = this;
        
        if(game.selectedRowCol.row != -1 && game.selectedRowCol.col != -1)
        {
            //See if we can swap the cells
            if((game.selectedRowCol.row + 1 == row || game.selectedRowCol.row - 1 == row) && game.selectedRowCol.col == col)
            {
                game.grid.Swap(game.selectedRowCol.row, game.selectedRowCol.col, row, col);
                game.grid.FindMatches();
                if(game.grid.matches.length > 0)
                {
                    console.log(game.grid.matches);
                }
                //game.UnSelectCell(row, col);
            }

            if((game.selectedRowCol.col + 1 == col || game.selectedRowCol.col - 1 == col) && game.selectedRowCol.row == row)
            {
                game.grid.Swap(game.selectedRowCol.row, game.selectedRowCol.col, row, col);
                //game.UnSelectCell(row, col);
            }

            //Change the state of the currently selected cell to not be selected
            game.UnSelectCell(game.selectedRowCol.row, game.selectedRowCol.col);
        }
        
        //Set the cells state to be selected
        game.grid.cells[row][col].state = game.grid.cells[row][col].states.selected;

        //Have the game remember the Row and Col of the selected cell
        game.selectedRowCol.row = row;
        game.selectedRowCol.col = col;
    }

    UnSelectCell(row, col)
    {
        let game = this;

        //change the state of the cell to not be selected
        game.grid.cells[row][col].state = game.grid.cells[row][col].states.notSelected;

        //there are no more selected cells
        game.selectedRowCol.row = -1;
        game.selectedRowCol.col = -1;
    }

    IsCellSelected(row, col)
    {
        let game = this;

        //console.log(game.lastSelectedCellIndex);
        return (game.grid.cells[row][col].state == game.grid.cells[row][col].states.selected);
        
    }

    IsPointClickedInsideGrid(x, y)
    {
        let game = this;

        return (game.IsMouseXInGrid(x) && game.IsMouseYInGrid(y));
    }

    IsMouseXInGrid(x)
    {
        let game = this;
        
        return (x > game.grid.x && x < game.grid.x + game.grid.width);
    }

    IsMouseYInGrid(y)
    {
        let game = this;

        return (y > game.grid.y && y < (game.grid.y + game.grid.height));
    }

    

    MousePositionUpdate(e)
    {
        let game = this;
        
        let rect = game.canvas.getBoundingClientRect();
        game.mouse.x = e.clientX - rect.left;
        game.mouse.y = e.clientY - rect.top;
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
 
        game.Update();

        //Add one to the game frame counter
        game.frameCount++;

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
        //console.log(game.frameCount);

        if (game.gameState == game.gameStates.loading)
        {
            //game.DrawLoadingScreen();
            game.context.fillStyle = "red";
            game.context.fillRect(0, 0, canvas.width, canvas.height);
            game.context.fillStyle = "black";
            game.context.fillText("LOADING....", 100, 100);
        } else
        {
            game.UpdateBackground();
            game.UpdateGridPositionOnScreen();
            game.UpdateCells();
            game.UpdateScoreMenu();

            game.Draw();
        }
    }

    Draw()
    {
        //reference to self
        let game = this;

        game.DrawBackground();
        game.DrawGridLines();
        game.DrawGrid();
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
        
        const cloudVelocity = 0.1;

        game.background1.x -= cloudVelocity;
        game.background2.x -= cloudVelocity; 

        if(Math.abs(game.background1.x) > game.canvas.width)
        {
            game.background1.x = game.background2.width;
            
        }

        if(Math.abs(game.background2.x) > game.canvas.width)
        {
            game.background2.x = game.background1.width;
        }
    }

    //Drawing Functions for Game Screen
    DrawBackground()
    {
        //reference to self
        let game = this;

        //Draw the background object
        game.background1.Draw();
        game.background2.Draw();
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

    UpdateCells()
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

        // Set the Cell Object Properties for Drawing
        for(let row = 0; row < game.grid.rows; row++)
        {
            for(let col = 0; col < game.grid.cols; col++)
            {
                //let currentIndex = Utilities.GetElementFromRowCol(row,col,game.grid.cols);
                game.grid.cells[row][col].width = cellObjectWidth; 
                game.grid.cells[row][col].height = cellObjectHeight; 
                game.grid.cells[row][col].x = (gridX + offsetWidth) + gridCellWidth * col; 
                game.grid.cells[row][col].y = (gridY + offsetHeight) + gridCellHeight * row;
            }
        }
    }

    DrawCells()
    {
        let game = this;
        
        for(let row = 0; row < game.grid.rows; row++)
        {
            for(let col = 0; col < game.grid.cols; col++)
            {
                game.grid.cells[row][col].Draw();
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

        const topScreenGap = 0.05;
        const bottomScreenGap = 0.95;
        const leftScreenGap = 0.30;
        const rightScreenGap = 0.90;
        //Calculate the placement based on screen size
        //Create Max position to start drawing the top of grid
        let maxPositionGridTop = game.canvas.height * topScreenGap;
        //Create Max position to start drawing the bottom of grid
        let maxPositionGridBottom = game.canvas.height * bottomScreenGap;

        //Create Max position to start drawing the left of grid
        let maxPositionGridLeft = game.canvas.width * leftScreenGap;

        //Create Max position to start drawing the right of grid
        let maxPositionGridRight = game.canvas.width * rightScreenGap;

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