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
	
	stimList.sort(randOrd);
	
	//Initiate new trial
	nextTrial();
	
	//subject.inputLevelData(level, score, currentTime.getTime());
	//subject.sendLevelData();

}

function nextTrial(){
	
	hitIt = 0;
	trial = trial + 1;
	stim = stimList[trial];//Stim will either be a bomb or carepackage

	box = theBox(stim);
}
function setDifficulty(){}

function setCue(){}
//Create an array of animations 
function theBox(id){

	var someBox = new Array;
	
	someBox["idle"] = new $.gameQuery.Animation({
		imageURL: "images/SatDef/"+id+"_box.png"});

	someBox["explode"] = new $.gameQuery.Animation({
		imageURL: "images/SatDef/"+id+"_explosion.png"});
	
	someBox["exposed"] = new $.gameQuery.Animation({
		imagesURL: "images/SatDef/"+id+"_exposed.png"});
	
	someBox["grounded"] = new $.gameQuery.Animation({
		imagesURL: "images/SatDef/"+id+"_grounded.png"});

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
		
			.addSprite("background",{animation: new $.gameQuery.Animation({imageURL:"images/SatDef/satDefBG.png"})}).end()

		      .addGroup("scene", {height:PLAYGROUND_HEIGHT,width: PLAYGROUND_WIDTH})

			.addSprite("city",{animation: new $.gameQuery.Animation({imageURL:"images/SatDef/city.png"}),
				posx:100,
				posy:200,
				width:450,
				height:100})
			
			.addSprite("binoculars",{animation: new $.gameQuery.Animation({imageURL:"images/SatDef/binocular.png"}),
				posx:100,
				posy:100,
				width:450,
				height:100}).end()

		     .addGroup("objects",{height:PLAYGROUND_HEIGHT,width:PLAYGROUND_WIDTH})
		       
		       	.addSprite("mysteryBox",{animation: theBox["idle"],
				posx:225,
				posy:0,
				width: 50,
				height:50})
			
			.addSprite("plane",{animation: new $.gameQuery.Animation({imagesURL:"images/SatDef/plane.png"}),
				posx:0,
				posy:0,
				width:90,
				height:60});


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

	var newTop = parseInt($("#mysterBox").css("top")) + vSpeed

	//Phase 1: Move Box from Top to binocs 
	$("#food").css("top",newTop);
	
	//Phase 2: Move box through the binocs
	if(newTop >= revealTop && newTop < hideTop){
		hitIt = 1;
		$("#mysteryBox").setAnimation(box["exposed"]);
	}	
	//Phase 3(optional): move box to the ground
	if(newTop >= hideTop && newTop < groundPos){
		hitIt = 0;
		$("#mysteryBox").setAnimation(box["idle"]);
	}
	
	//Phase 4(optional): what happens when the box hits the ground
	if(newTop == groundPos){
		$("#mysteryBox").setAnimation(box["grounded"]);
	}

},REFRESH_RATE);

	//This is where the keybinding occurs
	$(document).keydown(function(e){
	
		if(e.keyCode = 32){ //i.e if user hits SPACEBAR (because we are in SPACE and we are DEFENDING it with out BAR...get it)
		
			if(hitIt == 1){
				d = new Date();
				t2 = d.getTimer();
				$("#mysteryBox").setAnimation(box["explode"]);
				RT = t2 - t1;
				subject.inputData(trial,'RT',RT);
			}
			if(hitIt == 0){
				alert("You Missed...LOSER");
			}

	 	}	
	});
}); 
