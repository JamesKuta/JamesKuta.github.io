function Images ()
{
    this.images = [];
}

Images.prototype.assignTile = function(image, imgPosX, imgPosY, imageW, imageH)
{
    let tileType = 
    {
        tile: image,
        x: imgPosX,
        y: imgPosY,
        width: imageW,
        height: imageH
    };

    this.images.push(tileType);
};