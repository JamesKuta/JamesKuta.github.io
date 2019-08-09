function SpriteSheet(image, width, height )
{
    this.image = image;
    this.width = width;
    this.height = height;
    this.tiles = new Map();
}

SpriteSheet.prototype.define = function(name, x, y)
{
    let buffer = document.createElement('canvas');
    buffer.width = this.width;
    buffer.height = this.height;
    buffer
        .getContext('2d')
        .drawImage(
            this.image,
            x * this.width,
            y * this.height,
            this.width,
            this.height,
            0,
            0,
            this.width,
            this.height);
    this.tiles.set(name, buffer);
}

SpriteSheet.prototype.draw = function(name, context, x, y)
{
    let buffer = this.tiles.get(name);
    context.drawImage(buffer, x, y);
}
