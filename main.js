$( function(){
	var username=getCookie("funkyTrainUser");
	$("#welcome").html("Welcome, " + username);
	
	$.get("user.php", function(data){
		if (data != "0") {
			$("#messages_data").html(data);
							
		}

		
		else {
			window.location = "login.html";	
		}

	}); 

	var sid = getCookie("funkyTrainID");
	$.get("http://localhost:8080/", function(data){
		$("#scores").html(data);
	});

	$.get("games/getHighScore.php", function(data){
		$("#scoreTable").html(data);		
	});
});
