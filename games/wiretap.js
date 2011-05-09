function nextLevel(){
	
	//Start the next level
	level += 1;
	
	//Reset game variables
	trial = 0;
	audioCue();
	soundNumbers();

	//Initiate new trial
	nextTrial();
}

function nextTrial(){

	//Reset game Variables
	timer = timerStart;

	trial += 1;
	audio = audioList[audioCue[trial]];
}

//Function that generates the order of the audio files to be played
// No repeats
function audioCue(){
	audioCue = new Array();
	
	for(i = 0; i < cueLength; i++){
		audioCue[i] = i;}

	audioCue = audioCue.sort(randOrd);
}
//Function that generates the numbers associated with each sound
//Numbers go from 0 - 100
function soundNumbers(){
	var randoms = new Array();
	for(var i = 1; i <= audioList.length; i++){
		for( var j = 0; j < 3; j++){
			randoms[j] = Math.floor(Math.random()*101);
		}
		soundNumbers['sound'+i]= randoms;
	}
}

//Function that governs which sound to play
function playSound(){
	$("#aud").html("<source src = \"audio/"+audio+".ogg\"/>");
	var v = document.getElementByTagName("audio")[0];
	alert(v);
	v.play();
}

//Function that prompts the user and evaluates his answer
function tapped(){
	number = prompt("Did you hear anything?","");

	if(number != ""){
		if ($.inArray(soundNumbers[audio]),number != -1){
			feedback = 1;
			alert("Good Work Detective!");}
		else{
			feedback = 0;
			alert("Looks like you failed again");}
	}

	else{
		feedback = ""
		alert("You got nothing");}

	feedback();
	nextTrial();

}

//Grades user response and gives feedback
function feedback(){
	
	if(feedback == 1){
		subject.inputData(trial,"score",'PP');}

	if(feedback == 0){
		subject.inputData(trial,"score",'PN');}

	if(feedback == ""){
		subject.inputData(trial,"score",'NN');}

	//subject.sendData();
}

//Function that adjusts difficulty factors based on user play
function setDifficulty(){
	
}


// ------------------------------------------------------------------------
// --                    The Good Stuff                                  --
// ------------------------------------------------------------------------

$(function(){

//Get subjectID
//$.get("methods/getSid.php",function(data){
//	alert(data);
//	subject = new Subject(data,'wt');

//});

//Initialize the game:
$("#playground").playground({height: PLAYGROUND_HEIGHT, width: PLAYGROUND_WIDTH});

$.playground().addGroup("background",{height:PLAYGROUND_HEIGHT, width: PLAYGROUND_WIDTH})
	
	.addSprite("background",{animation: new $.gameQuery.Animation({imageURL:"images/wiretap/wiretapBG.png"}),
		posx: 200,
		posy: 200,
		width:PLAYGROUND_WIDTH,
		height:PLAYGROUND_HEIGHT});

//Functionalize the loading bar
$().setLoadBar("#loadingbar",400);

//Initialize the start button 
$("#startbutton").click(function(){
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
});
	
	
},REFRESH_RATE);	

});	
