function nextLevel(){
	
	level = level + 1;
	trial = 0;
	audioCue = [0,1,2,3,4];	

	//Initiate new trial
	nextTrial();
}
function nextTrial(){
	trial = trial + 1;
	audio = audioList[audioCue[trial]];
}

//Grades user response and gives feedback
function feedback(){
}

//Function that governs the prompt when the audio file plays 
function showPrompt(){
	number = prompt("Did you hear anything?","");
}

function playSound(){
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
// --                     The Passage of Time                            --
// ------------------------------------------------------------------------

	$.playground().registerCallback(function(){
	
	
	
	});

	
});	
