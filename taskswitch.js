// Global constants:
var PLAYGROUND_WIDTH    = 640;
var PLAYGROUND_HEIGHT    = 480;
var REFRESH_RATE        = 30;

// Gloabl animation holder
var creature1 = new Array();
var creature2 = new Array();	

//A set of functions for moving objects
function setVertPos(v,id) {
	boxVPos = v;
	v = v + "px";
	$(id).css("top", v);
}
	
function moveObjVert(v,id) {//Move objects vertically. Negative v values move up, position move down
	boxVPos = boxVPos + v;
	newVPos = boxVPos + "px";
	$(id).css("top", newVPos);
}
function setHorPos(h,id){
	boxHPos = h;
	h = h + "px";
	$(id).css("right",h);
}
	
function moveObjHor(h,id){//Set direction of motion in horizonal dirction. Negative h makes the object move right. Positive the opposite.
	boxHPos = boxHPos + h;
	newHPos = boxHPos + "px";
	$(id).css("right",newHPos);
}

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
	alert("Your total accuracy was "+totalAccuracy+"% and your average reaction time was "+minuteRT+" seconds");
	

	//Set difficulty for next level using scores from completed level
	setDifficulty(totalAccuracy, averageRT);
	alert(decisionTimerLength);
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

	//Move food back to its original position
	setVertPos(vertPos,"#food");
	setHorPos(horPos,"#food");

	//Increment trial number each time this function is called
	trial = trial + 1;
	
	stim = stimList[trial];
	food = stimFile[stim];
	
	animal1 = animalList1[trial];
	animal2 = animalList2[trial];
	
	creature1 = animalFile[animal1];
	creature2 = animalFile[animal2];
	
	if (trial < stimList.length) { //Trial lasts until we run out of fruit 
		//Send to the server which object was sent to the user to be 'delt' with (steak or banana)
		stim = stimList[trial];
		subject.inputData(trial, "stim", stim);
		subject.inputData(trial, "stimFile", stimFile[stim]);
	}
	else {
		alert('Level Complete');
		subject.sendData();
		nextLevel(stimFile, stimList);
	}
	//Set objects to default state
	$("#food").html("<img src = \"images/Animal_Feeder/pipe_bulge.png\" />");
	$("#paddle").html("<img src = \"images/Animal_Feeder/paddle_middle.png\" />");
	$("#animal1").html("<img src = \"images/Animal_Feeder/" +creature1+ ".png\" />");
	$("#animal2").html("<img src = \"images/Animal_Feeder/" +creature2+ ".png\" />");
	
	setCue();
	key = 222; //default key value, used throughout program
	decisionTimer = decisionTimerLength;//How long user has to make a decision
	choice = 222; //decision variaible for to stop key press abuse
}

	//This function with govern the animation when the food is delivered (name pending)
