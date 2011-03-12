
// Global constants:
var PLAYGROUND_WIDTH    = 640;
var PLAYGROUND_HEIGHT    = 480;
var REFRESH_RATE        = 30;

//Set start positions of food
var initLeft = 30;
var initTop = 60;

//Set Speed variables
var hSpeed = 5; //Sets how fast the food moves through the pipe
var vSpeed = 0; //Sets how fast the food drops
var newHSpeed = 0;

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
var	stimList = [1, 0, 2, 3, 2, 0, 1, 3, 1, 2, 1, 0];
var	animalList1 = [0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1];
var	animalList2 = [1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0];
var	cueList = [0, 1, 2, 2, 1, 0, 2, 1, 0, 2, 0, 1];
var	stimFile = ["pinktri","bluetri","pinkcirc","bluecirc"];
var	animalFile = ["pt","bc"];
var	cueFile = ["cue0","cue1", "cue2"];

//subject performance info
var	correct = 0;//Resets correct trial timer to 0 for next level
var	totalRT = 0;//Resets reaction time tracker

	
var	rule = new Array();
	
var subject = new Subject(666,"animalFeeder");

//Set stage variables which goven when things should start to fall
maxLeft = 285;//How far across the conveyor belt food will go
maxTop = 450;// How far down the conveyor belt food will go
maxFallPos = 450;//How far unchosen food will fall
revealLeft = 210;	

rule['pinktri'] =  ['pt'];
rule['bluecirc'] = ['bc'];
rule['bluetri'] = ['bc'];
rule['pinkcirc'] = ['pt'];

function setDifficulty(accuracy,reactionTime){

	if(totalAccuracy >= 80){
		if (reactionTime <= 600){
			decisionTimerLength = decisionTimerLength - 1.5;}
		if(reactionTime > 600 && reactionTime <= 1000){
			decisionTimerLength = decisionTimerLength -1.0}
		if(reactionTime > 1000){
			decisionTimerLength = -0.5;} 
	}
	if(totalAccuracy >= 70 && totalAccuracy < 80){
		if (reactionTime <= 600){
			decisionTimerLength = decisionTimerLength - 1;}
		if(reactionTime > 600 && reactionTime <= 1000){
			decisionTimerLength = decisionTimerLength -0.5;}
		if(reactionTime > 1000){
			decisionTimerLength = decisionTimerLength;} 
	}	
	if(totalAccuracy <70 && totalAccuracy>=60){
		if (reactionTime <= 600){
			decisionTimerLength = decisionTimerLength -0.5;}
		if(reactionTime > 600 && reactionTime <= 1000){
			decisionTimerLength = decisionTimerLength;}
		if(reactionTime > 1000){
			decisionTimerLength = decisionTimerLength + 0.5;} 
	}
	if(totalAccuracy <60){
	if (reactionTime <= 600){
			decisionTimerLength = decisionTimerLength -0.3;}
		if(reactionTime > 600 && reactionTime <= 1000){
			decisionTimerLength = decisionTimerLength -0.2;}
		if(reactionTime > 1000){
			decisionTimerLength = decisionTimerLength + 0.1;} 
	}
}
function nextLevel() {
	//Calculate user score
	totalAccuracy = (correct/stimList.length)*100;
	averageRT = (totalRT/stimList.length);
	minuteRT = averageRT/1000;
	//alert("Your total accuracy was "+totalAccuracy+"% and your average reaction time was "+minuteRT+" seconds");
	

	//Set difficulty for next level using scores from completed level
	setDifficulty(totalAccuracy, averageRT);
	//alert(decisionTimerLength);
	//Set counter to default state
	correct = 0;//Set accuracy counter back to 0 for next level
	totalRT = 0;//Set reaction time counter back to 0 for next level
	trial = 0;
	level = level + 1;
	
	//setting of game variables - eventually should be retrieved from the database
	stimList =    [1, 2, 1, 1, 0, 3, 0, 2, 0, 3, 2, 3];
	animalList1 = [1, 0, 3, 2, 2, 2, 1, 3, 2, 1, 1, 1];
	animalList2 = [0, 3, 0, 1, 3, 0, 2, 2, 2, 0, 1, 0];
	cueList =     [1, 2, 0, 1, 2, 0, 2, 2, 1, 0, 2, 1];
	
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

	//This function with govern the animation when the food is delivered (name pending)
function onDelivery(){
	
	if(decisionPoint == 1){	//goes to animal 1
		
		if ( $.inArray(creature1, rule[food]) != -1){
			
			$("#creature1").setAnimation(creature1["happy"]);

			subject.inputData(trial,"outcome","P");
			
			if(landing == 1){//Since this animation is run until a timer runs out, this guarantees correct is only added to once
				correct = correct + 1;}
		}
			
		else { 
		
			$("#creature1").setAnimation(creature1["angry"]);
			subject.inputData(trial,"outcome","N");}
	}
	
	if(decisionPoint == 2){
		
		if ( $.inArray(creature2,rule[food]) != -1){
		
			$("#creature2").setAnimation(creature1["happy"]);
			subject.inputData(trial,"outcome","P");
			
			if(landing == 1){
				correct = correct + 1;}
		}
		else {
		
			$("#creature2").setAnimation(creature1["angry"]);
			subject.inputData(trial,"outcome","N");}
	}
}

//This function will set the cue
function setCue(){

	var cue = cueList[trial];
	var cueNext = cueFile[cue];
	$("#cue").html("<img src = \"images/Animal_Feeder/" +cueNext+".png\" />");
}
	
//This function will govern the animal when no food is chosen, aka falls to the ground and splatters
function noFood(maxVert,speed){
		
	var position = $("#food").position();
		
	if(position.top < maxVert){
			moveObjVert(speed,"#food");}
		
	if(position.top >= maxVert){
	
        $("#creature1").setAnimation(creature1["angry"]);
		$("#creature2").setAnimation(creature2["angry"]);
	}
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
		}
		else {
			if (hSpeed < 0 && $.inArray(c1, rule[food]) != -1){
			$("#creature1").setAnimation(creature1["happy"]);
			}
			else if (hSpeed < 0 && $.inArray(c1, rule[food]) == -1){
			$("#creature1").setAnimation(creature1["angry"]);
			}
			else if (hSpeed > 0  && $.inArray(c2, rule[food]) != -1){
			$("#creature2").setAnimation(creature2["happy"]);
			}
			else if (hSpeed > 0 && $.inArray(c2, rule[food]) == -1){
			$("#creature2").setAnimation(creature2["angry"]);
			}						
		}
	}
	else if (newTop > (maxTop + 100)) {
		nextTrial(initTop, initLeft);
	}	


	}, 40);
	
    //this is where the keybinding occurs
    $(document).keydown(function(e){

        switch(e.keyCode){
            case 65: //this is left! (a)
				if (canSort==1) {
					sorted = 1;
					newHSpeed = -4;
					canSort = 0;
					$("#paddle").rotate(315);
		            break;
				}
            case 68: //this is right (d)
				if (canSort == 1) {
					sorted = 1;
					newHSpeed = 4;
					canSort = 0;
					$("#paddle").rotate(45);
		            break;
				}
        }
    });
});


