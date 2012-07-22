/* Constructor for a taskswitch trial. Holds the logic of the game.*/
function Taskswitch_Trials(spriteArray, cdelay, rdelay, numOfTrials) {

	//Trial Variables
	var trialNumber = 0,
		cueDelay = cdelay,
		responseDelay = rdelay,	
		numberOfTrials = numOfTrials;
	
	//Tracker Variables
	var reactionTime,
		correct,
		timeStamp1,
		timeStamp2;
	

	var GenerateTrialArray = function(tn) {
		var o = {};

 		o = {

			'cue' : spriteArray['cueList'][tn],
			'stim': spriteArray['stimList'][tn],
			'sprite0' : spriteArray['spriteList'][tn][0],
			'sprite1' : spriteArray['spriteList'][tn][1]

		    };

		return o;
	}

	var trialArray = GenerateTrialArray(trialNumber);

	var userInput;

	//correct answer depends on which cue is shown. If a non-string 
	//is given, return what was given so we can send it to DB and
	//judge it there
	var CheckInput = function(imageClass) {
		
		if(typeof imageClass != 'string')
			return imageClass

		if(trialArray['cue'].imageShape === 'color') 
			return trialArray[imageClass].imageColor;

		else if (trialArray['cue'].imageShape === 'shape')
			return trialArray[imageClass].imageShape;

		else
			throw 'Cue Undefined';
	}

	//................................................................
	//..                  The Stages of a Trial                     ..
	//................................................................

    this.StageOne  = function() {

		//Clear canvas and buffer and draw the cue onto main canvas
		_CanvasContext.clearRect(0, 0, _Canvas.width, _Canvas.height);
		_CanvasBufferContext.clearRect(0, 0, _Canvas.width, _Canvas.height);

		trialArray['cue'].Draw(_CanvasContext);
		
		//Draw sprites for stage two onto buffer
		trialArray['stim'].Draw(_CanvasBufferContext);
		trialArray['sprite0'].Draw(_CanvasBufferContext);
		trialArray['sprite1'].Draw(_CanvasBufferContext);

		var self = this;

		setTimeout(function() {
			self.StageTwo();
		},cueDelay);

	}

	 this.StageTwo = function() {
		
		_CanvasContext.clearRect(0, 0, _Canvas.width, _Canvas.height);
		_CanvasContext.drawImage(_CanvasBuffer, 0, 0);

		//Wait for his key press and Timestamp it
		$(document).on('keydown', this.KeyCheck );
		timeStamp1 = getTime();

		var self = this;

		setTimeout(function() {
			$(document).off('keydown');
			self.Update();
		},responseDelay);
	 }

	this.KeyCheck = function(event) {
		timeStamp2 = getTime();
		var KeyId = event.keyCode;
		$(document).off('keydown');

		switch (KeyId) {
			case 65: //A
				userInput = 'sprite0';
				break; 
			case 68: //D
				userInput = 'sprite1';
				break;
			default: 
				userInput = KeyId;
				break;
		}

		//Analysis
		reactonTime = timeStamp2 - timeStamp1;
		//taskswitch.Subject.inputData(trialNumber,'RT',reactionTime);
		//taskswitch.Subject.inputData(trialNumber,'key',KeyId);

		//If input is correct
		if ( CheckInput(userInput) === CheckInput('stim') ) {
			alert('correct');
			//taskswitch.Subject.inputData(trialNumber, 'outcome', 'correct');
		}

		else {
			alert('incorrect');
			//taskswitch.Subject.inputData(trialNumber,'outcome','incorrect');
		}
	}

	this.Update = function() {

		trialNumber = trialNumber + 1;

		//Check end of level conditions
		if( trialNumber >= numberOfTrials) {
			alert('Level Complete');
			taskswitch.Update();
		}

		//Otherwise, start the next trial
		else {
			trialArray = GenerateTrialArray(trialNumber);
			userInput = undefined;
			this.Run();
		}
	}


	/*--------------------------------------------------------------*/

	
	this.Run = function() {
			this.StageOne();
	}

}

//Generate Trial object for theLevel.
function GenerateTrials(list,d1,d2,trials) {
	var t = {};
	t = new Taskswitch_Trials(list,d1,d2,trials);
	return t;
}
