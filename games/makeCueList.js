//Function that generates 2 random solutions to a linear diophantine equation. 
//The numbers in the solution are the blocks
//The first solution is for the 1's and the second is for the 0's
//This is so we get two arrays of blocks such that there are
//an equal number of 0 and 1's in the concat of the two arrays
function randomBlock(min,max,length){
	
	var numbers = new Array();

	var blockList = new Array();

	var sum = 0;
	
	var counter = 0;
	
	for(i=0;i<2;i++){
	
		while (sum < length/2){

			if(sum < (length/2 - max) ){
		
				numbers[counter] = Math.floor(Math.random()*(max - min)) + min;}
		
			else {
				numbers[counter] = (length/2 - sum) }

			sum += numbers[counter];

			counter += 1;
		}
		
		blockList[i] = numbers;

		numbers = new Array();
		counter = 0
		sum = 0;
	}
	return blockList;
}

//Now use the list of block sizes to create a new array of 0's and 1's
function makeCues(list){

	var cues0 = list[0];
	var cues1 = list[1];

	var list0 = new Array();
	var list1 = new Array();

	var newList = new Array();
	
	for(i=0;i<cues0.length;i++){
		
		for(j=0;j<cues0[i];j++){
			
			list0[j] = 0;	
		}

		newList[2*i] = list0;
		list0 = new Array();
	
	}

	for(i=0;i<cues1.length;i++){
	
		for(j=0;j<cues1[i];j++){
			
			list1[j] = 1;
		}

		newList[2*i + 1] = list1;
		list1 = new Array();
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

