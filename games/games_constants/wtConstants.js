var PLAYGROUND_HEIGHT = 450;
var PLAYGROUND_WIDTH = 500;
var REFRESH_RATE = 40;


//Game Variables
var trial = 0;
var level = 0;
var timerStart = 800000; //How long user has to listen to a sound
var timer = timerStart; //the countdown
var cueLength = 4; //How many different sounds there are'
var subject = new Subject(888,'wt');

	//Audio files
	var sound1 = 'audio/sound1.ogg';
	var sound2 = 'audio/sound2.ogg';
	var sound3 = 'audio/sound3.ogg';
	var sound4 = 'audio/sound4.ogg';


	//Score Variables
	var feedBack = 0; //1:=user got it right 0:= user got it wrong "":= no input 

	//State Variables
	var listen = 0; //1:= user has started listening(pressed the button 0:= button has not been pressed

	//Audio variables
	var soundNumbers = new Array();
	soundNumbers['sound1'] = ['72','33','95'];
	soundNumbers['sound2'] = ['5','14','11'];
	soundNumbers['sound3'] = ['1','8','4'];
	soundNumbers['sound4'] = ['84','25','18'];

