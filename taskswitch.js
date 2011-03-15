// Global constants:
var PLAYGROUND_WIDTH    = 640;
var PLAYGROUND_HEIGHT    = 480;
var REFRESH_RATE        = 40; //ms between frame change callbacks

//Set start positions of food
var initLeft = 30;
var initTop = 60;

//Set stage variables which goven when things should start to fall
maxLeft = 285;//How far across the conveyor belt food will go
maxTop = 450;// How far down the conveyor belt food will go
maxFallPos = 450;//How far unchosen food will fall
revealLeft = 210;	

//Set Initial Speed/Difficulty Variables
var hSpeed = 5; //Sets how fast the food moves through the pipe
var vSpeed = 0; //Sets how fast the food drops
var newHSpeed = 0;

var switchFreq = 50;
var trials = 30;

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
var	correct = 0;//Resets correct trial timer to 0 for next level
var RT = 0;
var	totalScore = 0;//Resets reaction time tracker
var totalRT = 0;
var totalACC = 0;

var	rule = new Array();
rule['pinktri'] =  ['pt'];
rule['bluecirc'] = ['bc'];
rule['bluetri'] = ['bc'];
rule['pinkcirc'] = ['pt'];
	
var subject = new Subject(666,"taskswitch");

var scoreMult = revealLeft / hSpeed * REFRESH_RATE;


function nextLevel() {
	
	//Set difficulty for next level using scores from completed level
	setDifficulty(totalScore);

	//Set counter to default state
	ACC = 0;//Set accuracy counter back to 0 for next level
	RT = 0;
	totalRT = 0;//Set reaction time counter back to 0 for next level
	totalACC = 0;
	trial = 0;
	level += 1;
	
	//setting of game variables - eventually should be retrieved from the database
	stimList =    [0, 1, 3, 4] * (trials/4);
	animalList1 = [1] * trials;
	animalList2 = [0] * trials;
	switches = switchFreq / 100 * trials;
	
	//start things off
	stim = stimList[trial];
	food=stimFile[stim];
	animal1 = animalList1[trial];
	animal2 = animalList2[trial];
	creature1 = animalFile[animal1];
	creature2 = animalFile[animal2];
	
	//subject.inputLevelData(level, score, currentTime.getTime());
	subject.sendLevelData();
}
function nextTrial(vertPos,horPos) {
	//reset paddle
	$("#paddle").rotate(0);

	//Set Speed variables
	hSpeed = 5;
	vSpeed = 0;
	sorted = 0;
	canSort = 0;

	//subject performance
	correct = 0;
	totalRT = 0;

	//Increment trial number each time this function is called
	trial = trial + 1;
	
	stim = stimList[trial];
	food = stimFile[stim];
	
	creature1 = makeCreature(animalFile[animalList1[trial]]);
    creature2 = makeCreature(animalFile[animalList2[trial]]);
	
	c1 = animalFile[animalList1[trial]];
	c2 = animalFile[animalList2[trial]];

	$("#creature1").setAnimation(creature1["idle"]);
	$("#creature2").setAnimation(creature2["idle"]);

	$("#food").setAnimation(new $.gameQuery.Animation({imageURL: "images/Animal_Feeder/pipebulge.png"}));

	$("#food").css("left", initLeft);
	$("#food").css("top", initTop);

	if (trial < stimList.length) { //Trial lasts until we run out of fruit 
		//Send to the server which object was sent to the user to be 'delt' with (steak or banana)
		stim = stimList[trial];
		subject.inputData(trial, "stim", stim);
		subject.inputData(trial, "stimFile", stimFile[stim]);
	}
	else {
		//alert('Level Complete');
		subject.sendData();
		nextLevel(stimFile, stimList);
	}
	//Set objects to default state
	
	
	setCue();
	key = 222; //default key value, used throughout program
	decisionTimer = decisionTimerLength;//How long user has to make a decision
	choice = 222; //decision variaible for to stop key press abuse
}


function setDifficulty(score){
	game = "taskswitch";

	$.get("getDifficulty.php?score=" + score + "&game='taskswitch'", function(data) { 
		diffs = data.split(',');
		trials = diffs[0]
		hSpeed = diffs[1];
		switchFreq = diffs[2];
	});
	
	scoreMult = revealLeft / hSpeed * REFRESH_RATE;

}

//This function will set the cue
function setCue(){

	var cue = cueList[trial];
	var cueNext = cueFile[cue];
	$("#cue").html("<img src = \"images/Animal_Feeder/" +cueNext+".png\" />");
}
	
function makeCreature(id){
	creature = new Array;
    creature["idle"] = new $.gameQuery.Animation({
        imageURL: "images/Animal_Feeder/" + id+ "_idle.png",
		numberOfFrame: 4,
		delta: 200,
		rate: 1500,
		type: $.gameQuery.ANIMATION_HORIZONTAL});
    creature["angry"] = new $.gameQuery.Animation({
        imageURL: "images/Animal_Feeder/" + id+ "_angry.png",
		numberOfFrame: 4,
		delta: 200,
		rate: 120,
		type: $.gameQuery.ANIMATION_HORIZONTAL});
    creature["happy"] = new $.gameQuery.Animation({
        imageURL: "images/Animal_Feeder/" + id+ "_happy.png",
		numberOfFrame: 4,
		delta: 200,
		rate: 400,
		type: $.gameQuery.ANIMATION_HORIZONTAL});
	return creature;
}


