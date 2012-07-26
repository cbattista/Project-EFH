function Subject(sid, game) {
	//function to handle the collection of subject data
	this.data = "";
	this.leveldata = "";
	this.sid = sid;
	this.game = game;
	this.homebase = "../inputResults.php";
	this.trainingDay = 0;	

	this.inputData = function(trial, value, score){
		//add a snippet of data to the client side store
		this.data = sprintf("%s|%s,%s,'%s','%s'", this.data, this.game, trial, value, score);
		//alert(this.data);
	}
	
	this.sendData = function()  {
		//send the client side data store to the home base and clear the client store (if successful)
		senddata = {"table": "results", "uid": this.sid, "data": this.data};
		//alert(this.data);
		this.post(senddata, this.homebase);	
		this.data = "";
	}
	
	this.inputLevelData = function(day, score, level){
		//add a snippet of game data
		this.leveldata = this.leveldata + this.game + "," + day + "," + score + "," + level + "|";
	}
	
	this.sendLevelData = function() {
		senddata = {"table": "level", "uid": this.sid, "data": this.leveldata};
		this.post(senddata, "../inputData.php");
	}

	
	this.post = function(senddata, destination) {
		$.ajax({
		  type: 'POST',
		  url: destination,
		  data: senddata,
		  success: function(data) { 
				//alert(data);
				this.data = "";
			}, 
		});
	
	}
}



