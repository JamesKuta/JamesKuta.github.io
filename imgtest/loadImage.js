function loadImage(url, callback)
{
    let image = new Image();
    image.src = url;
    image.onload = function()
    {
        callback(image);    
    }; 
}