// --------------------------------------------------------------------
// --                      the main declaration:                     --
// --------------------------------------------------------------------
$(function(){

	//Start things off
	stim = stimList[trial];
	food = stimFile[stim];
	setCue();

	creature1 = makeCreature(animalFile[animalList1[trial]]);
    creature2 = makeCreature(animalFile[animalList2[trial]]);

	c1 = animalFile[animalList1[trial]];
	c2 = animalFile[animalList2[trial]];

    // Initialize the game:
    $("#playground").playground({height: PLAYGROUND_HEIGHT,
                                 width: PLAYGROUND_WIDTH,
                                 keyTracker: true});
    
    // Initialize the background
    $.playground().addGroup("background", {height: PLAYGROUND_HEIGHT, width: PLAYGROUND_WIDTH})

		.addSprite("background", {animation : new $.gameQuery.Animation({imageURL: "images/Animal_Feeder/background.png"})}).end()
			
	.addGroup("items", {height: PLAYGROUND_HEIGHT, width: PLAYGROUND_WIDTH})

		.addSprite("pipe", {animation : new $.gameQuery.Animation({imageURL: "images/Animal_Feeder/pipe.png"}), 
			posx:0, 
			posy: 40,
			width: 256,
			height: 134})

		.addSprite("paddle", {animation : new $.gameQuery.Animation({imageURL: "images/Animal_Feeder/paddle.png"}), 
			posx: 320, 
			posy: 60,
			width: 19, 
			height: 72}).end()

	.addGroup("actors", {width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT})

		.addSprite("creature1",{animation: creature1["idle"],
			 posx: 40,
		     posy: 220,
		     width: 200,
		     height: 250})

		.addSprite("creature2",{animation: creature2["idle"],
			 posx: 400,		     
			 posy: 220,
		     width: 200,
		     height: 250}).end()

	.addGroup("item", {width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT})
		.addSprite("food", {animation : new $.gameQuery.Animation({imageURL: "images/Animal_Feeder/pipebulge.png"}),
			posx:initLeft,
			posy:initTop,
			width: 62,
			height: 53});

	
    // this sets the id of the loading bar:
    $().setLoadBar("loadingBar", 400);
    
    //initialize the start button
    $("#startbutton").click(function(){
        $.playground().startGame(function(){
            $("#welcomeScreen").fadeTo(1000,0,function(){$(this).remove();});
        });
    });
		
	//--------------------------------PASSAGE OF TIME----------------------------------------------------------------------
	//
	$.playground().registerCallback(function(){
		
	var newLeft = parseInt($("#food").css("left")) + hSpeed;	
	var newTop = parseInt($("#food").css("top")) + vSpeed;
	//Phase 1: Move obj down the conveyor belt, angle is determined by the difference of vertical and horizontal speed(slope)
	$("#food").css("left", newLeft);
	$("#food").css("top", newTop);	

	if (newLeft==revealLeft && sorted==0){
		//alert("shoveit");

		canSort = 1;
				
		t = new Date();
		t1 = t.getTime();
		
		myURL = "images/Animal_Feeder/" + stimFile[stimList[trial]] + ".png";
		theFood = new $.gameQuery.Animation({imageURL: "images/Animal_Feeder/" + stimFile[stimList[trial]] + ".png"});
		$("#food").setAnimation(theFood)

	}
	else if (newLeft >= maxLeft && newTop < maxTop) {
		canSort = 0;
		if (sorted == 0) {
			hSpeed = 0;
		}
		else {
			hSpeed = newHSpeed;
		}
		vSpeed = 5;
	}
	else if (newTop == maxTop) {
		
		if (sorted == 0) {
            $("#creature1").setAnimation(creature1["angry"]);
			$("#creature2").setAnimation(creature2["angry"]);
			score = 0;
		}
		else {
			if (hSpeed < 0 && $.inArray(c1, rule[food]) != -1){
			$("#creature1").setAnimation(creature1["happy"]);
			score = (1 - (RT / scoreMult)) * 10;
			}
			else if (hSpeed < 0 && $.inArray(c1, rule[food]) == -1){
			$("#creature1").setAnimation(creature1["angry"]);
			score = 0;
			}
			else if (hSpeed > 0  && $.inArray(c2, rule[food]) != -1){
			$("#creature2").setAnimation(creature2["happy"]);
			score = (1 - (RT / scoreMult)) * 10;
			}
			else if (hSpeed > 0 && $.inArray(c2, rule[food]) == -1){
			$("#creature2").setAnimation(creature2["angry"]);
			score = 0;
			}						
		}		

		totalScore += score;
		$("#score").html(score);
		subject.inputData(trial, "score", score);

	}
	else if (newTop > (maxTop + 100)) {
		nextTrial(initTop, initLeft);
	}	

	}, REFRESH_RATE);
	
    //this is where the keybinding occurs
    $(document).keydown(function(e){

        switch(e.keyCode){
            case 65: //this is left! (a)
				if (canSort==1) {
					sorted = 1;
					newHSpeed = -4;
					canSort = 0;
					$("#paddle").rotate(315);
					d = new Date();
					t2 = d.getTime();
					RT = t2 - t1;
					subject.inputData(trial, 'RT', RT);
		            break;
				}
            case 68: //this is right (d)
				if (canSort == 1) {
					sorted = 1;
					newHSpeed = 4;
					canSort = 0;
					$("#paddle").rotate(45);
					d = new Date();
					t2 = d.getTime();
					RT = t2 - t1;
					subject.inputData(trial, 'RT', RT);
		            break;
				}
        }
    });
});


