$( function(){
	var username=getCookie("funkyTrainUser");
	$("#welcome").html("Welcome, " + username);
	
	$.get("/user", function(data){
		if (data != "0") {
			$("#messages_data").html(data);							
		}
		else {
			//window.location = "index.html";	
		}

	}); 

	$.ajax({url:"/scores", 
		success: function(data){
			$("#scores_data").html(data);
		},
		dataType:"html",
		type:"GET"});
});
