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
		delays = [];	

		//Setting of game variables - eventually should be retrieved from the database
		
		for (i=0;i<difficulty.trials/4;i++) {
			stimList = stimList.concat([0, 1, 2, 3]);
			delays = delays.concat([20, 40, 60, 80]);
		}
	
		stimList.sort(randOrd);
		
		for (i=0;i<difficulty.trials;i++){
			animalList1 = animalList1.concat([0]);
			animalList2 = animalList2.concat([1]);
		}
		
		//--------------------------------------------------------
		//--          The Epic Construction of...               --
		//--                THE CUE LIST                        --
		//--------------------------------------------------------

		var numberOfCues = 2;

		if ( (difficulty.trials/numberOfCues)%1 == 1%1){ //Check if the numberOfCues evenly divides the number of trials

			var blockNumber = makeBlockNumber(difficulty.cueBlockMin,difficulty.cueBlockMax,difficulty.trials);
			var blocksOf0 = randomBlock(difficulty.cueBlockMin,difficulty.cueBlockMax,difficulty.trials,blockNumber,0);
			var blocksOf1 = randomBlock(difficulty.cueBlockMin,difficulty.cueBlockMax,difficulty.trials,blockNumber,1);
			var list = makeCues(blocksOf0,blocksOf1);
			cueList = makeCueList(list);

		}

		else {

			("#console").html("Game Error - Cue list generation error!");
			
		}

		//Set animations to show by default. Why this is required is a mystery...
		$("#points").show();
		$("#food").show();

		setHealth("#creature1", maxHealth);
		setHealth("#creature2", maxHealth);

		nextTrial();

	}

	else {
		subject.inputLevelData(day,totalScore,level);
		subject.sendLevelData();

		//Now we need to write to the db, indicating that the level has been completed

		$.ajax({url: "../setCompleted.php?sid=" + sid + "&gid=3&day=" + day, async: false});
		
		alert('You are done playing this game for today.  Press OK to return to the game menu');
		window.location = "../main.html";//Send user back to his/her homepage
	}
	
}

function nextTrial() {

	//Check gameOver status
	var health1 = $("#creature1").data("health");
	var health2 = $("#creature2").data("health");

	if ( (health1 == 0) || (health2 == 0) ) {
		
		gameOver();

		//Reset Health Bars. the dec and inc are used to reset the images. Quick, dirty fix, but it works.
		setTimeout("setHealth(\"#creature1\", maxHealth);decHealth(\"#creature1\");incHealth(\"#creature1\");setHealth(\"#creature2\", maxHealth);decHealth(\"#creature2\");incHealth(\"#creature2\");",1000);
	
	}
	//reset paddle
	$("#paddle").rotate(0);
	//set cue
	setCue();

	//send data from the previous trial
	if (trial > 1) {
		subject.sendData();
	}

	//Set speed variables
	foodHSpeed = 0;
	foodVSpeed = 0;
	sorted = 0;
	canSort = 0;
	sortedAt = 0;
	score = 0;
	reaction = 50;

	$("#score").html(score);	

	//subject performance
	totalACC = 0;
	totalRT = 0;

	//Increment trial number each time this function is called
	trial = trial + 1;
	$("#trial").html(trial+"/"+difficulty.trials);
	
	stim = stimList[trial];
	food = stimFile[stim];
	delay = delays[trial];

	
	creature1 = makeCreature(animalFile[animalList1[trial]]);
   	creature2 = makeCreature(animalFile[animalList2[trial]]);
	
	c1 = animalFile[animalList1[trial]];
	c2 = animalFile[animalList2[trial]];

	$("#creature1").setAnimation(creature1["idle"]);
	$("#creature2").setAnimation(creature2["idle"]);

	$("#food").setAnimation(new $.gameQuery.Animation({imageURL: "images/Animal_Feeder/pipebulge.png"}));

	$("#food").css("left", initLeft);
	$("#food").css("top", initTop);
	$("#food").toggle();

	$("#points").hide();

	if (trial < difficulty.trials) { 
		stim = stimList[trial];
		subject.inputData(trial, "speed", difficulty.hSpeed);
		subject.inputData(trial, "level", level);
		subject.inputData(trial, "day", day);
		subject.inputData(trial, "stim", stim);
		subject.inputData(trial, "stimFile", stimFile[stim]);
	}
	else {
		nextLevel();
	}

}
//Function which sends the user's score to the DB, and gathers the difficulty variables for the next trial 
function setDifficulty(score){
	gString = "../getDifficulty.php?score=" + score + "&game=3";

	$.ajax({url: gString, 
			success : function(data) { 
				diffs = data.split(',');
				difficulty.trials = parseInt(diffs[0]);//How many trials in a level
				difficulty.hSpeed = parseInt(diffs[1]);//Speed of food as it comes out the pipe
				difficulty.cueBlockMin = parseInt(diffs[2]);//Minimum number of trials in a block of the same cue
				difficulty.cueBlockMax = parseInt(diffs[3]);//Maximum number of trials in a block of the same cue
			},
			async: false}
	);
	
	scoreMult = revealLeft / foodHSpeed * REFRESH_RATE;

}

