function nextLevel(){

	//Set difficulty for next level using scores from completed level
	//setDifficulty(totalScore);

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

	$("#score").html(score);

	trial = trial + 1;
	stim = stimList[trial];//Stim will either be a bomb or carepackage
	delay = delays[trial];//delay before package drops	

	//Reset animations for next trial
	box = theBox(stim);
	$("#mysteryBox").setAnimation(box["idle"]);

	$("#city").setAnimation(cityAnim["fine"]);
	
	var d = new Date();
	t1 = d.getTime();

	//Reset Position of the box, hide it
	$("#mysteryBox").hide();
	$("#mysteryBox").css("top",initTop);

	if (trial < stimList.length) { //Trial lasts until we run out of fruit 
		
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
	game = "response-inhib"
	
	$.get("getDifficulty.php?score=" +score+ "&game=response-inhib",function(data){
		diffs = data.split(',');
		difficulty.trials = diffs[0];
		difficulty.dropSpeed = diffs[1];
		difficulty.nogoes = diffs[2];
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

	$.ajax({url: "getLevels.php?gid=1",
		success : function(data) {
			levels = parseInt(data);
		},
		async: false}
	);

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

	//Initialize the start button
	$("#startbutton").click(function(){
		
		//Start the game
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

			boxPos += difficulty.dropSpeed;
	
			$("#mysteryBox").css("top", boxPos);

			if (exploded == 1) {
				burnout -= 1;
			}

			if (burnout == 0) {
				nextTrial();
			}

			//if it's in range of the binoculars...
			if(boxPos >= revealTop && boxPos < hideTop && exploded == 0){
		
				canHit = 1; //Box is ready to be hit
				$("#mysteryBox").setAnimation(box["exposed"]);
		
			}
	
			//if it has passed the range of the binoculars
			else if(boxPos >= hideTop && boxPos < groundPos && exploded == 0){

				canHit = 0;
				$("#mysteryBox").setAnimation(box["idle"]);
			}
		
			//What happens when the box hits the ground
			else if(boxPos == groundPos){
		
				score = 0;

				//Animate the city
				$("#city").setAnimation(cityAnim[stim]);

				//Adjust score based upon user's decision
				if(stim == "cp"){
					//Adjust game score
					score = 10;

					correct += 1;
				}

				totalScore += score;
				//Append score to HTML
				$("#totalScore").html(totalScore);
				$("#score").html(score);
			}
	
			//The box falls below the screen
			if(boxPos == maxTop){
				nextTrial();
			}
		}
	},REFRESH_RATE);

	//This is where the keybinding occurs
	$(document).keydown(function(e){
	
		if(e.keyCode = 32){
		
			if(canHit == 1 && fired == 0){//If button press took place inside the binoculars and you havn't fired already
				fired = 1;
				exploded = 1;

				//Calculate time of button press and gather/send reaction time data
				var d = new Date();
				t2 = d.getTime();
				RT = t2 - t1;
				totalRT += RT
				buttonPress += 1
		
				subject.inputData(trial,'RT',RT);

				//Animate the explosion
				$("#mysteryBox").setAnimation(box["explode"]);

				score =  0;

				
				//Evaluate users decision
				if(stim == "b"){
					//Adjust game score
					span = hideTop - revealTop;
					dist = hideTop - boxPos;
					score =  (dist / span) * 10 ;
					score = parseInt(score);
					
					correct += 1;

				}
				
				totalScore += score;
				
				//Append score to HTML
				$("#totalScore").html(totalScore);
				$("#score").html(score);

				//Send trial data to server
				
				subject.inputData(trial,"score",score);
				subject.inputData(trial,"RT",RT);
			}

		

	 	}	
		//set the state variable to indicate the defense system has been fired
		fired = 1;
	});
}); 
