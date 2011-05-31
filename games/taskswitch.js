function nextLevel() {
	if ((level > 0) && (level < levels)) {
		subject.inputLevelData(day,totalScore,level);
		subject.sendLevelData();
		alert('Level Complete!  Press OK to play the next one.');

	}

	if (level < levels) {
		
		//Set difficulty for next level using scores from completed level
		setDifficulty(totalScore);

		trial = 0;

		level += 1;

		cueList = [];
		animalList1 = [];
		animalList2 = [];
		stimList = [];	
	
		//setting of game variables - eventually should be retrieved from the database
		for (i=0;i<difficulty.trials/4;i++) {
			stimList = stimList.concat([0, 1, 2, 3]);
		}
	
		stimList.sort(randOrd);

		for (i=0;i<difficulty.trials;i++){
			animalList1 = animalList1.concat([0]);
			animalList2 = animalList2.concat([1]);
		}
	
		switches = difficulty.switchFreq / 100 * difficulty.trials;

		for (i=0;i<switches;i++){
			cueList = cueList.concat([1]);
		}

		for (i=0;i<difficulty.trials-switches;i++){
			cueList = cueList.concat([0]);
		}

		cueList = cueList.sort(randOrd); //randomize the list

		nextTrial();

	}

	else {
		subject.inputLevelData(day,totalScore,level);
		subject.sendLevelData();

		//now we need to write to the db, indicating the level has been completed

		$.ajax({url: "setCompleted.php?sid=" + sid + "&gid=2&day=" + day, async: false});
		
		alert('You are done playing this game for today.  Press OK to return to the game menu');
		window.location = "../index.html";
	}
	
}

function nextTrial() {
	//reset paddle
	$("#paddle").rotate(0);
	//set cue
	setCue();

	//send data from the previous trial
	if (trial > 1) {
		subject.sendData();
	}

	//Set Speed variables
	difficulty.hSpeed = 5;
	vSpeed = 0;
	sorted = 0;
	canSort = 0;
	sortedAt = 0;
	score = 0;
	$("#score").html(score);	

	//subject performance
	totalACC = 0;
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

	if (trial < difficulty.trials) { 
		stim = stimList[trial];
		subject.inputData(trial, "stim", stim);
		subject.inputData(trial, "stimFile", stimFile[stim]);
	}
	else {
		nextLevel();
	}

}

function setDifficulty(score){
	gString = "getDifficulty.php?score=" + score + "&game=2";

	$.ajax({url: gString, 
			success : function(data) { 
				diffs = data.split(',');
				difficulty.trials = diffs[0];
				difficulty.hSpeed = diffs[1];
				difficulty.switchFreq = diffs[2];
				difficulty.aswitchFreq = diffs[3];
			},
			async: false}
	);
	
	scoreMult = revealLeft / difficulty.hSpeed * REFRESH_RATE;

}

