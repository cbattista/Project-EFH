function nextLevel(){
	
	level = level + 1;
	trial = 0;
	audioCue = [0,1,2,3,4];	

	//Initiate new trial
	nextTrial();
}
function nextTrial(){

	//Reset game Variables
	timer = timerStart;
	soundNumbers();

	trial = trial + 1;
	audio = audioList[audioCue[trial]];
}

//Function that generates the numbers associated with each sound
//Numbers go from 0 - 100
function soundNumbers(){
	var randoms = new Array();
	for(var i = 1, i <= audioList.length, i++){
		for( var j = 0, j < 3, j++){
			randoms[j] = Math.floor(Math.random()*101);
		}
		soundNumbers['sound'+i]= randoms;
	}
}

//Function that governs which sound to play
function playSound(){}

//Function that prompts the user and evaluates his answer
function tapped(){
	number = prompt("Did you hear anything?","");

	if(number != ""){
		if ($.inArray(soundNumbers[audio],number != -1){
			feedback = 1;
			alert("Good Work Detective!");}
		else{
			feedback = 0;
			alert("Looks like you failed again");}
	}

	else{
		feedback = 0
		alert("You got nothing");}

	feedback();
	nextTrial();

}

//Grades user response and gives feedback
function feedback(){
	
	if(feedback == 1){}

	if(feedback == 0){}
}


// ------------------------------------------------------------------------
// --                    The Good Stuff                                  --
// ------------------------------------------------------------------------

$(function(){

//Initialize the game:
$("#playground").playground({height: PLAYGROUND_HEIGHT, width: PLAYGROUND_WIDTH});

//Functionalize the loading bar
$().setLoadBar("loadingbar",400);

//Initialize the start button 
$("startbutton").click(function(){

	//Start the game
	nextLevel();

	$.playground().startGame(function(){
		$("#welcomeScreen").fadeTo(1000,0,function(){
			$(this).remove();
		});
	});
});



// ------------------------------------------------------------------------
// --                          The Game                                  -- 
// ------------------------------------------------------------------------

//On button Press, play the audio 
$.playground().registerCallback(function(){
$("#listen").click(function(){
	playsound();
	
	//Wait an amount of time until asking for information
	while(timer > 0){
		timer -= 1;
	}
	if(timer == 0){
		tapped();
	}
}
	
	
},REFRESH_RATE);	

	
});	
