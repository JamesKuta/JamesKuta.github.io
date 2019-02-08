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
    bricksRemaining: 0,

    resetBricks: function ()
    {
        BRICKS.bricksRemaining = 0;
        BRICKS.totalBricks = BRICKS.rows * BRICKS.columns;
        //console.log(BRICKS.totalBricks);

        for (let i = 0; i < 3 * BRICKS.columns; i++)
        {
            BRICKS.brickArray[i] = false;
        }

        for (let i = 3 * BRICKS.columns; i < BRICKS.totalBricks; i++)
        {
            BRICKS.brickArray[i] = true;
            BRICKS.bricksRemaining++;
        }
    },

    brickBoundsCheck: function (col, row)
    {
        if (col >= 0 && col < BRICKS.columns &&
            row >= 0 && row < BRICKS.rows)
        {
            let isThereABrickAtCoord = BRICKS.getBrickArrayIndexNumber(col, row);
            return BRICKS.brickArray[isThereABrickAtCoord];
        } else
        {
            return false;
        }
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