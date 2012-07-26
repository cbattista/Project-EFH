function Taskswitch_Game() {

	var numberOfLevels = 5;

	//The following variables should be acquired from the DB
	
	//Tracker Variables/Properties
	var levelNumber = 0;
	var LevelList;
	var Trials;
	var Difficulty;
	
	var Initialize = function() {

		Difficulty = GenerateDifficulty(levelNumber);

		LevelList = GenerateLevelLists(Difficulty.cueBlockMin,
									   Difficulty.cueBlockMax,
									   Difficulty.numberOfTrials);

		Trials = GenerateTrials(LevelList,
							    Difficulty.cueDelay,
							   	Difficulty.responseDelay,
								Difficulty.numberOfTrials);
	}

	sid = getCookie("funkyTrainID");
	
	this.Subject = new Subject(sid,4);

	this.Run = function() {
		Initialize() 
		Trials.Run();
	}

	this.Update = function () { 
		levelNumber += 1;

		//Check Game over Condition
		if(levelNumber > numberOfLevels)
			alert('Game Over');

		else {
			//Get a new difficulty object
			GenerateDifficulty(levelNumber);
			//Run the next level
			this.Run();
		}

	}

}	

function Difficulty(levelNumber) {
	this.cueDelay = 2000;
	this.responseDelay = 2000;
	this.cueBlockMin = 3;
	this.cueBlockMax = 6;
	this.numberOfTrials = 48;
}

//Generate Difficulty Variables for the Level
function GenerateDifficulty(levelNumber){
	d = new Difficulty(levelNumber);	
	return d;
}
