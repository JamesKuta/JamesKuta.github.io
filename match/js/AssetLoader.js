//expects an object with "images" key and "audio" key
//value is path to file to be loaded.

class AssetLoader
{
    constructor(images)
    {
        this.images = images;
        this.loadedCount = 0;
        this.totalCount = 0;
        this.ready = false;
        this.Init();
    }

    Init()
    {
        for(let prop in this.images)
        {
            this.totalCount++;
        }

        for(let prop in this.images)
        {
            this.images[prop].img = new Image();
            this.ImageLoader(this.images[prop].img, this.images[prop].src);
        }
    }

    IsAllMediaLoaded()
    {
        this.loadedCount++;
        if (this.loadedCount == this.totalCount)
        {
            this.ready = true;
        }
    }

    ImageLoader(imgVar, src)
    {
        let assets = this;

        imgVar.onload = function ()
        {
            assets.IsAllMediaLoaded();
        }
        imgVar.src = src;
    }

    LoadMedia()
    {

    }

    GetLoadedCount()
    {
        return this.loadedCount;
    }

    GetTotalCount()
    {
        return this.totalCount;
    }

    GetMedia()
    {
        return this.media;
    }

    GetReadyState()
    {
        return this.ready;
    }
}