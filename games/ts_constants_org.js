//Metagame Data
	var 	PLAYGROUND_WIDTH    	= 640;
	var 	PLAYGROUND_HEIGHT    	= 480;
	var 	REFRESH_RATE        	= 40; 

//Dimension Variables
	var	POINTS_WIDTH		= 200;	
	var	POINTS_HEIGHT		= 200;
	var	POINTS_OFFSET		= 50;

	var	CREATURE1_POSX		= 40;
	var	CREATURE1_POSY		= 220;

	var	CREATURE2_POSX		= 400;
	var	CREATURE2_POSY		= 220;


	//Dimensions of the Converyor Belt
	var 	maxLeft = 285;	//Length
	var 	maxTop = 450;	//Width

	var 	revealLeft = 210;//Length of the pipe	
	
	//Distance from belt to ground
	var 	maxFallPos = 450;//How far unchosen food will fall

	//The size of the area where the use responds
	var 	span = maxLeft - revealLeft; 
                                            
//Positioning Variables
	var 	initLeft = 30;	//The foods initial position
	var 	initTop = 60;

//Game Variables 

	var 	levels = 5;
	var	level = 0;
	var	trial = 0;
	var 	maxHealth = 3;
	var	timeInc = 1;
	var 	day = 0;

//State Variables

	//Animation States
	var	cueFile = ["C","S"];
	var 	cue = cueFile[0];

	//Game states
	var 	pauseGame = 0; 	//1 := The game is paused
				//0 := The game is not paused

	var 	canSort = 0;	//1 := User can use paddle 
				//0 := User cannot use paddle

	var 	sorted = 0; 	//1 := The user has sorted the food 
				//0 := The user has not sorted the food
	
//Score Variables

	var 	sortedAt = 0;	//Where the user make his decision
	var 	scoreMult = revealLeft / difficulty.hSpeed * REFRESH_RATE;
	var	ACC = 0; 	//trial ACC
	var 	RT = 0; 	//trial RT
	var 	score = 0; 	//trial score
	var	totalScore = 0; //total score
	
//Difficulty Variables

	var 	foodHSpeed = 0;
	var	foodVSpeed = 0;
	var	pipeSpeed  = 5;

	function Difficulty() {
		
		this.trials = 30; 	//how many trials
		this.hSpeed = 5; 	//Speed of food through pipe
		this.vSpeed = 0; 	//Sets how fast the food drops
		this.newHSpeed = 0;
		this.switchFreq = 50	//how much the sort rule switches
		this.aswitchFreq = 0; 	//Switch rate of animals
	}

//Container Variables

	var	stimList = [];
	var	animalList1 = [];
	var	animalList2 = [];
	var	cueList = [];
	var	creature1 = new Array();
	var 	creature2 = new Array();	
	var	stimFile = ["pinktri","bluetri","pinkcirc","bluecirc"];
	var	animalFile = ["pt","bc"];

	var	rule = new Array();
		rule['pinktri'] =  ['pt'];
		rule['bluecirc'] = ['bc'];
		rule['bluetri'] =  ['bc'];
		rule['pinkcirc'] = ['pt'];

//Object Variables

	//Dummy subject	
	var 	sid = 666;
	var 	subject = new Subject(sid, 2);
	
	// create the object which contains the difficulty parameters
	var 	difficulty = new Difficulty();




