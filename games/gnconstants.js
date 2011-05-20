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
var revealTop = 85;//When the box is in the binoc's sights
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

//Difficulty Variables
var dropSpeed = 5;
var nogoes = 0.5;

//Score Variables
var totalScore = 0;
var score = 0;
var scoreMult = 2;

//Other User information
var correct = 0;
var buttonPress = 0; //How many times the user blasted the right object
var totalRT = 0;//agregate Reaction Time for a level
var averageRT = 0;//Average Reaction time for a level


//State variables
var blast = 0;//1:= something was hit 0:= nothing was hit
var hitIt = 0;//1:= object is in range 0:= object is out of range
var dropIt = 0; //1:= bomb drops 0:= bomb down not drow
var moveIt = 1; //1:= move box 0:= Don't move box
var holdYourFire = 0 //1:= Hold your fire 0:= open fire

var subject = new Subject(666,1);

//Animations for stuff
var cityAnim = new Array;

cityAnim["fine"] = new $.gameQuery.Animation({
	imageURL: "images/SatDef/city_fine.png"});
cityAnim["b"] = new $.gameQuery.Animation({
	imageURL: "images/SatDef/b_city.png"});
cityAnim["cp"] = new $.gameQuery.Animation({
	imageURl: "images/SatDef/cp_city.png"});

var binocAnim = new Array;

binocAnim["idle"] = new $.gameQuery.Animation({
	imageURL: "images/SatDef/binocular.png"});

