//Base class for all Level Lists
function TS_Level_List() {
	this.shapeKey = ['square','triangle'];
	this.colorKey = ['blue','red'];
	this.numberOfTrials = 40;
	this.Construct = null;
}

/*Process: 
 * 	1) number of blocks of each cue is the averages of the remainders left after division by cueBlockMin and cueBlockMax. This achieves the nicest distribution of differently sized blocks (in my opinion) 
 *
 * 	2) Make the above number of block each with the minimum number of cues. This guarentees that each block will have the minimum number of cues
 *
 * 	3) Generate a random number and a random index and add cues until the desired sum is 
 * 	generated (numberOfTrials/n where n is the number of different cues 
 * 	(this generality has not be built in yet, but should be possible))
 *
 *	4)Trial number must be be divisiable by the number of different cues. Even better if its a 'nice' number with lots of factors (such as 12,24,48,...,12k)
 */
function CueList() {

	var  min,
		 max,
		 numberOfBlocks,
		 cue,
		 cues0,
		 cues1,
		 list,
		 cueList,
		 objectList;

	
	this.makeBlockNumber = function() {

		var quotientMin = Math.floor((this.numberOfTrials/2)/min),
			quotientMax = Math.floor((this.numberOfTrials/2)/max),
			avgQuotient = Math.ceil( (quotientMax + quotientMin)/2 );

		return avgQuotient;
	}

	this.randomBlock = function(cue) {
		
		var  block = new Array(),
			 list = new Array(),
			 sum = min*numberOfBlocks,
			 random = 0,
			 index = 0;


		for(i=0;i<numberOfBlocks;i++){
			
			for(j=0;j<min;j++){
			
				list[j] = cue;
			}

			block[i] = list;
			list = new Array();
		}

		while(sum < (this.numberOfTrials/2) ){
		
			random = Math.ceil(Math.random()*(max - min));

			if( (sum + random) <= (this.numberOfTrials/2) ){
				
				index = Math.floor(Math.random()*(numberOfBlocks));

				if(block[index].length <= (max - random)){
				
					for(i=0;i<random;i++){
						
						block[index] = block[index].concat([cue]);
					}
					
					sum += random;
				}	
			}
			
		}

		return block;
	}


	//Now use the above construction to genereate a new array which 
	//alternates between blocks of 0's and 1's
	this.makeCues = function() {

		var newList = new Array();

		for(i=0;i<cues0.length;i++){
			
			newList[2*i] = cues0[i];
			newList[2*i + 1] = cues1[i];
		}

		return newList;
	}

	//The Finale in this Epic Construction!!
	//Add randomness to this list and merge together the arrays of the previous construction
	this.makeCueList = function() {

		var cueList = new Array();

		if(randomInt(0,1) == 1){
			list.reverse();
		}

		for(i=0;i<list.length;i++){
			
			cueList = cueList.concat(list[i]);
		}

		return cueList;

	}

	this.Objectify = function() {

		var objectList = [],
			cueIDs = ['color','shape'],
			cueID;

		for(i=0;i<this.numberOfTrials;i++) {
			cueID = cueIDs[cueList[i]];
			objectList[i] = new Cue();
			objectList[i].imageShape = cueID;
		}

		return objectList;
	}

	this.Construct = function(minimum, maximum) {

		if( this.numberOfTrials%2 == 1 ) {
			throw "Number of trails must be divisable by 2";
		}

		min = minimum;
		max = maximum;	

		numberOfBlocks = this.makeBlockNumber();
		cues0 = this.randomBlock(0);
		cues1 = this.randomBlock(1);
		list = this.makeCues();
		cueList = this.makeCueList();
		objectList = this.Objectify();

		return objectList;
	}

}

//Generate a Stimlist. Create an array of Stim Objects and 
//select a random image them via the setNumber property
function StimList() {
	
	this.Construct = function() {
		
		var stimList = [];

		for(j = 0; j < this.numberOfTrials ; j++) {
			stimList[j] = new Stim();
			stimList[j].imageShape = this.shapeKey[ randomInt(0,1) ];
			stimList[j].imageColor = this.colorKey[ randomInt(0,1) ];
		} 

		return stimList;
	}
}

//Generate a SpriteList. Create a Array of arrays of sprite objects
//Make sure we have a sprite of each color and each shape displayed 
function SpriteList_Random() {

	this.Construct = function() {

		var  spriteArray = [],
			 i,
			 shapes,
			 colors;

		for(i=0; i < this.numberOfTrials ;i++) {

			spriteArray[i] = [new SpriteOne(), new SpriteTwo()];

			shapes = randomize(['square','triangle']);
			spriteArray[i][0].imageShape = shapes[0];
			spriteArray[i][1].imageShape = shapes[1];

			colors = randomize(['blue','red']);
			spriteArray[i][0].imageColor = colors[0];
			spriteArray[i][1].imageColor = colors[1];
		}

		return spriteArray;

	}
}

//Generate a spriteList where sprites are fixed.
function SpriteList_Constant() {
	
	this.Construct = function() {
	
		var spriteArray = [],
			i;

		for(i = 0; i < this.numberOfTrials; i++) {
			spriteArray[i] = [new SpriteOne(), new SpriteTwo()];
	
			spriteArray[i][0].imageShape = 'square';
			spriteArray[i][1].imageShape = 'triangle';

			spriteArray[i][0].imageColor = 'red';
			spriteArray[i][1].imageColor = 'blue';

		}

		return spriteArray;
	}
}

CueList.prototype = new TS_Level_List();
StimList.prototype = new TS_Level_List();
SpriteList_Random.prototype = new TS_Level_List();
SpriteList_Constant.prototype = new TS_Level_List();


function GenerateLevelLists(cmin,cmax, trials) {
	var list = {};

	//Change the prototype object so that all list generators
	//have access to the number of Trials
	LevelList = new TS_Level_List();
	LevelList.numberOfTrials = trials;

	list = {
			'cueList'    : new CueList().Construct(cmin, cmax),
			'stimList'   : new StimList().Construct(),
			'spriteList' : new SpriteList_Constant().Construct()
		   };

	return list;
}

//Testing


