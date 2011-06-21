function nextLevel(){

	//At the end of the each level send level data to server
	if( (level > 0) && (level < levels) ){
		subject.inputLevelData(day, totalScore, level);
		subject.sendLevelData();
		alert('Level Complete! Press OK to play the next one.');	
	}
	
	//At the beginning of a new level, reset game variables
	if( level < levels ){
		//Set difficulty for next level using scores from completed level
		setDifficulty(totalScore);

		trial = 0;

		level += 1;

		//Reset score variables
		correct = 0;
		buttonPress = 0;
		
		//Generate new stimList
		stimList = [];	
		delays = [];

		//setting of game variables - eventually should be retrieved from the database
		for (i=0;i<difficulty.trials/4;i++) {
			delays = delays.concat([10, 20, 30, 40]);
		}
		for(i = 0; i < (difficulty.nogoes*difficulty.trials); i++){
			stimList = stimList.concat(['b']);}//b:= bomb cp:= care package
	
		for(i = 0; i < (1-difficulty.nogoes)*difficulty.trials; i++){
			stimList = stimList.concat(['cp']);}//b:= bomb cp:= care package
		
		stimList.sort(randOrd);
		
		//Initiate new trial
		nextTrial();
	
		//subject.inputLevelData(level, score, currentTime.getTime());
		//subject.sendLevelData();

	}

	else{
	
		subject.inputLevelData( day, totalScore, level);
		subject.sendLevelData();

		//Now to write to the DB
		$.ajax({url: "setCompleted.php?sid=" + sid + "&gid=1&day=" + day, async: false});
	
		alert('You are done Playing this game for today. Press OK to return to the game menu');
		window.location = "../index.html";
	}
}


function nextTrial(){
	//Reset State variables
	boxPos = 0;
	canHit = 0;
	exploded = 0;
	dropIt = 0;
	moveIt = 1;
	fired = 0;
	burnout = 40;
	score = 0;
	impact = 0;

	$("#score").html(score);

	trial = trial + 1;
	$("#trial").html(trial+"/48");
	stim = stimList[trial];//Stim will either be a bomb or carepackage
	delay = delays[trial];//delay before package drops
	impactDelay = difficulty.impactDelay;//reset impact delay

	//Reset animations for next trial
	box = theBox(stim);
	$("#mysteryBox").setAnimation(box["idle"]);

	$("#city").setAnimation(cityAnim["fine"]);
	
	var d = new Date();
	t1 = d.getTime();

	//Reset Position of the box, hide it
	$("#mysteryBox").hide();
	$("#mysteryBox").css("top",initTop);

	if (trial < difficulty.trials) {
		
		//Send trial info to server
		subject.inputData(trial, "stim", stim);
	}
	else {
		//alert('Level Complete');
		subject.sendData();
		nextLevel();
	}

}
function setDifficulty(){
	$.get("getDifficulty.php?score=" +score+ "&game=1",function(data){
		diffs = data.split(',');
		difficulty.trials = parseInt(diffs[0]);
		difficulty.dropSpeed += parseInt(diffs[1]);
		difficulty.binocSpeed = difficulty.dropSpeed / 2;
		difficulty.nogoes = parseInt(diffs[2]);
	});

	scoreMult = (difficulty.dropSpeed/difficulty.nogoes)*REFRESH_RATE;
}
	
function setCue(){}

//Create an array of animations 
function theBox(id){

	var someBox = new Array;
	
	someBox["idle"] = new $.gameQuery.Animation({
		imageURL: "images/SatDef/package.png"});

	someBox["explode"] = new $.gameQuery.Animation({
		imageURL: "images/SatDef/exploded.png", numberOfFrame: 4, delta: 32, rate: 320, type: $.gameQuery.ANIMATION_VERTICAL});
	
	someBox["exposed"] = new $.gameQuery.Animation({
		imageURL: "images/SatDef/"+id+"_exposed.png"});
	
	return someBox;
}


