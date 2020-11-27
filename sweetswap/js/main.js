/*
Idea for name: Sweet Swap

Thrice Match Game (Sweet Swap)
Author: James Kuta
November 2020

Free to use Graphics Assets provided by:
Author: Lumimae (http://thecandyjam.com)
Source: https://opengameart.org/content/candy-pack-1
*/

window.onload = function ()
{
    //Grab the Canvas Element from HTML
    let canvas = document.getElementById("canvas");

    //Create the Game Object
    let SweetSwap = new Game(canvas);

    //Loading Images
    SweetSwap.loadImages();
    
    //Loading Audio
    //SweetSwap.loadAudio();

    //Start the Game
    SweetSwap.Start();
}
