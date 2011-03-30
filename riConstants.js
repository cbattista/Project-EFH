//Constants that will never change/Constants that only need to be stated once
var PLAYGROUND_HEIGHT = 565;
var PLAYGROUND_WIDTH = 450;
var REFRESH_RATE = 40; //ms between frame change callbacks 

//Stage Variables

	//Stages of the plane
	var bombDrop = PLAYGROUND_WIDTH/2;
	var initPlane = PLAYGROUND_WIDTH;
	var maxPlane = -340;

	//Various stages of the box
	var maxTop = 800;//how far the box is allowed to fall (larger value increases animation time) 
	var revealTop = 85;//When the box is in the binoc's sights
	var hideTop = 250;//when the box falls out of sight
	var cityTop = PLAYGROUND_HEIGHT - 100; //The top of the city, when the box falls below it
	var groundPos = 545;
	var initTop = 0;

//Intitalize the box array to hold the animatons
var box = new Array();

//Game variables
var level = 0;
var trials = 30;
var trial = 0;

	//Speed Variables
	var vSpeed = 5;
	var planeSpeed = 5;

	//Score Variables
	var totalScore = 0;
	var score = 0;


//State variables
var blast = 0;//1:= something was hit 0:= nothing was hit
var hitIt = 0;//1:= object is in range 0:= object is out of range
var dropIt = 0; //1:= bomb drops 0:= bomb down not drow
var moveIt = 1; //1:= move box 0:= Don't move box

var subject = new Subject(666,"response-inhib");

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

//Get browser window specs to se the position of the playground
function getPlayY(){
	var BROWSER_WIDTH = $(window).width();
	var playY = BROWSER_WIDTH/2;

	return playY;	
}

function getPlayX(){
	var BROWSER_HEIGHT = $(window).height();
	var playX = BROWSER_HEIGHT/2;

	return playX;
}

var playPosX = getPlayX();
var playPosY = getPlayY();
