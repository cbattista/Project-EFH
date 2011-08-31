//Constants that will never change/Constants that only need to be stated once
var PLAYGROUND_HEIGHT = 640;
var PLAYGROUND_WIDTH = 480;
var FPS = 24;
var REFRESH_RATE = 1000 / FPS; //ms between frame change callbacks 

var BINOC_WIDTH = 371;
var BINOC_HEIGHT = 212;
var BINOC_POS = 100;

var CITY_HEIGHT = 250;

var BOX_WIDTH = 32;
var BOX_HEIGHT = 32;

var POINTS_WIDTH = 200;
var POINTS_HEIGHT = 200;
var POINTS_OFFSET = 40;

//Various stages of the box
var maxTop = 800;//how far the box is allowed to fall (larger value increases animation time) 
var revealTop = 130;//When the box is in the binoc's sights
var hideTop = 250;//when the box falls out of sight
var groundPos = PLAYGROUND_HEIGHT;
var initTop = 0;
var pointDir = 1; //which direction the points will float

//Intitalize the box array to hold the animatons
var box = new Array();

//Game variables
var level = 0;
var trials = 30;
var trial = 0;
var trialDur = 60;

//State Variables
var	boxPos = 0; //the position of the package, initial pos is the top of the screen
var pointsPos = boxPos - POINTS_OFFSET;
var	canHit = 0; //1:= Package is in explosion range; 0:= Package is outside explosion range
var	exploded = 0; //1:= The Package has been hit 0:= The package has not been hit 
var	dropIt = 1; //1:= The box drops 0:= The box stops
var	fired = 0; //1:= The user has fired his weapon 0:= The user has not yet fired his weapon
var burnout = 40; //Length of the box-explosion animation. Larger value increases this time
var impact = 0; //1:= the package has hit the ground 0:= the package has not hit the ground

//Create Difficulty class with appropriate difficulty fields
function Difficulty() {
	this.trialDur = 48; //how many frames a trial should last for
	this.trials = 30; //how many trials
	this.dropSpeed = PLAYGROUND_HEIGHT / trialDur; //how fast the package drops
	this.nogoes = 0.5; //ratio of nogo trials
	this.impactDelay = 24;
	this.binocSpeed = this.dropSpeed / 2; //how fast the package drops through the binoculars
	this.pointSpeed = this.binocSpeed / 2;
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
//var subject = new Subject(666,1);

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

