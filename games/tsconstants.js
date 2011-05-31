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
var span = maxLeft - revealLeft; //the range of screen the user makes their response in

//Set Initial Speed/Difficulty Variables
function Difficulty() {
	this.trials = 30; //how many trials
	this.hSpeed = 5; //Sets how fast the food moves through the pipe
	this.vSpeed = 0; //Sets how fast the food drops
	this.newHSpeed = 0;
	this.switchFreq = 50; //how much the sort rule switches
	this.aswitchFreq = 0; //how much the animals switch around
}

// create the object which contains the difficulty parameters
var difficulty = new Difficulty();


//Set State variables
var canSort = 0;
var sorted = 0;
var sortedAt = 0;

//Creature on left, creature on right
var creature1 = new Array();
var creature2 = new Array();	

//Set game Variables-which will be retrieved from the server
var	timeInc = 1;
var	level = 0;
var	trial = 0;
var levels = 5;
var day = 0;
var	stimList = [];
var	animalList1 = [];
var	animalList2 = [];
var	cueList = [];

//names of animals in the game
var	stimFile = ["pinktri","bluetri","pinkcirc","bluecirc"];
var	animalFile = ["pt","bc"];
var	cueFile = ["C","S"];
var cue = cueFile[0];
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

//dummy subject	
var sid = 666;
var subject = new Subject(sid, 2);

//how to calculate the score
var scoreMult = revealLeft / difficulty.hSpeed * REFRESH_RATE;

