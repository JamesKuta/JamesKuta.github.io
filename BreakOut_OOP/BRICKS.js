const BRICKS =
{
    width: 80,
    height: 20,
    gap: 2,
    columns: 10,
    rows: 10,
    totalBricks: 0,
    brickArray: [],
    totalBricks: 0,

    resetBricks: function ()
    {
        BRICKS.totalBricks = BRICKS.rows * BRICKS.columns;
        console.log(BRICKS.totalBricks);
        for (let i = 0; i < BRICKS.totalBricks; i++)
        {
            BRICKS.brickArray[i] = true;
        }

        
        BRICKS.brickArray[0] = false;
        console.log(BRICKS.brickArray);
    },

    getBrickArrayIndexNumber: function (col, row)
    {
        return col + BRICKS.columns * row; 
    },

    drawBricks: function ()
    {
        for (let row = 0; row < BRICKS.rows; row++)
        {
            for (let col = 0; col < BRICKS.columns; col++)
            {
                let brickArrayIndex = BRICKS.getBrickArrayIndexNumber(col, row);
                if (BRICKS.brickArray[brickArrayIndex])
                {
                    GAMEWORLD.draw.rectangle(BRICKS.width * col, BRICKS.height * row,
                        BRICKS.width - BRICKS.gap, BRICKS.height - BRICKS.gap, "blue");
                }

            }
        }
    },
};