//Trying to generalize the move object methods

//This function will set the position of the object
function setPosition(h,id){

	var objPos = h;
	h = h + "px";
	$(id).css("top",h);
	
	return objPos;
}

//THis function will actually change the position of the object
//For some reason it makes the box move reallllyy fast AND speed doesnt seem to depend on h
function moveObject(h,id){
	
	var position = $(id).position();
	var objPos = position.top + h;
	$(id).css("top",objPos);
	
}