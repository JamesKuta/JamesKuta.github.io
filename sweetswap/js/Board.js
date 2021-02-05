class Board
{
    constructor(canvas, cellImages, explosionImages)
    {
        let board = this;
        board.context = canvas.getContext('2d');
        board.x = 0;
        board.y = 0;
        board.width = 100;
        board.height = 100;
        board.cellWidth = 0;
        board.cellHeight = 0;
        board.levelData = 0;
        board.cellImages = cellImages;
        board.explosionImages = explosionImages;
        board.level = levels[0];
        board.cells = [];
        board.explodeCells = [];
        board.particleAnimationData = [];
        board.selectedCell = {row: null, col: null};
        board.swapData = {row1: null, row2: null, col1: null, col2: null};
        board.mouseIsDragging = false;
        board.states = {wait: 0, swap: 1, drop: 2, explode: 3};
        board.state = board.states.wait;
        
        //Figure Out Scoring Values and how they work
        board.currentScore = 0;
        board.regularMatchScoreValue = 100;
        board.specialMatchMultiplyer = 5;

        //for storing matches and swap data
        board.matches = [];
        board.swaps = [];

        //Animation Timing
        board.moveDownAnimationDurationMS = 300;
        board.swapAnimationDurationMS = 250;
        board.moveDownAnimationTimeAccum = 0; // total time in state
        board.swapAnimationTimeAccum = 0; // total time in state

        board.selectedAnimationAlphas = [0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0,
                                         1.0, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4];
        board.alphaIndex = 0;
        board.selectedAnimationInterval = 75;
        board.selectedAnimationAccum = 0;
        board.thereIsASelectedCell = false;

        board.explodeAnimationTimeAccum = 0;
        board.explodeAnimationDurationMS = 250;

        // board.particleEffectAnimationTimeAccum = 0;
        // board.particleEffectAnimationDurationMS = 500;

        
        
        board.boardIsReady = false;
        board.CreateInitialBoardFromLevelData();
        board.GenerateNewCellsForBoard();
        
        //TODO: Fix Explosion Size and Position, Fix the odd swap cell glitch
    }

    CreateInitialBoardFromLevelData()
    {
        let board = this;
        board.cells = board.level.grid;
    }

    GenerateNewCellsForBoard()
    {
        let board = this;
        while(!board.boardIsReady)
        {
            for(let row = 0; row < board.level.rows; row++)
            {
                board.cells[row] = []
    
                for(let col = 0; col < board.level.cols; col++)
                {
                    if(board.level.grid[row][col] == null)
                    {
                        board.cells[row][col] = 
                        { 
                            type: Utilities.RandomIntegerBetweenMinMax(board.cellImages.length),
                            x: 0,
                            y: 0,
                            width: 0,
                            height: 0,
                            verticalMove: 0, //number of cells to move
                            horizontalMove: 0 //number of cells to move
                        };
                    }else if(board.level.grid[row][col] == 101)
                    {
                        board.cells[row][col] = 
                        {
                            type: board.level.grid[row][col],
                            x: 0,
                            y: 0,
                            width: 0,
                            height: 0,
                            verticalMove: 0, //number of cells to move
                            horizontalMove: 0 //number of cells to move
                        };
                    }else
                    {
                        board.cells[row][col] = 
                        { 
                            type: Utilities.RandomIntegerBetweenMinMax(board.cellImages.length),
                            x: 0,
                            y: 0,
                            width: 0,
                            height: 0,
                            verticalMove: 0, //number of cells to move
                            horizontalMove: 0 //number of cells to move
                        };
                    }
                }
            }
    
            board.MakeBoardReadyForPlay();
            board.FindSwaps();
    
            if(board.swaps.length > 0)
            {
              board.boardIsReady = true;
            }
        }
    }

    MakeBoardReadyForPlay()
    {
        let board = this;
        
        board.FindMatches();

        while(board.matches.length > 0)
        {
            board.RemoveMatches();
            board.MoveCellsDown();
            board.CreateNewCells();
            board.FindMatches();
        }
    }

    FindMatches()
    {
        let board = this;
        
        //don't want to check the length of a match we just started.
        let checkMatchLength = false;

        //horizontal Matches
        for(let row = 0; row < board.level.rows; row++)
        {
            //reset count of cells that match to start each row
            let matchCount = 1;

            for(let col = 0; col < board.level.cols; col++)
            {
                checkMatchLength = false;
                if(col == board.level.cols - 1)
                {
                    checkMatchLength = true;
                }else
                {
                    if(board.cells[row][col].type == board.cells[row][col + 1].type)
                    {
                        matchCount++;
                    }else
                    {
                        checkMatchLength = true;
                    }
                }

                if(checkMatchLength)
                {
                    if(matchCount > 2)
                    {
                        let match = 
                        {
                            row: row,
                            col: (col + 1) - matchCount,
                            length: matchCount,
                            horizontal: true
                        };

                        board.matches.push(match);
                    }
                    matchCount = 1;
                }
            }    
        }

        //Vertical Matches
        for(let col = 0; col < board.level.cols; col++)
        {
            //reset count of cells that match to start each row
            let matchCount = 1;

            for(let row = 0; row < board.level.rows; row++)
            {
                checkMatchLength = false;
                if(row == board.level.rows - 1)
                {
                    checkMatchLength = true;
                }else
                {
                    if(board.cells[row][col].type == board.cells[row + 1][col].type)
                    {
                        matchCount++;
                    }else
                    {
                        checkMatchLength = true;
                    }
                }

                if(checkMatchLength)
                {
                    if(matchCount > 2)
                    {
                        let match = 
                        {
                            row: (row + 1) - matchCount,
                            col: col,
                            length: matchCount,
                            horizontal: false
                        };
                        board.matches.push(match);
                    }
                    matchCount = 1;
                }
            }
        }
        
    }

    RemoveMatches()
    {
        let board = this;
        
        for(let matchData = 0; matchData < board.matches.length; matchData++)
        {
            // {row: int, col: int, length: int, horizontal: bool}
            let group = board.matches[matchData];
            
            if(group.horizontal)
            {
                for(let i = 0; i < group.length; i++)
                {
                    board.cells[group.row][group.col + i].type = null;
                }
            }

            if(!group.horizontal)
            {
                for(let i = 0; i < group.length; i++)
                {
                    board.cells[group.row + i][group.col].type = null;
                }
            }
        }

        board.CreateSpecialCellIfMatchShould();

    }

    CreateSpecialCellIfMatchShould()
    {
        let board = this;
        //TODO Need to figure out how to handle Swap Data too
        board.matches = [];
    }

    CreateExplosion()
    {
        let board = this;
        //TODO Create Explosion structure based on matches
    }

    ResetMatchData()
    {
        let board = this;
        board.matches = [];
    }

    MoveCellsDown()
    {
        let board = this;
        //start from the left most col
        for(let col = 0; col < board.level.cols; col++)
        {
            //Start from second to last row
            //Travel up each row. For each of the cells find how many cells below are null
            for(let row = board.level.rows - 2; row >=0; row--)
            {
                let emptyCellsBelowCount = 0;
                let cell = board.cells[row][col];
                if(cell.type == null)
                {
                    continue;
                }else
                {
                    for(let nextRow = row + 1; nextRow < board.level.rows; nextRow++)
                    {
                        let nextCell = board.cells[nextRow][col];
                        if(nextCell.type == null)
                        {
                            emptyCellsBelowCount++;
                        }
                    }
                    if(emptyCellsBelowCount > 0)
                    {
                        cell.verticalMove = emptyCellsBelowCount;
                    }
                }
            }
        }
        //console.log(board.cells);
        if(!board.boardIsReady)
        {
            board.UpdateBoardAfterMove();
        }
        
    }

    UpdateBoardAfterMove()
    {
        let board = this;
        //start from second to last row
        for(let row = board.level.rows - 2; row >= 0; row--)
        {
            //Travel each column from left to right. For each cell move its real position down based on the verticalMove value
            for(let col = 0; col < board.level.cols; col++)
            {
                if(board.cells[row][col].verticalMove > 0)
                {
                    //make the cell VerticalMoves down from current cell to be the same as the current cell
                    board.cells[row + board.cells[row][col].verticalMove][col].type = board.cells[row][col].type;
                    //set the current cell type to be null;
                    board.cells[row][col].type = null;
                    //reset the verticalMove for the current cell
                    board.cells[row][col].verticalMove = 0;
                    //reset the verticalMove the cell VerticalMoves down from current cell
                    board.cells[row + board.cells[row][col].verticalMove][col].verticalMove = 0;
                }
            }
        }
        //board.Update();
        //console.log(board.cells);
        
        board.CreateNewCells();
    }

    CreateNewCells()
    {
        let board = this;
        //scan the top row starting at first column for null cells
        for(let row = 0; row < board.level.rows; row++)
        {
            for(let col = 0; col < board.level.cols; col++)
            {
                if(board.cells[row][col].type == null)
                {
                    board.cells[row][col].type = Utilities.RandomIntegerBetweenMinMax(board.cellImages.length);
                }
            }
        }
    }

    FindSwaps()
    {
        let board = this;
        //Find horizontal swaps
        for(let row = 0; row < board.level.rows; row++)
        {
            for(let col = 0; col < board.level.cols - 1; col++)
            {
                board.SwapCells(row, row, col, col + 1);
                board.FindMatches();
                board.SwapCells(row, row, col, col + 1);
            }
            if(board.matches.length > 0)
            {
                board.swaps.push({row1: 0, col1: 0, row2: 0, col2: 0});
            }
        }
        
        //Find vertical swaps
        for(let col = 0; col < board.level.cols; col++)
        {
            for(let row = 0; row < board.level.rows - 1; row++)
            {
                board.SwapCells(row, row + 1, col, col);
                board.FindMatches();
                board.SwapCells(row, row + 1, col, col);
            }
            if(board.matches.length > 0)
            {
                board.swaps.push({row1: 0, col1: 0, row2: 0, col2: 0});
            }
        }
    }

    SwapCells(row1, row2, col1, col2)
    {
        let board = this;

        let Cell1Copy = board.cells[row1][col1].type;
        board.cells[row1][col1].type = board.cells[row2][col2].type
        board.cells[row2][col2].type = Cell1Copy;
    }

    SetBoardSize(bWideScreen)
    {
        let board = this;
        //Left Side of Board

        if(bWideScreen)
        {
            let defaultXPosLeft = board.context.canvas.width * 0.30;
            let tempLeftPos = defaultXPosLeft;

            //Top Side of Board
            let defaultYPosTop = board.context.canvas.height * 0.02;
            let tempTopPos = defaultYPosTop;

            //Right Side of Board
            let defaultXPosRight = board.context.canvas.width * 0.95;
            let tempRightPos = defaultXPosRight;

            //Bottom side of Board
            let defaultYPosBottom = board.context.canvas.height * 0.95;
            let tempBottomPos = defaultYPosBottom;

            //Width of Board
            let tempWidth = tempRightPos - tempLeftPos;
        
            //Height of Board
            let tempHeight = tempBottomPos - tempTopPos;

            //Calculate board position from temp data
            if(tempWidth > tempHeight)
            {
                //set the width and height to be the height
                board.width = tempHeight;
                board.height = tempHeight;
                board.x = tempLeftPos;
                board.y = tempTopPos;

                //Center the board vertically and horizontally on the screen
                board.x = (defaultXPosRight - defaultXPosLeft) / 2;

                //Set board cell size
                board.cellWidth = board.width / board.level.cols;
                board.cellHeight = board.height / board.level.rows;
            }
        }else
        {
            let defaultXPosLeft = board.context.canvas.width * 0.0;
            let tempLeftPos = defaultXPosLeft;

            //Top Side of Board
            let defaultYPosTop = board.context.canvas.height * 0.02;
            let tempTopPos = defaultYPosTop;

            //Right Side of Board
            let defaultXPosRight = board.context.canvas.width * 0.95;
            let tempRightPos = defaultXPosRight;

            //Bottom side of Board
            let defaultYPosBottom = board.context.canvas.height * 0.95;
            let tempBottomPos = defaultYPosBottom;

            //Width of Board
            let tempWidth = tempRightPos - tempLeftPos;
        
            //Height of Board
            let tempHeight = tempBottomPos - tempTopPos;

            //Calculate board position from temp data
            if(tempWidth > tempHeight)
            {
                //set the width and height to be the height
                board.width = tempHeight;
                board.height = tempHeight;
                board.x = tempLeftPos;
                board.y = tempTopPos;

                //Center the board vertically and horizontally on the screen
                board.x = (defaultXPosRight - defaultXPosLeft) / 2;

                //Set board cell size
                board.cellWidth = board.width / board.level.cols;
                board.cellHeight = board.height / board.level.rows;
            }
        }
        
        board.Update();
    }

    MouseDown(e)
    {
        let board = this;
        let mouse = {x: e.clientX, y: e.clientY};
        //console.log(mouse);
        if(board.IsClickInsideBoard(mouse) && board.state == board.states.wait)
        {
            board.mouseIsDragging = true;
            
        }
    }

    IsClickInsideBoard(mouse)
    {
        let board = this;
        return ((mouse.x > board.x && mouse.x < board.x + board.width) &&
                (mouse.y > board.y && mouse.y < board.y + board.height))
    }

    MouseUp(e)
    {
        let board = this;
        let mouse = {x: e.clientX, y: e.clientY};
        board.mouseIsDragging = false;
        if(board.IsClickInsideBoard(mouse) && board.state == board.states.wait)
        {
            board.HandleMouseClick(mouse.x, mouse.y);
        }
    }

    HandleMouseClick(x, y)
    {
        let board = this;
        let row = Utilities.GetGridRowFromPoint(y - board.y, board.cellHeight);
        let col = Utilities.GetGridColFromPoint(x - board.x, board.cellWidth);
        if(board.selectedCell.row == null && board.selectedCell.col == null)
        {
            board.MarkCellAsSelected(row, col);
            return;
        }
        
        if(board.selectedCell.row == row && board.selectedCell.col == col)
        {
            board.UnmarkSelectedCell(row, col);
            return;
        }
        
        board.SwapCellsOrChangeSelectedCells(row, col);
    }

    MarkCellAsSelected(row, col)
    {
        let board = this;
        
        board.selectedCell.row = row;
        board.selectedCell.col = col;
        //console.log(board.selectedCell);
    }

    UnmarkSelectedCell(row, col)
    {
        let board = this;
        board.selectedCell.row = null;
        board.selectedCell.col = null;
        //console.log(board.selectedCell);
    }

    SwapCellsOrChangeSelectedCells(row, col)
    {
        let board = this;
        
        //Are we swapping up or down?
        if((board.selectedCell.row + 1 == row || board.selectedCell.row - 1 == row) && (board.selectedCell.col == col))
        {
            board.PerformTheSwapActions(row, col);
            return;
        } 
        
        //Are we swapping lefr or right?
        if((board.selectedCell.col + 1 == col || board.selectedCell.col - 1 == col) && (board.selectedCell.row == row))
        {
            board.PerformTheSwapActions(row, col)
            return;
        }

        board.selectedCell.row = row;
        board.selectedCell.col = col;
        
    }

    PerformTheSwapActions(row, col)
    {
        let board = this;
        board.SetSwapData(row, col);
        board.SetMoveValueForCells();
        board.StartSwapAnimation();
    }

    SetSwapData(row, col)
    {
        let board = this;

        board.swapData.row1 = board.selectedCell.row;
        board.swapData.row2 = row;
        board.swapData.col1 = board.selectedCell.col;
        board.swapData.col2 = col;
        //console.log(board.swapData);
    }

    SetMoveValueForCells()
    {
        let board = this;
        
        let selectedCell = board.cells[board.selectedCell.row][board.selectedCell.col];
        let clickedCell = board.cells[board.swapData.row2][board.swapData.col2];
        
        selectedCell.horizontalMove = Math.round((clickedCell.x - selectedCell.x) / board.cellWidth);
        selectedCell.verticalMove = Math.round((clickedCell.y - selectedCell.y) / board.cellHeight);

        //Flip for clickedCell
        clickedCell.horizontalMove = Math.round((selectedCell.x - clickedCell.x) / board.cellWidth);
        clickedCell.verticalMove = Math.round((selectedCell.y - clickedCell.y) / board.cellHeight);
        //console.log(selectedCell.horizontalMove, selectedCell.verticalMove);
        //console.log(clickedCell.horizontalMove, clickedCell.verticalMove);
    }

    StartSwapAnimation()
    {
        let board = this;
        board.state = board.states.swap;
        board.swapAnimationTimeAccum = 0;
    }

    MakeBoardCurrent()
    {
        let board = this;
        for(let row = 0; row < board.level.rows; row++)
        {
            for(let col = 0; col < board.level.cols; col++)
            {
                let cell = board.cells[row][col];
                cell.y = board.y + (cell.verticalMove * board.cellHeight) + (row * board.cellHeight);
                cell.x = board.x + (cell.horizontalMove * board.cellWidth) + (col * board.cellWidth);
                cell.height = board.cellHeight;
                cell.width = board.cellWidth;
                cell.verticalMove = null;
                cell.horizontalMove = null;
            }
        }
    }

    AddMatchesToParticleEffects()
    {
        let board = this;
        let frameChangeMS = 75;
        let images = board.explosionImages[0];
        
        for(let i = 0; i < board.matches.length; i++)
        {
            if(board.matches[i].horizontal == true)
            {
                for(let j = 0; j < board.matches[i].length; j++)
                {
                    let cell = {};
                    cell.row = board.matches[i].row;
                    cell.col = board.matches[i].col + j;
                    cell.currentAminIndex = 0;
                    cell.frameChangeMS = frameChangeMS;
                    cell.frameTimeAccum = 0;
                    cell.images = images;
                    board.particleAnimationData.push(cell);
                }
            }else if(board.matches[i].horizontal == false)
            {
                for(let j = 0; j < board.matches[i].length; j++)
                {
                    let cell = {};
                    cell.row = board.matches[i].row + j;
                    cell.col = board.matches[i].col;
                    cell.currentAminIndex = 0;
                    cell.frameChangeMS = frameChangeMS;
                    cell.frameTimeAccum = 0;
                    cell.images = images;
                    board.particleAnimationData.push(cell);
                }
            }
        }
        //console.log(board.particleAnimationData);
    }

    IncreaseScore()
    {
        let board = this;
        for(let i = 0; i < board.matches.length; i++)
        {
            switch (board.matches[i].length)
            {
                case 3:
                {
                    board.currentScore += board.regularMatchScoreValue;
                    break;
                }
                case 4:
                {
                    board.currentScore += board.regularMatchScoreValue * board.specialMatchMultiplyer;
                    break;
                }
                case 5:
                {
                    board.currentScore += board.regularMatchScoreValue * 50; //board.specialMatchMultiplyer * 2;
                }
                default:
                {
                    board.currentScore += board.regularMatchScoreValue * 10;
                }
            }
        }
    }

    Update(dt)
    {
        let board = this;

        if(board.state == board.states.wait)
        {
            for(let row = 0; row < board.level.rows; row++)
            {
                for(let col = 0; col < board.level.cols; col++)
                {
                    let cell = board.cells[row][col];
                    cell.y = board.y + (cell.verticalMove * board.cellHeight) + (row * board.cellHeight);
                    cell.x = board.x + (cell.horizontalMove * board.cellWidth) + (col * board.cellWidth);
                    cell.height = board.cellHeight;
                    cell.width = board.cellWidth;
                }
            }
        }
        
        if(board.state == board.states.swap)
        {
            //Use animation properties accumulate time for duration state change
           
            if(board.swapAnimationTimeAccum < board.swapAnimationDurationMS)
            {
                for(let row = 0; row < board.level.rows; row++)
                {
                    for(let col = 0; col < board.level.cols; col++)
                    {
                        let cell = board.cells[row][col];
                        cell.y += (cell.verticalMove * cell.height) * (dt / board.swapAnimationDurationMS);
                        cell.x += (cell.horizontalMove * cell.width) * (dt / board.swapAnimationDurationMS);
                    }
                }
                board.swapAnimationTimeAccum += dt;
                //console.log(board.swapAnimationTimeAccum);
            }else
            {
                //console.log(board.swapData);
                board.matches = [];
                //reset move data
                board.cells[board.swapData.row1][board.swapData.col1].verticalMove = 0;
                board.cells[board.swapData.row1][board.swapData.col1].horizontalMove = 0;
                board.cells[board.swapData.row2][board.swapData.col2].verticalMove = 0;
                board.cells[board.swapData.row2][board.swapData.col2].horizontalMove = 0;
                //swap the types
                board.SwapCells(board.swapData.row1, board.swapData.row2, board.swapData.col1, board.swapData.col2);
                board.MakeBoardCurrent();
                board.FindMatches();
                //Valid Swap so clean it up
                if(board.matches.length > 0)
                {
                    //Increase Score
                    board.IncreaseScore();
                    //Reset Selected Cell
                    board.selectedCell.row = null;
                    board.selectedCell.col = null;
                    board.state = board.states.explode;
                    board.explodeAnimationTimeAccum = 0;
                }else //not valid so revert it
                {
                    board.SwapCells(board.swapData.row1, board.swapData.row2, board.swapData.col1, board.swapData.col2);
                    board.selectedCell.row = null;
                    board.selectedCell.col = null;
                    board.state = board.states.wait;
                } 
            }
        }

        if(board.state == board.states.explode)
        {
            //reset explodeCells each call to avoid run away growth!
            board.explodeCells = [];
            
            // create expload data structure
            for(let i = 0; i < board.matches.length; i++)
            {
                if(board.matches[i].horizontal == true)
                {
                    for(let j = 0; j < board.matches[i].length; j++)
                    {
                        let cell = {};
                        cell.row = board.matches[i].row;
                        cell.col = board.matches[i].col + j;
                        board.explodeCells.push(cell);
                    }
                }else if(board.matches[i].horizontal == false)
                {
                    for(let j = 0; j < board.matches[i].length; j++)
                    {
                        let cell = {};
                        cell.row = board.matches[i].row + j;
                        cell.col = board.matches[i].col;
                        board.explodeCells.push(cell);
                    }
                }
            }

            //make a little larger over a short time
            if(board.explodeAnimationTimeAccum < board.explodeAnimationDurationMS)
            {
                for(let i = 0; i < board.explodeCells.length; i++)
                {
                    let row = board.explodeCells[i].row;
                    let col = board.explodeCells[i].col;
                    let growWidth = (board.width * 0.05) * (dt / board.explodeAnimationDurationMS);
                    let growHeight = (board.height * 0.05) * (dt / board.explodeAnimationDurationMS);
                    board.cells[row][col].width += growWidth;
                    board.cells[row][col].height += growHeight;
                    board.cells[row][col].x -= growWidth / 2;
                    board.cells[row][col].y -= growHeight / 2;
                }
            }else
            {
                board.state = board.states.drop;
                board.moveDownAnimationTimeAccum = 0;
            }

            board.explodeAnimationTimeAccum += dt;
        }

        if(board.state == board.states.drop)
        {
            board.AddMatchesToParticleEffects();
            board.RemoveMatches();
            board.MoveCellsDown();
            
            if(board.moveDownAnimationTimeAccum < board.moveDownAnimationDurationMS)
            {
                for(let row = 0; row < board.level.rows; row++)
                {
                    for(let col = 0; col < board.level.cols; col++)
                    {
                        let cell = board.cells[row][col];
                        cell.y += (cell.verticalMove * cell.height) * (dt / board.moveDownAnimationDurationMS);
                        cell.x += (cell.horizontalMove * cell.width) * (dt / board.moveDownAnimationDurationMS);
                    }
                }
            }else
            {
                board.UpdateBoardAfterMove();
                board.MakeBoardCurrent();
                board.FindMatches()
                if(board.matches.length > 0)
                {
                    //Increase Score
                    board.IncreaseScore();
                    board.state = board.states.explode;
                    board.explodeAnimationTimeAccum = 0;
                    return;
                }else
                {
                    board.state = board.states.wait;
                }
            }
            board.moveDownAnimationTimeAccum += dt;
        }

        //Update the selected cell animiation
        if(board.selectedCell.row != null && board.selectedCell.col != null)
        {
            board.thereIsASelectedCell = true;
            
            if(board.selectedAnimationAccum >= board.selectedAnimationInterval)
            {
                if(board.alphaIndex < board.selectedAnimationAlphas.length)
                {
                    board.alphaIndex++;
                }else
                {
                    board.alphaIndex = 0;
                }
                board.selectedAnimationAccum = 0;
            }else
            {
                board.selectedAnimationAccum += dt;
            }
        }else
        {
            board.thereIsASelectedCell = false;
            board.alphaIndex = 0;
        }

        if(board.particleAnimationData.length > 0)
        {
            for(let i = board.particleAnimationData.length - 1; i >= 0; i--)
            {
                if(board.particleAnimationData[i].frameTimeAccum >= board.particleAnimationData[i].frameChangeMS)
                {
                    if(board.particleAnimationData[i].currentAminIndex < board.particleAnimationData[i].images.length - 1)
                    {
                        board.particleAnimationData[i].currentAminIndex++;
                        board.particleAnimationData[i].frameTimeAccum = 0;
                    }else
                    {
                        //board.currentScore += board.regularMatchScoreValue;
                        board.particleAnimationData.splice(i, 1);
                    }
                }else
                {
                    board.particleAnimationData[i].frameTimeAccum += dt;
                }
            }
        }
    }

    Draw()
    {
        let board = this;
        
        //Draw Grid Lines
        for(let row = 0; row <= board.level.rows; row++)
        {
            board.context.strokeStyle = "rgba(255,255,255,0.3)";
            board.context.lineWidth = board.width * 0.005;
            board.context.beginPath();
            board.context.moveTo(board.x, board.y + (row * board.cellHeight));
            board.context.lineTo(board.x + board.width, board.y + (row * board.cellHeight));
            board.context.stroke();
        }

        for(let col = 0; col <= board.level.cols; col++)
        {
            board.context.strokeStyle = "rgba(255,255,255,0.3)";
            board.context.beginPath();
            board.context.moveTo(board.x + (col * board.cellWidth), board.y);
            board.context.lineTo(board.x + (col * board.cellWidth), board.height + board.y);
            board.context.stroke();
        }

        //Draw the board
        board.context.fillStyle = "rgba(0, 0, 100, 0.1)";
        board.context.fillRect(board.x, board.y, board.width, board.height);

        //Draw the cells
        for(let row = 0; row < board.level.rows; row++)
        {
            for(let col = 0; col < board.level.cols; col++)
            {
                let cell = board.cells[row][col];
                if(cell.type != null)
                {
                    board.context.drawImage(board.cellImages[cell.type], cell.x, cell.y, cell.width, cell.height);
                }
            }
        }

        //Draw the cell selected outline
        if(board.thereIsASelectedCell)
        {
            board.context.save();
            board.context.strokeStyle = `rgba(255,255,255,${board.selectedAnimationAlphas[board.alphaIndex]})`;
            board.context.lineWidth = board.width * 0.01;
            let y = (board.selectedCell.row * board.cellHeight) + board.y;
            let x = (board.selectedCell.col * board.cellWidth) + board.x;

            board.context.strokeRect(x, y, board.cellWidth, board.cellHeight);
            board.context.restore();
        }

        if(board.particleAnimationData.length > 0)
        {
            let explosionWidth = board.cellWidth + (board.cellWidth * 0.80);
            let explosionHeight = board.cellHeight + (board.cellHeight * 0.80);
            
            for(let i = 0; i < board.particleAnimationData.length; i++)
            {
                let x = ((board.particleAnimationData[i].col * board.cellWidth) + board.x)  - ((explosionWidth - board.cellWidth) / 2);
                let y = ((board.particleAnimationData[i].row * board.cellHeight) + board.y) - ((explosionHeight - board.cellHeight)/ 2);
                board.context.drawImage(board.particleAnimationData[i].images[board.particleAnimationData[i].currentAminIndex],
                                        x, y, explosionWidth, explosionHeight);
            }
        }
    }
}