function Subject(id, game) {
	//function to handle the collection of subject data
	this.id = id;
	this.data = "";
	this.game = game;
	this.homebase = "inputData.php";
	
	function startGame(){
		//make an entry in the begin game table
	}
	
	function inputData(trial, value, score){
		//add a snippet of data to the client side store
		this.data = this.data + "\n" + trial + "\t" + value + "\t" + score;
		this.data = trim(this.data);
	}
	
	function sendData(trial, value, score)  {
		//send the client side data store to the home base and clear the client store (if successful)
		senddata = {table: this.game + ".results", sid: this.id, data: this.data, time: timestamp};
		$.post(this.homebase, senddata, 
		function(data){
			if (data == "success") {
				this.data = "";
			}
		}, "text");
	}
}



