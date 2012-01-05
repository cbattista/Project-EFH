$(document).ready(function(){
//Hide the instructions under the game
	$("#instructDiv").hide();
	$("#game").show();
	$("#gameOver").hide();

	//Get gid from URL
	var url = location.href.split('=');
	var gid = parseInt(url[1]);

	$("#backToGame").click(function(){
		$("#instructDiv").hide();
		$("#playground").show();

		if(pauseGame == 0){
			$("#pauseScreen").show();
		}
		}
	);


	//Get game information
	$.get("getGameInfo.php?gid="+gid,function(data){
			var gameData = data.split('+');
			
			var gameName = gameData[0];
			var instructions = gameData[1];
			var controls = gameData[2];
			var fileName = gameData[3];
			
			$("#gameTitle").html(gameName);
			document.title= gameName;
			$("#instructions,#instructButton").click(function(){
				
				$("#instruct").html(instructions);
				$("#playground").hide();
				$("#instructDiv").show();

				if(pauseGame == 0){
					$("#pauseScreen").hide();
				}
				}
			);		

			//Load constants page, adjust div's, and load game js
			$.ajax({url: fileName+"_constants.js", async: false, dataType : "script"});
			$.ajax({url:fileName+".js", async: false, dataType : "script"});

			$("#game").width(PLAYGROUND_WIDTH);
			$("#welcomeScreen").height(PLAYGROUND_HEIGHT);
			$("#welcomeScreen").width(PLAYGROUND_WIDTH);
			//I hate to do two screens but its easier this way
			$("#pauseScreen").width(PLAYGROUND_WIDTH);
			$("#pauseScreen").height(PLAYGROUND_HEIGHT);

			//Adjust padding of playground to center it
			var divWidth = $(".center").css("width");
			var paddingWidth = ((parseInt(divWidth) - PLAYGROUND_WIDTH)/2);

			$("#pad-left").width(paddingWidth);
			$("#pad-right").width(paddingWidth);
			
			//Load the css file

			var headId = document.getElementsByTagName("head")[0];
			var cssNode = document.createElement('link');
			cssNode.type = 'text/css';
			cssNode.rel = 'stylesheet';
			cssNode.href = fileName+'.css';
			headId.appendChild(cssNode);

			$("#controls").html(controls);
		
		}
	);

	
	//Set Link to Proper highScore page
	$("#highScores").attr('href',"highScores.html?gid="+gid);

	//Give Pause button functionality
	$("#pauseGame").click(function(){
		pauseGame = 0;
		$("#pauseScreen").show();
		$("#pauseScreen").fadeTo(1000,1);
		$("#playground").fadeTo(1000,0);

	});

	//Give Resume Button functionality
	$("#resumeButton").click(function(){
			$("#pauseScreen").fadeOut(1000,0).hide();
			$("#playground").fadeTo(1000,1);
			//Make 'Try Again' button back into 'Resume Button' just in case its been changed
			$("#resumeButton").html("Resume Play");
			$("#gameOver").hide();

			//Delay 3 seconds before starting the game
			setTimeout("pauseGame = 1", 3000);	
		});

	}
);

