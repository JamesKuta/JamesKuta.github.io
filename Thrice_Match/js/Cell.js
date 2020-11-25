class Cell
{
    constructor(canvas, type, animations)
    {
        //TODO ADD ANIMATION SET TO CONSTRUCTOR AND PROPERTIES

        //reference to self
        let cell = this;

        cell.canvas = canvas;
        cell.context = cell.canvas.getContext("2d");

        //cell type
        cell.type = type;
        cell.currentType = cell.type;
        cell.animations = animations;
        cell.currentAnimationIndex = -1;
        //console.log(cell.animations);
        
        //animation states
        cell.states = 
        {
            notSelected: 0,
            selected: 1,
            matched: 2
        };

        cell.state = cell.states.matched;
        cell.animationTimer = 0;
        cell.animationIntervalSelected = 30; // 1/2 second
        cell.animationIntervalMatched = 5; // 1/12 second

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
        //reference to self
        let cell = this;

        if(cell.state == cell.states.notSelected)
        {
            cell.currentType = cell.type;
            cell.animationTimer = 0;

            //Make the cell.x 5% over from left of grid space
            
        }
        
        //Selected Animation


        //Matched Animation
        if(cell.state == cell.states.matched)
        {   
            if(cell.animationTimer % cell.animationIntervalMatched == 0)
            {
                if(cell.currentAnimationIndex < cell.animations.length - 1)
                {
                    cell.currentAnimationIndex++;
                    cell.currentType = cell.animations[cell.currentAnimationIndex];
                } else
                {
                    cell.currentAnimationIndex = - 1;
                    cell.state = cell.states.notSelected;
                }
            }
        }

        if(!cell.empty)
        {
            cell.context.drawImage(cell.currentType, cell.x, cell.y, cell.width, cell.height);
        }
        
        cell.animationTimer++;
    }
}