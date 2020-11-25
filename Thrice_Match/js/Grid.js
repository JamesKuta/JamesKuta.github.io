class Grid
{
    constructor(canvas, backgroundImage, imagesForCells, animationsForCells)
    {
        //reference to self
        let grid = this;
        
        // Set drawing canvas properties
        grid.canvas = canvas;
        grid.context = grid.canvas.getContext("2d");

        // Set properties for grid
        grid.x = null; //Top Left 
        grid.y = null; //Top Left
        grid.width = null; // Width of Grid
        grid.height = null; //Height of Grid
        grid.rows = 9;
        grid.cols = 9;
        grid.backGroundColor = "#DDD9D9" // BackgroundColor of Grid
        grid.showGridLines = true; // Bool to draw grid lines or not
        grid.gridLineRows = null; // How many rows for grid lines
        grid.gridLineCols = null; // How many columns for grid lines
        
        grid.imageURL = backgroundImage;

        grid.cells = []; // Keep Array of objects for grid cells
        grid.cellImg = imagesForCells;
        //console.log(grid.cellImg);
        //images that make up the animation states
        grid.cellAnimationSet = animationsForCells; //Set to animation set

        //For storing matches
        grid.matches = []; //{cells}

        grid.LoadImages();
        grid.FillGridWithCells();
    }

    LoadImages()
    {
        //reference to self
        let grid = this;

        grid.backgroundImg = new Image();
        grid.backgroundImg.onload = function()
        {
            // Code for loading screen
            
        }
        grid.backgroundImg.src = grid.imageURL;
        
    }

    FillGridWithCells()
    {
        //reference to self
        let grid = this;

        for(let i = 0; i < grid.cols * grid.rows; i++)
        {
            let cellIndex = i;
            let randomType = Utilities.RandomIntegerBetweenMinMax(grid.cellImg.length);
            let cellImg = grid.cellImg[randomType];
            let cellAnimationSet = grid.cellAnimationSet[randomType];
            //console.log(cellAnimationSet);
            let cell = new Cell(grid.canvas, randomType, cellImg, cellIndex, cellAnimationSet);
            grid.cells.push(cell);
        }
    }

    Draw()
    {
        //reference to self
        let grid = this;

        if(grid.backgroundImg != null)
        {
            grid.context.drawImage(grid.backgroundImg, grid.x, grid.y, grid.width, grid.height);
        }
        
        /// TO DO: MAKE THIS DRAWING IN THE CELL OBJECT, GAME OBJECT TO TELL WHERE TO DRAW
        // for(let row = 0; row < grid.rows; row++)
        // {
        //     for(let col = 0; col < grid.cols; col++)
        //     {
        //         let currentIndex = Utilities.GetElementFromRowCol(row,col,grid.cols);
        //         grid.cells[currentIndex].width = grid.width / grid.cols;
        //         grid.cells[currentIndex].height = grid.height / grid.rows;
        //         //grid.cells[9].selected = true;
        //         grid.context.drawImage(grid.cells[currentIndex].type, grid.x + grid.cells[currentIndex].width * col, grid.y + grid.cells[currentIndex].height * row, grid.cells[currentIndex].width, grid.cells[currentIndex].height);
        //     }
        // }

        //Figure out why these won't show correctly.
        // if(grid.showGridLines)
        // {
        //     for (let col = 1; col < grid.cols; col++)
        //     {
        //         let horizontalPosition = grid.x + (col * grid.width / grid.cols);
        //         //console.log(horizontalPosition);
        //         let verticalPosition = grid.y;
        //         grid.context.strokeStyle = "white";
        //         grid.context.beginPath();
        //         grid.context.moveTo(horizontalPosition, verticalPosition);
        //         grid.context.lineTo(horizontalPosition, grid.height);
        //         grid.context.stroke();
        //     }

            // for(let row = 0; row < grid.rows; row++)
            // {
            //     let horizontalPosition = grid.x;
            //     let verticalPosition = grid.y + (row * grid.height / grid.rows);
            //     grid.context.lineWidth = 1;
            //     grid.context.strokeStyle = "white";
            //     grid.context.beginPath();
            //     grid.context.moveTo(horizontalPosition, verticalPosition);
            //     grid.context.lineTo(grid.width, verticalPosition);
            //     grid.context.stroke();
            // }
        //}
    }
}