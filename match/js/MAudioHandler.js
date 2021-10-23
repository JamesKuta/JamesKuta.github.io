//Takes a JSON file with {"name":{"snd:" null, "src": "/path"}};
/**
*Is a Maudio
 */
class MAudioHandler
{
    constructor()
    {
        this.context = new window.AudioContext();
        this.sounds = null;
    }

    LoadFromJson(JSONData)
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
}