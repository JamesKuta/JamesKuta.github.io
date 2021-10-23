/**
 * Creates an instance of a loading screen
 */
class MLoadingScreen
{
    /**
     * @param screen takes a screen object.
     */
    constructor(screen)
    {
        this.screen = screen;
        this.backgroundImage = new MImageAndAudioAssetLoader("/json/game-Loading-Screen.json", true);
        this.percentageLoaded = 0;
        this.count = 0;
        this.bDoneLoading = false;
    }

    Update(percentageLoaded)
    {
        this.percentageLoaded = percentageLoaded;
        if(percentageLoaded == 1)
        {
            this.bDoneLoading = true;
        }
    }

    Draw()
    {
        if(this.backgroundImage.bReady)
        {
            this.screen.context.drawImage
            (
                this.backgroundImage.images.background.img, 
                this.screen.rect.left, 
                this.screen.rect.top, 
                this.screen.rect.width, 
                this.screen.rect.height
            );
            
            this.screen.context.fillStyle = "hsla(0,100%,100%,0.6)";
            
            this.screen.context.fillRect
            (
                this.screen.rect.left, 
                this.screen.rect.bottom - this.screen.rect.height * 0.10, 
                this.screen.width * this.percentageLoaded, 
                this.screen.height * 0.10
            );

            this.DrawText();
        }
    }

    DrawText()
    {
        let fontSize = (this.screen.rect.width > this.screen.rect.height) ? this.screen.rect.height * 0.70 : this.screen.rect.height * 0.30;
        let text = "Loading..."
        this.screen.context.font = `${fontSize}px Emilys Candy, cursive`;
        this.screen.context.fillStyle = this.textColor;
        this.screen.context.textAlign = "center";
        this.screen.context.textBaseline = "middle";
        this.screen.context.fillStyle = "hsla(0,100%,100%,0.9)";
        this.screen.context.fillText(text, this.screen.rect.right - (this.screen.rect.width / 2), this.screen.rect.bottom - (this.screen.rect.height / 2), this.screen.rect.width - 5);
    }
}