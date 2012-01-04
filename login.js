$(document).ready(function(){

	$("#submit").click(function() {
		query = $("form").serialize();
		$.get("login.php?"+query, function(data){
		if (data == 1){
			window.location = "main.html";		
			}
		else if (data == 2){
			window.location = "consent.html";
			}

		else if (data == 3){
			alert("Could not connect to the server. Please try again later");
		}
		else {
			
			alert("Incorrect usename or password. Please try again");
			}

		});
	});
});
