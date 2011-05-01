var PLAYGROUND_HEIGHT = 500;
var PLAYGROUND_WIDTH = 500;
var REFRESH_RATE = 40;


//Game Variables
var trial = 0;
var level = 0;
var timerStart = 20; //How long user has to listen to a sound
var timer = timerStart; //the countdown
var cueLength = 4; //How many different sounds there are

	//Audio files
	var sound1 = 'audio/sound1.ogg';
	var sound2 = 'audio/sound2.ogg';
	var sound3 = 'audio/sound3.ogg';
	var sound4 = 'audio/sound4.ogg';

	//Audio variables
	var audioCue = [0,4,2,3,1];
	var audioList = [sound1,sound2,sound3,sound4];

	//Score Variables
	var feedback = 0; //1:=user got it right 0:= user got it wrong

var soundNumbers = new Array();
soundNumbers['sound1'] = ['1','44','33'];
soundNumbers['sound2'] = ['22','31','99'];
soundNumbers['sound3'] = ['2','9','21'];
soundNumbers['sound4'] = ['5','25','64'];

