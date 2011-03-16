// GAME SIZE AND FRAMERATE
var PLAYGROUND_WIDTH    = 640;
var PLAYGROUND_HEIGHT    = 480;
var REFRESH_RATE        = 40; //ms between frame change callbacks

//Set start positions of food
var initLeft = 30;
var initTop = 60;

//Set stage variables which goven when things should start to fall
var maxLeft = 285;//How far across the conveyor belt food will go
var maxTop = 450;// How far down the conveyor belt food will go
var maxFallPos = 450;//How far unchosen food will fall
var revealLeft = 210;	

//Set Initial Speed/Difficulty Variables
var hSpeed = 5; //Sets how fast the food moves through the pipe
var vSpeed = 0; //Sets how fast the food drops
var newHSpeed = 0;

var switchFreq = 50; //how much the sort rule switches
var aswitchFreq = 0; //how much the animals switch around
var trials = 30; //duh

//Set State variables
var canSort = 0;
var sorted = 0;

//Creature on left, creature on right
var creature1 = new Array();
var creature2 = new Array();	

//Set game Variables-which will be retrieved from the server
var	timeInc = 1;
var	level = 0;
var	trial = 0;
var	stimList = [];
var	animalList1 = [];
var	animalList2 = [];
var	cueList = [];

//names of animals in the game
var	stimFile = ["pinktri","bluetri","pinkcirc","bluecirc"];
var	animalFile = ["pt","bc"];
var	cueFile = ["colour","shape"];

//subject performance info
var	ACC = 0; //trial ACC
var RT = 0; //trial RT
var score = 0; //trial score
var	totalScore = 0; //total score

var	rule = new Array();
rule['pinktri'] =  ['pt'];
rule['bluecirc'] = ['bc'];
rule['bluetri'] = ['bc'];
rule['pinkcirc'] = ['pt'];
	
var subject = new Subject(666,"taskswitch");

var scoreMult = revealLeft / hSpeed * REFRESH_RATE;

