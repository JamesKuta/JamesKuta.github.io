class MainMenuScreen extends WindowAnySizeWideTall
{
    constructor(context, drawArea, mouse, wideLeftPercent, wideRightPercent, wideTopPercent, wideBottomPercent, tallLeftPercent, tallRightPercent, tallTopPercent, tallBottomPercent, assets)
    {
        super(context, drawArea, mouse, wideLeftPercent, wideRightPercent, wideTopPercent, wideBottomPercent, tallLeftPercent, tallRightPercent, tallTopPercent, tallBottomPercent)
        this.assets = assets;
        this.image = this.assets.images.background.img;
        this.drawImage = false;
        this.drawFilledBackground = false;
        this.drawBorder = false;

        this.states = {main:0, how:1, about:2};
        this.state = this.states.main;

        this.alphaCount = 0;
        this.alphaCountIncrease = 0.005;

        this.mainTextAndButtons = [];
        this.aboutTextAndButtons = [];
        this.infoTextAndButtons = [];

        this.btnColor = "hsla(280, 100%, 25%, 1)";

        this.playBtn = new ButtonAnySizeWideTall(this.context, this.drawArea, this.mouse, 0.40, 0.60, 0.35, 0.65, 0.30, 0.70, 0.25, 0.45);
        this.playBtn.buttonID = "play";
        this.playBtn.image = this.assets.images.playbtn.img;
        this.playBtn.drawImage = true;
        this.playBtn.drawFilledBackground = false;
        this.playBtn.drawBorder = false;
        this.playBtn.text = "";
        this.mainTextAndButtons.push(this.playBtn);

        this.infoBtn = new ButtonAnySizeWideTall(this.context, this.drawArea, this.mouse, 0.10, 0.30, 0.35, 0.65, 0.30, 0.70, 0.50, 0.70);
        this.infoBtn.buttonID = "info";
        this.infoBtn.image = this.assets.images.info.img;
        this.infoBtn.drawImage = true;
        this.infoBtn.drawFilledBackground = false;
        this.infoBtn.drawBorder = false;
        this.infoBtn.text = "";
        this.mainTextAndButtons.push(this.infoBtn);

        this.aboutBtn = new ButtonAnySizeWideTall(this.context, this.drawArea, this.mouse, 0.70, 0.90, 0.35, 0.65, 0.30, 0.70, 0.75, 0.95);
        this.aboutBtn.buttonID = "about";
        this.aboutBtn.image = this.assets.images.help.img;
        this.aboutBtn.drawImage = true;
        this.aboutBtn.drawFilledBackground = false;
        this.aboutBtn.drawBorder = false;
        this.aboutBtn.text = "";
        this.mainTextAndButtons.push(this.aboutBtn);

        this.titleText = new ButtonAnySizeWideTall(this.context, this.drawArea, this.mouse, 0.10, 0.90, 0.05, 0.25, 0.10, 0.90, 0.05, 0.15);
        this.titleText.text = "SUGAR CRUSH";
        this.titleText.drawFilledBackground = false;
        this.titleText.drawBorder = false;
        this.titleText.textColor = this.btnColor;
        this.mainTextAndButtons.push(this.titleText);
        this.aboutTextAndButtons.push(this.titleText);
        this.infoTextAndButtons.push(this.titleText);

        this.creditText = new ButtonAnySizeWideTall(this.context, this.drawArea, this.mouse, 0.10, 0.90, 0.95, 1, 0.10, 0.90, 0.98, 1);
        this.creditText.text = "Made by: JJK & JWK Studios";
        this.creditText.drawFilledBackground = false;
        this.creditText.drawBorder = false;
        this.mainTextAndButtons.push(this.creditText);
        this.aboutTextAndButtons.push(this.creditText);
        this.infoTextAndButtons.push(this.creditText);

        this.backBtn = new ButtonAnySizeWideTall(this.context, this.drawArea, this.mouse, 0.02, 0.12, 0.78, 0.98, 0.02, 0.22, 0.89, 0.99);
        this.backBtn.buttonID = "back";
        this.backBtn.image = this.assets.images.exit.img;
        this.backBtn.drawImage = true;
        this.backBtn.drawFilledBackground = false;
        this.backBtn.drawBorder = false;
        this.backBtn.text = "";
        this.aboutTextAndButtons.push(this.backBtn);
        this.infoTextAndButtons.push(this.backBtn);

        this.backgroundMovementSpeed = 0.1;

        this.bgImage1 = this.image;
        this.bgImage2 = this.image;

        this.playSelected = false;

        this.count = 0;

    }

    Update(dt)
    {
        super.Update();

        switch (this.state)
        {
            case this.states.main:
            {
                for(let i = 0; i < this.mainTextAndButtons.length; i++)
                {
                    this.mainTextAndButtons[i].Update();
                    this.CheckForClick(this.mainTextAndButtons[i]);
                }
                break;
            }

            case this.states.about:
            {
                for(let i = 0; i < this.aboutTextAndButtons.length; i++)
                {
                    this.aboutTextAndButtons[i].Update();
                    this.CheckForClick(this.aboutTextAndButtons[i]);
                }
                break;
            }

            case this.states.how:
            {
                for(let i = 0; i < this.aboutTextAndButtons.length; i++)
                {
                    this.infoTextAndButtons[i].Update();
                    this.CheckForClick(this.infoTextAndButtons[i]);
                }
                break;
            }
        }
    }

    Draw()
    {
        super.Draw();
        
        if (this.alphaCount < 1)
        {
            this.context.globalAlpha = this.alphaCount;
            this.alphaCount += this.alphaCountIncrease;
        }

        switch (this.state)
        {
            case this.states.main:
            {
                this.DrawBackground(this.bgImage1);
                for(let i = 0; i < this.mainTextAndButtons.length; i++)
                {
                    this.mainTextAndButtons[i].Draw();
                }
                break;
            }

            case this.states.about:
            {
                this.DrawBackground(this.bgImage1);
                for(let i = 0; i < this.aboutTextAndButtons.length; i++)
                {
                    this.aboutTextAndButtons[i].Draw();
                }
                break;
            }

            case this.states.how:
            {
                this.DrawBackground(this.bgImage1);
                for(let i = 0; i < this.aboutTextAndButtons.length; i++)
                {
                    this.infoTextAndButtons[i].Draw();
                }
                break;
            }
        }
    }

    CheckForClick(button)
    {
        if(button.hover && button.wasClicked)
        {
            switch (button.buttonID)
            {
                case "info":
                    {
                        this.state = this.states.how;
                        this.SetAlpha();
                        break;
                    }
                case "about":
                    {
                        this.state = this.states.about;
                        this.SetAlpha();
                        break;
                    }
                case "back":
                    {
                        this.state = this.states.main;
                        this.SetAlpha();
                        break;
                    }
                case "play":
                    {
                        this.playSelected = true;
                        this.SetAlpha();
                        break;
                    }
            }
            button.wasClicked = false;
        }
    }

    DrawBackground(bgImg)
    {
        this.context.drawImage(bgImg, this.windowPosition.left, this.windowPosition.top, this.windowPosition.width, this.windowPosition.height);
    }

    SetAlpha()
    {
        this.alphaCount = 0;
        this.alphaCountIncrease = 0.03;
    }
}