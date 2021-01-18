class ImageLoader
{
    constructor()
    {
        let loader = this;
        loader.bDoneLoading = false;
        loader.imageCount = 0;

        loader.imagesForCells = [];
        loader.imagesForExplosions = [];

        loader.menuUI = new Image();
        loader.backgroundImg = new Image();
        loader.backgroundImg2 = new Image();
        loader.blueSwirl = new Image();
        loader.redBean = new Image();
        loader.yellowDrop = new Image();
        loader.greenWrapper = new Image();
        loader.purpleFlower = new Image();
        loader.cookie = new Image();

        loader.explosionBlue1 = new Image();
        loader.explosionBlue2 = new Image();
        loader.explosionBlue3 = new Image();
        loader.explosionBlue4 = new Image();
        loader.explosionBlue5 = new Image();

        loader.explosionGreen1 = new Image();
        loader.explosionGreen2 = new Image();
        loader.explosionGreen3 = new Image();
        loader.explosionGreen4 = new Image();
        loader.explosionGreen5 = new Image();

        loader.explosionPink1 = new Image();
        loader.explosionPink2 = new Image();
        loader.explosionPink3 = new Image();
        loader.explosionPink4 = new Image();
        loader.explosionPink5 = new Image();

        loader.LoadImages();
    }

    LoadImages()
    {
        let loader = this;

        let imageList =
            [
                { imgName: loader.menuUI, source: "img/menu/score_menu.png" },
                { imgName: loader.backgroundImg, source: "img/background/clouds.png" },
                { imgName: loader.backgroundImg2, source: "img/background/clouds-mirror.png" },
                { imgName: loader.blueSwirl, source: "img/assets/size3/swirl_blue.png" },
                { imgName: loader.redBean, source: "img/assets/size3/bean_red.png" },
                { imgName: loader.yellowDrop, source: "img/assets/size3/jelly_yellow.png" },
                { imgName: loader.greenWrapper, source: "img/assets/size3/wrappedsolid_green.png" },
                { imgName: loader.purpleFlower, source: "img/assets/size3/lollipop_purple.png" },
                { imgName: loader.cookie, source: "img/assets/size3/mm_brown.png" },

                { imgName: loader.explosionBlue1, source: "img/assets/size3/explosionblue01.png" },
                { imgName: loader.explosionBlue2, source: "img/assets/size3/explosionblue02.png" },
                { imgName: loader.explosionBlue3, source: "img/assets/size3/explosionblue03.png" },
                { imgName: loader.explosionBlue4, source: "img/assets/size3/explosionblue04.png" },
                { imgName: loader.explosionBlue5, source: "img/assets/size3/explosionblue05.png" },

                { imgName: loader.explosionGreen1, source: "img/assets/size3/explosiongreen01.png" },
                { imgName: loader.explosionGreen2, source: "img/assets/size3/explosiongreen02.png" },
                { imgName: loader.explosionGreen3, source: "img/assets/size3/explosiongreen03.png" },
                { imgName: loader.explosionGreen4, source: "img/assets/size3/explosiongreen04.png" },
                { imgName: loader.explosionGreen5, source: "img/assets/size3/explosiongreen05.png" },

                { imgName: loader.explosionPink1, source: "img/assets/size3/explosionpink01.png" },
                { imgName: loader.explosionPink2, source: "img/assets/size3/explosionpink02.png" },
                { imgName: loader.explosionPink3, source: "img/assets/size3/explosionpink03.png" },
                { imgName: loader.explosionPink4, source: "img/assets/size3/explosionpink04.png" },
                { imgName: loader.explosionPink5, source: "img/assets/size3/explosionpink05.png" }
            ];

        loader.imageCount = imageList.length;
        //console.log(imageList.length);

        for (var i = 0; i < imageList.length; i++) 
        {
            loader.beginLoadingImage(imageList[i].imgName, imageList[i].source);
        }
    }

    beginLoadingImage(imgName, source)
    {
        let loader = this;
        imgName.onload = loader.changeGameStateWhenImagesAreLoaded.bind(loader);
        imgName.src = source;
    }

    changeGameStateWhenImagesAreLoaded()
    {
        let loader = this;
        loader.imageCount--;
        if (loader.imageCount == 0) 
        {
            loader.AssignLoadedImages();
            loader.bDoneLoading = true;
        }
    }

    AssignLoadedImages()
    {
        let loader = this;
        loader.imagesForCells = 
        [
            loader.blueSwirl, 
            loader.redBean,
            loader.greenWrapper, 
            loader.yellowDrop,
            loader.purpleFlower,
        ];

        loader.imagesForExplosions =
        [
            [loader.explosionBlue1, loader.explosionBlue2, loader.explosionBlue3, loader.explosionBlue4, loader.explosionBlue5],
            [loader.explosionPink1, loader.explosionPink2, loader.explosionPink3, loader.explosionPink4, loader.explosionPink5],
            [loader.explosionGreen1, loader.explosionGreen2, loader.explosionGreen3, loader.explosionGreen4, loader.explosionGreen5],
            [loader.explosionBlue1, loader.explosionBlue2, loader.explosionBlue3, loader.explosionBlue4, loader.explosionBlue5],
            [loader.explosionBlue1, loader.explosionBlue2, loader.explosionBlue3, loader.explosionBlue4, loader.explosionBlue5]
        ]

        loader.imagesForBackground = [loader.backgroundImg, loader.backgroundImg2];
        
    }
}