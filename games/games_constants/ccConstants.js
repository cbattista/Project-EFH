var PLAYGROUND_HEIGHT = 800;
var PLAYGROUND_WIDTH  = 400;
var REFRESH_RATE      = 40;
var CARD_WIDTH        = 100;
var CARD_HEIGHT       = 200;

//Generate the Cards to initialization in the main delcaration

var numberOfCards = 12;
var cardArray = new Array();
var cardString = "";
var i = 0;

	//Iterate thought the x and y axis of the playground
	for(x = 0, x < PLAYGROUND_WIDTH/CARD_WIDTH, x++){
		for(y = 0, y < PLAYGROUND_HEIGHT/CARD_HEIGHT, y++){
			cardArray[i] = ".addSprite(\"card"+i+"\",{animation: new $.gameQuery.Animation({imageURL:\"images/concentration/card"+i+".png\"}), posx:"+CARD_WIDTH*x+", posy:"+CARD_HEIGHT*y+",width:"+CARD_WIDTH+",height:"+CARD_HEIGHT+"})";
			cardString = cardString + cardArray[i];
			i = i + 1;
		}
}

	//Generate the animations for each card


