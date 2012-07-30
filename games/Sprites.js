//Images used will be stored in this object
function ImageRepository(){

	this.createImage = function(source) {
		var img = new Image();
		img.src = source;
		return img;
	}

	this.imgArray = {

		'sprite': {
			
			'square': {

				'blue' : this.createImage("img/square_b.png"),
				'red'  : this.createImage("img/square_r.png")

				  	  },

			'triangle':{

				'blue' : this.createImage("img/triangle_b.png"),
				'red'  : this.createImage("img/triangle_r.png")

				   	   }

				 },		  

		'cue'  : {

				'color': this.createImage("img/cue_c.png"), 
				'shape': this.createImage("img/cue_s.png")

				  },

		'stim' : {

			'square': {

				'blue' : this.createImage("img/square_b.png"),
				'red'  : this.createImage("img/square_r.png")

				  	  },

			'triangle': {

				'blue' : this.createImage("img/triangle_b.png"),
				'red'  : this.createImage("img/triangle_r.png")

				   		}

				  }
	}
	
	//Look inside our repository and get the image object
	this.Get = function(key,shape,color) {

		if(key === 'cue' && shape) 
			return this.imgArray[key][shape];
		
		else if(key && shape && color) 
			return this.imgArray[key][shape][color];

		else 
			throw "Incorrect Arguments"; 
	}

}

//Baseclass for all elements. 
function DrawableElement() {
	//Each element will get its imagae from a 'to-be-defined'
	//repository
	this.ImageRepository = new ImageRepository();

	this.imageKey;
	this.imageShape;
	this.imageColor;

	this.GetImage = function() {
		return this.ImageRepository.Get(this.imageKey, this.imageShape, this.imageColor);
	}

	//Each drawable element will have position data
	this.posx = 0;
	this.posy = 0;
	
	//Each drawable element will have dimension
	this.width = 50;
	this.height = 50;

	//Each drawable element can be drawn....
	this.Draw = function(canvasContext) {
		canvasContext.drawImage(this.GetImage(), 
								this.posx, 
								this.posy, 
								this.width, 
								this.height);
	}
}

//Create Drawable Objects that i will use
function Cue() {
	this.imageKey = 'cue';
	this.posx = _Canvas.width*.50;
	this.posy = _Canvas.height*.25;	
}

function Stim() {
	this.height=100;
	this.width=100;
	this.imageKey = 'stim';
	this.posx = _Canvas.width*.50;
    this.posy = _Canvas.height*.25;
}

function SpriteOne() {
	this.height = 100;
	this.width = 100;
	this.imageKey = 'sprite';
	this.posx = _Canvas.width*.25;
    this.posy = _Canvas.height*.75;
}

function SpriteTwo() {
	this.height = 100;
	this.width = 100;
	this.imageKey = 'sprite';
	this.posx = _Canvas.width*.75;
    this.posy = _Canvas.height*.75;
}

Cue.prototype = new DrawableElement();
Stim.prototype = new DrawableElement();
SpriteOne.prototype = new DrawableElement();
SpriteTwo.prototype = new DrawableElement();