function onDelivery(){
	
	if(decisionPoint == 1){	//goes to animal 1
		
		if ( $.inArray(creature1, rule[food]) != -1){
			
			$("#animal1").html("<img src = \"images/Animal_Feeder/"+creature1+ "_happy.png\" />");
			subject.inputData(trial,"outcome","P");
			
			if(landing == 1){//Since this animation is run until a timer runs out, this guarantees correct is only added to once
				correct = correct + 1;}
		}
			
		else { 
		
			$("#animal1").html("<img src = \"images/Animal_Feeder/"+creature1+"_angry.png\" />");
			subject.inputData(trial,"outcome","N");}
	}
	
	if(decisionPoint == 2){
		
		if ( $.inArray(creature2,rule[food]) != -1){
		
			$("#animal2").html("<img src = \"images/Animal_Feeder/"+creature2+ "_happy.png\" />");
			subject.inputData(trial,"outcome","P");
			
			if(landing == 1){
				correct = correct + 1;}
		}
		else {
		
			$("#animal2").html("<img src = \"images/Animal_Feeder/"+creature2+ "_angry.png\" />");
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
		
		$("#animal1").html("<img src = \"images/Animal_Feeder/" + creature1 + "_angry.png\" />");
		$("#animal2").html("<img src = \"images/Animal_Feeder/" + creature2da + "_angry.png\" />");
		$("#food").html("<img src = \"images/Animal_Feeder/" + food + "_squashed.png\" />");
	}
}

function movePaddle(){
	
	if (key == 0){	
		$("#paddle").html("<img src = \"images/Animal_Feeder/paddle_left.png\" />");}

	if (key == 1){	
		$("#paddle").html("<img src = \"images/Animal_Feeder/paddle_right.png\" />");}
}



// --------------------------------------------------------------------
// --                      the main declaration:                     --
// --------------------------------------------------------------------

$(function(){
    // Animations declaration:
	
	//Set game Variables-which will be retrieved from the server
	timeInc = 1;
	level = 0;
	trial = 0;
	stimList = [1, 0, 2, 3, 2, 0, 1, 3, 1, 2, 1, 0];
	animalList1 = [0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1];
	animalList2 = [1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0];
	cueList = [0, 1, 2, 2, 1, 0, 2, 1, 0, 2, 0, 1];
	stimFile = ["pinktri","bluetri","pinkcirc","bluecirc"];
	animalFile = ["pt","bc"];
	cueFile = ["cue0","cue1", "cue2"];
	
	rule = new Array();
	
	rule['pinktri'] =  ['pt'];
	rule['bluecirc'] = ['bc'];
	rule['bluetri'] = ['bc'];
	rule['pinkcirc'] = ['pt'];
	
	animal1 = animalList1[trial];
	animal2 = animalList2[trial];
	

	//Start things off
	stim = stimList[trial];
	food = stimFile[stim];
	setCue();

    creature1["idle"] = new $.gameQuery.Animation({
        imageURL: "images/Animal_Feeder/bc_idle.png",
		numberOfFrame: 4,
		delta: 200,
		rate: 1500,
		type: $.gameQuery.ANIMATION_HORIZONTAL});
    creature1["angry"] = new $.gameQuery.Animation({
        imageURL: "images/Animal_Feeder/bc_angry.png",
		numberOfFrame: 4,
		delta: 200,
		rate: 120,
		type: $.gameQuery.ANIMATION_HORIZONTAL});
    creature1["happy"] = new $.gameQuery.Animation({
        imageURL: "images/Animal_Feeder/bc_happy.png",
		numberOfFrame: 4,
		delta: 200,
		rate: 400,
		type: $.gameQuery.ANIMATION_HORIZONTAL});

    creature2["idle"] = new $.gameQuery.Animation({
        imageURL: "images/Animal_Feeder/pt_idle.png",
		numberOfFrame: 4,
		delta: 200,
		rate: 1500,
		type: $.gameQuery.ANIMATION_HORIZONTAL});
    creature2["angry"] = new $.gameQuery.Animation({
        imageURL: "images/Animal_Feeder/pt_angry.png",
		numberOfFrame: 4,
		delta: 200,
		rate: 120,
		type: $.gameQuery.ANIMATION_HORIZONTAL});
    creature2["happy"] = new $.gameQuery.Animation({
        imageURL: "images/Animal_Feeder/pt_happy.png",
		numberOfFrame: 4,
		delta: 200,
		rate: 400,
		type: $.gameQuery.ANIMATION_HORIZONTAL});


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

	.addGroup("food", {width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT})
		.addSprite("food", {animation : new $.gameQuery.Animation({imageURL: "images/Animal_Feeder/pipebulge.png"}),
			posx:0,
			posy:110,
			width: 62,
			height: 53});
	
    // this sets the id of the loading bar:
    $().setLoadBar("loadingBar", 400);
    
    //initialize the start button
    $("#startbutton").click(function(){
        $.playground().startGame(function(){
            $("#welcomeScreen").fadeTo(1000,0,function(){$(this).remove();});
        });
    })
    
	//Set start positions of food
	foodHStart = 800;
	foodVStart = 50;
	
	setVertPos(foodVStart,"#food");
	setHorPos(foodHStart,"#food");
	
	//Set stage variables which goven when things should start to fall
	maxHorPos = 575;//How far across the conveyor belt food will go
	maxVertPos = 100;// How far down the conveyor belt food will go
	maxFallPos = 450;//How far unchosen food will fall
	
	//Set end positions for food
	foodVEnd1 = 380;
	foodHEnd1 = 670;
	
	foodVEnd2 = 300;
	foodHEnd2 = 470;
	
	decisionTimerLength = 40;
	decisionTimer = decisionTimerLength;
	landingMax = 20; //How long the landing animation will last
	landing = landingMax;
	
	//State variable, changes when user decides what to do with the food
	decisionPoint = 0;//Determines what happens when the food reaches the drop point
	choice = 222;//Makes it so only one button press is allowed each trial
	correct = 0;//Resets correct trial timer to 0 for next level
	totalRT = 0;//Resets reaction time tracker
	
	//Set Speed variables
	converyorSlope = (maxVertPos - foodVStart)/(foodHStart - maxHorPos);
	converyorHSpeed = 5; //Sets how fast the food moves through the pipe
	converyorVSpeed = converyorHSpeed*converyorSlope;
	
	animal1Slope = Math.abs((maxVertPos - foodVEnd1)/(maxHorPos - foodHEnd1));
	animal1HSpeed = 5;//Sets how fact the food goes to the animals
	animal1VSpeed = animal1Slope*animal1HSpeed;
	
	animal2Slope = Math.abs((maxVertPos - foodVEnd2)/(maxHorPos - foodHEnd2));
	animal2HSpeed = 5;
	animal2VSpeed = animal2Slope*animal2HSpeed;

	//timer stuff
	$.playground().registerCallback(function(){
	
	//Get current position; take css info and cast as int so we can work with it
	var posV = $("#food").position();
	positionV = posV.top;
	
	var positionH = $("#food").css("right");
	var posH = positionH.substr(0,3);
	newposH = parseInt(posH);

//Here are the statements which govern the moving of the food		
	
	//Phase 1: Move obj down the conveyor belt, angle is determined by the difference of vertical and horizontal speed(slope)
	
	if (newposH > maxHorPos && positionV < maxVertPos){
		moveObjVert(converyorVSpeed,"#food");
		moveObjHor(-converyorHSpeed,"#food");}
	
	else if (positionV == maxVertPos){
		
		$("#food").html("<img src = \"images/Animal_Feeder/"+food+".png\" />");
		
		t = new Date();
		t1 = t.getTime();
		
		choice = 0;//Unlocks keypress event, user can now make their choice
		
		moveObjVert(converyorVSpeed,"#food");}
		
	else if (positionV > maxVertPos){
	
		if(decisionTimer > 0){
			
		//Phase 2: Three possibilities, go left, go right, or falls of the belt	
			if(key == 0){
				decisionPoint = 1;}
			
			if(key == 1){
				decisionPoint = 2;}
				
			if(key == 222){
				decisionPoint = 0;}
			
			decisionTimer = decisionTimer - 1;
			
			if(choice == 1){ //If user makes his choice before the decisionTimer hits 0, set decisionTimer to 0 to make food fall immediately
				decisionTimer = 0;}
		}
		
		//Phase 3: execute decision	
		if (decisionTimer == 0){
			
			choice = 1; //Locks keypress event, so user cannot make a choice after it has fallen
			
			if (decisionPoint == 1){
				
				if (positionV < foodVEnd1){
					moveObjVert(animal1VSpeed,"#food");
					moveObjHor(animal1HSpeed,"#food");}
					
				if(positionV >= foodVEnd1){
					onDelivery();
					landing = landing - 1;
			
					if(landing == 0){
						nextTrial(foodVStart,foodHStart);
						landing = landingMax;}
				}
			}

			if (decisionPoint == 2){
				
				if (positionV < foodVEnd2){
					moveObjVert(animal2VSpeed,"#food");
					moveObjHor(-animal2HSpeed,"#food");}
				
				if (positionV >= foodVEnd2){
					onDelivery();
					landing = landing - 1;
			
					if (landing == 0){
						nextTrial(foodVStart,foodHStart);
						landing = landingMax;}
				}
			}
				
			if(decisionPoint == 0){
				noFood(maxFallPos, 19);
				
				if(positionV >= maxFallPos){
					landing = landing - 1;
			
					if(landing == 0){
						nextTrial(foodVStart,foodHStart);
						landing = landingMax;}
				}
			}
		}
	}
	}, 40);


	
    //this is where the keybinding occurs
    $(document).keydown(function(e){
        switch(e.keyCode){
            case 65: //this is left! (a)
                $("#playerBooster").setAnimation();
                break;
            case 87: //this is up! (w)
                $("#creature1").setAnimation(creature1["angry"]);
				$("#creature2").setAnimation(creature2["happy"]);
                break;
            case 68: //this is right (d)
                $("#playerBooster").setAnimation(playerAnimation["booster"]);
                break;
            case 83: //this is down! (s)
                $("#creature1").setAnimation(creature1["happy"]);
				$("#creature2").setAnimation(creature2["angry"]);
                break;
        }
    });
    //this is where the keybinding occurs
    $(document).keyup(function(e){
        switch(e.keyCode){
            case 65: //this is left! (a)
                $("#playerBooster").setAnimation(playerAnimation["boost"]);
                break;
            case 87: //this is up! (w)
                $("#creature1").setAnimation(creature1["idle"]);
				$("#creature2").setAnimation(creature2["idle"]);
                break;
            case 68: //this is right (d)
                $("#playerBooster").setAnimation(playerAnimation["boost"]);
                break;
            case 83: //this is down! (s)
                $("#creature1").setAnimation(creature1["idle"]);
				$("#creature2").setAnimation(creature2["idle"]);
                break;
        }
    });
});


