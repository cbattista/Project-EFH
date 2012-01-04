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
	$.get("games/getHighScore.php?sid="+sid, function(data){
		$("#userScores").html(data);
	});

	$.get("games/getHighScore.php", function(data){
		$("#scoreTable").html(data);		
	});
});
