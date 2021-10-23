//This class expects to receive an array of one or more state strings.

class MStateManager
{
    constructor(strArrStates)
    {
        this.strArrStates = strArrStates;
        this.state = this.strArrStates[0];
    }

    GetState()
    {
        return this.state;
    }

    SetState(name)
    {
        let foundMatchingState = false;
        
        for(let i = 0; i < this.strArrStates.length; i++)
        {
            if(name == this.strArrStates[i])
            {
                foundMatchingState = true;
                this.state = this.strArrStates[i];
                //Return 1 as a success
                return 1;
            }
        }
        //The state name given to set the state does not match an available state.
        return 0;
    }
}