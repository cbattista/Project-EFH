//Generate random integer between an arbitrary range
function randomInt(min,max) {
	var unit = Math.random();
	var dilate = unit*(max - min + 1);
	var translate = dilate + min;
	var final = Math.floor(translate);

	return final;
}

//Choose random element from an array and remove it.
function chooseDistinct(array) {
	
	var random = randomInt(0,array.length - 1);	
	var choice = array[random];
	array.splice(random,1);

	return choice;

}

//randomize an array.
function randomize(array){

	if( !(array instanceof Array) ) throw TypeError();

	var newArray = [];
	var i;
	var length = array.length;

	for(i=0;i<length;i++) {
		newArray[i] = chooseDistinct(array);
	}

	return newArray;
}

function radomize_better(array) {
	//randomize the array itself, dont just make a copy
	var newArray = [];
	var i;
	var length = array.length;
	for (i = 0; i < length; i++) {
		newArray[i] = array[i];
	}
	var newerArray = randomize(newArray)

	for(i = 0; i < length; i++) {
		array[i] = newerArray[i];
	}
}

function getTime() {
	d = new Date();
	t = d.getTime();
	return t;
}

//Since the html5 function drawImage begins drawing at the top
//left part of the image, we need a way to make sure it gets drawn
//where we want.
function positionOnCanvas(canvasD, imageD,percent) {
	return Math.floor( (canvasD*percent) - (imageD*.5) );
}

//TESTING TESTING TESTING
/*
print(randomInt(1,8));


var tester = [1,2,3,4];
print(chooseDistinct(tester));
print(tester);

var tester2 = [1,2,3,4,5,6];
var hell = randomize(tester2);
print(typeof tester2 );
print(hell);
*/
