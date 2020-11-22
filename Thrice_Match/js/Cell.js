class Cell
{
    constructor(canvas, type)
    {
        //TODO ADD ANIMATION SET TO CONSTRUCTOR AND PROPERTIES

        //reference to self
        let cell = this;

        cell.canvas = canvas;
        cell.context = cell.canvas.getContext("2d");

        //cell type
        cell.type = type;
        
        //animation states
        cell.animationStates = 
        {
            notSelected: 0,
            selected: 1,
            matched: 2
        };

        cell.animationState = cell.animationStates.notSelected;
        cell.animationTimer = 0;
        cell.animationInterval = 30; // 1/2 of a second.

        //cell image
        cell.image = null;

        //cell location and size properties
        cell.x = null;
        cell.y = null;
        cell.width = null;
        cell.height = null;

        //cell state properties
        cell.empty = false;
        cell.selected = false;
    }

    Draw()
    {
        //When not selected make sure there is no animations
        if(cell.animationState == cell.animationStates.notSelected)
        {
            //just make sure no animation is playing
            cell.animationTimer = 0;
        }
        //When selected play the "selected" animations for cell type
        if(cell.animationState == cell.animationStates.selected)
        {
            if(cell.animationTimer % cell.animationInterval == 0)
            {
                //change image to next in array of animation images
                //if at end of array go back to the beginning
            }
        }
        
        cell.context.drawImage(cell.type, cell.x, cell.y, cell.width, cell.height);
    }
}