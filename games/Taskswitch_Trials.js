/* Constructor for a taskswitch trial. Holds the logic of the game.*/
function Taskswitch_Trials(spriteArray, cdelay, numOfTrials) {

	var self = this;

	//Trial Variables
	var trialNumber = 0,
		cueDelay = cdelay,
		numberOfTrials = numOfTrials;
	
	//Tracker Variables
	var reactionTime,
		correct,
		timeStamp0,
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

		taskswitch.Subject.inputData(tn, 'cue', o['cue'].imageShape);
		taskswitch.Subject.inputData(tn, 'stim', o['stim'].imageShape);
		taskswitch.Subject.inputData(tn, 'sprite0', o['sprite0'].imageShape);
		taskswitch.Subject.inputData(tn, 'sprite1', o['sprite1'].imageShape);



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
		//_CanvasBufferContext.clearRect(0, 0, _Canvas.width, _Canvas.height);

		setTimeout(function () {
		trialArray['cue'].Draw(_CanvasContext);
		trialArray['sprite0'].Draw(_CanvasContext);
		trialArray['sprite1'].Draw(_CanvasContext);
		},100);
	
		//Draw sprites for stage two onto buffer
		timeStamp0 = getTime();
		taskswitch.Subject.inputData(trialNumber,'StageOne',timeStamp0);

		setTimeout(function() {
			self.StageTwo();
		},cueDelay+100);

	}

	 this.StageTwo = function() {
		
		 var cue = trialArray['cue'];

		_CanvasContext.clearRect(cue.posx, cue.posy, cue.width, cue.height);
		trialArray['stim'].Draw(_CanvasContext);

		//_CanvasContext.drawImage(_CanvasBuffer, 0, 0);

		//Wait for his key press and Timestamp it
		$(document).on('keydown', this.KeyCheck );
		timeStamp1 = getTime();
		taskswitch.Subject.inputData(trialNumber,'StageTwo',timeStamp1);

	 }

	this.KeyCheck = function(event) {
		timeStamp2 = getTime();
		var KeyId = event.keyCode;
		$(document).off('keydown');

		switch (KeyId) {
			case 65: //A
				userInput = 'sprite0';
				break; 
			case 75: //K
				userInput = 'sprite1';
				break;
			default: 
				userInput = KeyId;
				break;
		}

		//Analysis
		reactionTime = timeStamp2 - timeStamp1;
		taskswitch.Subject.inputData(trialNumber,'RT',reactionTime);
		taskswitch.Subject.inputData(trialNumber,'key',KeyId);

		//If input is correct
		if ( CheckInput(userInput) === CheckInput('stim') ) {
			taskswitch.Subject.inputData(trialNumber, 'ACC', 1);
			//alert("correct");
		}

		else {
			taskswitch.Subject.inputData(trialNumber,'ACC',0);
			//alert("incorrect");
		}

		//Run the next stage
		self.Update();
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
			taskswitch.Subject.sendData();
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