//This function will set the cue
function setCue(){

	cueSwitch = cueList[trial];
	if (cueSwitch == 1) {
		cueFile.reverse();
	}
	cue = cueFile[0];
	$("#cue").html(cue);

	if (cue == "S"){
		rule['pinktri'] =  ['pt'];
		rule['bluecirc'] = ['bc'];
		rule['bluetri'] = ['pt'];
		rule['pinkcirc'] = ['bc'];
	}
	else {
		rule['pinktri'] =  ['pt'];
		rule['bluecirc'] = ['bc'];
		rule['bluetri'] = ['bc'];
		rule['pinkcirc'] = ['pt'];
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

	//get the subject ID
	$.ajax({url: "getSid.php", 
		success : function(data) { 
			sid = data;
			subject = new Subject(sid, 2);
		},
		async: false}
	);

	// Get the last high score
	$.ajax({url: "getHighScore.php?sid=" + sid + "&gid=2", 
		success : function(data) { 
			totalScore = parseInt(data);
		},
		async: false}
	);

	$.ajax({url: "getLevels.php?gid=2",
		success : function(data) {
			levels = parseInt(data);
		},
		async: false}
	);

	day = getCookie("funkyTrainDay");

    // Initialize the game:
    $("#playground").playground({height: PLAYGROUND_HEIGHT,
                                 width: PLAYGROUND_WIDTH,
                                 keyTracker: true});
    
    // Initialize the background, items(pipe) and actors(aliens)
    $.playground().addGroup("background", {height: PLAYGROUND_HEIGHT, width: PLAYGROUND_WIDTH})

		.addSprite("background", {animation : new $.gameQuery.Animation({imageURL: "images/Animal_Feeder/background.png"})})

		.append("<span id='cue' style = 'color : white; position: absolute; left : 310px; top : 10px; font-size : 40px'></span><br/>").end()
			
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
		//Start things off
		nextLevel();

        });
    });


	//--------------------------------PASSAGE OF TIME----------------------------------------------------------------------
	//
	$.playground().registerCallback(function(){
	
	// Get position info of the food objects and add x and y component to chang position	
	newLeft = parseInt($("#food").css("left")) + difficulty.hSpeed;	
	var newTop = parseInt($("#food").css("top")) + vSpeed;
	
	//Phase 1: Move obj down the conveyor belt, angle is determined by the difference of vertical and horizontal speed(slope)
	$("#food").css("left", newLeft);
	$("#food").css("top", newTop);	

	if (newLeft==revealLeft && sorted==0){

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
			difficulty.hSpeed = 0;
		}
		else {
			difficulty.hSpeed = newhSpeed;
		}
		vSpeed = 5;
	}
	else if (newTop == maxTop) {
		
		if (sorted == 0) {
            $("#creature1").setAnimation(creature1["angry"]);
			$("#creature2").setAnimation(creature2["angry"]);
			score = 0;
			ACC = 0;
		}
		else {
			if (difficulty.hSpeed < 0 && $.inArray(c1, rule[food]) != -1){
				$("#creature1").setAnimation(creature1["happy"]);
				score = ((maxLeft - sortedAt) / span) * 10;
				score = parseInt(score);
				ACC = 1;
			}
			else if (difficulty.hSpeed < 0 && $.inArray(c1, rule[food]) == -1){
				$("#creature1").setAnimation(creature1["angry"]);
				score = 0;
				ACC = 0;
			}
			else if (difficulty.hSpeed > 0  && $.inArray(c2, rule[food]) != -1){
				$("#creature2").setAnimation(creature2["happy"]);
				score = ((maxLeft - sortedAt) / span) * 10;
				score = parseInt(score);
				ACC = 1;
			}
			else if (difficulty.hSpeed > 0 && $.inArray(c2, rule[food]) == -1){
				$("#creature2").setAnimation(creature2["angry"]);
				score = 0;
				ACC = 0;
			}						
		}		

		score = parseInt(score);
		totalScore += score;
		$("#totalScore").html(totalScore);
		$("#score").html(score);
		subject.inputData(trial, "score", score);
		subject.inputData(trial, "ACC", ACC);
	}
	else if (newTop > (maxTop + 100)) {
		nextTrial();
	}	

	}, REFRESH_RATE);
	
    //this is where the keybinding occurs
    $(document).keydown(function(e){

        switch(e.keyCode){
            case 65: //this is left! (a)
				if (canSort==1) {
					sorted = 1;
					newhSpeed = -4;
					canSort = 0;
					$("#paddle").rotate(315);
					d = new Date();
					t2 = d.getTime();
					RT = t2 - t1;
					sortedAt = newLeft;
					subject.inputData(trial, 'RT', RT);
		            break;
				}
            case 68: //this is right! (d)
				if (canSort == 1) {
					sorted = 1;
					newhSpeed = 4;
					canSort = 0;
					$("#paddle").rotate(45);
					d = new Date();
					t2 = d.getTime();
					RT = t2 - t1;
					sortedAt = newLeft;
					subject.inputData(trial, 'RT', RT);
		            break;
				}
        }
    });
});


