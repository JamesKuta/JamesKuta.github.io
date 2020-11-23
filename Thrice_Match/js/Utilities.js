class Utilities
{
    //returns the index number for the position on a grid or in an array
    //given the current row, column and width of the grid
    static GetElementFromRowCol(row, col, gridWidth)
    {
        return (row * gridWidth) + col;
    }

    static GetGridColFromPoint(point, cellWidth)
    {
        return Math.floor(point / cellWidth);
    }

    static GetGridRowFromPoint(point, cellHeight)
    {
        return Math.floor(point / cellHeight);
    }

    static GetGridColFromIndex(index, gridWidth)
    {
        return index % gridWidth;
    }

    static GetGridRowFromIndex(index, gridWidth)
    {
        return Math.floor(index / gridWidth);
    }

    static RandomIntegerBetweenMinMax(max, min = 0)
    {
        return Math.floor(Math.random() * (max - min) ) + min;
    }

    static RandomIntegerIncludingMaxMin(max, min = 0)
    {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random * (max - min + 1) + min);
    }

    static DifferenceBetweenPoints(a, b)
    {
        return a - b;
    }

    static SumOfPoints(a, b)
    {
        return a + b;
    }
}

