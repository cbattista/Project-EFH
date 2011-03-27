//Constants that will never change/Constants that only need to be stated once
var PLAYGROUND_HEIGHT = 565;
var PLAYGROUND_WIDTH = 450;
var REFRESH_RATE = 40; //ms between frame change callbacks

//Set stage variables which goven when things should start to fall
var maxTop = 565;//how far the box is allowed to fall 
var revealTop = 100;//When the box is in the binoc's sights
var hideTop = 200;//when the box falls out of sight
var groundPos = 565;
//Initial pos of box
var initTop = 0;

//Game variables
var level = 0;
var trials = 30;
var trial = 0;
var vSpeed = 5;

