/*Process: 
 * 	1) Make a specified number of blocks each with the minimum number of cues
 * 	2) Generate a random number and a random index and add cues until the 
 * 	desired sum is generated (trials/2)
 *	3) In the construction this process is done twice to get an array of cue0 and
 *	an array of cue1...
 *	4)numberOfBlocks much be choosen carefully. min*numberOfBlocks must
 *	be less then trials/2. The amount of randomness will increases the more trials we
 *	have and will vary depending on the trial:numberOfBlocks ratio
 */
function randomBlock(min,max,trials,numberOfBlocks,cue){
	
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
function makeCues(cues0,cues1){

	var newList = new Array();

	for(i=0;i<cues0.length;i++){
		
		newList[2*i] = cues0[i];
		newList[2*i + 1] = cues1[i];
	}

	return newList;
}

//The Finale in this Epic Construction!!
//Add randomness to this list and merge together the arrays of the previous construction
function makeCueList(list){

	var random = Math.floor(Math.random() + 0.5);//Generate a random integer between 0 and 1	

		if(random == 1){
			list.reverse();}

	var cueList = new Array();

	for(i=0;i<list.length;i++){
		
		cueList = cueList.concat(list[i]);
	}
	return cueList;

}

