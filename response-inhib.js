function nextLevel(){

	//Set difficulty for next level using scores from completed level
	//setDifficulty(totalScore);

	trial = 0;

	level += 1;
	
	//Generate new stimList
	stimList = [];	

	for(i = 0; i <= trials/2; i++){
		stimList = stimList.concat(['b']);}//b:= bomb
	
	for(i = 0; i <= trials/2; i++ ){
		stimList = stimList.concat(['cp']);} //cp:= care package
	
	stimList = stimList.sort(randOrd);
	
	//Initiate new trial
	nextTrial();
	
	//subject.inputLevelData(level, score, currentTime.getTime());
	//subject.sendLevelData();

}

function nextTrial(){
	
	//Reset State variables
	hitIt = 0;
	blast = 0;

	trial = trial + 1;
	stim = stimList[trial];//Stim will either be a bomb or carepackage
	//alert(stim);
	
	//Set animation for next trial
	box = theBox(stim);
	$("#mysteryBox").setAnimation(box["idle"]);
	var d = new Date();
	t1 = d.getTime();

	//Reset Positioin of the box
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
function setDifficulty(){}

function setCue(){}

//Create an array of animations 
function theBox(id){

	var someBox = new Array;
	
	someBox["idle"] = new $.gameQuery.Animation({
		imageURL: "images/SatDef/mystery_box.png"});

	someBox["explode"] = new $.gameQuery.Animation({
		imageURL: "images/SatDef/"+id+"_explosion.png"});
	
	someBox["exposed"] = new $.gameQuery.Animation({
		imageURL: "images/SatDef/"+id+"_exposed.png"});
	
	someBox["grounded"] = new $.gameQuery.Animation({
		imageURL: "images/SatDef/"+id+"_grounded.png"});

	return someBox;
}

// ---------------------------------------------------------------------
// --                  The Main Declaration                           --
// ---------------------------------------------------------------------

$(function(){

	//Initialize the game:
	$("#playground").playground({height: PLAYGROUND_HEIGHT, width: PLAYGROUND_WIDTH, keyTracker: true});

	//Initialize the background, actors...

	$.playground().addGroup("background", {height:PLAYGROUND_HEIGHT,width: PLAYGROUND_WIDTH})
		
			.addSprite("background",{animation: new $.gameQuery.Animation({imageURL:"images/SatDef/satDefBG.png"}),
				posx:200,
				posy:200,
				width:450,
				height:565}).end()

		      .addGroup("scene", {height:PLAYGROUND_HEIGHT,width: PLAYGROUND_WIDTH})

			.addSprite("city",{animation: new $.gameQuery.Animation({imageURL:"images/SatDef/city.png"}),
				posx:150,
				posy:465,
				width:450,
				height:200})
			
			.addSprite("binoculars",{animation: new $.gameQuery.Animation({imageURL:"images/SatDef/binocular.png"}),
				posx:75,
				posy:100,
				width:450,
				height:200}).end()

		     .addGroup("objects",{height:PLAYGROUND_HEIGHT,width:PLAYGROUND_WIDTH})
		       
		       	.addSprite("mysteryBox",{animation: new $.gameQuery.Animation({imageURL:"images/SatDef/b_box.png"}),
				posx:200,
				posy:0,
				width: 100,
				height:100});
			
			//.addSprite("plane",{animation: new $.gameQuery.Animation({imagesURL:"images/SatDef/plane.png"}),
			//	posx:0,
			//	posy:0,
			//	width:90,
			//	height:60})

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
	
	//Get current position info of the box

	var newTop = parseInt($("#mysteryBox").css("top")) + vSpeed

	//Phase 1: Move Box from Top to binocs 
	$("#mysteryBox").css("top",newTop);
	
	//Phase 2: Move box through the binocs
	if(newTop >= revealTop && newTop < hideTop){
		hitIt = 1;
		$("#mysteryBox").setAnimation(box["exposed"]);
	}

	if(blast == 0){ //If nothing was hit
	
		//Phase 3(optional): move box to the ground
		if(newTop >= hideTop && newTop < groundPos){
			hitIt = 0;
			$("#mysteryBox").setAnimation(box["idle"]);
			
			//Evaluate User's decision
			if(stim == "cp"){
				
					//Adjust game score
						score = 500;
						totalScore += score;

						//Append to HTML
						$("#totalScore").html(totalScore);
						$("#score").html(score);

					//alert("Good Work!");		
				}

			if(stim == "b"){
					
					//Adjust game score
					score =  -500;
					totalScore += score;

						//Append to HTML
						$("#totalScore").html(totalScore);
						$("#score").html(score);
					
					//alert("YOU ARE A HORRIBLE PERSON");
				}
			}
		
		//Phase 4(optional): what happens when the box hits the ground
		if(newTop == groundPos){
			$("#mysteryBox").setAnimation(box["grounded"]);
			nextTrial();
	 	}
	}
},REFRESH_RATE);

	//This is where the keybinding occurs
	$(document).keydown(function(e){
	
		if(e.keyCode = 32){ //i.e if user hits SPACEBAR (because we are in SPACE and we are DEFENDING it with out BAR...get it)
		
			if(hitIt == 0){
				alert("You Missed...LOSER");
			}

			if(hitIt == 1){
				
				//Calculate time of button press and gather/send reaction time data
				var d = new Date();
				t2 = d.getTime();
				RT = t2 - t1;
				subject.inputData(trial,'RT',RT);

				//Animate the explosion
				$("#mysteryBox").setAnimation(box["explode"]);
				//alert("You got it!");
				
				//Evaluate users decision
				if(stim == "b"){
				
					//Adjust game score
						score = (1 - (RT/100))*-10;
						totalScore += score;

						//Append to HTML
						$("#totalScore").html(totalScore);
						$("#score").html(score);

					alert("Good Work!");		

				}

				if(stim == "cp"){
					
					//Adjust game score
					score =  -100;
					totalScore += score;

						//Append to HTML
						$("#totalScore").html(totalScore);
						$("#score").html(score);
					
					alert("YOU ARE A HORRIBLE PERSON");

				}

				//Send trial data to server
				
				//subject.inputData(trial,"score",score);
				//subject.inputData(trial,"RT",RT);

				//set state variable so next trial can start when box is destroyed
				blast = 1;

				//Initiate next trial
				nextTrial();
			}

	 	}	
	});
}); 
