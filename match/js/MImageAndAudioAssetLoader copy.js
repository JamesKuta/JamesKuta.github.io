//expects an object or JSON with "image" key and "audio" key
//value is path to file to be loaded.
//SAMPLE OF EXPECTED DATA FORMAT:
// {images:{background: {img: null, src: "./img/backgrounds/sky.png"}}}
// {audio:{menuMusic: {snd: null, src: "./audio/menu/music.mp3"}}}

class MImageAndAudioAssetLoader
{
    constructor(data, bJSONFile = false)
    {
        this.bJSONLoaded = false;
        this.allAssets = undefined;
        if(bJSONFile)
        {
            //handle parsing of the JSON to create object for loading.
            this.FetchJSONData(data);
        } else
        {
            this.allAssets = data;
            this.ParseData();
        }
        this.loadedCount = 0;
        this.totalCountToLoad = 0;

        this.images = undefined;
        this.sounds = undefined;
        this.bReady = false;
    }

    FetchJSONData(data)
    {
        let requestURL = data;
        let request = new XMLHttpRequest();
        request.open("GET", requestURL);

        let self = this;

        request.onload = function ()
        {
            self.allAssets = request.response;
            self.ParseData();
            self.bJSONLoaded = true;
        };

        request.responseType = "json";

        request.onerror = function() 
        {
    		console.error('JSON Data Did Not Load.');
  		};

        request.send();
    }

    ParseData()
    {
        this.images = this.allAssets.images;
        this.sounds = this.allAssets.audio;

        for(let prop in this.images)
        {
            this.totalCountToLoad++;
        }

        for(let prop in this.sounds)
        {
            this.totalCountToLoad++;
        }

        for(let prop in this.images)
        {
            this.images[prop].img = new Image();
            this.ImageLoader(this.images[prop].img, this.images[prop].src);
        }

        for(let prop in this.sounds)
        {
            let self = this;
            
            this.sounds[prop].aud = new Audio(this.sounds[prop].src);

            this.sounds[prop].aud.oncanplaythrough = function()
            {
                self.IsAllMediaLoaded();
            }
        }
    }

    IsAllMediaLoaded()
    {
        this.loadedCount++;
        if (this.loadedCount == this.totalCountToLoad)
        {
            this.bReady = true;
        }
    }

    ImageLoader(imgVar, src)
    {
        let self = this;

        imgVar.onload = function ()
        {
            self.IsAllMediaLoaded();
        };
        imgVar.src = src;
    }

    GetLoadedCount()
    {
        return this.loadedCount;
    }

    GetTotalCount()
    {
        return this.totalCountToLoad;
    }

    GetReadyState()
    {
        return this.bReady;
    }
}