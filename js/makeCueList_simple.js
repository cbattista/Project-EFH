/*Process: 
 * 	1) number of blocks of each cue is the averages of the remainders left after division by cueBlockMin and cueBlockMax. This achieves the nicest distribution of differently sized blocks (in my opinion) 
 *
 * 	2) Make the above number of block each with the minimum number of cues. This guarentees that each block will have the minimum number of cues
 *
 * 	3) Generate a random number and a random index and add cues until the desired sum is generated (trials/n where n is the number of different cues (this generality has not be built in yet, but should be possible))
 *
 *	4)Trial number must be be divisiable by the number of different cues. Even better if its a 'nice' number with lots of factors (such as 12,24,48,...,12k)
 */
function CueList() {

	var min;
	var max;
	var trials = _numberOfTrials;
	var numberOfBlocks;
	var cue;
	var cues0;
	var cues1;
	var list;
	
	this.makeBlockNumber = function() {

		var quotientMin = Math.floor((trials/2)/min);
		var quotientMax = Math.floor((trials/2)/max);

		var avgQuotient = Math.ceil( (quotientMax + quotientMin)/2 );

		return avgQuotient;
	}

	this.randomBlock = function(cue) {
		
		var block = new Array();

		var list = new Array();

		for(i=0;i<numberOfBlocks;i++){
			
			for(j=0;j<min;j++){
			
				list[j] = cue;
			}

			block[i] = list;
			list = new Array();
		}

		var sum = min*numberOfBlocks;

		var random = 0;

		var index = 0;

		while(sum < (trials/2) ){
		
			random = Math.ceil(Math.random()*(max - min));

			if( (sum + random) <= (trials/2) ){
				
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

		var random = Math.floor(Math.random() + 0.5);//Generate a random integer between 0 and 1	

			if(random == 1){
				list.reverse();}

		var cueList = new Array();

		for(i=0;i<list.length;i++){
			
			cueList = cueList.concat(list[i]);
		}
		return cueList;

	}

	this.Construct = function(minimum, maximum) {

		self = this;

		if( _numberOfTrials%2 == 1) {
			return "Number of trails must be divisable by 2";
		}

		min = minimum;
		max = maximum;	

		numberOfBlocks = self.makeBlockNumber();
		cues0 = self.randomBlock(0);
		cues1 = self.randomBlock(1);
		list = self.makeCues();
		cueList = self.makeCueList();

		return cueList;
	}

}

//Test

var _numberOfTrials = 40;
var Cue = new CueList();
var cueList = Cue.Construct(4,8);
print(cueList);