//This function will set the cue
function setCue(){

	cue = cueFile[cueList[trial]];

	if (cue == cueFile[cueList[trial-1]]){
		subject.inputData(trial, "switch", 0);
	}
	else {
		subject.inputData(trial, "switch", 1);
	}

	subject.inputData(trial, "cue", cue);

	$("#cue").html(cue);

	if (cue == "S"){
		rule['b_stripe'] =  ['bs'];
		rule['b_spot'] = ['bs'];
		rule['s_stripe'] = ['ls'];
		rule['s_spot'] = ['ls'];
	}
	else {
		rule['b_stripe'] =  ['bs'];
		rule['s_stripe'] = ['bs'];
		rule['b_spot'] = ['ls'];
		rule['s_spot'] = ['ls'];
	}
}

//Function that handles the points animation
function setPoints(points){
	
	//If the food goes to creature 1, the points appear above creature 1, if the points appear about creature 2...
	if( foodHSpeed < 0){
	
	$("#points").css("left",CREATURE1_POSX);
	$("#points").css("top",CREATURE1_POSY - POINTS_OFFSET);}

	if (foodHSpeed > 0){
		
		$("#points").css("left",CREATURE2_POSX);
		$("#points").css("top",CREATURE2_POSY - POINTS_OFFSET);}

	//Depending on the sign of his score, change html accordingly
	if (points > 0){
		var sign = "+ ";	
		var str = sprintf("<center><h1>%s %s</h1></center>",sign,points);
		$("#points").html(str);}
	
	if (points < 0){
		var sign = "- ";
		var str = sprintf("<center><h1>%s %s</h1></center>",sign,points);
		$("#points").html(str);}
	

	if (points == 0){
		$("#points").html("");}

	$("#points").show();
	
	//Animate and reset animation for next call
	//$("#points").fadeOut(1500,function(){$(this).html("");});
	//$("#points").fadeIn('fast');
}
//Create Animations for each creature
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
	
	sid = getCookie("funkyTrainID");
	subject = new Subject(sid, 3);

	// Get the last high score
	$.ajax({url: "../getHighScore.php?sid=" + sid + "&gid=3", 
		success : function(data) { 
			totalScore = parseInt(data);
		},
		async: false}
	);

	totalScore = 0;

	//Get Level data. Find which level they start at today 
	$.ajax({url: "../getLevels.php?gid=3",
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

		.append("<span id='cue' style = 'color : white; position: absolute; left : 310px; top : 150px; font-size : 40px'></span><br/>").end()
			
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
			 posx: CREATURE1_POSX,
		     	 posy: CREATURE1_POSY,
		         width: 200,
		         height: 250})


		.addSprite("creature1_health_back", {animation : new $.gameQuery.Animation({imageURL: "images/health.png"}),
			posx: CREATURE1_POSX -2,
			posy: CREATURE1_POSY + 243,
			width : 200,
			height: 10})


		.addSprite("creature1_health", {animation : new $.gameQuery.Animation({imageURL: "images/health.png"}),
			posx: CREATURE1_POSX,
			posy: CREATURE1_POSY + 245,
			width : 200,
			height: 10})

		.addSprite("creature2",{animation: creature2["idle"],
			 posx: CREATURE2_POSX,		     
			 posy: CREATURE2_POSY,
		         width: 200,
		         height: 250})

		.addSprite("creature2_health_back", {animation : new $.gameQuery.Animation({imageURL: "images/health.png"}),
			posx: CREATURE2_POSX - 2,
			posy: CREATURE2_POSY + 243,
			width : 200,
			height: 10})

		.addSprite("creature2_health", {animation : new $.gameQuery.Animation({imageURL: "images/health.png"}),
			posx: CREATURE2_POSX,
			posy: CREATURE2_POSY + 245,
			width : 200,
			height: 10}).end()


	.addGroup("item", {width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT})
		
		.addSprite("food", {animation : new $.gameQuery.Animation({imageURL: "images/Animal_Feeder/pipebulge.png"}),
			posx:initLeft,
			posy:initTop,
			width: 62,
			height: 53})

		.addSprite("points", {animation : new $.gameQuery.Animation({imageURL: "images/points.png"}),
			posx: initLeft,
			posy: initTop,
			width: POINTS_WIDTH,
			height: POINTS_HEIGHT});

	
    // this sets the id of the loading bar:
    $().setLoadBar("loadingBar", 400);

    //initialize the start button
    $("#startbutton").click(function(){

        $.playground().startGame(function(){
            $("#welcomeScreen").fadeTo(1000,0,function(){$(this).hide(); $("#loadingBar").remove();});
		//Start things off
		nextLevel();

        });
    });


	//----------------------------------------------------------------------------------------------------
	//--                                Passage of Time                                                 --
	//----------------------------------------------------------------------------------------------------
	$.playground().registerCallback(function(){
	
	if (pauseGame == 1){

	//Phase 1: Delay the food, keep user off guard
	delay -= 1;

	//Phase 2: Enough Delay! Now the food moves through the pipe
	if (delay == 0) {
		foodHSpeed = pipeSpeed;
		$("#food").toggle();
	}

		// Get position info of the food objects and add x and y component to change position	
		newLeft = parseInt($("#food").css("left")) + foodHSpeed;	
		newTop = parseInt($("#food").css("top")) + foodVSpeed;
	
	//Phase 3: Move obj down the conveyor belt. Angle is determined by the difference of vertical and horizontal speed(slope)
	$("#food").css("left", newLeft);
	$("#food").css("top", newTop);	
	
	//Phase 4: Food comes out the pipe and moves across the conveyor belt
	if (newLeft==revealLeft && sorted==0){
		
		foodHSpeed = difficulty.hSpeed;
		//User can use his paddle
		canSort = 1;
		
		//Test user's reaction time		
		t = new Date();
		t1 = t.getTime();
		
		//When the food comes out the pipe, set its animation (could be done before)
		myURL = "images/Animal_Feeder/" + stimFile[stimList[trial]] + ".png";
		theFood = new $.gameQuery.Animation({imageURL: myURL});
		$("#food").setAnimation(theFood)

	}
	
	//Phase 5: User either makes a decision or does not
	
	//If the user makes no decision...
	else if (newLeft >= maxLeft && newTop < maxTop) {
		canSort = 0;

		if (sorted == 0) {
			foodHSpeed = 0;}
		
		else {
			foodHSpeed = difficulty.newHSpeed;}
		
		//The food falls off the belt
		foodVSpeed = 10;
	}

	else if (newTop == maxTop) {
		
		if (sorted == 0) {
        	        
			$("#creature1").setAnimation(creature1["angry"]);
			$("#creature2").setAnimation(creature2["angry"]);
			decHealth("#creature1");
			decHealth("#creature2");
			
			score = 0;
			ACC = 0;
		}
		//If user makes a decision, Judge their decision and change animation to show whether it was correct or not
		else {
			if (foodHSpeed < 0 && $.inArray(c1, rule[food]) != -1){
				$("#creature1").setAnimation(creature1["happy"]);
				var c1Health = $("#creature1").data("health");
				incHealth("#creature1");

				if( c1Health == maxHealth){
					score = ((maxLeft - sortedAt) / span) * 10;
					score = parseInt(score);
				}

				else { score = 0;}
				ACC = 1;
			}
			else if (foodHSpeed < 0 && $.inArray(c1, rule[food]) == -1){
				$("#creature1").setAnimation(creature1["angry"]);
				decHealth("#creature1");
				score = 0;
				ACC = 0;
			}
			else if (foodHSpeed > 0  && $.inArray(c2, rule[food]) != -1){
				$("#creature2").setAnimation(creature2["happy"]);
				var c2Health = $("#creature2").data("health");
				incHealth("#creature2");

				if( c2Health == maxHealth){
				score = ((maxLeft - sortedAt) / span) * 10;
				score = parseInt(score);}

				else { score = 0;}
				ACC = 1;
			}
			else if (foodHSpeed > 0 && $.inArray(c2, rule[food]) == -1){
				$("#creature2").setAnimation(creature2["angry"]);
				decHealth("#creature2");
				score = 0;
				ACC = 0;
			}						
		}		
		
		//Set score based on user's decision
		score = parseInt(score);
		totalScore += score;
		setPoints(score);
		$("#totalScore").html(totalScore);
		$("#score").html(score);
		subject.inputData(trial, "score", score);
		subject.inputData(trial, "ACC", ACC);
	}
	//Allow creature animation to run	
	else if (newTop > (maxTop + 100)) {
		reaction -= 1;
		if (reaction == 0) {
			nextTrial();
		}
	}	
	}
	}, REFRESH_RATE);
	
    //this is where the keybinding occurs
    $(document).keydown(function(e){
	if(pauseGame == 1){
        switch(e.keyCode){
            case 65: //this is left! (a)
				if (canSort==1) {
					sorted = 1;
					difficulty.newHSpeed = -4;
					canSort = 0;
					$("#paddle").rotate(315);

					//Get Reaction Time data and send it to the server
					d = new Date();
					t2 = d.getTime();
					RT = t2 - t1;
					subject.inputData(trial, 'RT', RT);
					
					sortedAt = newLeft;
		           	 break;
			 	}

            case 75: //this is right! (k)
				if (canSort == 1) {
					sorted = 1;
					difficulty.newHSpeed = 4;
					canSort = 0;
					$("#paddle").rotate(45);
					
					//Get Reaction Time data and send it to the server
					d = new Date();
					t2 = d.getTime();
					RT = t2 - t1;
					subject.inputData(trial, 'RT', RT);

					sortedAt = newLeft;
		           	 break;
				}
        }
	}
    });
});


