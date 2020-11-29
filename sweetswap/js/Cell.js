class Cell
{
    constructor(canvas, matchNum, type, animations)
    {
        //TODO ADD ANIMATION SET TO CONSTRUCTOR AND PROPERTIES

        //reference to self
        let cell = this;

        cell.canvas = canvas;
        cell.context = cell.canvas.getContext("2d");

        //cell type
        cell.type = type;
        cell.matchNum = matchNum;
        cell.currentType = cell.type;

        //Keep the index in the grid of the cell for matching and moving
        //cell.index = index;
        
        cell.animations = animations;
        cell.currentAnimationIndex = 0;
        
        //animation states
        cell.states = 
        {
            notSelected: 0,
            selected: 1,
            matched: 2
        };

        cell.state = cell.states.matched;
        cell.timers =
        {
            counter: 0,
            selected: 5,
            matched: 5
        };
        
        cell.animationTimer = 0;
        cell.animationIntervalSelected = 5; // 1/2 second
        cell.animationIntervalMatched = 5; // 1/12 second
        cell.selectedAlphas = 
        [
            0.1, 0.2, 0.3, 0.4, 0.5, 
            0.6, 0.7, 0.8, 0.9, 1.0, 
            1.0, 1.0, 1.0, 1.0, 1.0,
            0.9, 0.8, 0.7, 0.6, 0.5,
            0.4, 0.3, 0.2, 0.1
        ];

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
        }
        
        //Selected Animation
        if(cell.state == cell.states.selected)
        {
            if(cell.currentAnimationIndex < cell.selectedAlphas.length - 1)
            {
                cell.context.strokeStyle = `rgba(255,255,255,${cell.selectedAlphas[cell.currentAnimationIndex]})`;
                cell.context.lineWidth = 2;
                cell.context.strokeRect(cell.x, cell.y, cell.width, cell.height);
                if(cell.animationTimer % cell.animationIntervalSelected == 0)
                {
                    cell.currentAnimationIndex++;
                }
                
            } else
            {
                cell.currentAnimationIndex = 0;
            }   
        }

        //Matched Animation
        if(cell.state == cell.states.matched)
        {   
            if(cell.animationTimer % cell.animationIntervalMatched == 0)
            {
                if(cell.currentAnimationIndex < cell.animations.length - 1)
                {
                    
                    cell.currentType = cell.animations[cell.currentAnimationIndex];
                    cell.currentAnimationIndex++;
                } else
                {
                    cell.currentAnimationIndex = 0;
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