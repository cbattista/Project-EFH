function nextLevel(){
	
	//Start the next level
	level += 1;
	
	//Reset game variables
	trial = 0;
	audioCue();

	//Initiate new trial
	nextTrial();
}

function nextTrial(){

	//Reset game Variables
	timer = timerStart;

	trial += 1;
	audio = audioCue[trial - 1];
	listen = 0;
}

//Function that generates the order of the audio files to be played
// No repeats
function audioCue(){
	audioCue = new Array();
	
	for(i = 1; i <= cueLength; i++){
		audioCue[i] = "sound"+i;}

	audioCue = audioCue.sort(randOrd);
}

//Function that governs which sound to play
function playSound(){
	v = document.getElementById("aud");
	v.src = "audio/"+audio+".ogg";
	v.play();
}

//Grades user response and gives feedback
function feedback(fb){
	
	if(fb == 1){
		subject.inputData(trial,"score",'PP');}

	if(fb == 0){
		subject.inputData(trial,"score",'PN');}

	if(fb == ""){
		subject.inputData(trial,"score",'NN');}

	//subject.sendData();
}

//Function that prompts the user and evaluates his answer
function tapped(){
	number = prompt("Did you hear anything?","");

	if(number !== "" && number !== null){
		if ($.inArray(number,soundNumbers[audio]) !== -1){
			var feedBack = 1;
			alert("Good Work Detective!");}
		else{
			var feedBack = 0;
			alert("Looks like you failed again");}
	}

	else{
		var feedBack = "";
		alert("You got nothing");}

	feedback(feedBack);
	nextTrial();

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
		posx: 400,
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

//Functionalize 'listen' button

$("#listen").click(function(){

	playSound();
	listen = 1;

});

// ------------------------------------------------------------------------
// --                          The Game                                  -- 
// ------------------------------------------------------------------------


$.playground().registerCallback(function(){

	if(listen == 1){
		listen = 0;//Stop this block of code from running anymore

		while (timer > 0){
		timer = timer - 1;
		}

		if(timer == 0){
			tapped();
			nextTrial();
		}

	}
	
},REFRESH_RATE);	

});	
