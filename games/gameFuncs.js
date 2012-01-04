function setHealth(target, value) {
	$(target).data('health', value);
	$(target).data('maxHealth', value);
	hstring = target + "_health";
	backing = hstring + "_back";
	$(hstring).css("background-color", "#FF0000");
	$(backing).css("background-color", "#444444");
	$(backing).css("border-style", "solid");
	$(backing).css("border-width", "2px");
	$(backing).css("border-color", "#000000");
}

function incHealth(target) {
	newHealth = parseInt($(target).data('health') + 1);
	maxHealth = parseInt($(target).data('maxHealth'));
	if (newHealth <= maxHealth) {
		$(target).data('health', newHealth);
		hstring = target + "_health";
		width = parseInt($(target).css('width')) ;
		barWidth = (newHealth / maxHealth) * width;
		$(hstring).css("width", barWidth);
	}
}

function decHealth(target) {
	newHealth = parseInt($(target).data('health') - 1);
	if (newHealth >= 0) {
		$(target).data('health', newHealth);
		maxHealth = parseInt($(target).data('maxHealth'));
		hstring = target + "_health";
		width = parseInt($(target).css('width'));
		barWidth = (newHealth / maxHealth) * width;
		$(hstring).css("width", barWidth);
	}

}

function gameOver(){
	pauseGame = 0;
	trial = 0;

	$("#pauseScreen").show();
	$("#gameOver").show();
	$("#resumeButton").html("Try Again");
	$("#pauseScreen").fadeTo(1000,1);
	$("#playground").fadeTo(1000,0);

	//Send to the DB the user had a gameOver
	//subject.inputData(level,"GameOver",1);
}

function toggle_vis(item){
	vis = $(item).css('visibility');
	if (vis == "hidden") {
		$(item).css('visibility', 'visible');
	}
	else {
		$(item).css('visibility', 'hidden');
	}
}

$(function (){
	$("#insButton").click(function(){
		vis = $("#instructions").css('visibility');
		if (vis == "hidden") {
			$("#instructions").css('visibility', 'visible');
			$("#insButton").html('Hide Instructions');
		}
		else {
			$("#instructions").css('visibility', 'hidden');
			$("#insButton").html('Show Instructions');
		}
	});
});

