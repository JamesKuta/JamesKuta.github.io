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

        //For storing valide moves
        grid.validSwaps = []; //{cells}

        grid.CreateGrid();
        grid.FillGridWithCells();
    }

    CreateGrid()
    {
        let grid = this;
        for (let row = 0; row < grid.rows; row++)
        {
            grid.cells[row] = [];
            for (let col = 0; col < grid.cols; col++)
            {
                grid.cells[row][col] = null;
            }
        }
    }

    FillGridWithCells()
    {
        //reference to self
        let grid = this;
        
        let finished = false;
        //Need to create a grid with no 3 in a row, but at least one possible move
        while (!finished)
        {
            //Generate cells to fill the grid randomly
            for (let row = 0; row < grid.rows; row++)
            {
                for (let col = 0; col < grid.cols; col++)
                {
                    let randomType = Utilities.RandomIntegerBetweenMinMax(grid.cellImg.length);
                    let cellImg = grid.cellImg[randomType];
                    let cellAnimationSet = grid.cellAnimationSet[randomType];
                    let cell = new Cell(grid.canvas, randomType, cellImg, cellAnimationSet);
                    grid.cells[row][col] = cell;
                }
            }

            grid.HandleMatches();

            grid.FindValidSwaps();
            
            if(grid.validSwaps.length > 0)
            {
                finished = true;
            }
        }
    }

    HandleMatches()
    {
        let grid = this;
        
        grid.FindMatches();

        while(grid.matches.length > 0)
        {
            grid.ResolveMatches();
            grid.CheckMoveCellsDown();
            grid.FillEmptyCells();
            grid.FindMatches();
        }
    }

    FindMatches()
    {
        let grid = this;

        grid.matches = [];

        //Horizontal Matches
        for (let row = 0; row < grid.rows; row++)
        {
            let matchesCount = 1;

            for (let col = 0; col < grid.cols; col++)
            {
                let checkMatches = false;

                if (col == grid.cols - 1)
                {
                    checkMatches = true;
                } else
                {
                    if (grid.cells[row][col].matchNum == grid.cells[row][col + 1].matchNum)
                    {
                        matchesCount += 1;
                    } else
                    {
                        checkMatches = true;
                    }
                }

                if (checkMatches)
                {
                    if (matchesCount >= 3)
                    {
                        grid.matches.push({
                            colNum: col + 1 - matchesCount,
                            rowNum: row,
                            length: matchesCount,
                            horizontal: true
                        });
                    }
                    matchesCount = 1;
                }
            }
        }

        //Vertical Matches
        for (let col = 0; col < grid.cols; col++)
        {
            let matchesCount = 1;

            for (let row = 0; row < grid.rows; row++)
            {
                let checkMatches = false;

                if (row == grid.rows - 1)
                {
                    checkMatches = true;
                } else
                {
                    if (grid.cells[row][col].matchNum == grid.cells[row + 1][col].matchNum)
                    {
                        matchesCount += 1;
                    } else
                    {
                        checkMatches = true;
                    }
                }

                if (checkMatches)
                {
                    if (matchesCount >= 3)
                    {
                        grid.matches.push({
                            colNum: col,
                            rowNum: row + 1 - matchesCount,
                            length: matchesCount,
                            horizontal: false
                        });
                    }
                    matchesCount = 1;
                }
            }
        }
    }

    ResolveMatches()
    {
        let grid = this;

        grid.matches.forEach(function (matches)
        {
            if (matches.horizontal == true)
            {
                for (let i = 0; i < matches.length; i++)
                {
                    grid.cells[matches.rowNum][matches.colNum + i].empty = true;
                }

            }

            if (matches.horizontal == false)
            {
                for (let i = 0; i < matches.length; i++)
                {
                    grid.cells[matches.rowNum + i][matches.colNum].empty = true;
                }
            }
        })
    }

    CheckMoveCellsDown()
    {
        let grid = this;

        //start with the second to last row and move up
        for (let row = grid.rows - 2; row >= 0; row--)
        {
            for (let col = 0; col < grid.cols; col++)
            {
                let countEmptyBelow = true;
                let counter = 1;
                while (countEmptyBelow && row + counter <= grid.rows)
                {
                    if (grid.cells[row][col].empty == false && grid.cells[row + counter][col].empty == true)
                    {
                        grid.cells[row][col].moveDownCount += 1;
                        counter += 1;
                        //console.log(grid.cells[row][col].moveDownCount);
                        if(row + counter == grid.rows)
                        {
                            grid.MoveCellsDown(row, col);
                            countEmptyBelow = false;
                            
                        }
                    } else
                    {
                        grid.MoveCellsDown(row, col);
                        countEmptyBelow = false;
                    }
                }
            }
        }
    }

    MoveCellsDown(row, col)
    {
        let grid = this;
        if(grid.cells[row][col].moveDownCount > 0)
        {
            let count = grid.cells[row][col].moveDownCount;
            grid.cells[row + count][col] = grid.cells[row][col];
            grid.cells[row][col].empty = true;
            //grid.cells[row][col].moveDownCount = 0;
        }
    }

    FillEmptyCells()
    {
        let grid = this;

        for(let row = 0; row < grid.rows; row++)
        {
            for(let col = 0; col < grid.cols; col++)
            {
                if(grid.cells[row][col].empty == true)
                {
                let randomType = Utilities.RandomIntegerBetweenMinMax(grid.cellImg.length);
                let cellImg = grid.cellImg[randomType];
                let cellAnimationSet = grid.cellAnimationSet[randomType];
                let cell = new Cell(grid.canvas, randomType, cellImg, cellAnimationSet);
                grid.cells[row][col] = cell;
                }
            }
        }
    }

    Swap(row1, col1, row2, col2)
    {
        let grid = this;
        let copyOfCell1 = grid.cells[row1][col1];
        grid.cells[row1][col1] = grid.cells[row2][col2];
        grid.cells[row2][col2] = copyOfCell1;
    }

    FindValidSwaps()
    {
        let grid = this;

        grid.validSwaps = [];
        for(let row = 0; row < grid.rows; row++)
        {
            for(let col = 0; col < grid.cols - 1; col++)
            {
                grid.Swap(row, col, row, col+1);
                grid.FindMatches();
                grid.Swap(row, col, row, col+1);

                if(grid.matches.length > 0)
                {
                    grid.validSwaps.push({rowNum1: row, colNum1: col, rowNum2: row, colNum2: col + 1});
                }
            }
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