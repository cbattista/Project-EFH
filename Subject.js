function Subject(id=666) {
	//function to handle the collection of subject data
	this.id = id;
	this.data = "";
	this.homebase = "db address";
	
	function inputData(trial, value, score){
		//add a snippet of data to the client side store
		this.data = this.data + "|" + trial + "," + value + "," + score;
	}
	
	function sendData(trial, value, score)  {
		//send the client side data store to the home base and clear the client store (if successful)
		senddata = {sid: this.id, data: this.data, time: timestamp};
		$.post(this.homebase, senddata, 
		function(data){
			if (data == "success") {
				this.data = "";
			}
		}, "text");
	}
}



