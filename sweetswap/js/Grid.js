class Grid
{
    constructor(canvas, imagesForCells, animationsForCells)
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

        grid.cells = []; // Keep Array of objects for grid cells
        grid.cellImg = imagesForCells;

        //images that make up the animation states
        grid.cellAnimationSet = animationsForCells; //Set to animation set

        //For storing matches
        grid.matches = []; //{cells}

        grid.FillGridWithCells();
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

        grid.context.fillStyle = "rgba(0, 0, 100, 0.2)";
        grid.context.fillRect(grid.x, grid.y, grid.width, grid.height);    
    }
}