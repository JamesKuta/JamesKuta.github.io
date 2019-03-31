

"use strict";



var ColorPicker = function (element, callback, hexString) {

    var colorPicker = this;
    var body = document.getElementsByTagName('body')[0];
    this.Parent = element;
    this.Callback = callback;
    this.CanvasContainer = null;
    this.Canvas = null;
    this.Context = null;
    this.RGB = [255, 255, 255]; // [0-255, 0-255, 0-255]
    this.complimentRGB = [0, 0, 0];// [0-255, 0-255, 0-255]

    this.ColorPickerShowed = false;

    this.ColorTimer;

    this.ColorEventX = 0;
    this.ColorEventY = 0;

    this.ColorPickerHeight = 162;
    this.ColorPickerWidth = 372;
    this.CanvasWidth = 350;
    this.CanvasHeight = 140;

    this.CanvasTop = 0;
    this.CanvasLeft = 0;

    this.CanvasFrameSize = 12;
    


    this.onMouseDown = function (e) {
        var x = e.clientX;
        var y = e.clientY;

        var distanceFromBottom = jQuery(window).height() - y;

        if (distanceFromBottom < 170) {
            y = y - 170 + distanceFromBottom;
        }
        colorPicker.CanvasTop = y;
        colorPicker.CanvasLeft = x;

        if (!colorPicker.ColorPickerShowed) {
            colorPicker.ColorPickerShowed = true;
            colorPicker.drawColorPicker();
        }


    };


    this.onTouchStart = function (e) {
        var touchobj = e.changedTouches[0]; // reference first touch point (ie: first finger)
        var x = touchobj.clientX;
        var y = touchobj.clientY;

        var distanceFromBottom = jQuery(window).height() - y;

        if (distanceFromBottom < 170) {
            y = y - 170 + distanceFromBottom;
        }
        colorPicker.CanvasTop = y;
        colorPicker.CanvasLeft = x;

        if (!colorPicker.ColorPickerShowed) {
            colorPicker.ColorPickerShowed = true;
            colorPicker.drawColorPicker();
        }

    };

    attachEvent(colorPicker.Parent, 'mousedown', colorPicker.onMouseDown);
    attachEvent(colorPicker.Parent, 'touchstart', colorPicker.onTouchStart);

    this.drawColorPicker = function () {

        colorPicker.CanvasContainer = document.createElement('div');
        colorPicker.CanvasContainer.setAttribute('id', 'colorPickerContainer');
        colorPicker.CanvasContainer.style.cssText = 'position: absolute;' + 
                                        'top: ' + colorPicker.CanvasTop + 'px; ' +
                                        'left: ' + colorPicker.CanvasLeft + 'px; ' +
                                        'height: ' + colorPicker.ColorPickerHeight + 'px; ' +
                                        'width: ' + colorPicker.ColorPickerWidth + 'px; ' +
                                        'background-color: black; ' +
                                        'border: 1px solid white; ' +
                                        'padding: 10;' +
                                        'z-index: 1000;';

        colorPicker.Canvas = document.createElement('canvas');
        colorPicker.Canvas.setAttribute('id', 'colorPickerCanvas');
        colorPicker.Canvas.setAttribute('width', colorPicker.CanvasWidth);
        colorPicker.Canvas.setAttribute('height', colorPicker.CanvasHeight);
        colorPicker.Canvas.style.cssText = 'margin: 10px 10px; ' +
                                'border: 1px solid white;';

        colorPicker.CanvasContainer.appendChild(colorPicker.Canvas);

        body.appendChild(colorPicker.CanvasContainer);


        colorPicker.Canvas.onmousedown = function (e) {
            colorPicker.calculateCoordinatesClick(e);
            attachEvent(colorPicker.Canvas,'mousemove', colorPicker.calculateCoordinatesClick);

            // Get the color at the current mouse coordinates
            if(colorPicker.ColorTimer) {
                clearInterval(colorPicker.ColorTimer);
            }
            colorPicker.ColorTimer = setInterval(colorPicker.getColor, 50);
        };

        // On mouseup, clear the interval and unbind the mousemove event,
        // it should only happen if the button is down
        colorPicker.Canvas.onmouseup = function (e) {
            if(colorPicker.ColorTimer) {
                clearInterval(colorPicker.ColorTimer);
            }
            detachEvent(colorPicker.Canvas, 'mousemove', colorPicker.calculateCoordinatesClick);
        };


        colorPicker.Canvas.ontouchstart = function (e) {
            colorPicker.calculateCoordinatesTouch(e);
            attachEvent(colorPicker.Canvas, 'touchmove', colorPicker.calculateCoordinatesTouch);

            // Get the color at the current mouse coordinates
            if(colorPicker.ColorTimer) {
                clearInterval(colorPicker.ColorTimer);
            }
            colorPicker.ColorTimer = setInterval(colorPicker.getColor, 50);
        };

        colorPicker.Canvas.ontouchend = function (e) {
            if(colorPicker.ColorTimer) {
                clearInterval(colorPicker.ColorTimer);
            }
            detachEvent(colorPicker.Canvas, 'touchmove', colorPicker.calculateCoordinatesTouch);
        };

        attachEvent(document, 'mousedown', colorPicker.hideColorPicker);
        attachEvent(document, 'touchstart', colorPicker.hideColorPicker);
        attachEvent(document, 'mouseup', colorPicker.hideColorPicker);
        attachEvent(document, 'touchend', colorPicker.hideColorPicker);
        setTimeout(colorPicker.fillCanvas ,0);
    };


    this.hideColorPicker = function (e) {
        if(colorPicker.ColorPickerShowed) {
            if (e.target != colorPicker.CanvasContainer && e.target != colorPicker.Canvas 
            && e.target != colorPicker.Parent) {

                if(colorPicker.ColorTimer) {
                    clearInterval(colorPicker.ColorTimer);
                }

                colorPicker.ColorPickerShowed = false;
                body.removeChild(colorPicker.CanvasContainer);
                detachEvent(document, 'mousedown', colorPicker.hideColorPicker);
                detachEvent(document, 'touchstart', colorPicker.hideColorPicker);
                detachEvent(document, 'mouseup', colorPicker.hideColorPicker);
                detachEvent(document, 'touchend', colorPicker.hideColorPicker);
            }
        }
        else
        {
            if(colorPicker.ColorTimer) {
                clearInterval(colorPicker.ColorTimer);
            }
        }
    };

    

    this.fillCanvas = function () {

        colorPicker.Context = colorPicker.Canvas.getContext("2d");

        var gradient = colorPicker.Context.createLinearGradient(0,0,colorPicker.CanvasWidth,0);
        // Create color gradient
        
        //Regular spacing
        // gradient.addColorStop(0,    "rgb(255,   0,   0)");//Red
        // gradient.addColorStop(0.15, "rgb(255,   0, 255)");//Magenta
        // gradient.addColorStop(0.33, "rgb(0,     0, 255)");//Blue
        // gradient.addColorStop(0.49, "rgb(0,   255, 255)");//Cyan
        // gradient.addColorStop(0.67, "rgb(0,   255,   0)");//Green
        // gradient.addColorStop(0.84, "rgb(255, 255,   0)");//Yellow
        // gradient.addColorStop(1,    "rgb(255,   0,   0)");//Red

        //Spacing equal for all colors
        gradient.addColorStop(0,    "rgb(255,   0,   0)");//Red
        gradient.addColorStop(0.11, "rgb(255,   0, 255)");//Magenta
        gradient.addColorStop(0.19, "rgb(255,   0, 255)");//Magenta
        gradient.addColorStop(0.33, "rgb(0,     0, 255)");//Blue
        gradient.addColorStop(0.45, "rgb(0,   255, 255)");//Cyan
        gradient.addColorStop(0.53, "rgb(0,   255, 255)");//Cyan
        gradient.addColorStop(0.67, "rgb(0,   255,   0)");//Green
        gradient.addColorStop(0.8, "rgb(255, 255,   0)");//Yellow
        gradient.addColorStop(0.88, "rgb(255, 255,   0)");//Yellow
        gradient.addColorStop(1,    "rgb(255,   0,   0)");//Red


        // Apply gradient to canvas
        colorPicker.Context.fillStyle = gradient;
        colorPicker.Context.fillRect(0, 5, colorPicker.CanvasWidth, colorPicker.CanvasHeight - 5);


        // Create semi transparent gradient (white -> trans. -> black)
        gradient = colorPicker.Context.createLinearGradient(0, 5, 0, colorPicker.CanvasHeight);
        gradient.addColorStop(0,   "rgba(255, 255, 255, 1)");
        gradient.addColorStop(0.5, "rgba(255, 255, 255, 0)");
        gradient.addColorStop(0.5, "rgba(0,     0,   0, 0)");
        gradient.addColorStop(1,   "rgba(0,     0,   0, 1)");

        // Apply gradient to canvas
        colorPicker.Context.fillStyle = gradient;
        colorPicker.Context.fillRect(0, 5, colorPicker.CanvasWidth, colorPicker.CanvasHeight - 5);


        gradient = colorPicker.Context.createLinearGradient(0, 0, 0, 5);
        gradient.addColorStop(0, "rgb(255, 255, 255)");//white
        gradient.addColorStop(1, "rgb(255, 255, 255)");//white
        colorPicker.Context.fillStyle = gradient;
        colorPicker.Context.fillRect(0, 0, colorPicker.CanvasWidth, 5);
    };


    this.calculateCoordinatesClick = function (e) {
        e.preventDefault();

        colorPicker.ColorEventX = e.clientX - colorPicker.CanvasLeft - colorPicker.CanvasFrameSize;
        colorPicker.ColorEventY = e.clientY - colorPicker.CanvasTop - colorPicker.CanvasFrameSize;

        //console.log('(x,y) = (' + colorPicker.ColorEventX + ',' + colorPicker.ColorEventY + ')');

        colorPicker.validateCoordinates();
    };

    this.calculateCoordinatesTouch = function (e) {
        e.preventDefault();
        var touchobj = e.changedTouches[0]; // reference first touch point (ie: first finger)

        colorPicker.ColorEventX = touchobj.clientX - colorPicker.CanvasLeft;
        colorPicker.ColorEventY = touchobj.clientY - colorPicker.CanvasTop;

        colorPicker.validateCoordinates();
    };

    this.validateCoordinates = function () {
        if (colorPicker.ColorEventX < 1) {
            colorPicker.ColorEventX = 1;
        }
        if (colorPicker.ColorEventY < 1) {
            colorPicker.ColorEventY = 1;
        }

        if (colorPicker.ColorEventX > colorPicker.CanvasWidth - 1) {
            colorPicker.ColorEventX = colorPicker.CanvasWidth - 1;
        }
        if (colorPicker.ColorEventY > colorPicker.CanvasHeight - 1) {
            colorPicker.ColorEventY = colorPicker.CanvasHeight - 1;
        }
    };


    this.getColor = function (e) {
        if(!colorPicker.ColorPickerShowed) {
            if(colorPicker.ColorTimer) {
                clearInterval(colorPicker.ColorTimer);
            }
        }

        var imageData = colorPicker.Context.getImageData(colorPicker.ColorEventX, colorPicker.ColorEventY, 1, 1);

        colorPicker.RGB[0] = imageData.data[0];
        colorPicker.RGB[1] = imageData.data[1];
        colorPicker.RGB[2] = imageData.data[2];
        //console.log("rgb(" + imageData.data[0] + ', ' + imageData.data[1] + ', ' + imageData.data[2] + ')');

        if (colorPicker.Callback) {
            colorPicker.Callback();
        }
    };



    this.getComplimentColor = function () {
        var temp = RGB_HSV(colorPicker.RGB[0], colorPicker.RGB[1], colorPicker.RGB[2]);
        temp[0] = HueShift(temp[0], 180);
        if (temp[1] < 50)
            temp[1] = 100 - temp[1];
        if (temp[2] < 50)
            temp[2] = 100 - temp[2];
        colorPicker.complimentRGB = HSV_RGB(temp[0], temp[1], temp[2]);
        return toHexString(colorPicker.complimentRGB);
    };

    this.isComplimentColorLight = function () {
        return (
            0.213 * colorPicker.complimentRGB[0] +
            0.715 * colorPicker.complimentRGB[1] +
            0.072 * colorPicker.complimentRGB[2] >
            255 / 2
        );
    };

    this.isLight = function () {
        return (
            0.213 * colorPicker.RGB[0] +
            0.715 * colorPicker.RGB[1] +
            0.072 * colorPicker.RGB[2] >
            255 / 2
        );
    };

    this.getHexString = function () {
        return toHexString(colorPicker.RGB);
    };
     

    this.fromHexString = function (str) {
        var color = str;
        if(color.charAt(0) === '#') {
            color = color.substr(1);
        }
        colorPicker.RGB[0] = parseInt(color.substr(0,2),16);
        colorPicker.RGB[1] = parseInt(color.substr(2,2),16);
        colorPicker.RGB[2] = parseInt(color.substr(4,2),16);
    };


    colorPicker.fromHexString(hexString);
};

