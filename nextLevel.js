function nextLevel(stimFile, stimList) {
	//stuff for making a new stimList etc...
	//setting of game variables - eventually should be retrieved from the database
	trial = 0;
	level = level + 1;
	//stimList = [1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1];
	//stimFile = ["steak.png", "banana.png"];
	//start things off
	stim = stimList[trial];
	//subject.inputLevelData(level, score, currentTime.getTime());
	subject.sendLevelData();
	}
	