function Subject(sid, game) {
	//function to handle the collection of subject data
	this.sid = sid;
	this.data = "";
	this.gamedata = "";
	this.game = game;
	this.homebase = "inputData.php";
	this.trainingDay = 0;	
	
	function startGame(){
		//make an entry in the begin game table
	}
	
	this.inputData = function(trial, value, score){
		//add a snippet of data to the client side store
		this.data = this.data + this.game + "," + trial + "," + "\'" + value + "\'" + "," + "\'" + score + "\'" + "|";
	}
	
	this.sendData = function()  {
		//send the client side data store to the home base and clear the client store (if successful)
		senddata = {"table": "results", "uid": this.sid, "data": this.data};
		this.post(senddata);
	}
	
	this.inputLevelData = function(level, score){
		//add a snippet of game data
		this.leveldata = this.leveldata + score + "," + level + "|";
	}
	
	this.sendLevelData = function() {
		senddata = {table: "level", sid: this.sid, game: this.game, data: this.leveldata};
		this.post(senddata);
	}
	
	this.post = function(senddata) {
		$.post(this.homebase, senddata, 
		function(data){
			if (data == "success") {
				this.data = "";
			}
		}, "text");
	
	}
}