function attachEvent (el, evnt, func) {
    if (el.addEventListener) {
        el.addEventListener(evnt, func, false);
    } else if (el.attachEvent) {
        el.attachEvent('on' + evnt, func);
    }
    //console.log('attaching ' + el);
};


function detachEvent(el, evnt, func) {
    if (el.removeEventListener) {
        el.removeEventListener(evnt, func, false);
    } else if (el.detachEvent) {
        el.detachEvent('on' + evnt, func);
    }
    //console.log('detaching ' + el);
};


function RGB_HSV (r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    var n = Math.min(Math.min(r,g),b);
    var v = Math.max(Math.max(r,g),b);
    var m = v - n;
    if (m === 0) { return [ null, 0, 100 * v ]; }
    var h = r===n ? 3+(b-g)/m : (g===n ? 5+(r-b)/m : 1+(g-r)/m);
    return [
        60 * (h===6?0:h),
        100 * (m/v),
        100 * v
    ];
};


// h: 0-360
// s: 0-100
// v: 0-100
//
// returns: [ 0-255, 0-255, 0-255 ]
//
function HSV_RGB (h, s, v) {
    var u = 255 * (v / 100);

    if (h === null) {
        return [ u, u, u ];
    }

    h /= 60;
    s /= 100;

    var i = Math.floor(h);
    var f = i%2 ? h-i : 1-(h-i);
    var m = u * (1 - s);
    var n = u * (1 - s * f);
    switch (i) {
        case 6:
        case 0: return [u,n,m];
        case 1: return [n,u,m];
        case 2: return [m,u,n];
        case 3: return [m,n,u];
        case 4: return [n,m,u];
        case 5: return [u,m,n];
    }
};

function HueShift (h, s) {
    h += s; 
    while (h >= 360.0) { 
        h -= 360.0; 
    }
    while (h < 0.0) { 
        h += 360.0; 
    }
    return h;
};

function toHexString(rgb){
    return '#' + (
        (0x100 | Math.round(rgb[0])).toString(16).substr(1) +
        (0x100 | Math.round(rgb[1])).toString(16).substr(1) +
        (0x100 | Math.round(rgb[2])).toString(16).substr(1)
    ).toUpperCase();
};