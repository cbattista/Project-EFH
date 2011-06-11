//Constants that will never change/Constants that only need to be stated once
var PLAYGROUND_HEIGHT = 640;
var PLAYGROUND_WIDTH = 480;
var REFRESH_RATE = 40; //ms between frame change callbacks 

var BINOC_WIDTH = 371;
var BINOC_HEIGHT = 212;
var BINOC_POS = 100;

var CITY_HEIGHT = 250;

var BOX_WIDTH = 32;
var BOX_HEIGHT = 32;

//Stage Variables

//Stages of the plane
var bombDrop = PLAYGROUND_WIDTH/2;

//Various stages of the box
var maxTop = 800;//how far the box is allowed to fall (larger value increases animation time) 
var revealTop = 130;//When the box is in the binoc's sights
var hideTop = 250;//when the box falls out of sight
var cityTop = PLAYGROUND_HEIGHT - 110; //The top of the city, when the box falls below it
var groundPos = PLAYGROUND_HEIGHT;
var initTop = 0;

//Intitalize the box array to hold the animatons
var box = new Array();

//Game variables
var level = 0;
var trials = 30;
var trial = 0;

//State Variables
var	boxPos = 0; //the position of the package, initial pos is the top of the screen
var	canHit = 0; //1:= Package is in explosion range; 0:= Package is outside explosion range
var	exploded = 0; //1:= The Package has been hit 0:= The package has not been hit 
var	dropIt = 1; //1:= The box drops 0:= The box stops
var	fired = 0; //1:= The user has fired his weapon 0:= The user has not yet fired his weapon
var 	burnout = 40; //Length of the box-explosion animation. Larger value increases this time
var	keyPress = 0; // 1:= user pressed the right key 0:= User pressed the wrong key or pressed the right key at the wrong time
var 	start = 0; //1:= The game has started 0:= The game has not started

//Create Difficulty class with appropriate difficulty fields
function Difficulty() {
	this.trials = 30; //how many trials
	this.dropSpeed = 5; //how fast the package drops
	this.nogoes = 0.5; //ratio of nogo trials
}

var difficulty = new Difficulty();

//Score Variables
var totalScore = 0;
var score = 0;
var scoreMult = 2;

//Other User information
var correct = 0; //How many correct responses the user gave
var buttonPress = 0; //How many times the user blasted the right object
var totalRT = 0;//agregate Reaction Time for a level
var averageRT = 0;//Average Reaction time for a level

//Create subject object
var subject = new Subject(666,1);

//Animations for objects
var cityAnim = new Array;

cityAnim["fine"] = new $.gameQuery.Animation({
	imageURL: "images/SatDef/city_fine.png"});
cityAnim["b"] = new $.gameQuery.Animation({
	imageURL: "images/SatDef/city_exploded.png", numberOfFrame: 4, delta: 480, rate: 120, type: $.gameQuery.ANIMATION_HORIZONTAL});
cityAnim["cp"] = new $.gameQuery.Animation({
	imageURL: "images/SatDef/city_healed.png", numberOfFrame: 4, delta: 480, rate: 360, type: $.gameQuery.ANIMATION_HORIZONTAL});

var binocAnim = new Array;

binocAnim["idle"] = new $.gameQuery.Animation({
	imageURL: "images/SatDef/binocular.png"});

