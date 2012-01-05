$( function(){
	var username=getCookie("funkyTrainUser");
	$("#welcome").html("Welcome, " + username);
	
	$.get("user.php", function(data){
		if (data != "0") {
			$("#messages_data").html(data);
							
		}

		
		else {
			//window.location = "index.html";	
		}

	}); 

	$.get("localhost:8080/scores", function(data){
		$("#scores").html(data);		
	});
});