//------------------------------------------------------------------
//--                       The Key Handler
//------------------------------------------------------------------
function key_handler(e){
	//If the game has started monitor key presses. Prevents user from giving us bad data (i.e if the user were to mash keyboard before he started the game)	
	
		if(e.keyCode == 65 && canHit == 1 && fired == 0){ //If the user presses the right key ('a') when the package is inside the binoculars and the user has not tried to fire his weapon previously...
		
				fired = 1;//1:= User can not longer fire his weapon
				exploded = 1;//1:= Box has been hit

				//Calculate time of button press and gather/send reaction time data
				var d = new Date();
				t2 = d.getTime();
				RT = t2 - t1;
				totalRT += RT;
				buttonPress += 1;
		
				subject.inputData(trial,'RT',RT);

				//Animate the explosion
				$("#mysteryBox").setAnimation(box["explode"]);

				score =  0;

<<<<<<< HEAD
			burnout = ((groundPos - boxPos) / groundPos  * difficulty.trialDur) + difficulty.impactDelay; 

			
			//Evaluate users decision
			if(stim == "b"){
				//Adjust game score
				span = hideTop - revealTop;
				dist = hideTop - boxPos;
				score =  (dist / span) * 10 ;
				score = parseInt(score);
				
				correct += 1;
=======
				burnout = ((groundPos - boxPos) / groundPos  * difficulty.trialDur) + difficulty.impactDelay; 

				burnout = parseInt(burnout);
				
				//Evaluate users decision
				if(stim == "b"){
					//Adjust game score
					span = hideTop - revealTop;
					dist = hideTop - boxPos;

					score =  (dist / span) * 10 ;
					score = parseInt(score);
					
					correct += 1;
>>>>>>> e80ed69ac4b7c8fb281173178b92804d4e86a3be

			}
			
			totalScore += score;
			
			//Append score to HTML
			$("#totalScore").html(totalScore);
			$("#score").html(score);

			//Send trial data to server
			
			subject.inputData(trial,"score",score);
			subject.inputData(trial,"RT",RT);
			
	 	}	

		//If user presses the wrong key, he will no longer be able to fire his weapon
		fired = 1;

		//Send record of user's keypress to the DB
		subject.inputData(trial,"keyCode", e.keyCode);
	     
}

// ---------------------------------------------------------------------
// --                  The Main Declaration                           --
// ---------------------------------------------------------------------

$(function(){

	//get the subject ID
	$.ajax({url: "getSid.php", 
		success : function(data) { 
			sid = data;
			subject = new Subject(sid, 1);
		},
		async: false}
	);

	// Get the last high score
	$.ajax({url: "getHighScore.php?sid=" + sid + "&gid=1", 
		success : function(data) { 
			totalScore = parseInt(data);
		},
		async: false}
	);

	//Get the level the user should start at
	$.ajax({url: "getLevels.php?gid=1",
		success : function(data) {
			levels = parseInt(data);
		},
		async: false}
	);

	//Get Instructions for the game
	$.ajax({url: "getInstructions.php?gid=1",
		success : function(data) {
			instructions = data;
		},
		async: false}
	);
	
	//Find out what day of the program the user is on
	day = getCookie("funkyTrainDay");

	//Initialize the game:
	$("#playground").playground({height: PLAYGROUND_HEIGHT, width: PLAYGROUND_WIDTH, keyTracker: true});

	//Initialize the background, actors...
	$.playground().addGroup("background", {height:PLAYGROUND_HEIGHT,width: PLAYGROUND_WIDTH})
		
			.addSprite("background",{animation: new $.gameQuery.Animation({imageURL:"images/SatDef/satDefBG.png"}),
				posx:0,
				posy:0,
				width:PLAYGROUND_WIDTH,
				height:PLAYGROUND_HEIGHT}).end()
			
			.addGroup("objects",{height:PLAYGROUND_HEIGHT,width:PLAYGROUND_WIDTH})
		       
		       	  .addSprite("mysteryBox",{animation: new $.gameQuery.Animation({imageURL:"images/SatDef/package.png"}),
				posx:(PLAYGROUND_WIDTH - BOX_WIDTH) / 2,
				posy:boxPos,
				width: BOX_WIDTH,
				height:BOX_HEIGHT}).end()
			
		      .addGroup("scene", {height:PLAYGROUND_HEIGHT,width: PLAYGROUND_WIDTH})

			.addSprite("city",{animation: cityAnim["fine"],
				posx:0,
				posy:PLAYGROUND_HEIGHT - CITY_HEIGHT,
				width:PLAYGROUND_WIDTH,
				height:CITY_HEIGHT})
			
			.addSprite("binoculars",{animation: binocAnim["idle"],
				posx:(PLAYGROUND_WIDTH - BINOC_WIDTH) / 2,
				posy:BINOC_POS,
				width:BINOC_WIDTH,
				height:BINOC_HEIGHT});

	//Give the loading bar functionality
	$().setLoadBar("loadingbar",400);

	//Give the instructions button functionality
	$("#instructions").click(function(){
			alert(instructions);
			});


	//Initialize the start button
	$("#startbutton").click(function(){
		//Bind Key Events
		$(document).keydown(key_handler);
		nextLevel();
		
	 $.playground().startGame(function(){
	 	$("#welcomeScreen").fadeTo(1000,0,function(){ $(this).remove(); });
	 });
	});
		        
	// --------------------------------------------------------------------------------
	// --                          Time Passage                                      --
	// --------------------------------------------------------------------------------

	$.playground().registerCallback(function(){

		delay -= 1;
		if (delay == 0) {
			dropIt = 1;
			$("#mysteryBox").show();
		}

		if(dropIt == 1){

			dropSpeed = difficulty.dropSpeed;
			
			$("#mysteryBox").css("top", boxPos);

			//package 
			if (exploded == 1) {
				dropSpeed = difficulty.binocSpeed;
				burnout -= 1;
				if (burnout == 0) {
					nextTrial();
				}
			}

			//package has hit the ground
			else if(impact == 1) {
				impactDelay -= 1;
				
				if (impactDelay == 0) {
					subject.inputData(trial, "impact", 1)
					nextTrial();
				}			
			}

			//If the package is in the range of the binoculars...
			else if(boxPos >= revealTop && boxPos < hideTop){
				dropSpeed = difficulty.binocSpeed;
				canHit = 1; //Box is ready to be hit
				$("#mysteryBox").setAnimation(box["exposed"]);
		
			}
	
			//If the package is outside the range of the binoculars
			else if(boxPos >= hideTop && boxPos < groundPos){

				canHit = 0;
				$("#mysteryBox").setAnimation(box["idle"]);
			}
		
			//What happens when the box hits the ground...
			else if(boxPos >= groundPos && impact == 0 && exploded == 0){
				impact = 1;		

				score = 0;

				//Animate the city
				$("#city").setAnimation(cityAnim[stim]);

				//Adjust score based upon user's decision
				if(stim == "cp"){
			
					//Step 1: Adjust game score
					score = 10;

					correct += 1;
				}

				totalScore += score;
				
				//Step 2: Append score to HTML
				$("#totalScore").html(totalScore);
				$("#score").html(score);
			}
	

			boxPos += dropSpeed;
			$("#mysteryBox").css("top", boxPos);
				
		}
	},REFRESH_RATE);
}); 

