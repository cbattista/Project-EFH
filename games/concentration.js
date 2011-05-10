function nextLevel(){}

function nextTrial() {}

//Function that reshuffles the deck, aka rearranges the layout of the cards
function reShuffle(){}

//Function that generates feedback on user's decision
function feedBack(){}






// ---------------------------------------------------------------------
// --			The Main Declaration                          --
// ---------------------------------------------------------------------

$(function(){

	//Initialize the game
	$.("#playground").playground({height:PLAYGROUND_HEIGHT, width: PLAYGROUND_WIDTH,keyTracker: true});

	//Initialize the background, actors...
	$.playground().addGroup("background",{height:PLAYGROUND_HEIGHT, width: PLAYGROUND_WIDTH})
			.addSprite("background",{animation: new $.gameQuery.Animation({imageURL:"images/concentration/ccBG.png"}),
				posx:200,
				posy:200,
				width:PLAYGROUND_WIDTH,
				height:PLAYGROUND_HEIGHT}).end()
		      
		      .addGroup("cards",{height:PLAYGROUND_HEIGHT, width:PLAYGROUND_WIDTH})
			cardString;

	$().setLoadBar("#loadingbar",400);

	//Initialize the start button
	$("#startbutton").click(function(){
	
		//Start the game
		nextLevel;

		$.playground().startGame(function(){
			$("#welcomeScreen").fadeTo(1000,0,function(){
				$(this).remove();
			});
		});
	});

// ---------------------------------------------------------------------------
// --				Time Passage				    --
// ---------------------------------------------------------------------------

	$.playground().registerCallback(function(){
	
	
	
	
	
	},REFRESH_RATE);

			





}
