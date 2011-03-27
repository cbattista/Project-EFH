function nextLevel(){}

function nextTrial(){}

function setDifficulty(){}

function setCue(){}

function theBox(id){
	box = new Array;
	
	box["idle"] = new $.gameQuery.Animation({
		imageURL: "images/SatDef/"+id+"_box.png"});
	box["explode"] = new $.gameQuery.Animation({
		imageURL: "images/SatDef/"+id+"_box.png"});
	box["exposed"] = new $.gameQuery.Animation({
		imagesURL: "images/SatDef/"+id+"_box.png"});

	return box;
}

// ---------------------------------------------------------------------
// --                  The Main Declaration                           --
// ---------------------------------------------------------------------

$(function(){

	//Initialize the game:
	$("playground").playground({height: PLAYGROUND_HEIGHT, width: PLAYGROUND_WIDTH, keyTracker: true});

	//Initialize the background, actors...

	$.playground().addGroup("background", {height:PLAYGROUND_HEIGHT,width: PLAYGROUND_WIDTH})
		
			.addSprite("background",{animation: new $.gameQuery.Animation({imageURL:"images/SatDef/background.png"})}).end()

		      .addGroup("scene", {height:PLAYGROUND_HEIGHT,width: PLAYGROUND_WIDTH})

			.addSprite("city",{animation: new $.gameQuery.Animation({imageURL:"images/SatDef/city.png"}),
				posx:225px,
				posy:565px,
				width:450px,
				height:100px})
			
			.addSprite("binoculars",{animation: new $.gameQuery.Animation({imageURL:"images/SatDef/binocular.png"}),
				posx:225px,
				posy:100px,
				width:450px,
				height100px}).end()

		     .addGroup("objects",{height:PLAYGROUND_HEIGHT,width:PLAYGROUND_WIDTH})
		       
		       	.addSprite("mysteryBox",{animation: theBox["idle"],
				posx:225px,
				posy:0px,
				width: 50px,
				height:50px})
			
			.addSprite("plane",{animation: new $.gameQuery.Animation({imagesURL:"images/SatDef/plane.png"}),
				posx:0px,
				posy:0px,
				width:90px,
				height 60px});


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

	var newTop = parseInt($("#mysterBox").css("top")) + hSpeed

	//Phase 1: Move Box from Top to binocs 
	$("#food").css("top",newTop);}

			
			
